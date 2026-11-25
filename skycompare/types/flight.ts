/**
 * Shared flight domain types.
 * Every provider adapter normalizes its raw response into these shapes
 * so the frontend never needs to know which API a result came from.
 */

export const CABIN_CLASSES = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"] as const;
export type CabinClass = (typeof CABIN_CLASSES)[number];

export const CABIN_LABELS: Record<CabinClass, string> = {
  ECONOMY: "Economy",
  PREMIUM_ECONOMY: "Premium Economy",
  BUSINESS: "Business",
  FIRST: "First Class",
};

export const TRIP_TYPES = ["round", "oneway", "multi"] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  round: "Round trip",
  oneway: "One way",
  multi: "Multi-city",
};

export interface Airport {
  /** IATA code, e.g. "DEL" */
  code: string;
  name: string;
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2 */
  countryCode: string;
  /** Alternative names people type, e.g. "Bombay" */
  aliases?: string[];
}

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchLeg {
  origin: string;
  destination: string;
  /** YYYY-MM-DD */
  date: string;
}

/**
 * Normalized search request.
 * - one way / round trip: `legs` has exactly one leg; round trip also sets `returnDate`
 * - multi-city: `legs` has 2–5 legs
 */
export interface FlightSearchParams {
  tripType: TripType;
  legs: SearchLeg[];
  returnDate?: string;
  passengers: Passengers;
  cabin: CabinClass;
}

/** Amount in the currency the provider originally quoted (never silently converted). */
export interface Money {
  amount: number;
  /** ISO 4217 */
  currency: string;
}

/** "live" = returned by an authorized provider API; "demo" = sample data. */
export type DataSource = "live" | "demo";

export interface FlightSegment {
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  /** ISO 8601 local date-time at origin, no offset, e.g. 2027-01-15T02:15:00 */
  departureTime: string;
  /** ISO 8601 local date-time at destination */
  arrivalTime: string;
  durationMinutes: number;
  aircraft?: string;
}

export interface FareConditions {
  cabinBaggage?: string;
  checkedBaggage?: string;
  /** undefined = provider did not say; never assume */
  changeable?: boolean | "fee";
  refundable?: boolean | "fee";
  seatSelection?: boolean | "fee";
}

export interface ProviderFare {
  /** Provider id, e.g. "amadeus", "duffel", "demo" */
  providerId: string;
  /** Booking channel shown to the user, e.g. "Airline website" */
  channelName: string;
  /** null when the provider could not return a price */
  price: Money | null;
  bookingUrl?: string;
  conditions: FareConditions;
  source: DataSource;
  /** ISO timestamp of when this price was retrieved */
  fetchedAt: string;
  available: boolean;
  unavailableReason?: string;
}

export interface FlightOffer {
  /** Stable identifier for the itinerary (used in /flight/[id] and saved flights) */
  id: string;
  /** Hash of segments + cabin; used for duplicate detection and fare grouping */
  itineraryKey: string;
  segments: FlightSegment[];
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  totalDurationMinutes: number;
  stops: number;
  stopoverAirports: string[];
  cabin: CabinClass;
  /** One entry per booking channel that sells this exact itinerary */
  fares: ProviderFare[];
}

export interface FlightSearchResponse {
  offers: FlightOffer[];
  source: DataSource;
  /** Providers that failed or timed out, so the UI can say so honestly */
  providerErrors: { providerId: string; message: string }[];
  searchedAt: string;
}
