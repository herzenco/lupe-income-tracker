import type { AlpacaTrade } from "@/lib/domain";
import { formatCurrency, formatDate } from "@/lib/format";

type TradeTableProps = {
  trades: AlpacaTrade[];
};

export function TradeTable({ trades }: TradeTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Filled</th>
            <th>Symbol</th>
            <th>Side</th>
            <th className="numeric">Qty</th>
            <th className="numeric">Price</th>
            <th className="numeric">Realized P&L</th>
            <th>Strategy</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            const netPnl = trade.realizedPnl - trade.fees;
            return (
              <tr key={trade.id}>
                <td>{formatDate(trade.filledAt)}</td>
                <td>{trade.symbol}</td>
                <td>{trade.side.toUpperCase()}</td>
                <td className="numeric">{trade.quantity}</td>
                <td className="numeric">{formatCurrency(trade.price)}</td>
                <td className={`numeric ${netPnl >= 0 ? "positive" : "negative"}`}>
                  {formatCurrency(netPnl)}
                </td>
                <td>{trade.strategy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
