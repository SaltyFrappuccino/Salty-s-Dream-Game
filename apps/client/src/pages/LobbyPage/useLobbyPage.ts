import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socketClient } from "../../services/socketClient";
import { useProgressStore } from "../../stores/progressStore";
import { useSocketStore } from "../../stores/socketStore";

const pendingRoomStorageKey = "sdg_pending_room";

function resolvePendingRoom(searchParams: URLSearchParams) {
  return searchParams.get("room") ?? localStorage.getItem(pendingRoomStorageKey) ?? "";
}

export function useLobbyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSeason = useProgressStore((state) => state.activeSeason);
  const mode = useProgressStore((state) => state.mode);
  const seasons = useProgressStore((state) => state.seasons);
  const loadSeasons = useProgressStore((state) => state.loadSeasons);
  const createSeason = useProgressStore((state) => state.createSeason);
  const joinSeason = useProgressStore((state) => state.joinSeason);
  const setLocalMode = useProgressStore((state) => state.setLocalMode);
  const socketConnected = useSocketStore((state) => state.connected);
  const socketError = useSocketStore((state) => state.error);
  const [roomId, setRoomId] = useState(resolvePendingRoom(searchParams));
  const [seasonName, setSeasonName] = useState("");
  const [seasonDurationDays, setSeasonDurationDays] = useState("7");
  const [seasonCode, setSeasonCode] = useState(searchParams.get("season") ?? "");

  useEffect(() => {
    void loadSeasons();
  }, [loadSeasons]);

  useEffect(() => {
    const pendingRoomId = resolvePendingRoom(searchParams).trim().toUpperCase();

    if (!pendingRoomId || !socketConnected) {
      return;
    }

    localStorage.removeItem(pendingRoomStorageKey);
    socketClient.emit("room:join", { roomId: pendingRoomId });
    navigate("/room", { replace: true });
  }, [navigate, searchParams, socketConnected]);

  const createRoom = () => {
    socketClient.emit("room:create", {
      seasonLobbyId: mode === "SEASON" ? activeSeason?.id : undefined
    });
    navigate("/room");
  };

  const joinRoom = () => {
    const nextRoomId = roomId.trim().toUpperCase();
    if (!nextRoomId) {
      return;
    }

    localStorage.setItem(pendingRoomStorageKey, nextRoomId);
    socketClient.emit("room:join", { roomId: nextRoomId });
    navigate("/room");
  };

  const updateRoomId = (value: string) => {
    setRoomId(value.toUpperCase());
  };

  const submitSeasonCreate = async () => {
    await createSeason(seasonName.trim(), Number(seasonDurationDays) || 7);
    setSeasonName("");
  };

  const submitSeasonJoin = async () => {
    await joinSeason(seasonCode.trim());
    setSeasonCode("");
  };

  return {
    activeSeason,
    createRoom,
    joinRoom,
    mode,
    roomId,
    seasonCode,
    seasonDurationDays,
    seasonName,
    seasons,
    setLocalMode,
    socketError,
    submitSeasonCreate,
    submitSeasonJoin,
    updateRoomId,
    updateSeasonCode: setSeasonCode,
    updateSeasonDurationDays: setSeasonDurationDays,
    updateSeasonName: setSeasonName
  };
}
