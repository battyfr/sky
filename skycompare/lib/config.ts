/**
 * Server-side runtime configuration.
 * Never import this from a client component (it reads secret env vars).
 */

export function hasLiveProviders(): boolean {
  return Boolean(
    (process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET) ||
      process.env.DUFFEL_ACCESS_TOKEN ||
      process.env.TRAVELPAYOUTS_TOKEN,
  );
}

/** Demo mode = no provider credentials configured. */
export function isDemoMode(): boolean {
  return !hasLiveProviders();
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export const DEMO_BANNER_TEXT =
  "DEMO MODE – Prices shown are sample data and are not live booking offers.";
