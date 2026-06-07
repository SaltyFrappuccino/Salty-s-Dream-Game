import { socketClient } from "../../services/socketClient";

export function emitBasicAttack(matchId: string, playerId: string, sourceCharacterId: string, targetCharacterId: string): void {
  socketClient.emit("match:basic-attack", { matchId, type: "BASIC_ATTACK", playerId, sourceCharacterId, targetCharacterId });
}

export function emitDefend(matchId: string, playerId: string, sourceCharacterId: string): void {
  socketClient.emit("match:defend", { matchId, type: "DEFEND", playerId, sourceCharacterId });
}

export function emitFocus(matchId: string, playerId: string, sourceCharacterId: string): void {
  socketClient.emit("match:focus", { matchId, type: "FOCUS", playerId, sourceCharacterId });
}

export function emitRest(matchId: string, playerId: string, sourceCharacterId: string): void {
  socketClient.emit("match:rest", { matchId, type: "REST", playerId, sourceCharacterId });
}

export function emitEndTurn(matchId: string, playerId: string): void {
  socketClient.emit("match:end-turn", { matchId, playerId });
}

export function emitConcede(matchId: string, playerId: string): void {
  socketClient.emit("match:concede", { matchId, playerId });
}

export function emitDiscardDeadCard(matchId: string, playerId: string, cardInstanceId: string): void {
  socketClient.emit("match:discard-dead-card", { matchId, type: "DISCARD_DEAD_CARD", playerId, cardInstanceId });
}

export function emitPlayCard(
  matchId: string,
  playerId: string,
  cardInstanceId: string,
  sourceCharacterId?: string,
  targetCharacterId?: string
): void {
  socketClient.emit("match:play-card", { matchId, type: "PLAY_CARD", playerId, cardInstanceId, sourceCharacterId, targetCharacterId });
}
