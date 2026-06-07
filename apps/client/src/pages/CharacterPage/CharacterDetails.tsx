import type { CharacterStats, CharacterUnit, PlayerCharacter, WeaponDefinition } from "@sdg/shared";
import { GameSelect } from "../../components/ui/GameSelect";
import { Button } from "../../components/ui/Button/Button";
import { Panel } from "../../components/ui/Panel/Panel";
import styles from "./CharacterPage.module.scss";

type Props = {
  character: CharacterUnit;
  equippedWeapon?: WeaponDefinition;
  message?: string;
  nextRequirement?: number;
  owned?: PlayerCharacter;
  ownedWeapons: WeaponDefinition[];
  onEquipWeapon: (weaponDefinitionId?: string) => void;
  onUpgrade: () => void;
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function getEffectiveStats(stats: CharacterStats, weapon?: WeaponDefinition): CharacterStats {
  return {
    hp: stats.hp + (weapon?.statBonuses.hp ?? 0),
    attack: stats.attack + (weapon?.statBonuses.attack ?? 0),
    defense: stats.defense + (weapon?.statBonuses.defense ?? 0),
    speed: stats.speed + (weapon?.statBonuses.speed ?? 0),
    critChance: stats.critChance + (weapon?.statBonuses.critChance ?? 0),
    critDamage: stats.critDamage + (weapon?.statBonuses.critDamage ?? 0)
  };
}

function formatWeaponBonuses(weapon: WeaponDefinition): string {
  const labels: Array<[string, number | undefined]> = [
    ["HP", weapon.statBonuses.hp],
    ["АТК", weapon.statBonuses.attack],
    ["Защита", weapon.statBonuses.defense],
    ["Скорость", weapon.statBonuses.speed]
  ];

  const statParts = labels
    .filter(([, value]) => value)
    .map(([label, value]) => `${label} +${value}`);
  const critChance = weapon.statBonuses.critChance ? `Крит. шанс +${formatPercent(weapon.statBonuses.critChance)}` : undefined;
  const critDamage = weapon.statBonuses.critDamage ? `Крит. урон +${formatPercent(weapon.statBonuses.critDamage)}` : undefined;

  return [...statParts, critChance, critDamage].filter(Boolean).join(" · ");
}

export function CharacterDetails({
  character,
  equippedWeapon,
  message,
  nextRequirement,
  owned,
  ownedWeapons,
  onEquipWeapon,
  onUpgrade
}: Props) {
  const stats = getEffectiveStats(character.baseStats, equippedWeapon);
  const weaponOptions = [
    {
      label: "Без оружия",
      meta: "Снять экипировку",
      value: ""
    },
    ...ownedWeapons.map((weapon) => ({
      label: weapon.name,
      meta: `${weapon.rarity} · ${formatWeaponBonuses(weapon)}`,
      value: weapon.id
    }))
  ];

  return (
    <Panel>
      <div className={styles.stats}>
        {!owned && <strong className={styles.locked}>Персонаж не открыт</strong>}
        <div className={styles.summary}>
          <p>Роль: {character.role}</p>
          <p>Редкость: {character.rarity}</p>
          <p>Пассивка: {character.passiveId}</p>
          <p>ДЭ: {character.maxSpiritualEnergy}</p>
          <p>ВЫН: {character.maxStamina}</p>
          <p>Звёзды: {owned?.stars ?? 0}★</p>
          <p>Осколки: {owned?.shards ?? 0}</p>
        </div>

        <div className={styles.statGrid}>
          <p>HP: {stats.hp}</p>
          <p>АТК: {stats.attack}</p>
          <p>Защита: {stats.defense}</p>
          <p>Скорость: {stats.speed}</p>
          <p>Крит. шанс: {formatPercent(stats.critChance)}</p>
          <p>Крит. урон: {formatPercent(stats.critDamage)}</p>
        </div>

        {nextRequirement && <p>Следующее улучшение: {nextRequirement} осколков</p>}

        <Button disabled={!owned || !nextRequirement || owned.shards < nextRequirement} onClick={onUpgrade}>
          Улучшить
        </Button>

        <div className={styles.weaponBlock}>
          <h3>Оружие</h3>
          <p>{equippedWeapon ? equippedWeapon.name : "Не экипировано"}</p>
          {equippedWeapon && <p className={styles.weaponMeta}>{formatWeaponBonuses(equippedWeapon)}</p>}
          <GameSelect
            label="Выбор оружия"
            onChange={(value) => onEquipWeapon(value || undefined)}
            options={weaponOptions}
            placeholder="Выберите оружие"
            value={equippedWeapon?.id ?? ""}
          />
        </div>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </Panel>
  );
}
