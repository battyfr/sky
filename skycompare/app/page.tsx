import { FlightSearchForm } from "@/components/FlightSearchForm";
import { RecentSearches } from "@/components/RecentSearches";
import { DestinationCard } from "@/components/DestinationCard";
import { HeroHeading } from "@/components/home/HeroHeading";
import { RouteExplorer } from "@/components/home/RouteExplorer";
import { TrendingRoutes } from "@/components/home/TrendingRoutes";
import { WhySkyCompare } from "@/components/home/WhySkyCompare";
import { HowItWorks } from "@/components/home/HowItWorks";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { getAirport } from "@/lib/airports";
import { DESTINATIONS, searchPrefillHref } from "@/lib/destinations";

type SearchParams = Record<string, string | string[] | undefined>;

/** Accept ?from=DEL&to=LHR only when they are real, known airport codes. */
function knownCode(v: string | string[] | undefined): string {
  const s = (Array.isArray(v) ? v[0] : v)?.trim().toUpperCase();
  return s && /^[A-Z]{3}$/.test(s) && getAirport(s) ? s : "";
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const initialFrom = knownCode(sp.from);
  const initialTo = knownCode(sp.to);

  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate"
        style={{
          background:
            "radial-gradient(60rem 30rem at 85% -10%, rgba(7,112,227,0.55), transparent 60%), radial-gradient(40rem 24rem at 0% 100%, rgba(58,136,234,0.28), transparent 60%), #0b1f44",
        }}
      >
        <div className="container-page pb-16 pt-14 sm:pt-20 lg:pb-24">
          <HeroHeading />

          <div id="search" className="mt-10 scroll-mt-24 rounded-xl2 bg-white p-4 shadow-pop sm:p-6">
            <FlightSearchForm
              key={`${initialFrom}-${initialTo}`}
              initialFrom={initialFrom}
              initialTo={initialTo}
            />
          </div>

          <RecentSearches />
        </div>
      </section>

      {/* Popular destinations */}
      <section className="container-page mt-16 sm:mt-20" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="section-title">
          Popular destinations
        </h2>
        <p className="section-sub">Pick a destination to start a search with it pre-filled.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {DESTINATIONS.slice(0, 8).map((d) => (
            <DestinationCard key={d.code} destination={d} href={searchPrefillHref({ to: d.code })} />
          ))}
        </div>
      </section>

      {/* Explore from a chosen city */}
      <section className="container-page mt-20" aria-labelledby="explore-heading">
        <h2 id="explore-heading" className="section-title">
          Where to fly from your city
        </h2>
        <p className="section-sub">Choose a departure city for destination ideas.</p>
        <div className="mt-6">
          <RouteExplorer />
        </div>
      </section>

      {/* Popular routes */}
      <section className="container-page mt-20" aria-labelledby="routes-heading">
        <h2 id="routes-heading" className="section-title">
          Popular routes to compare
        </h2>
        <p className="section-sub">
          Routes travellers often compare. Fares appear on the results page, labelled live or demo.
        </p>
        <div className="mt-6">
          <TrendingRoutes />
        </div>
      </section>

      {/* Why SkyCompare */}
      <section className="container-page mt-20" aria-labelledby="why-heading">
        <h2 id="why-heading" className="section-title">
          Why use SkyCompare?
        </h2>
        <p className="section-sub">Built to make comparing flights quicker and more transparent.</p>
        <div className="mt-8">
          <WhySkyCompare />
        </div>
      </section>

      {/* How it works */}
      <section className="mt-20 bg-navy-50 py-16" aria-labelledby="how-heading">
        <div className="container-page">
          <h2 id="how-heading" className="section-title">
            How flight comparison works
          </h2>
          <div className="mt-8">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page mt-20" aria-labelledby="newsletter-heading">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-900 p-8 text-white sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-lg">
            <h2 id="newsletter-heading" className="font-display text-2xl font-bold sm:text-3xl">
              Get flight tips in your inbox
            </h2>
            <p className="mt-2 text-sm text-navy-200">
              Occasional emails about booking smarter. Unsubscribe any time.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
