import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeckStore } from "../../stores/deckStore";
import { useSocketStore } from "../../stores/socketStore";
import { socketClient } from "../../services/socketClient";

export function useRoomPage() {
  const navigate = useNavigate();
  const room = useSocketStore((state) => state.room);
  const match = useSocketStore((state) => state.match);
  const decks = useDeckStore((state) => state.decks);
  const [selectedDeckId, setSelectedDeckId] = useState("");

  useEffect(() => {
    if (decks[0] && !selectedDeckId) {
      setSelectedDeckId(decks[0].id);
    }
  }, [decks, selectedDeckId]);

  useEffect(() => {
    if (match) {
      socketClient.emit("match:subscribe", { matchId: match.id });
      navigate("/battle");
    }
  }, [match, navigate]);

  return {
    decks,
    room,
    selectedDeckId,
    setSelectedDeckId
  };
}
