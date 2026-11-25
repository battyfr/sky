import type { FlightOffer, FlightSearchParams, ProviderFare } from "@/types/flight";

export interface ProviderContext {
  /** Aborts the request on timeout or navigation */
  signal?: AbortSignal;
  /** Currency the caller would like quotes in (providers may ignore it) */
  preferredCurrency?: string;
}

export interface ProviderSearchResult {
  offers: FlightOffer[];
  /** Non-fatal warnings (e.g. partial inventory) */
  warnings?: string[];
}

/**
 * Contract every flight data provider implements.
 * Adapters must only call APIs / affiliate programs the operator is authorized to use.
 */
export interface FlightProvider {
  readonly id: string;
  readonly name: string;
  readonly kind: "live" | "demo";

  /** True when the credentials this adapter needs are present. */
  isConfigured(): boolean;

  searchFlights(params: FlightSearchParams, ctx?: ProviderContext): Promise<ProviderSearchResult>;

  /** Re-price / fetch fare rules for one offer. Returns null if the provider cannot. */
  getFareDetails(offer: FlightOffer, ctx?: ProviderContext): Promise<ProviderFare | null>;

  /** Deep link to book this fare, or null if the provider offers none. */
  getBookingUrl(offer: FlightOffer, fare: ProviderFare): Promise<string | null>;

  /** Convert the provider's raw payload into the shared FlightOffer shape. */
  normalize(raw: unknown, params: FlightSearchParams): FlightOffer[];
}
