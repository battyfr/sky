/**
 * Editorial destination data for the homepage.
 * Deliberately contains NO prices: SkyCompare only shows fares that come from a
 * provider response (live) or are labelled demo data on the results page.
 *
 * Photos are Unsplash hotlinks used as placeholders. Before launch, replace them
 * with images you have a licence for (and host them under /public/images).
 */

export interface Destination {
  code: string;
  city: string;
  country: string;
  blurb: string;
  image: string;
}

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const DESTINATIONS: Destination[] = [
  { code: "LHR", city: "London", country: "United Kingdom", blurb: "Royal parks, theatre and world-class museums.", image: photo("photo-1513635269975-59663e0ac1ad") },
  { code: "DXB", city: "Dubai", country: "United Arab Emirates", blurb: "Skyline views, desert escapes and big shopping.", image: photo("photo-1512453979798-5ea266f8880c") },
  { code: "SIN", city: "Singapore", country: "Singapore", blurb: "Garden city with legendary street food.", image: photo("photo-1525625293386-3f8f99389edd") },
  { code: "CDG", city: "Paris", country: "France", blurb: "Cafés, galleries and the Seine at golden hour.", image: photo("photo-1502602898657-3e91760cbb34") },
  { code: "JFK", city: "New York", country: "United States", blurb: "Broadway, Central Park and endless neighbourhoods.", image: photo("photo-1496442226666-8d4d0e62e6e9") },
  { code: "BKK", city: "Bangkok", country: "Thailand", blurb: "Temples, night markets and river life.", image: photo("photo-1508009603885-50cf7c579365") },
  { code: "NRT", city: "Tokyo", country: "Japan", blurb: "Neon districts beside quiet shrines.", image: photo("photo-1540959733332-eab4deabeeaf") },
  { code: "SYD", city: "Sydney", country: "Australia", blurb: "Harbour walks, beaches and coastal trails.", image: photo("photo-1506973035872-a4ec16b8e8d9") },
  { code: "DPS", city: "Bali", country: "Indonesia", blurb: "Rice terraces, surf breaks and beach clubs.", image: photo("photo-1537996194471-e657df975ab4") },
  { code: "YYZ", city: "Toronto", country: "Canada", blurb: "Lakeside city with a food scene from everywhere.", image: photo("photo-1517935706615-2717063c2225") },
  { code: "FCO", city: "Rome", country: "Italy", blurb: "Ancient ruins and long, slow lunches.", image: photo("photo-1552832230-c0197dd311b5") },
  { code: "IST", city: "Istanbul", country: "Türkiye", blurb: "Bazaars and ferries between two continents.", image: photo("photo-1524231757912-21f4fe3a7200") },
];

export const DESTINATION_BY_CODE = new Map(DESTINATIONS.map((d) => [d.code, d]));

/** Departure cities offered in the "Explore from…" tabs. */
export const EXPLORE_ORIGINS = ["DEL", "BOM", "BLR", "YYZ", "LHR", "JFK"] as const;

/** Curated (not price-ranked) destination ideas per departure city. */
export const ORIGIN_SUGGESTIONS: Record<string, string[]> = {
  DEL: ["LHR", "DXB", "SIN", "BKK", "JFK", "DPS"],
  BOM: ["DXB", "LHR", "SIN", "BKK", "CDG", "NRT"],
  BLR: ["SIN", "DXB", "LHR", "BKK", "SYD", "DPS"],
  YYZ: ["LHR", "JFK", "CDG", "FCO", "DXB", "NRT"],
  LHR: ["JFK", "DXB", "CDG", "FCO", "IST", "SIN"],
  JFK: ["LHR", "CDG", "FCO", "YYZ", "DXB", "NRT"],
};

/** Routes people commonly compare; shown without prices. */
export const POPULAR_ROUTES: ReadonlyArray<readonly [string, string]> = [
  ["DEL", "LHR"],
  ["BOM", "DXB"],
  ["BLR", "SIN"],
  ["DEL", "BKK"],
  ["YYZ", "LHR"],
  ["JFK", "LHR"],
  ["DEL", "JFK"],
  ["BOM", "LHR"],
];

/** Homepage link that pre-fills the search form (no dates are invented). */
export function searchPrefillHref(opts: { from?: string; to?: string }): string {
  const q = new URLSearchParams();
  if (opts.from) q.set("from", opts.from);
  if (opts.to) q.set("to", opts.to);
  const qs = q.toString();
  return `/${qs ? `?${qs}` : ""}#search`;
}
