# SkyCompare

Flight comparison and booking-discovery platform (Next.js, TypeScript, Tailwind, Prisma/PostgreSQL).

**Status:** Phases 1–3 complete (project setup, homepage + navigation, search form + airport autocomplete).
The `/flights` page validates and displays the search; results, filters and provider comparison arrive in Phases 4–6.

## Run it

```bash
cd skycompare
npm install            # also runs `prisma generate`
cp .env.example .env   # leave provider keys empty => demo mode
npm run dev            # http://localhost:3000
```

The database is optional until Phase 8 (the newsletter form saves emails only when `DATABASE_URL` is set).
To start PostgreSQL locally and create the tables:

```bash
docker run --name skycompare-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=skycompare -p 5432:5432 -d postgres:16
npx prisma migrate dev --name init
```

## Checks

```bash
npm run typecheck
npm run build
```

## Structure

```
app/            routes (page.tsx, flights/, api/newsletter/)
components/     UI (Navbar, Footer, FlightSearchForm, AirportAutocomplete, PassengerPicker, ...)
components/ui/  design-system primitives (Button, Toast)
components/home homepage sections
lib/            airports, validations, search-params, currency, config, rate-limit, prisma
types/          flight.ts, provider.ts (shared contracts for all providers)
prisma/         schema.prisma
```

## Notes

- Destination photos are Unsplash hotlinks used as placeholders; replace with licensed images before launch.
- Airport autocomplete uses a curated list in `lib/airports.ts`; any valid IATA code in a URL is still accepted.
- No prices appear anywhere yet. Fares will only be shown when they come from a provider response, and demo fares will always be labelled.
