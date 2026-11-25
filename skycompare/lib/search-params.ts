import { flightSearchParamsSchema } from "@/lib/validations";
import { TRIP_TYPES, type FlightSearchParams, type TripType } from "@/types/flight";

/**
 * URL contract for the results page:
 *
 *   /flights?trip=round&from=DEL&to=LHR&departure=2027-01-15&return=2027-01-25
 *           &adults=1&children=0&infants=0&cabin=ECONOMY
 *
 *   /flights?trip=multi&legs=DEL.LHR.2027-01-15~LHR.JFK.2027-01-20&adults=1...
 *
 * `trip` is optional: a `return` param implies a round trip, otherwise one way.
 */

export function buildSearchUrl(p: FlightSearchParams): string {
  const q = new URLSearchParams();
  q.set("trip", p.tripType);

  if (p.tripType === "multi") {
    q.set("legs", p.legs.map((l) => `${l.origin}.${l.destination}.${l.date}`).join("~"));
  } else {
    const leg = p.legs[0];
    q.set("from", leg.origin);
    q.set("to", leg.destination);
    q.set("departure", leg.date);
    if (p.tripType === "round" && p.returnDate) q.set("return", p.returnDate);
  }

  q.set("adults", String(p.passengers.adults));
  q.set("children", String(p.passengers.children));
  q.set("infants", String(p.passengers.infants));
  q.set("cabin", p.cabin);

  return `/flights?${q.toString()}`;
}

type RawParams = Record<string, string | string[] | undefined>;

export type ParseResult =
  | { success: true; data: FlightSearchParams }
  | { success: false; error: string };

export function parseSearchParams(raw: RawParams): ParseResult {
  const get = (key: string): string | undefined => {
    const v = raw[key];
    const s = Array.isArray(v) ? v[0] : v;
    const t = s?.trim();
    return t ? t : undefined;
  };

  const int = (key: string, fallback: number): number => {
    const v = get(key);
    if (v === undefined) return fallback;
    return /^\d+$/.test(v) ? Number(v) : Number.NaN;
  };

  const legsParam = get("legs");
  const explicitTrip = get("trip")?.toLowerCase();
  const tripType = (explicitTrip ??
    (legsParam ? "multi" : get("return") ? "round" : "oneway")) as TripType;

  if (!TRIP_TYPES.includes(tripType)) {
    return { success: false, error: "Unknown trip type." };
  }

  const passengers = {
    adults: int("adults", 1),
    children: int("children", 0),
    infants: int("infants", 0),
  };
  const cabin = (get("cabin")?.toUpperCase() ?? "ECONOMY") as FlightSearchParams["cabin"];

  const candidate =
    tripType === "multi"
      ? {
          tripType,
          legs: (legsParam ?? "").split("~").map((chunk) => {
            const [origin = "", destination = "", date = ""] = chunk.split(".");
            return {
              origin: origin.toUpperCase(),
              destination: destination.toUpperCase(),
              date,
            };
          }),
          passengers,
          cabin,
        }
      : {
          tripType,
          legs: [
            {
              origin: (get("from") ?? "").toUpperCase(),
              destination: (get("to") ?? "").toUpperCase(),
              date: get("departure") ?? "",
            },
          ],
          returnDate: tripType === "round" ? get("return") : undefined,
          passengers,
          cabin,
        };

  const parsed = flightSearchParamsSchema.safeParse(candidate);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid search.",
    };
  }
  return { success: true, data: parsed.data };
}

export function passengerSummary(p: FlightSearchParams["passengers"]): string {
  const parts = [`${p.adults} adult${p.adults === 1 ? "" : "s"}`];
  if (p.children) parts.push(`${p.children} child${p.children === 1 ? "" : "ren"}`);
  if (p.infants) parts.push(`${p.infants} infant${p.infants === 1 ? "" : "s"}`);
  return parts.join(", ");
}
