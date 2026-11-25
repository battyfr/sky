import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { POPULAR_ROUTES, searchPrefillHref } from "@/lib/destinations";
import { cityLabel } from "@/lib/airports";

export function TrendingRoutes() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {POPULAR_ROUTES.map(([from, to]) => (
        <li key={`${from}-${to}`}>
          <Link
            href={searchPrefillHref({ from, to })}
            className="card group flex items-center justify-between gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-pop"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                <Plane className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-navy-900">
                  {cityLabel(from)} → {cityLabel(to)}
                </p>
                <p className="text-xs font-medium text-navy-400">
                  {from} – {to}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
              Compare
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
