import { z } from "zod";
import {
  CABIN_CLASSES,
  TRIP_TYPES,
  type FlightSearchParams,
} from "@/types/flight";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export const iataSchema = z
  .string()
  .regex(/^[A-Z]{3}$/, "Choose an airport from the list");

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
  .refine((v) => {
    const d = new Date(`${v}T00:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
  }, "Choose a valid date");

/** Earliest allowed travel date. One day of slack so timezones never reject "today". */
function earliestDate(): string {
  return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/* Normalized search params (URL / API / providers)                    */
/* ------------------------------------------------------------------ */

export const searchLegSchema = z
  .object({
    origin: iataSchema,
    destination: iataSchema,
    date: isoDateSchema,
  })
  .refine((l) => l.origin !== l.destination, {
    message: "Origin and destination must be different",
    path: ["destination"],
  });

export const passengersSchema = z.object({
  adults: z.number().int().min(1, "At least 1 adult").max(9),
  children: z.number().int().min(0).max(8),
  infants: z.number().int().min(0).max(9),
});

export const flightSearchParamsSchema = z
  .object({
    tripType: z.enum(TRIP_TYPES),
    legs: z.array(searchLegSchema).min(1).max(5),
    returnDate: isoDateSchema.optional(),
    passengers: passengersSchema,
    cabin: z.enum(CABIN_CLASSES),
  })
  .superRefine((v, ctx) => {
    const min = earliestDate();

    v.legs.forEach((leg, i) => {
      if (leg.date < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date is in the past",
          path: ["legs", i, "date"],
        });
      }
    });

    if (v.tripType === "multi") {
      if (v.legs.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Multi-city trips need at least 2 flights",
          path: ["legs"],
        });
      }
      for (let i = 1; i < v.legs.length; i++) {
        if (v.legs[i].date < v.legs[i - 1].date) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be on or after the previous flight",
            path: ["legs", i, "date"],
          });
        }
      }
    } else if (v.legs.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expected a single outbound flight",
        path: ["legs"],
      });
    }

    if (v.tripType === "round") {
      if (!v.returnDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Choose a return date",
          path: ["returnDate"],
        });
      } else if (v.legs[0] && v.returnDate < v.legs[0].date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Return must be on or after departure",
          path: ["returnDate"],
        });
      }
    }

    const { adults, children, infants } = v.passengers;
    if (infants > adults) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Each infant must travel with an adult",
        path: ["passengers", "infants"],
      });
    }
    if (adults + children > 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A maximum of 9 adults and children per booking",
        path: ["passengers", "adults"],
      });
    }
  });

/* ------------------------------------------------------------------ */
/* Search form (React Hook Form)                                       */
/* ------------------------------------------------------------------ */

export const searchFormShape = z.object({
  tripType: z.enum(TRIP_TYPES),
  from: z.string(),
  to: z.string(),
  departure: z.string(),
  returnDate: z.string(),
  adults: z.number().int(),
  children: z.number().int(),
  infants: z.number().int(),
  cabin: z.enum(CABIN_CLASSES),
  legs: z.array(z.object({ from: z.string(), to: z.string(), date: z.string() })),
});

export type SearchFormValues = z.infer<typeof searchFormShape>;

export function formToParams(v: SearchFormValues): FlightSearchParams {
  const passengers = { adults: v.adults, children: v.children, infants: v.infants };

  if (v.tripType === "multi") {
    return {
      tripType: "multi",
      legs: v.legs.map((l) => ({ origin: l.from, destination: l.to, date: l.date })),
      passengers,
      cabin: v.cabin,
    };
  }

  return {
    tripType: v.tripType,
    legs: [{ origin: v.from, destination: v.to, date: v.departure }],
    returnDate: v.tripType === "round" ? v.returnDate || undefined : undefined,
    passengers,
    cabin: v.cabin,
  };
}

/** Translate a normalized-params issue path into the form's own field path. */
function toFormPath(
  tripType: SearchFormValues["tripType"],
  path: (string | number)[],
): (string | number)[] {
  if (path[0] === "legs") {
    const i = typeof path[1] === "number" ? path[1] : 0;
    const field = path[2];
    const mapped =
      field === "origin" ? "from" : field === "destination" ? "to" : field === "date" ? "date" : "from";
    if (tripType === "multi") return ["legs", i, mapped];
    return [mapped === "date" ? "departure" : mapped];
  }
  if (path[0] === "passengers" && typeof path[1] === "string") return [path[1]];
  if (path[0] === "returnDate") return ["returnDate"];
  return path;
}

export const searchFormSchema = searchFormShape.superRefine((values, ctx) => {
  const result = flightSearchParamsSchema.safeParse(formToParams(values));
  if (result.success) return;
  for (const issue of result.error.issues) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: issue.message,
      path: toFormPath(values.tripType, issue.path),
    });
  }
});

/* ------------------------------------------------------------------ */
/* Other forms / endpoints                                             */
/* ------------------------------------------------------------------ */

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
});
