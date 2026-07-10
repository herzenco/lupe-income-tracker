import { MetricCard } from "@/components/metric-card";
import { RobinhoodAccountTable } from "@/components/robinhood-account-table";
import {
  buildRobinhoodAccountTotals,
  getRobinhoodAccountSnapshots,
} from "@/lib/data-sources";
import { formatCurrency, formatDate } from "@/lib/format";

export default async function RobinhoodPage() {
  const snapshots = await getRobinhoodAccountSnapshots();
  const totals = buildRobinhoodAccountTotals(snapshots);
  const observedAt = snapshots[0]?.observedAt;

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Robinhood reporting</p>
          <h1>Account snapshots across brokerage accounts.</h1>
          <p className="muted">
            Verified current account values for cash, buying power, and equity. The
            snapshot total is {formatCurrency(totals.accountValue)} across all accounts.
          </p>
        </div>
        <span className="status-pill">Live source</span>
      </header>

      <section className="grid metric-grid" aria-label="Robinhood totals">
        <MetricCard
          label="Account value"
          value={totals.accountValue}
          helper={`${snapshots.length} Robinhood accounts`}
        />
        <MetricCard label="Cash" value={totals.cash} helper="Total cash balance" />
        <MetricCard label="Buying power" value={totals.buyingPower} helper="Total buying power" />
        <MetricCard label="Equity value" value={totals.equityValue} helper="Total positions" />
      </section>

      <section className="grid two-column section-grid">
        <article className="card">
          <div className="toolbar">
            <div>
              <h2>Account snapshots</h2>
              <p className="muted">
                {observedAt
                  ? `Snapshot observed ${formatDate(observedAt)}.`
                  : "Snapshot observation time unavailable."}
              </p>
            </div>
          </div>
          <RobinhoodAccountTable snapshots={snapshots} />
        </article>

        <aside className="card stack">
          <div>
            <h2>Live pull path</h2>
            <p className="muted">
              Keep this page on the same snapshot contract when the manual values are
              replaced by an authenticated account pull.
            </p>
          </div>
          <ol className="steps">
            <li>Store Robinhood credentials or OAuth tokens in encrypted environment variables.</li>
            <li>Fetch each account snapshot through a server-only adapter.</li>
            <li>Persist raw account payloads with account IDs and observed timestamps.</li>
            <li>Normalize balances into <code>RobinhoodAccountSnapshot</code> records.</li>
            <li>Reconcile totals against statements before using them for formal reporting.</li>
          </ol>
        </aside>
      </section>
    </>
  );
}
