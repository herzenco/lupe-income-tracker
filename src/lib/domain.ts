export type IncomeSourceType = "brokerage" | "company";
export type IncomeSourceStatus = "live" | "planned";

export type IncomeSource = {
  id: string;
  name: string;
  type: IncomeSourceType;
  status: IncomeSourceStatus;
  description: string;
};

export type IncomeEventKind =
  | "realized_trade_gain"
  | "dividend"
  | "interest"
  | "company_revenue"
  | "company_distribution";

export type IncomeEvent = {
  id: string;
  sourceId: string;
  sourceName: string;
  kind: IncomeEventKind;
  occurredAt: string;
  amount: number;
  currency: "USD";
  memo: string;
};

export type TradeSide = "buy" | "sell";

export type AlpacaTrade = {
  id: string;
  orderId: string;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  filledAt: string;
  realizedPnl: number;
  fees: number;
  strategy: string;
};

export type IncomeSummary = {
  grossIncome: number;
  netIncome: number;
  realizedTradingPnl: number;
  dividendIncome: number;
  tradeCount: number;
  winRate: number;
};
