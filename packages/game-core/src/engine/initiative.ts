import type { MatchState } from "@sdg/shared";

type InitiativeEntry = {
  characterId: string;
  playerId: string;
  speed: number;
  playerIndex: number;
  characterIndex: number;
};

export function buildInitiativeQueue(state: Pick<MatchState, "players">): string[] {
  const entries: InitiativeEntry[] = state.players.flatMap((player, playerIndex) =>
    player.team
      .filter((character) => !character.defeated)
      .map((character, characterIndex) => ({
        characterId: character.instanceId,
        playerId: player.userId,
        speed: character.stats?.speed ?? 0,
        playerIndex,
        characterIndex
      }))
  );

  return entries
    .sort((a, b) =>
      b.speed - a.speed ||
      a.playerIndex - b.playerIndex ||
      a.characterIndex - b.characterIndex ||
      a.playerId.localeCompare(b.playerId)
    )
    .map((entry) => entry.characterId);
}

export function findCharacterOwner(state: MatchState, characterId?: string): string | undefined {
  if (!characterId) {
    return undefined;
  }

  return state.players.find((player) => player.team.some((character) => character.instanceId === characterId))?.userId;
}

