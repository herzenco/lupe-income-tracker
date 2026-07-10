import { formatCurrency, formatPercent } from "@/lib/format";

type MetricCardProps = {
  label: string;
  value: number;
  format?: "currency" | "percent" | "number";
  helper: string;
};

export function MetricCard({
  label,
  value,
  format = "currency",
  helper,
}: MetricCardProps) {
  const displayValue =
    format === "currency"
      ? formatCurrency(value)
      : format === "percent"
        ? formatPercent(value)
        : new Intl.NumberFormat("en-US").format(value);

  return (
    <section className="card metric">
      <span>{label}</span>
      <strong>{displayValue}</strong>
      <small>{helper}</small>
    </section>
  );
}
