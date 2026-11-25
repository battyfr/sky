import Link from "next/link";
import { Logo } from "@/components/Navbar";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/flights", label: "Flights" },
      { href: "/explore", label: "Explore destinations" },
      { href: "/alerts", label: "Price alerts" },
      { href: "/saved", label: "Saved flights" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About SkyCompare" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Create account" },
      { href: "/profile", label: "Profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-200">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-300">
            Compare flights from multiple airlines and booking platforms in one place. SkyCompare
            helps you find a deal; you complete your booking with the provider you choose.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-navy-200 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SkyCompare. All rights reserved.</p>
          <p>Fares and availability are set by providers and can change at any time.</p>
        </div>
      </div>
    </footer>
  );
}
