import type { PlayerDeck, RoomState } from "@sdg/shared";
import { Panel } from "../../components/ui/Panel/Panel";
import { RoomReadyButton } from "./RoomReadyButton";
import { RoomSettingsControls } from "./RoomSettingsControls";

type Props = {
  decks: PlayerDeck[];
  room: RoomState | null;
  selectedDeckId: string;
  onSelectedDeckChange: (deckId: string) => void;
};

export function RoomControls({ decks, room, selectedDeckId, onSelectedDeckChange }: Props) {
  const playerLabel = (userId: string) => userId.split(":").at(-1) ?? userId;

  return (
    <Panel>
      <p>РљРѕРґ РєРѕРјРЅР°С‚С‹: {room?.roomId ?? "РѕР¶РёРґР°РЅРёРµ"}</p>
      {room?.season && (
        <p>
          РЎРµР·РѕРЅ: {room.season.name} РґРѕ {new Date(room.season.endsAt).toLocaleString("ru-RU")}
        </p>
      )}
      <div>
        РРіСЂРѕРєРё: {room?.players.map((player) => `${playerLabel(player.userId)}${player.ready ? " РіРѕС‚РѕРІ" : ""}`).join(" / ") ?? "РЅРµС‚ РґР°РЅРЅС‹С…"}
      </div>
      <label>
        РљРѕР»РѕРґР°
        <select value={selectedDeckId} onChange={(event) => onSelectedDeckChange(event.target.value)}>
          {decks.map((deck) => (
            <option value={deck.id} key={deck.id}>
              {deck.name}
            </option>
          ))}
        </select>
      </label>
      <RoomSettingsControls room={room} />
      <RoomReadyButton room={room} selectedDeckId={selectedDeckId} />
    </Panel>
  );
}

