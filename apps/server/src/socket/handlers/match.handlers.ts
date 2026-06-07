import type { Server, Socket } from "socket.io";
import type { MatchAction } from "@sdg/shared";
import { matchService } from "../../services/matchService";
import { emitSocketError } from "../socketErrors";

type MatchPayload<T extends MatchAction> = { matchId: string } & T;

export function registerMatchHandlers(io: Server, socket: Socket): void {
  const apply = (matchId: string, action: MatchAction) => {
    try {
      const state = matchService.applyMatchAction(matchId, action);
      io.to(matchId).emit("match:state", state);
      if (state.turn.phase === "Finished") {
        io.to(matchId).emit("match:finished", state);
      }
    } catch (error) {
      emitSocketError(socket, "match:error", "MATCH_ACTION_FAILED", error);
    }
  };

  socket.on("match:subscribe", (payload: { matchId: string }) => {
    socket.join(payload.matchId);
  });
  socket.on("match:play-card", (payload: MatchPayload<Extract<MatchAction, { type: "PLAY_CARD" }>>) => apply(payload.matchId, payload));
  socket.on("match:basic-attack", (payload: MatchPayload<Extract<MatchAction, { type: "BASIC_ATTACK" }>>) => apply(payload.matchId, payload));
  socket.on("match:defend", (payload: MatchPayload<Extract<MatchAction, { type: "DEFEND" }>>) => apply(payload.matchId, payload));
  socket.on("match:focus", (payload: MatchPayload<Extract<MatchAction, { type: "FOCUS" }>>) => apply(payload.matchId, payload));
  socket.on("match:rest", (payload: MatchPayload<Extract<MatchAction, { type: "REST" }>>) => apply(payload.matchId, payload));
  socket.on("match:discard-dead-card", (payload: MatchPayload<Extract<MatchAction, { type: "DISCARD_DEAD_CARD" }>>) => apply(payload.matchId, payload));
  socket.on("match:end-turn", (payload: { matchId: string; playerId: string }) => apply(payload.matchId, { type: "END_TURN", playerId: payload.playerId }));
  socket.on("match:concede", (payload: { matchId: string; playerId: string }) => apply(payload.matchId, { type: "CONCEDE", playerId: payload.playerId }));
}

