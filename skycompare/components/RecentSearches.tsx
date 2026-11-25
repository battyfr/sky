"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { History, X } from "lucide-react";
import { cityLabel } from "@/lib/airports";
import { clearRecentSearches, loadRecentSearches, type RecentSearch } from "@/lib/recent-searches";
import { passengerSummary } from "@/lib/search-params";
import { formatDisplayDate } from "@/lib/utils";

function describe(s: RecentSearch) {
  const { params } = s;
  const route =
    params.tripType === "multi"
      ? [params.legs[0].origin, ...params.legs.map((l) => l.destination)].map(cityLabel).join(" → ")
      : `${cityLabel(params.legs[0].origin)} → ${cityLabel(params.legs[0].destination)}`;

  const first = params.legs[0].date;
  const dates =
    params.tripType === "round" && params.returnDate
      ? `${formatDisplayDate(first, false)} – ${formatDisplayDate(params.returnDate)}`
      : formatDisplayDate(first);

  return { route, meta: `${dates} · ${passengerSummary(params.passengers)}` };
}

/** Designed to sit on the dark hero background. Renders nothing until there is history. */
export function RecentSearches() {
  const [items, setItems] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setItems(loadRecentSearches());
  }, []);

  if (items.length === 0) return null;

  return (
    <section aria-label="Recent searches" className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white/90">
          <History className="h-4 w-4" aria-hidden="true" />
          Recent searches
        </h2>
        <button
          type="button"
          onClick={() => {
            clearRecentSearches();
            setItems([]);
          }}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>
      <ul className="flex gap-3 overflow-x-auto pb-1">
        {items.map((s) => {
          const d = describe(s);
          return (
            <li key={s.url} className="shrink-0">
              <Link
                href={s.url}
                className="block rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-white transition hover:bg-white/20"
              >
                <p className="text-sm font-semibold">{d.route}</p>
                <p className="text-xs text-white/70">{d.meta}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
