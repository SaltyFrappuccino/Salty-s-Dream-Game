import type { CharacterUnit, GachaRollResult, Rarity, WeaponDefinition } from "@sdg/shared";
import { AssetImage } from "../../components/game/AssetImage";
import {
  getCharacterFallbackPath,
  getCharacterPortraitPath,
  getWeaponArtPath,
  getWeaponFallbackPath
} from "../../services/assetPaths";
import styles from "./GachaPage.module.scss";

type Props = {
  characters: CharacterUnit[];
  result: GachaRollResult;
  weapons: WeaponDefinition[];
};

const rarityClass: Record<Rarity, string> = {
  R: styles.rarityR,
  SR: styles.raritySR,
  SSR: styles.raritySSR,
  UR: styles.rarityUR
};

export function GachaResults({ characters, result, weapons }: Props) {
  return (
    <section className={styles.results}>
      <div className={styles.resultsHeader}>
        <span className={styles.eyebrow}>Итог призыва</span>
        <h2>Результат</h2>
      </div>
      <div className={styles.resultGrid}>
        {result.pulls.map((pull, index) => {
          const character = pull.characterVersionId
            ? characters.find((item) => item.id === pull.characterVersionId)
            : undefined;
          const weapon = pull.weaponDefinitionId
            ? weapons.find((item) => item.id === pull.weaponDefinitionId)
            : undefined;
          const title = character?.displayName ?? weapon?.name ?? pull.name;
          const art = character ? getCharacterPortraitPath(character) : getWeaponArtPath(weapon);
          const fallback = character ? getCharacterFallbackPath() : getWeaponFallbackPath();

          return (
            <article
              className={`${styles.resultCard} ${rarityClass[pull.rarity]}`}
              key={`${pull.type}_${pull.characterVersionId ?? pull.weaponDefinitionId}_${index}`}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <AssetImage
                alt={title}
                className={styles.resultArt}
                fallbackSrc={fallback}
                src={art}
              />
              <div className={styles.resultMeta}>
                <span>{pull.rarity}</span>
                <strong>{title}</strong>
                <small>
                  {pull.duplicate
                    ? `Дубликат · +${pull.shardsGranted} осколков`
                    : pull.type === "weapon" ? "Новое оружие" : "Новый персонаж"}
                </small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
