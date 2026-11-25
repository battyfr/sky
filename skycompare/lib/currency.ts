export const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee", locale: "en-IN" },
  { code: "USD", symbol: "$", label: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", label: "Euro", locale: "en-IE" },
  { code: "GBP", symbol: "£", label: "British Pound", locale: "en-GB" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar", locale: "en-CA" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCIES.some((c) => c.code === value);
}

/**
 * Format an amount in a given currency. This only formats; it never converts.
 * Conversion (added with the results page) always keeps the provider's original
 * amount and labels any converted figure as an estimate.
 */
export function formatMoney(amount: number, currency: string): string {
  const known = CURRENCIES.find((c) => c.code === currency);
  try {
    return new Intl.NumberFormat(known?.locale ?? "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}
