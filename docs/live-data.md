# Live Data Plan

This project should move to live data in thin, testable steps. Keep the UI consuming normalized domain records while source adapters handle provider-specific APIs and files.

## Environment variables

Use `.env.local` for local development and encrypted project environment variables in deployment.

```bash
ALPACA_API_KEY=
ALPACA_SECRET_KEY=
ALPACA_BASE_URL=https://paper-api.alpaca.markets
ROBINHOOD_ACCOUNT_SYNC_ENABLED=false
ROBINHOOD_CLIENT_ID=
ROBINHOOD_CLIENT_SECRET=
DATABASE_URL=
```

Do not initialize SDK clients at module scope. Use lazy getter functions so builds do not fail when runtime secrets are unavailable.

## Alpaca

Initial live scope:

1. Fetch account activities for fills, dividends, interest, and fees.
2. Store raw activity payloads with Alpaca activity IDs for idempotency.
3. Map fills into `AlpacaTrade` rows.
4. Map dividends, interest, and realized gains into `IncomeEvent` rows.
5. Reconcile monthly totals against Alpaca statements before relying on reports.

Suggested tables:

```sql
create table income_sources (
  id text primary key,
  name text not null,
  type text not null,
  status text not null
);

create table raw_source_records (
  id text primary key,
  source_id text not null references income_sources(id),
  source_record_id text not null,
  payload jsonb not null,
  observed_at timestamptz not null default now(),
  unique (source_id, source_record_id)
);

create table income_events (
  id text primary key,
  source_id text not null references income_sources(id),
  kind text not null,
  occurred_at timestamptz not null,
  amount numeric(14, 2) not null,
  currency text not null default 'USD',
  memo text not null,
  raw_record_id text references raw_source_records(id)
);

create table alpaca_trades (
  id text primary key,
  order_id text not null,
  symbol text not null,
  side text not null,
  quantity numeric(18, 6) not null,
  price numeric(14, 4) not null,
  filled_at timestamptz not null,
  realized_pnl numeric(14, 2) not null default 0,
  fees numeric(14, 2) not null default 0,
  strategy text not null default 'unclassified',
  raw_record_id text references raw_source_records(id)
);
```

## Robinhood

The current Robinhood dashboard uses verified account snapshots in `src/lib/sample-data.ts`.
These values are the source of truth until a server-side live pull is enabled.

Current verified account value total: `$257,785.84`.

Future live pull path:

1. Keep the UI consuming `RobinhoodAccountSnapshot` records from `src/lib/domain.ts`.
2. Add a server-only Robinhood adapter behind `getRobinhoodAccountSnapshots()`.
3. Read encrypted credentials or OAuth tokens lazily at request or sync time.
4. Fetch account profile and balance payloads for every linked Robinhood account.
5. Persist raw payloads in `raw_source_records` with account ID and observed timestamp.
6. Normalize account name, type, masked number, account value, cash, buying power, and equity value.
7. Reconcile the summed account value against Robinhood statements before formal reporting.

Robinhood should also be treated as an import source for income activity unless a stable
authorized API is chosen. The practical income path is CSV or statement import:

1. Add an upload/import route for Robinhood CSV exports.
2. Preserve raw rows in `raw_source_records`.
3. Normalize dividends, interest, deposits, withdrawals, and realized gains into `IncomeEvent`.
4. Add duplicate detection using source row hash, account, date, amount, and symbol.

## Company income

Company streams should use the same `IncomeEvent` table with extra metadata later.

Good first sources:

- Manual CSV import for invoices, payouts, owner distributions, and recurring revenue.
- Stripe or payment processor sync if that becomes the system of record.
- Accounting export from QuickBooks, Xero, or a spreadsheet if reconciliation matters more than real-time updates.

## Shipping sequence

1. Replace seed Alpaca data with a read-only Alpaca sync command.
2. Add Postgres persistence and keep source adapters idempotent.
3. Add filters for date range, source, symbol, and income type.
4. Add Robinhood CSV import.
5. Add company income import.
6. Add reconciliation views for monthly statement totals.
