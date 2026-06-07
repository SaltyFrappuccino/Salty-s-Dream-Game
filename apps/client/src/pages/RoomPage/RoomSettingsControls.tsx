import type { RoomState } from "@sdg/shared";
import { Toggle } from "../../components/ui/Toggle/Toggle";
import { socketClient } from "../../services/socketClient";

export function RoomSettingsControls({ room }: { room: RoomState | null }) {
  return (
    <>
      <Toggle
        label="Normalized PvP"
        checked={room?.settings.normalizedPvP ?? true}
        onChange={(checked) => {
          if (room) {
            socketClient.emit("room:update-settings", {
              roomId: room.roomId,
              normalizedPvP: checked,
              turnTimerSeconds: room.settings.turnTimerSeconds
            });
          }
        }}
      />
      {room && <TurnTimerSelect room={room} />}
    </>
  );
}

function TurnTimerSelect({ room }: { room: RoomState }) {
  return (
    <label>
      Таймер хода
      <select
        value={room.settings.turnTimerSeconds}
        onChange={(event) => {
          socketClient.emit("room:update-settings", {
            roomId: room.roomId,
            normalizedPvP: room.settings.normalizedPvP,
            turnTimerSeconds: Number(event.target.value)
          });
        }}
      >
        <option value={60}>60 секунд</option>
        <option value={90}>90 секунд</option>
        <option value={120}>120 секунд</option>
      </select>
    </label>
  );
}
