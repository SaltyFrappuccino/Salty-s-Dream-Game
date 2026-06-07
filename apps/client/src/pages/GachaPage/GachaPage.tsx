import { useEffect, useRef, useState } from "react";
import type { BannerDefinition, CurrencyCode, GachaRollResult, Rarity } from "@sdg/shared";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { useCollectionStore } from "../../stores/collectionStore";
import { useGachaStore } from "../../stores/gachaStore";
import { usePlayerStore } from "../../stores/playerStore";
import { GachaHero } from "./GachaHero";
import styles from "./GachaPage.module.scss";
import { GachaResults } from "./GachaResults";
import { GachaReveal } from "./GachaReveal";

const fallbackBanner: BannerDefinition = {
  id: "enchanted_blades",
  name: "Зачарованные клинки",
  description: "Базовый баннер персонажей для сезонных лобби SDG.",
  themePackId: "core",
  type: "character",
  rates: { R: 0.55, SR: 0.3, SSR: 0.12, UR: 0.03 },
  pitySr: 10,
  pitySsr: 50,
  pityUr: 90
};

const rarityRank: Record<Rarity, number> = {
  R: 0,
  SR: 1,
  SSR: 2,
  UR: 3
};

function chooseRollCurrency(count: 1 | 10, yen: number, tickets: number): CurrencyCode | null {
  const ticketsToSpend = Math.min(tickets, count);
  const remainingRolls = count - ticketsToSpend;
  const yenCost = ticketsToSpend === 0 && count === 10 ? 9000 : remainingRolls * 1000;

  if (ticketsToSpend > 0 && yen >= yenCost) {
    return "SUMMON_TICKET";
  }

  if (yen >= yenCost) {
    return "YEN";
  }

  return null;
}

export function GachaPage() {
  const { banners, lastRoll, loading, roll } = useGachaStore();
  const characters = useCollectionStore((state) => state.characters);
  const weapons = useCollectionStore((state) => state.weapons);
  const wallet = usePlayerStore((state) => state.wallet);
  const [activeBannerId, setActiveBannerId] = useState("enchanted_blades");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [revealRarity, setRevealRarity] = useState<Rarity>("SR");
  const [revealing, setRevealing] = useState(false);
  const [visibleResult, setVisibleResult] = useState<GachaRollResult | null>(lastRoll);
  const revealTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(revealTimerRef.current);
  }, []);

  function finishReveal(result: GachaRollResult | null) {
    setRevealing(false);
    setVisibleResult(result);
  }

  async function handleRoll(count: 1 | 10) {
    const currency = chooseRollCurrency(count, wallet?.yen ?? 0, wallet?.summonTickets ?? 0);
    if (!currency) {
      setErrorMessage(
        count === 1
          ? "Не хватает билета призыва или 1000 иен."
          : "Не хватает билетов призыва и иен для 10 круток."
      );
      return;
    }

    window.clearTimeout(revealTimerRef.current);
    setErrorMessage(undefined);
    setVisibleResult(null);
    setRevealRarity(count === 10 ? "SSR" : "SR");
    setRevealing(true);
    revealTimerRef.current = window.setTimeout(() => finishReveal(useGachaStore.getState().lastRoll), 2200);

    try {
      await roll(count, currency, activeBannerId);

      const result = useGachaStore.getState().lastRoll;
      const bestRarity = result?.pulls.reduce<Rarity>((best, pull) => {
        return rarityRank[pull.rarity] > rarityRank[best] ? pull.rarity : best;
      }, "R");

      setRevealRarity(bestRarity ?? "R");
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = window.setTimeout(() => finishReveal(result), bestRarity === "UR" ? 1500 : 1050);
    } catch (error) {
      window.clearTimeout(revealTimerRef.current);
      setRevealing(false);
      setErrorMessage(error instanceof Error ? error.message : "Не удалось выполнить призыв.");
    }
  }

  return (
    <PageContainer>
      <div className={styles.root}>
        <GachaHero
          activeBannerId={activeBannerId}
          banners={banners.length > 0 ? banners : [fallbackBanner]}
          loading={loading || revealing}
          onBannerChange={setActiveBannerId}
          onRollOne={() => void handleRoll(1)}
          onRollTen={() => void handleRoll(10)}
        />
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        {visibleResult && <GachaResults characters={characters} result={visibleResult} weapons={weapons} />}
        <GachaReveal active={revealing} rarity={revealRarity} />
      </div>
    </PageContainer>
  );
}
