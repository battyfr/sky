"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Plane, X } from "lucide-react";
import { CURRENCIES, isCurrencyCode } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/flights", label: "Flights" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="SkyCompare home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
        <Plane className="h-5 w-5 -rotate-45" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-navy-900",
        )}
      >
        Sky<span className={light ? "text-brand-200" : "text-brand-500"}>Compare</span>
      </span>
    </Link>
  );
}

function CurrencySelect({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Display currency</span>
      <select
        value={currency}
        onChange={(e) => {
          if (isCurrencyCode(e.target.value)) setCurrency(e.target.value);
        }}
        className="cursor-pointer rounded-lg border border-navy-200 bg-white py-2 pl-3 pr-8 text-sm font-semibold text-navy-800 hover:border-navy-300"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/90 backdrop-blur">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-1 md:flex">
            <li>
              <Link
                href="/flights"
                aria-current={isActive("/flights") ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-navy-50",
                  isActive("/flights") ? "text-brand-600" : "text-navy-700",
                )}
              >
                Flights
              </Link>
            </li>
            <li>
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy-300"
              >
                Hotels
                <span className="badge bg-navy-100 text-[10px] uppercase tracking-wide text-navy-500">
                  Coming soon
                </span>
              </span>
            </li>
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-navy-50",
                    isActive(l.href) ? "text-brand-600" : "text-navy-700",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <CurrencySelect />
          <Link href="/login" className="btn-ghost btn-sm">
            Sign in
          </Link>
          <Link href="/register" className="btn-primary btn-sm">
            Create account
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy-800 hover:bg-navy-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-white md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            <li>
              <Link href="/flights" className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-navy-800 hover:bg-navy-50">
                Flights
              </Link>
            </li>
            <li>
              <span
                aria-disabled="true"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-[15px] font-semibold text-navy-300"
              >
                Hotels
                <span className="badge bg-navy-100 text-[10px] uppercase tracking-wide text-navy-500">
                  Coming soon
                </span>
              </span>
            </li>
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-navy-800 hover:bg-navy-50">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-3 border-t border-navy-100 pt-4">
              <CurrencySelect />
              <div className="flex gap-2">
                <Link href="/login" className="btn-secondary btn-sm">
                  Sign in
                </Link>
                <Link href="/register" className="btn-primary btn-sm">
                  Create account
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
