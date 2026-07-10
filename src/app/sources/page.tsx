import { getIncomeSources } from "@/lib/data-sources";

export default async function SourcesPage() {
  const sources = await getIncomeSources();

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Integration plan</p>
          <h1>Connect data source by source.</h1>
          <p className="muted">
            The app starts with broker records and keeps future Robinhood and company
            ingestion behind narrow adapter functions.
          </p>
        </div>
      </header>

      <section className="grid two-column">
        <article className="card stack">
          <h2>Source inventory</h2>
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
        </article>

        <article className="card stack">
          <h2>Live-data checklist</h2>
          <ol className="steps">
            <li>Add encrypted environment variables for provider credentials.</li>
            <li>Replace sample adapters in <code>src/lib/data-sources.ts</code>.</li>
            <li>Pull Robinhood account snapshots through the server-only adapter.</li>
            <li>Persist normalized income events before rendering dashboard summaries.</li>
            <li>Add scheduled sync jobs and idempotent source record IDs.</li>
            <li>Reconcile imported totals against broker statements before tax reporting.</li>
          </ol>
        </article>
      </section>
    </>
  );
}
