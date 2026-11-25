import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Info } from "lucide-react";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { cityLabel } from "@/lib/airports";
import { parseSearchParams, passengerSummary } from "@/lib/search-params";
import { formatDisplayDate } from "@/lib/utils";
import { CABIN_LABELS, TRIP_TYPE_LABELS } from "@/types/flight";

export const metadata: Metadata = {
  title: "Flight search",
  robots: { index: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Phase 3 placeholder: validates the URL produced by the search form and shows what
 * was parsed. Phase 4 replaces the "summary" block with real results, filters and
 * provider comparison; the parsing/validation here stays exactly the same.
 */
export default async function FlightsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const parsed = parseSearchParams(await searchParams);

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Flight search</h1>

      {!parsed.success ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-danger-500/30 bg-danger-50 p-4 text-danger-700">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">We couldn’t read that search</p>
            <p className="text-sm">{parsed.error} Please check your details and search again.</p>
          </div>
        </div>
      ) : (
        <div className="card mt-6 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-navy-400">
            {TRIP_TYPE_LABELS[parsed.data.tripType]} · {CABIN_LABELS[parsed.data.cabin]} ·{" "}
            {passengerSummary(parsed.data.passengers)}
          </p>
          <ul className="mt-4 space-y-3">
            {parsed.data.legs.map((l, i) => (
              <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold">
                <span>{cityLabel(l.origin)}</span>
                <span className="text-navy-300">({l.origin})</span>
                <ArrowRight className="h-5 w-5 text-brand-500" aria-hidden="true" />
                <span>{cityLabel(l.destination)}</span>
                <span className="text-navy-300">({l.destination})</span>
                <span className="text-base font-medium text-navy-500">· {formatDisplayDate(l.date)}</span>
              </li>
            ))}
            {parsed.data.returnDate && (
              <li className="text-base font-medium text-navy-500">
                Return: {formatDisplayDate(parsed.data.returnDate)}
              </li>
            )}
          </ul>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-sm text-brand-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              Your search was valid and the URL works. Flight results, filters and provider comparison are
              built in the next phase.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-4 font-display text-xl font-bold">Modify search</h2>
        <div className="rounded-xl2 bg-white p-4 shadow-card sm:p-6">
          <FlightSearchForm />
        </div>
        <p className="mt-4 text-sm text-navy-400">
          <Link href="/" className="font-semibold text-brand-600 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
