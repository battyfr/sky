"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Destination } from "@/lib/destinations";

interface Props {
  destination: Destination;
  href: string;
  /** Small line above the title, e.g. "From Delhi" */
  eyebrow?: string;
}

export function DestinationCard({ destination, href, eyebrow }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-700 to-brand-500 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-pop"
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-brand-200">{eyebrow}</p>}
        <h3 className="font-display text-xl font-bold">{destination.city}</h3>
        <p className="text-sm text-white/80">{destination.country}</p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-white/75">{destination.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
          Compare flights
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
