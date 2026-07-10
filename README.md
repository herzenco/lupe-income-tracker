# Income Dashboard

Practical scaffold for a personal income dashboard. The first slice reports Alpaca trade records and realized P&L from seed data. The data model is intentionally source-agnostic so Robinhood income data and company income streams can be added later without rebuilding the UI.

## Stack recommendation

- **Next.js App Router + TypeScript**: fast dashboard scaffolding, server-rendered pages, simple API routes, and a clean path to deploy on Vercel.
- **Plain CSS for now**: no component-library setup until the workflows settle. Add shadcn/ui later when forms, filters, and settings grow.
- **Typed source adapters**: each provider maps raw records into normalized `IncomeEvent` records and provider-specific reporting tables.
- **Future persistence**: start with Postgres when live sync begins. Supabase is the pragmatic default because it gives Postgres, Auth, scheduled Edge Functions, and row-level security in one place.

## Architecture

```text
src/app                  App Router pages and API routes
src/components           Reusable dashboard UI
src/lib/domain.ts        Shared income, source, and trade types
src/lib/data-sources.ts  Adapter boundary for Alpaca, Robinhood, and company streams
src/lib/reporting.ts     Summary and reporting calculations
src/lib/sample-data.ts   Replaceable seed records
docs/live-data.md        Live integration plan
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful routes:

- `/` income overview
- `/alpaca` Alpaca trade history and reporting
- `/sources` source roadmap and live-data checklist
- `/api/reports/alpaca` JSON report endpoint

## Current status

- Uses seed Alpaca trades and dividend placeholder events.
- Shows normalized income overview, Alpaca reporting, source inventory, and a JSON report endpoint.
- Documents live ingestion steps for Alpaca, Robinhood, and company income.
