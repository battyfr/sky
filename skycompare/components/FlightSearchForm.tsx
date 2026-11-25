"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, CalendarDays, Plus, Search, Trash2 } from "lucide-react";
import { AirportAutocomplete } from "@/components/AirportAutocomplete";
import { PassengerPicker } from "@/components/PassengerPicker";
import { Button } from "@/components/ui/Button";
import { buildSearchUrl } from "@/lib/search-params";
import { saveRecentSearch } from "@/lib/recent-searches";
import { formToParams, searchFormSchema, type SearchFormValues } from "@/lib/validations";
import { cn, todayISO } from "@/lib/utils";
import {
  CABIN_CLASSES,
  CABIN_LABELS,
  TRIP_TYPES,
  TRIP_TYPE_LABELS,
  type TripType,
} from "@/types/flight";

const MAX_LEGS = 5;

function DateField({
  label,
  reg,
  min,
  error,
}: {
  label: string;
  reg: UseFormRegisterReturn;
  min?: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <div className={cn("field", error && "field-error")}>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-navy-300" aria-hidden="true" />
          <input
            id={id}
            type="date"
            min={min}
            className="field-control"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...reg}
          />
        </div>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}

interface Props {
  initialFrom?: string;
  initialTo?: string;
}

export function FlightSearchForm({ initialFrom = "", initialTo = "" }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Computed after mount so server and client markup match regardless of timezone.
  const [today, setToday] = useState<string | undefined>(undefined);
  useEffect(() => setToday(todayISO()), []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      tripType: "round",
      from: initialFrom,
      to: initialTo,
      departure: "",
      returnDate: "",
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "ECONOMY",
      legs: [
        { from: "", to: "", date: "" },
        { from: "", to: "", date: "" },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({ control, name: "legs" });

  const values = watch();
  const tripType = values.tripType;

  function changeTrip(next: TripType) {
    const v = getValues();
    if (next === v.tripType) return;

    if (next === "multi") {
      replace([
        { from: v.from, to: v.to, date: v.departure },
        { from: v.to, to: "", date: "" },
      ]);
    } else if (v.tripType === "multi") {
      const first = v.legs[0];
      setValue("from", first?.from ?? "");
      setValue("to", first?.to ?? "");
      setValue("departure", first?.date ?? "");
    }
    setValue("tripType", next);
    clearErrors();
  }

  function swap() {
    const { from, to } = getValues();
    setValue("from", to, { shouldValidate: isSubmitted });
    setValue("to", from, { shouldValidate: isSubmitted });
  }

  const onSubmit = handleSubmit((v) => {
    const params = formToParams(v);
    saveRecentSearch(params);
    startTransition(() => {
      router.push(buildSearchUrl(params));
    });
  });

  const passengerError = errors.infants?.message ?? errors.adults?.message ?? errors.children?.message;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Search flights" className="w-full">
      {/* Row 1: trip type, travellers, cabin */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div role="radiogroup" aria-label="Trip type" className="inline-flex rounded-xl bg-navy-50 p-1">
          {TRIP_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={tripType === t}
              onClick={() => changeTrip(t)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-semibold transition",
                tripType === t ? "bg-white text-brand-600 shadow-sm" : "text-navy-500 hover:text-navy-800",
              )}
            >
              {TRIP_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <PassengerPicker
            value={{ adults: values.adults, children: values.children, infants: values.infants }}
            onChange={(p) => {
              setValue("adults", p.adults, { shouldValidate: isSubmitted });
              setValue("children", p.children, { shouldValidate: isSubmitted });
              setValue("infants", p.infants, { shouldValidate: isSubmitted });
            }}
            error={passengerError}
          />
          <label className="inline-flex items-center">
            <span className="sr-only">Cabin class</span>
            <select
              {...register("cabin")}
              className="cursor-pointer rounded-lg bg-transparent py-2 pl-3 pr-2 text-sm font-semibold text-navy-800 hover:bg-navy-50"
            >
              {CABIN_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {CABIN_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {tripType !== "multi" ? (
        <div className="grid gap-3 lg:grid-cols-12">
          {/* From / To with swap */}
          <div className="relative grid gap-3 sm:grid-cols-2 lg:col-span-5">
            <Controller
              control={control}
              name="from"
              render={({ field }) => (
                <AirportAutocomplete
                  name="from"
                  label="From"
                  icon="from"
                  placeholder="City or airport"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.from?.message}
                />
              )}
            />
            <button
              type="button"
              onClick={swap}
              aria-label="Swap origin and destination"
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-600 shadow-sm transition hover:border-brand-500 hover:text-brand-600 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
            >
              <ArrowLeftRight className="h-4 w-4 rotate-90 sm:rotate-0" aria-hidden="true" />
            </button>
            <Controller
              control={control}
              name="to"
              render={({ field }) => (
                <AirportAutocomplete
                  name="to"
                  label="To"
                  icon="to"
                  placeholder="City or airport"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.to?.message}
                />
              )}
            />
          </div>

          {/* Dates */}
          <div className={cn("grid gap-3 lg:col-span-4", tripType === "round" ? "grid-cols-2" : "grid-cols-1")}>
            <DateField
              label="Departure"
              min={today}
              error={errors.departure?.message}
              reg={register("departure", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const ret = getValues("returnDate");
                  if (ret && e.target.value && ret < e.target.value) setValue("returnDate", e.target.value);
                },
              })}
            />
            {tripType === "round" && (
              <DateField
                label="Return"
                min={values.departure || today}
                error={errors.returnDate?.message}
                reg={register("returnDate")}
              />
            )}
          </div>

          <div className="lg:col-span-3">
            <Button type="submit" loading={isPending} className="h-full min-h-[64px] w-full text-base">
              {!isPending && <Search className="h-5 w-5" aria-hidden="true" />}
              Search flights
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((f, i) => {
            const legErrors = errors.legs?.[i];
            const prevDate = i > 0 ? values.legs?.[i - 1]?.date : undefined;
            return (
              <div key={f.id} className="grid items-start gap-3 lg:grid-cols-[1fr_1fr_14rem_auto]">
                <Controller
                  control={control}
                  name={`legs.${i}.from`}
                  render={({ field }) => (
                    <AirportAutocomplete
                      name={`leg${i}-from`}
                      label={`Flight ${i + 1} · From`}
                      icon="from"
                      value={field.value}
                      onChange={field.onChange}
                      error={legErrors?.from?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`legs.${i}.to`}
                  render={({ field }) => (
                    <AirportAutocomplete
                      name={`leg${i}-to`}
                      label={`Flight ${i + 1} · To`}
                      icon="to"
                      value={field.value}
                      onChange={field.onChange}
                      error={legErrors?.to?.message}
                    />
                  )}
                />
                <DateField
                  label="Date"
                  min={prevDate || today}
                  error={legErrors?.date?.message}
                  reg={register(`legs.${i}.date`)}
                />
                <div className="flex h-full min-h-[64px] items-center">
                  {fields.length > 2 ? (
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      aria-label={`Remove flight ${i + 1}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-400 transition hover:bg-danger-50 hover:text-danger-500"
                    >
                      <Trash2 className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <span className="h-10 w-10" aria-hidden="true" />
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            {fields.length < MAX_LEGS ? (
              <button
                type="button"
                onClick={() => {
                  const last = getValues("legs")[fields.length - 1];
                  append({ from: last?.to ?? "", to: "", date: "" });
                }}
                className="btn-secondary btn-sm self-start"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add another flight
              </button>
            ) : (
              <span className="text-sm text-navy-400">Maximum of {MAX_LEGS} flights</span>
            )}
            <Button type="submit" loading={isPending} className="min-h-[52px] px-8 text-base">
              {!isPending && <Search className="h-5 w-5" aria-hidden="true" />}
              Search flights
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
