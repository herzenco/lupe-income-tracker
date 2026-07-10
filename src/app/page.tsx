import { IncomeEventsTable } from "@/components/income-events-table";
import { MetricCard } from "@/components/metric-card";
import { getAlpacaTrades, getIncomeEvents, getIncomeSources } from "@/lib/data-sources";
import { buildIncomeSummary } from "@/lib/reporting";

export default async function OverviewPage() {
  const [events, trades, sources] = await Promise.all([
    getIncomeEvents(),
    getAlpacaTrades(),
    getIncomeSources(),
  ]);
  const summary = buildIncomeSummary(events, trades);

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Income command center</p>
          <h1>Track trading income now, expand sources later.</h1>
          <p className="muted">
            The first version reports Alpaca trade results and normalizes income into a
            shared event model for Robinhood and company streams.
          </p>
        </div>
        <span className="status-pill">Seed data</span>
      </header>

      <section className="grid metric-grid" aria-label="Income summary">
        <MetricCard label="Net income" value={summary.netIncome} helper="After losses and fees" />
        <MetricCard
          label="Trading P&L"
          value={summary.realizedTradingPnl}
          helper="Realized Alpaca trades"
        />
        <MetricCard
          label="Dividends"
          value={summary.dividendIncome}
          helper="Brokerage income events"
        />
        <MetricCard
          label="Trade win rate"
          value={summary.winRate}
          format="percent"
          helper={`${summary.tradeCount} Alpaca records`}
        />
      </section>

      <section className="grid two-column section-grid">
        <article className="card">
          <div className="toolbar">
            <div>
              <h2>Recent income events</h2>
              <p className="muted">Normalized events across connected and planned sources.</p>
            </div>
          </div>
          <IncomeEventsTable events={events} />
        </article>

        <aside className="card stack">
          <div>
            <h2>Source roadmap</h2>
            <p className="muted">Each provider feeds the same income-event contract.</p>
          </div>
          <div className="source-list">
            {sources.map((source) => (
              <article className="source-item" key={source.id}>
                <header>
                  <strong>{source.name}</strong>
                  <span className={`source-pill ${source.status}`}>{source.status}</span>
                </header>
                <p className="muted">{source.description}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
