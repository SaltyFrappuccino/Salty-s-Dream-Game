import type { DeckValidationResult, PlayerDeck } from "@sdg/shared";
import { cardDefinitions } from "../data/cards";
import { DECK_SIZE, MAX_CARD_COPIES, MAX_COMMON_CARDS, MIN_CHARACTER_CARDS } from "../rules/constants";

export function validateDeck(deck: Pick<PlayerDeck, "characterIds" | "cards">): DeckValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const cardMap = new Map(cardDefinitions.map((card) => [card.id, card]));
  const totalCards = deck.cards.reduce((sum, card) => sum + card.quantity, 0);
  const perCharacter = new Map<string, number>(deck.characterIds.map((id) => [id, 0]));
  let commonCards = 0;

  if (totalCards !== DECK_SIZE) {
    errors.push("РљРѕР»РѕРґР° РґРѕР»Р¶РЅР° СЃРѕРґРµСЂР¶Р°С‚СЊ СЂРѕРІРЅРѕ 30 РєР°СЂС‚.");
  }

  for (const entry of deck.cards) {
    const card = cardMap.get(entry.cardId);
    if (!card) {
      errors.push(`РќРµРёР·РІРµСЃС‚РЅР°СЏ РєР°СЂС‚Р°: ${entry.cardId}.`);
      continue;
    }

    if (entry.quantity > MAX_CARD_COPIES) {
      errors.push(`РЎР»РёС€РєРѕРј РјРЅРѕРіРѕ РєРѕРїРёР№ РєР°СЂС‚С‹ ${card.name}.`);
    }
    if (card.type === "Ultimate" && entry.quantity > 1) {
      errors.push(`Ultimate-РєР°СЂС‚Р° ${card.name} РјРѕР¶РµС‚ Р±С‹С‚СЊ С‚РѕР»СЊРєРѕ РІ 1 РєРѕРїРёРё.`);
    }
    if (card.isCommon) {
      commonCards += entry.quantity;
      continue;
    }
    if (!card.ownerCharacterVersionId || !perCharacter.has(card.ownerCharacterVersionId)) {
      errors.push(`РљР°СЂС‚Р° ${card.name} РЅРµ РїСЂРёРЅР°РґР»РµР¶РёС‚ РїРµСЂСЃРѕРЅР°Р¶Сѓ РёР· РєРѕРјР°РЅРґС‹.`);
      continue;
    }

    perCharacter.set(card.ownerCharacterVersionId, (perCharacter.get(card.ownerCharacterVersionId) ?? 0) + entry.quantity);
  }

  appendTeamErrors(deck.characterIds, perCharacter, commonCards, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

function appendTeamErrors(
  characterIds: [string, string, string],
  perCharacter: Map<string, number>,
  commonCards: number,
  errors: string[],
  warnings: string[]
): void {
  if (commonCards > MAX_COMMON_CARDS) {
    errors.push("Р’ РєРѕР»РѕРґРµ СЃР»РёС€РєРѕРј РјРЅРѕРіРѕ РѕР±С‰РёС… РєР°СЂС‚.");
  }

  for (const [characterId, count] of perCharacter.entries()) {
    if (count < MIN_CHARACTER_CARDS) {
      errors.push(`РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РєР°СЂС‚ РїРµСЂСЃРѕРЅР°Р¶Р° ${characterId}.`);
    }
  }

  if (new Set(characterIds).size !== characterIds.length) {
    errors.push("Р’ РєРѕРјР°РЅРґРµ РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ 3 СЂР°Р·РЅС‹С… РїРµСЂСЃРѕРЅР°Р¶Р°.");
  }
  if (commonCards === MAX_COMMON_CARDS) {
    warnings.push("Р”РѕСЃС‚РёРіРЅСѓС‚ РјР°РєСЃРёРјСѓРј РѕР±С‰РёС… РєР°СЂС‚.");
  }
}

