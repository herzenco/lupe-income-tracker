import type { RobinhoodAccountSnapshot } from "@/lib/domain";
import { formatCurrency } from "@/lib/format";

type RobinhoodAccountTableProps = {
  snapshots: RobinhoodAccountSnapshot[];
};

export function RobinhoodAccountTable({ snapshots }: RobinhoodAccountTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Type</th>
            <th>Number</th>
            <th className="numeric">Account value</th>
            <th className="numeric">Cash</th>
            <th className="numeric">Buying power</th>
            <th className="numeric">Equity value</th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snapshot) => (
            <tr key={snapshot.id}>
              <td>{snapshot.accountName}</td>
              <td>{snapshot.accountType}</td>
              <td>{snapshot.maskedAccountNumber}</td>
              <td className="numeric">{formatCurrency(snapshot.accountValue)}</td>
              <td className="numeric">{formatCurrency(snapshot.cash)}</td>
              <td className="numeric">{formatCurrency(snapshot.buyingPower)}</td>
              <td className="numeric">{formatCurrency(snapshot.equityValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
