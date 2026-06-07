import type { PlayerWeapon, WeaponDefinition } from "@sdg/shared";
import { getWeaponArtPath, getWeaponFallbackPath } from "../../../services/assetPaths";
import { Badge } from "../../ui/Badge/Badge";
import { Panel } from "../../ui/Panel/Panel";
import { AssetImage } from "../AssetImage";
import styles from "./WeaponCard.module.scss";

type Props = {
  ownedWeapon?: PlayerWeapon;
  weapon: WeaponDefinition;
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatBonuses(weapon: WeaponDefinition): string {
  const parts: string[] = [];

  if (weapon.statBonuses.hp) {
    parts.push(`HP +${weapon.statBonuses.hp}`);
  }

  if (weapon.statBonuses.attack) {
    parts.push(`АТК +${weapon.statBonuses.attack}`);
  }

  if (weapon.statBonuses.defense) {
    parts.push(`Защита +${weapon.statBonuses.defense}`);
  }

  if (weapon.statBonuses.speed) {
    parts.push(`Скорость +${weapon.statBonuses.speed}`);
  }

  if (weapon.statBonuses.critChance) {
    parts.push(`Крит. шанс +${formatPercent(weapon.statBonuses.critChance)}`);
  }

  if (weapon.statBonuses.critDamage) {
    parts.push(`Крит. урон +${formatPercent(weapon.statBonuses.critDamage)}`);
  }

  return parts.join(" · ");
}

export function WeaponCard({ ownedWeapon, weapon }: Props) {
  const owned = Boolean(ownedWeapon);
  const ownedShards = ownedWeapon?.shards ?? 0;

  return (
    <Panel>
      <article className={`${styles.root} ${owned ? "" : styles.locked}`}>
        <AssetImage
          alt={weapon.name}
          className={styles.art}
          fallbackSrc={getWeaponFallbackPath()}
          loading="lazy"
          src={getWeaponArtPath(weapon)}
        />
        <div className={styles.meta}>
          <strong>{weapon.name}</strong>
          <p className={styles.description}>{weapon.description}</p>
          <p className={styles.bonuses}>{formatBonuses(weapon)}</p>
          <div className={styles.status}>
            <Badge>{weapon.rarity}</Badge>
            <Badge>{owned ? "Открыто" : "Не открыто"}</Badge>
            {owned && <Badge>{ownedShards} осколков</Badge>}
          </div>
        </div>
      </article>
    </Panel>
  );
}
