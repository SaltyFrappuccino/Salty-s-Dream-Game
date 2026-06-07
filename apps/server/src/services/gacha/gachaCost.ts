import type { CurrencyCode, PlayerWallet } from "@sdg/shared";

export type GachaPayment = {
  spentAmount: number;
  spentCurrency: CurrencyCode;
  spentSummonTickets: number;
  spentYen: number;
};

export function getRollCost(count: 1 | 10, currency: CurrencyCode): number {
  if (currency === "YEN") {
    return count === 10 ? 9000 : 1000;
  }

  return count;
}

export function getPreferredRollPayment(wallet: PlayerWallet, count: 1 | 10): GachaPayment {
  const spentSummonTickets = Math.min(wallet.summonTickets, count);
  const remainingRolls = count - spentSummonTickets;
  const spentYen = spentSummonTickets === 0 && count === 10
    ? 9000
    : remainingRolls * 1000;
  const spentCurrency = spentSummonTickets > 0 ? "SUMMON_TICKET" : "YEN";
  const spentAmount = spentCurrency === "SUMMON_TICKET" ? spentSummonTickets : spentYen;

  return { spentAmount, spentCurrency, spentSummonTickets, spentYen };
}

export function assertCanPay(wallet: PlayerWallet, count: 1 | 10, currency: CurrencyCode): void {
  const cost = getRollCost(count, currency);

  if (currency === "YEN" && wallet.yen < cost) {
    throw new Error("РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РёРµРЅ.");
  }

  if (currency === "SUMMON_TICKET" && wallet.summonTickets < cost) {
    throw new Error("РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р±РёР»РµС‚РѕРІ.");
  }
}

export function assertCanPayPreferred(wallet: PlayerWallet, payment: GachaPayment): void {
  if (wallet.summonTickets < payment.spentSummonTickets || wallet.yen < payment.spentYen) {
    throw new Error("РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р±РёР»РµС‚РѕРІ РїСЂРёР·С‹РІР° РёР»Рё РёРµРЅ.");
  }
}

