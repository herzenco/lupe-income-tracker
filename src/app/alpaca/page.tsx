import { MetricCard } from "@/components/metric-card";
import { TradeTable } from "@/components/trade-table";
import { getAlpacaTrades, getIncomeEvents } from "@/lib/data-sources";
import { formatCurrency } from "@/lib/format";
import { buildIncomeSummary, groupTradePnlBySymbol } from "@/lib/reporting";

export default async function AlpacaPage() {
  const [trades, events] = await Promise.all([getAlpacaTrades(), getIncomeEvents()]);
  const summary = buildIncomeSummary(events, trades);
  const symbolPnl = groupTradePnlBySymbol(trades);

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Alpaca reporting</p>
          <h1>Trade history and realized P&L.</h1>
          <p className="muted">
            This page is the first broker reporting surface. It is wired to sample data
            through the same adapter shape that will fetch live account activities.
          </p>
        </div>
        <span className="status-pill">Brokerage</span>
      </header>

      <section className="grid metric-grid" aria-label="Alpaca metrics">
        <MetricCard
          label="Realized P&L"
          value={summary.realizedTradingPnl}
          helper="Closed-trade result after fees"
        />
        <MetricCard label="Gross income" value={summary.grossIncome} helper="Positive events" />
        <MetricCard
          label="Trade count"
          value={summary.tradeCount}
          format="number"
          helper="Seed fills and orders"
        />
        <MetricCard
          label="Win rate"
          value={summary.winRate}
          format="percent"
          helper="Closed sell records"
        />
      </section>

      <section className="grid two-column section-grid">
        <article className="card">
          <div className="toolbar">
            <div>
              <h2>Trade records</h2>
              <p className="muted">Order fills with strategy labels and net realized P&L.</p>
            </div>
          </div>
          <TradeTable trades={trades} />
        </article>

        <aside className="card stack">
          <div>
            <h2>P&L by symbol</h2>
            <p className="muted">Prioritized by absolute contribution.</p>
          </div>
          <div className="source-list">
            {symbolPnl.map((item) => (
              <article className="source-item" key={item.symbol}>
                <header>
                  <strong>{item.symbol}</strong>
                  <span className={item.pnl >= 0 ? "positive" : "negative"}>
                    {formatCurrency(item.pnl)}
                  </span>
                </header>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
