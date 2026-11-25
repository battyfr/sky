"use client";

import { useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import {
  DESTINATION_BY_CODE,
  EXPLORE_ORIGINS,
  ORIGIN_SUGGESTIONS,
  searchPrefillHref,
} from "@/lib/destinations";
import { cityLabel } from "@/lib/airports";
import { cn } from "@/lib/utils";

/**
 * "Explore from…" – pick a departure city and see destination ideas.
 * These are editorial suggestions, not price rankings: SkyCompare does not show
 * a "cheapest" claim without provider data behind it.
 */
export function RouteExplorer() {
  const [origin, setOrigin] = useState<string>(EXPLORE_ORIGINS[0]);

  const cards = (ORIGIN_SUGGESTIONS[origin] ?? [])
    .map((code) => DESTINATION_BY_CODE.get(code))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <div>
      <div role="tablist" aria-label="Departure city" className="flex flex-wrap gap-2">
        {EXPLORE_ORIGINS.map((code) => (
          <button
            key={code}
            type="button"
            role="tab"
            id={`origin-tab-${code}`}
            aria-selected={origin === code}
            aria-controls="origin-panel"
            onClick={() => setOrigin(code)}
            className={cn("chip", origin === code && "chip-active")}
          >
            {cityLabel(code)}
          </button>
        ))}
      </div>

      <div
        id="origin-panel"
        role="tabpanel"
        aria-labelledby={`origin-tab-${origin}`}
        className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
      >
        {cards.map((d) => (
          <DestinationCard
            key={d.code}
            destination={d}
            eyebrow={`From ${cityLabel(origin)}`}
            href={searchPrefillHref({ from: origin, to: d.code })}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-navy-400">
        Fares are shown on the results page once you choose dates, never on these cards.
      </p>
    </div>
  );
}
