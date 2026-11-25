import { buildSearchUrl } from "@/lib/search-params";
import { flightSearchParamsSchema } from "@/lib/validations";
import type { FlightSearchParams } from "@/types/flight";

const KEY = "skycompare:recent-searches";
const MAX = 6;

export interface RecentSearch {
  url: string;
  params: FlightSearchParams;
  savedAt: number;
}

export function loadRecentSearches(): RecentSearch[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const list: unknown = JSON.parse(raw);
    if (!Array.isArray(list)) return [];

    const out: RecentSearch[] = [];
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const parsed = flightSearchParamsSchema.safeParse((item as { params?: unknown }).params);
      // Searches whose dates are now in the past fail validation and drop off.
      if (!parsed.success) continue;
      out.push({
        url: buildSearchUrl(parsed.data),
        params: parsed.data,
        savedAt: Number((item as { savedAt?: unknown }).savedAt) || 0,
      });
    }
    return out.slice(0, MAX);
  } catch {
    return [];
  }
}

export function saveRecentSearch(params: FlightSearchParams): void {
  try {
    const url = buildSearchUrl(params);
    const rest = loadRecentSearches().filter((s) => s.url !== url);
    const next = [{ url, params, savedAt: Date.now() }, ...rest].slice(0, MAX);
    window.localStorage.setItem(
      KEY,
      JSON.stringify(next.map(({ params: p, savedAt }) => ({ params: p, savedAt }))),
    );
  } catch {
    /* storage unavailable (private mode, quota) – recent searches are optional */
  }
}

export function clearRecentSearches(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
