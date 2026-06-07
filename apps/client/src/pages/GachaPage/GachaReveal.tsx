import type { Rarity } from "@sdg/shared";
import styles from "./GachaPage.module.scss";

type Props = {
  active: boolean;
  rarity: Rarity;
};

export function GachaReveal({ active, rarity }: Props) {
  if (!active) {
    return null;
  }

  return (
    <div className={`${styles.reveal} ${styles[`reveal${rarity}`]}`} role="status" aria-live="polite">
      <div className={styles.revealGate}>
        <span />
        <strong>{rarity === "UR" ? "РљР»РёРЅРѕРє РїСЂРѕР±СѓР¶РґР°РµС‚СЃСЏ" : "РџРµС‡Р°С‚СЊ СЂР°СЃРєСЂС‹РІР°РµС‚СЃСЏ"}</strong>
        <small>РРґС‘С‚ РїСЂРёР·С‹РІ...</small>
      </div>
    </div>
  );
}

