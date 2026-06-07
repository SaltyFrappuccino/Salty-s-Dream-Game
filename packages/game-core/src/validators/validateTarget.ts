import type { CardDefinition, MatchCharacterState, MatchState } from "@sdg/shared";

export function validateTarget(
  state: MatchState,
  playerId: string,
  card: CardDefinition,
  targetCharacterId?: string
): MatchCharacterState | undefined {
  if (card.targetMode === "None") {
    return undefined;
  }

  const me = state.players.find((player) => player.userId === playerId);
  const enemy = state.players.find((player) => player.userId !== playerId);
  if (!me || !enemy) {
    return undefined;
  }

  const allCharacters = [...me.team, ...enemy.team];
  const target = allCharacters.find((character) => character.instanceId === targetCharacterId);
  if (!target) {
    return undefined;
  }

  if (card.targetMode === "Self") {
    return target;
  }

  return target;
}


