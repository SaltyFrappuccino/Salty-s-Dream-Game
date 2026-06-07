import type { RoomState } from "@sdg/shared";
import { Button } from "../../components/ui/Button/Button";
import { socketClient } from "../../services/socketClient";

type Props = {
  room: RoomState | null;
  selectedDeckId: string;
};

export function RoomReadyButton({ room, selectedDeckId }: Props) {
  if (!room || !selectedDeckId) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        socketClient.emit("room:select-deck", {
          roomId: room.roomId,
          deckId: selectedDeckId
        });
        socketClient.emit("room:ready", {
          roomId: room.roomId,
          ready: true
        });
      }}
    >
      Р’С‹Р±СЂР°С‚СЊ СЃС‚Р°СЂС‚РѕРІСѓСЋ РєРѕР»РѕРґСѓ Рё РіРѕС‚РѕРІ
    </Button>
  );
}

