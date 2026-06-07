import type { CardDefinition, MatchAction, MatchState } from "@sdg/shared";
import { cardDefinitions } from "../data/cards";
import { applyEffect } from "../effects/effectRegistry";
import { getEffectiveCardCost } from "../validators/validateCost";

export function resolveCard(state: MatchState, action: Extract<MatchAction, { type: "PLAY_CARD" }>): MatchState {
  const player = state.players.find((item) => item.userId === action.playerId);
  const cardInstance = player?.hand.find((item) => item.instanceId === action.cardInstanceId);
  const card = cardInstance ? cardDefinitions.find((item) => item.id === cardInstance.cardId) : undefined;
  if (!player || !cardInstance || !card) {
    return state;
  }

  const sourceCharacterId = action.sourceCharacterId
    ?? player.team.find((character) => character.characterVersionId === card.ownerCharacterVersionId)?.instanceId;
  const targetCharacterId = action.targetCharacterId ?? sourceCharacterId;
  const paidState = payAndMoveCardToDiscard(state, player.userId, cardInstance.instanceId);
  const resolvedState = applyEffect(paidState, card.effectId, action.playerId, targetCharacterId, sourceCharacterId);

  return {
    ...resolvedState,
    eventLog: [
      ...resolvedState.eventLog,
      {
        id: `event_${resolvedState.eventLog.length + 1}`,
        type: "card_played",
        timestamp: new Date().toISOString(),
        text: `РРіСЂРѕРє ${action.playerId} СЃС‹РіСЂР°Р» РєР°СЂС‚Сѓ ${card.name}.`
      }
    ]
  };
}

function payAndMoveCardToDiscard(state: MatchState, playerId: string, cardInstanceId: string): MatchState {
  return {
    ...state,
    players: state.players.map((player) => player.userId === playerId ? payPlayerCard(player, cardInstanceId) : player)
  };
}

type MatchPlayer = MatchState["players"][number];

function payPlayerCard(player: MatchPlayer, cardInstanceId: string): MatchPlayer {
  const cardInstance = player.hand.find((item) => item.instanceId === cardInstanceId);
  const card = cardInstance ? cardDefinitions.find((item) => item.id === cardInstance.cardId) : undefined;
  if (!cardInstance || !card) {
    return player;
  }

  return {
    ...player,
    hand: player.hand.filter((handCard) => handCard.instanceId !== cardInstanceId),
    discard: [...player.discard, cardInstance],
    actionsTaken: player.actionsTaken + 1,
    team: player.team.map((character) =>
      card.ownerCharacterVersionId && character.characterVersionId === card.ownerCharacterVersionId
        ? payCharacterCost(character, card)
        : character
    )
  };
}

type MatchCharacter = MatchPlayer["team"][number];

function payCharacterCost(character: MatchCharacter, card: CardDefinition): MatchCharacter {
  const cost = getEffectiveCardCost(character, card);
  return {
    ...character,
    spiritualEnergy: Math.max(0, character.spiritualEnergy - cost.spiritualEnergy),
    stamina: Math.max(0, character.stamina - cost.stamina),
    statuses: character.statuses.filter((status) => status.type !== "Stun")
  };
}

