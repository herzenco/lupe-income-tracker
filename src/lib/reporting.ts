import type { AlpacaTrade, IncomeEvent, IncomeSummary } from "./domain";

export function buildIncomeSummary(
  events: IncomeEvent[],
  trades: AlpacaTrade[],
): IncomeSummary {
  const grossIncome = events.reduce((total, event) => total + Math.max(event.amount, 0), 0);
  const netIncome = events.reduce((total, event) => total + event.amount, 0);
  const realizedTradingPnl = trades.reduce(
    (total, trade) => total + trade.realizedPnl - trade.fees,
    0,
  );
  const dividendIncome = events
    .filter((event) => event.kind === "dividend")
    .reduce((total, event) => total + event.amount, 0);
  const closedTrades = trades.filter((trade) => trade.side === "sell");
  const winners = closedTrades.filter((trade) => trade.realizedPnl > 0);

  return {
    grossIncome,
    netIncome,
    realizedTradingPnl,
    dividendIncome,
    tradeCount: trades.length,
    winRate: closedTrades.length > 0 ? winners.length / closedTrades.length : 0,
  };
}

export function groupTradePnlBySymbol(trades: AlpacaTrade[]) {
  return Object.entries(
    trades.reduce<Record<string, number>>((accumulator, trade) => {
      accumulator[trade.symbol] =
        (accumulator[trade.symbol] ?? 0) + trade.realizedPnl - trade.fees;
      return accumulator;
    }, {}),
  )
    .map(([symbol, pnl]) => ({ symbol, pnl }))
    .sort((left, right) => Math.abs(right.pnl) - Math.abs(left.pnl));
}
