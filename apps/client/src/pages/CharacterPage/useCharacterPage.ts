import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../../stores/collectionStore";
import { usePlayerStore } from "../../stores/playerStore";
import { starRequirements } from "./characterProgression";

export function useCharacterPage() {
  const params = useParams();
  const characters = useCollectionStore((state) => state.characters);
  const cards = useCollectionStore((state) => state.cards);
  const weaponDefinitions = useCollectionStore((state) => state.weapons);
  const collection = usePlayerStore((state) => state.collection);
  const ownedWeapons = usePlayerStore((state) => state.weapons);
  const equipWeapon = usePlayerStore((state) => state.equipWeapon);
  const upgradeCharacter = usePlayerStore((state) => state.upgradeCharacter);
  const [message, setMessage] = useState<string | undefined>();
  const character = characters.find((item) => item.id === params.characterId);
  const owned = collection.find((item) => item.characterVersionId === params.characterId);
  const characterCards = useMemo(
    () => cards.filter((card) => card.ownerCharacterVersionId === params.characterId),
    [cards, params.characterId]
  );
  const nextRequirement = owned ? starRequirements[owned.stars] : undefined;
  const ownedWeaponDefinitions = ownedWeapons
    .map((weapon) => weaponDefinitions.find((definition) => definition.id === weapon.weaponDefinitionId))
    .filter((weapon): weapon is NonNullable<typeof weapon> => Boolean(weapon));
  const equippedWeapon = weaponDefinitions.find((weapon) => weapon.id === owned?.equippedWeaponId);

  async function upgrade() {
    if (!character) {
      return;
    }

    try {
      const result = await upgradeCharacter(character.id);
      setMessage(`Персонаж улучшен до ${result.character.stars}★. Потрачено ${result.shardsSpent} осколков.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось улучшить персонажа.");
    }
  }

  async function equip(weaponDefinitionId?: string) {
    if (!character || !owned) {
      return;
    }

    try {
      await equipWeapon(character.id, weaponDefinitionId);
      setMessage(weaponDefinitionId ? "Оружие экипировано." : "Оружие снято.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось изменить оружие.");
    }
  }

  return {
    character,
    characterCards,
    equippedWeapon,
    equip,
    message,
    nextRequirement,
    owned,
    ownedWeaponDefinitions,
    upgrade
  };
}
