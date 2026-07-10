import type { RobinhoodAccountSnapshot, RobinhoodAccountTotals } from "./domain";
import {
  alpacaTrades,
  incomeEvents,
  incomeSources,
  robinhoodAccountSnapshots,
} from "./sample-data";

export async function getIncomeSources() {
  return incomeSources;
}

export async function getIncomeEvents() {
  return incomeEvents;
}

export async function getAlpacaTrades() {
  return alpacaTrades;
}

export async function getRobinhoodAccountSnapshots() {
  return robinhoodAccountSnapshots;
}

export function buildRobinhoodAccountTotals(
  snapshots: RobinhoodAccountSnapshot[],
): RobinhoodAccountTotals {
  return snapshots.reduce(
    (totals, snapshot) => ({
      accountValue: totals.accountValue + snapshot.accountValue,
      cash: totals.cash + snapshot.cash,
      buyingPower: totals.buyingPower + snapshot.buyingPower,
      equityValue: totals.equityValue + snapshot.equityValue,
    }),
    { accountValue: 0, cash: 0, buyingPower: 0, equityValue: 0 },
  );
}

export async function getRobinhoodIncomeEvents() {
  return [];
}

export async function getCompanyIncomeEvents() {
  return [];
}
