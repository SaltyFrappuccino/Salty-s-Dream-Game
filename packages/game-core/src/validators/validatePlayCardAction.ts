import type { CardDefinition, MatchAction, MatchCharacterState } from "@sdg/shared";
import { cardDefinitions } from "../data/cards";
import { canPayCardCost } from "./validateCost";
import type { ActionValidationPlayer } from "./actionValidationTypes";

export function validatePlayCardAction(
  player: ActionValidationPlayer,
  action: Extract<MatchAction, { type: "PLAY_CARD" }>,
  errors: string[]
): void {
  const cardInstance = player.hand.find((card) => card.instanceId === action.cardInstanceId);
  if (!cardInstance) {
    errors.push("Карта не найдена в руке.");
    return;
  }

  const card = cardDefinitions.find((item) => item.id === cardInstance.cardId);
  if (!card) {
    errors.push("Определение карты не найдено.");
    return;
  }

  if (!card.ownerCharacterVersionId) {
    return;
  }

  const owner = player.team.find((character) => character.characterVersionId === card.ownerCharacterVersionId);
  if (!owner || owner.defeated) {
    errors.push("Нельзя играть карту погибшего персонажа.");
    return;
  }

  appendOwnerStatusErrors(owner, card, errors);
  if (!canPayCardCost(owner, card)) {
    errors.push("Недостаточно ресурсов для карты.");
  }
}

function appendOwnerStatusErrors(owner: MatchCharacterState, card: CardDefinition, errors: string[]): void {
  const sealed = owner.statuses.some((status) => status.type === "Seal");
  if (sealed && (card.type === "Technique" || card.type === "Ultimate")) {
    errors.push("Персонаж под Печатью не может играть Technique и Ultimate карты.");
  }
}
