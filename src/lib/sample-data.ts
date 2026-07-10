import type { AlpacaTrade, IncomeEvent, IncomeSource } from "./domain";

export const incomeSources: IncomeSource[] = [
  {
    id: "alpaca",
    name: "Alpaca",
    type: "brokerage",
    status: "live",
    description: "Initial brokerage trade record and realized P&L reporting.",
  },
  {
    id: "robinhood",
    name: "Robinhood",
    type: "brokerage",
    status: "planned",
    description: "Future import path for dividends, interest, and realized gains.",
  },
  {
    id: "company",
    name: "Company streams",
    type: "company",
    status: "planned",
    description: "Future operating revenue, owner distributions, and recurring income.",
  },
];

export const alpacaTrades: AlpacaTrade[] = [
  {
    id: "alpaca-fill-001",
    orderId: "ord-8c91",
    symbol: "AAPL",
    side: "sell",
    quantity: 12,
    price: 221.38,
    filledAt: "2026-06-03T14:22:11.000Z",
    realizedPnl: 184.92,
    fees: 0.18,
    strategy: "covered-call-management",
  },
  {
    id: "alpaca-fill-002",
    orderId: "ord-8d02",
    symbol: "MSFT",
    side: "sell",
    quantity: 6,
    price: 506.14,
    filledAt: "2026-06-06T16:10:40.000Z",
    realizedPnl: 91.5,
    fees: 0.12,
    strategy: "swing-income",
  },
  {
    id: "alpaca-fill-003",
    orderId: "ord-8f77",
    symbol: "TSLA",
    side: "sell",
    quantity: 5,
    price: 311.62,
    filledAt: "2026-06-12T15:44:22.000Z",
    realizedPnl: -42.35,
    fees: 0.08,
    strategy: "risk-rebalance",
  },
  {
    id: "alpaca-fill-004",
    orderId: "ord-9012",
    symbol: "SCHD",
    side: "buy",
    quantity: 20,
    price: 82.4,
    filledAt: "2026-06-17T13:19:02.000Z",
    realizedPnl: 0,
    fees: 0,
    strategy: "dividend-core",
  },
  {
    id: "alpaca-fill-005",
    orderId: "ord-90bf",
    symbol: "NVDA",
    side: "sell",
    quantity: 10,
    price: 149.22,
    filledAt: "2026-06-24T18:02:15.000Z",
    realizedPnl: 233.8,
    fees: 0.2,
    strategy: "momentum-harvest",
  },
];

export const incomeEvents: IncomeEvent[] = [
  ...alpacaTrades
    .filter((trade) => trade.realizedPnl !== 0)
    .map((trade) => ({
      id: `income-${trade.id}`,
      sourceId: "alpaca",
      sourceName: "Alpaca",
      kind: "realized_trade_gain" as const,
      occurredAt: trade.filledAt,
      amount: trade.realizedPnl - trade.fees,
      currency: "USD" as const,
      memo: `${trade.symbol} ${trade.strategy}`,
    })),
  {
    id: "income-dividend-001",
    sourceId: "alpaca",
    sourceName: "Alpaca",
    kind: "dividend",
    occurredAt: "2026-06-28T12:00:00.000Z",
    amount: 38.64,
    currency: "USD",
    memo: "SCHD dividend placeholder",
  },
];
