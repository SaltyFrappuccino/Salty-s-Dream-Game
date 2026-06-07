import { useMemo, useState } from "react";
import type { PlayerDeck, RoomState } from "@sdg/shared";
import { Panel } from "../../components/ui/Panel/Panel";
import { Button } from "../../components/ui/Button/Button";
import { RoomReadyButton } from "./RoomReadyButton";
import { RoomSettingsControls } from "./RoomSettingsControls";

type Props = {
  decks: PlayerDeck[];
  room: RoomState | null;
  selectedDeckId: string;
  onSelectedDeckChange: (deckId: string) => void;
};

export function RoomControls({ decks, room, selectedDeckId, onSelectedDeckChange }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");
  const playerLabel = (userId: string) => userId.split(":").at(-1) ?? userId;

  const inviteLink = useMemo(() => {
    if (!room?.season) {
      return "";
    }

    const url = new URL("/auth", window.location.origin);
    url.searchParams.set("season", room.season.joinCode);
    url.searchParams.set("room", room.roomId);
    return url.toString();
  }, [room]);

  async function copyInviteLink() {
    if (!inviteLink) {
      return;
    }

    await navigator.clipboard.writeText(inviteLink);
    setCopyState("done");
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  return (
    <Panel>
      <p>Код комнаты: {room?.roomId ?? "ожидание"}</p>
      {room?.season && (
        <p>
          Сезон: {room.season.name} до {new Date(room.season.endsAt).toLocaleString("ru-RU")}
        </p>
      )}
      {inviteLink && (
        <div>
          <div>Ссылка-приглашение для второго браузера:</div>
          <div>{inviteLink}</div>
          <Button onClick={() => void copyInviteLink()} variant="secondary">
            {copyState === "done" ? "Ссылка скопирована" : "Скопировать ссылку"}
          </Button>
        </div>
      )}
      <div>
        Игроки: {room?.players.map((player) => `${playerLabel(player.userId)}${player.ready ? " готов" : ""}`).join(" / ") ?? "нет данных"}
      </div>
      <label>
        Колода
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
