import type { CurrencyCode, GachaRollResponse } from "@sdg/shared";
import { banners } from "@sdg/game-core";
import { collectionRepository } from "../repositories/collectionRepository";
import { weaponRepository } from "../repositories/weaponRepository";
import { walletRepository } from "../repositories/walletRepository";
import { assertCanPayPreferred, getPreferredRollPayment } from "./gacha/gachaCost";
import { createEmptyPity, pityByUser } from "./gacha/gachaPity";
import { persistGachaRoll } from "./gacha/gachaPersistence";
import { createGachaPull } from "./gacha/gachaPulls";

export const gachaService = {
  roll(
    userId: string,
    displayName: string,
    bannerId: string,
    count: 1 | 10,
    _currency: CurrencyCode
  ): GachaRollResponse {
    const banner = banners.find((item) => item.id === bannerId);
    if (!banner) {
      throw new Error("Р‘Р°РЅРЅРµСЂ РЅРµ РЅР°Р№РґРµРЅ.");
    }

    const wallet = walletRepository.getByUserId(userId, displayName);
    if (!wallet) {
      throw new Error("РљРѕС€РµР»С‘Рє РЅРµ РЅР°Р№РґРµРЅ.");
    }

    const payment = getPreferredRollPayment(wallet, count);
    assertCanPayPreferred(wallet, payment);

    const pity = pityByUser.get(userId) ?? createEmptyPity();
    const owned = collectionRepository.getByUserId(userId, displayName);
    const ownedWeapons = weaponRepository.getByUserId(userId, displayName);
    const pulls = Array.from({ length: count }, () => createGachaPull(userId, banner, owned, ownedWeapons, pity));

    pityByUser.set(userId, pity);
    collectionRepository.save(userId, owned);
    weaponRepository.save(userId, ownedWeapons);

    const updatedWallet = walletRepository.update(
      userId,
      wallet.yen - payment.spentYen,
      wallet.summonTickets - payment.spentSummonTickets
    );

    const response: GachaRollResponse = {
      result: {
        bannerId,
        spentAmount: payment.spentAmount,
        spentCurrency: payment.spentCurrency,
        spentSummonTickets: payment.spentSummonTickets,
        spentYen: payment.spentYen,
        pulls,
        pityAfter: pity
      },
      wallet: updatedWallet,
      collection: owned,
      weapons: ownedWeapons
    };

    persistGachaRoll(userId, bannerId, response);
    return response;
  }
};

