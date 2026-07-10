import { NextResponse } from "next/server";
import { getAlpacaTrades, getIncomeEvents } from "@/lib/data-sources";
import { buildIncomeSummary, groupTradePnlBySymbol } from "@/lib/reporting";

export async function GET() {
  const [trades, events] = await Promise.all([getAlpacaTrades(), getIncomeEvents()]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    summary: buildIncomeSummary(events, trades),
    symbolPnl: groupTradePnlBySymbol(trades),
    trades,
  });
}
