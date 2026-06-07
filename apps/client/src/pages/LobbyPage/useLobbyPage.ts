import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketClient } from "../../services/socketClient";
import { useProgressStore } from "../../stores/progressStore";

export function useLobbyPage() {
  const navigate = useNavigate();
  const activeSeason = useProgressStore((state) => state.activeSeason);
  const mode = useProgressStore((state) => state.mode);
  const seasons = useProgressStore((state) => state.seasons);
  const loadSeasons = useProgressStore((state) => state.loadSeasons);
  const createSeason = useProgressStore((state) => state.createSeason);
  const joinSeason = useProgressStore((state) => state.joinSeason);
  const setLocalMode = useProgressStore((state) => state.setLocalMode);
  const [roomId, setRoomId] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [seasonDurationDays, setSeasonDurationDays] = useState("7");
  const [seasonCode, setSeasonCode] = useState("");

  useEffect(() => {
    void loadSeasons();
  }, [loadSeasons]);

  const createRoom = () => {
    socketClient.emit("room:create", {
      seasonLobbyId: mode === "SEASON" ? activeSeason?.id : undefined
    });
    navigate("/room");
  };

  const joinRoom = () => {
    socketClient.emit("room:join", { roomId });
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
    submitSeasonCreate,
    submitSeasonJoin,
    updateRoomId,
    updateSeasonCode: setSeasonCode,
    updateSeasonDurationDays: setSeasonDurationDays,
    updateSeasonName: setSeasonName
  };
}
