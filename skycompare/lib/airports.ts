import type { Airport } from "@/types/flight";

/**
 * Curated starter airport list (static, so it is effectively cached for the whole
 * process). Search accepts any IATA code in the URL, but autocomplete only suggests
 * airports listed here. Phase 7 can extend this with provider location lookups
 * (e.g. Amadeus Airport & City Search) behind the same searchAirports() signature.
 */
export const AIRPORTS: Airport[] = [
  // India
  { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India", countryCode: "IN", aliases: ["New Delhi"] },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", countryCode: "IN", aliases: ["Bombay"] },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bengaluru", country: "India", countryCode: "IN", aliases: ["Bangalore"] },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India", countryCode: "IN", aliases: ["Madras"] },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India", countryCode: "IN" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", country: "India", countryCode: "IN", aliases: ["Calcutta"] },
  { code: "COK", name: "Cochin International Airport", city: "Kochi", country: "India", countryCode: "IN", aliases: ["Cochin"] },
  { code: "GOI", name: "Dabolim Airport", city: "Goa", country: "India", countryCode: "IN" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India", countryCode: "IN" },
  { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India", countryCode: "IN" },
  { code: "JAI", name: "Jaipur International Airport", city: "Jaipur", country: "India", countryCode: "IN" },
  { code: "TRV", name: "Trivandrum International Airport", city: "Thiruvananthapuram", country: "India", countryCode: "IN", aliases: ["Trivandrum"] },
  { code: "LKO", name: "Chaudhary Charan Singh International Airport", city: "Lucknow", country: "India", countryCode: "IN" },

  // United Kingdom & Ireland
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "LGW", name: "Gatwick Airport", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "STN", name: "Stansted Airport", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "MAN", name: "Manchester Airport", city: "Manchester", country: "United Kingdom", countryCode: "GB" },
  { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "United Kingdom", countryCode: "GB" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", countryCode: "IE" },

  // Europe
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", countryCode: "FR" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", countryCode: "NL" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", countryCode: "DE" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", countryCode: "DE" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", countryCode: "CH" },
  { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria", countryCode: "AT" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", countryCode: "DK" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden", countryCode: "SE" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy", countryCode: "IT" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain", countryCode: "ES" },
  { code: "BCN", name: "Josep Tarradellas Barcelona–El Prat Airport", city: "Barcelona", country: "Spain", countryCode: "ES" },
  { code: "LIS", name: "Humberto Delgado Airport", city: "Lisbon", country: "Portugal", countryCode: "PT" },
  { code: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece", countryCode: "GR" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Türkiye", countryCode: "TR", aliases: ["Turkey"] },

  // Middle East & Africa
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates", countryCode: "AE", aliases: ["UAE"] },
  { code: "AUH", name: "Zayed International Airport", city: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", aliases: ["UAE"] },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", countryCode: "QA" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", countryCode: "EG" },
  { code: "JNB", name: "O. R. Tambo International Airport", city: "Johannesburg", country: "South Africa", countryCode: "ZA" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", countryCode: "KE" },

  // Asia-Pacific
  { code: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore", countryCode: "SG" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", countryCode: "TH" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", countryCode: "MY" },
  { code: "CGK", name: "Soekarno–Hatta International Airport", city: "Jakarta", country: "Indonesia", countryCode: "ID" },
  { code: "DPS", name: "Ngurah Rai International Airport", city: "Denpasar", country: "Indonesia", countryCode: "ID", aliases: ["Bali"] },
  { code: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines", countryCode: "PH" },
  { code: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam", countryCode: "VN", aliases: ["Saigon"] },
  { code: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam", countryCode: "VN" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong SAR", countryCode: "HK" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", countryCode: "CN" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", countryCode: "CN" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", countryCode: "JP" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan", countryCode: "JP" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", countryCode: "KR" },
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", countryCode: "AU" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", countryCode: "AU" },
  { code: "CMB", name: "Bandaranaike International Airport", city: "Colombo", country: "Sri Lanka", countryCode: "LK" },
  { code: "KTM", name: "Tribhuvan International Airport", city: "Kathmandu", country: "Nepal", countryCode: "NP" },
  { code: "DAC", name: "Hazrat Shahjalal International Airport", city: "Dhaka", country: "Bangladesh", countryCode: "BD" },
  { code: "MLE", name: "Velana International Airport", city: "Malé", country: "Maldives", countryCode: "MV", aliases: ["Male", "Maldives"] },

  // North & South America
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States", countryCode: "US", aliases: ["NYC"] },
  { code: "EWR", name: "Newark Liberty International Airport", city: "Newark", country: "United States", countryCode: "US", aliases: ["New York", "NYC"] },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States", countryCode: "US" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States", countryCode: "US" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States", countryCode: "US" },
  { code: "ATL", name: "Hartsfield–Jackson Atlanta International Airport", city: "Atlanta", country: "United States", countryCode: "US" },
  { code: "DFW", name: "Dallas Fort Worth International Airport", city: "Dallas", country: "United States", countryCode: "US" },
  { code: "IAH", name: "George Bush Intercontinental Airport", city: "Houston", country: "United States", countryCode: "US" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "United States", countryCode: "US" },
  { code: "BOS", name: "Logan International Airport", city: "Boston", country: "United States", countryCode: "US" },
  { code: "SEA", name: "Seattle–Tacoma International Airport", city: "Seattle", country: "United States", countryCode: "US" },
  { code: "LAS", name: "Harry Reid International Airport", city: "Las Vegas", country: "United States", countryCode: "US" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", countryCode: "CA" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", countryCode: "CA" },
  { code: "YUL", name: "Montréal–Trudeau International Airport", city: "Montreal", country: "Canada", countryCode: "CA", aliases: ["Montréal"] },
  { code: "YYC", name: "Calgary International Airport", city: "Calgary", country: "Canada", countryCode: "CA" },
  { code: "YEG", name: "Edmonton International Airport", city: "Edmonton", country: "Canada", countryCode: "CA" },
  { code: "YOW", name: "Ottawa Macdonald–Cartier International Airport", city: "Ottawa", country: "Canada", countryCode: "CA" },
  { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico", countryCode: "MX" },
  { code: "GRU", name: "São Paulo/Guarulhos International Airport", city: "São Paulo", country: "Brazil", countryCode: "BR", aliases: ["Sao Paulo"] },
];

/** Shown when the autocomplete input is empty. Also used as a ranking tiebreaker. */
export const POPULAR_AIRPORT_CODES = [
  "DEL", "BOM", "BLR", "LHR", "DXB", "SIN", "JFK", "YYZ", "BKK", "CDG", "HYD", "MAA",
];

const BY_CODE = new Map(AIRPORTS.map((a) => [a.code, a]));

export function getAirport(code: string): Airport | undefined {
  return BY_CODE.get(code.toUpperCase());
}

/** "Delhi (DEL)" – what we show inside the input once an airport is chosen. */
export function formatAirportInput(a: Airport): string {
  return `${a.city} (${a.code})`;
}

/** "Delhi" for known codes, otherwise the raw code. */
export function cityLabel(code: string): string {
  return getAirport(code)?.city ?? code;
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

interface IndexEntry {
  airport: Airport;
  code: string;
  city: string;
  name: string;
  country: string;
  aliases: string[];
  haystack: string;
  popularity: number;
}

const INDEX: IndexEntry[] = AIRPORTS.map((airport) => {
  const city = normalize(airport.city);
  const name = normalize(airport.name);
  const country = normalize(airport.country);
  const aliases = (airport.aliases ?? []).map(normalize);
  const code = airport.code.toLowerCase();
  const popIdx = POPULAR_AIRPORT_CODES.indexOf(airport.code);
  return {
    airport,
    code,
    city,
    name,
    country,
    aliases,
    haystack: [code, city, name, country, ...aliases].join(" "),
    popularity: popIdx === -1 ? 0 : 1 + (POPULAR_AIRPORT_CODES.length - popIdx) / 100,
  };
});

function score(e: IndexEntry, q: string, tokens: string[]): number {
  if (q.length === 3 && e.code === q) return 100;
  if (e.city === q || e.aliases.includes(q)) return 95;
  if (e.city.startsWith(q)) return 85;
  if (e.aliases.some((a) => a.startsWith(q))) return 82;
  if (q.length >= 2 && e.code.startsWith(q)) return 75;
  if (e.city.split(" ").some((w) => w.startsWith(q))) return 70;
  if (e.name.includes(q)) return 55;
  if (e.city.includes(q)) return 52;
  if (e.country.startsWith(q)) return 40;
  if (e.country.includes(q)) return 20;
  if (tokens.length > 1 && tokens.every((t) => e.haystack.includes(t))) return 30;
  return 0;
}

/** Rank airports for a typed query. An empty query returns the popular list. */
export function searchAirports(query: string, limit = 8): Airport[] {
  const q = normalize(query);
  if (!q) {
    return POPULAR_AIRPORT_CODES.slice(0, limit)
      .map((c) => BY_CODE.get(c))
      .filter((a): a is Airport => Boolean(a));
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  return INDEX.map((e) => {
    const base = score(e, q, tokens);
    return { e, base, s: base + e.popularity };
  })
    .filter((r) => r.base > 0)
    .sort((a, b) => b.s - a.s || a.e.city.localeCompare(b.e.city) || a.e.code.localeCompare(b.e.code))
    .slice(0, limit)
    .map((r) => r.e.airport);
}
