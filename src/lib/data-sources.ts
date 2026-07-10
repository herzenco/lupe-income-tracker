import { alpacaTrades, incomeEvents, incomeSources } from "./sample-data";

export async function getIncomeSources() {
  return incomeSources;
}

export async function getIncomeEvents() {
  return incomeEvents;
}

export async function getAlpacaTrades() {
  return alpacaTrades;
}

export async function getRobinhoodIncomeEvents() {
  return [];
}

export async function getCompanyIncomeEvents() {
  return [];
}
