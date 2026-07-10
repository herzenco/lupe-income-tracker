import type { IncomeEvent } from "@/lib/domain";
import { formatCurrency, formatDate } from "@/lib/format";

type IncomeEventsTableProps = {
  events: IncomeEvent[];
};

export function IncomeEventsTable({ events }: IncomeEventsTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Type</th>
            <th>Memo</th>
            <th className="numeric">Amount</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{formatDate(event.occurredAt)}</td>
              <td>{event.sourceName}</td>
              <td>{event.kind.replaceAll("_", " ")}</td>
              <td>{event.memo}</td>
              <td className={`numeric ${event.amount >= 0 ? "positive" : "negative"}`}>
                {formatCurrency(event.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
