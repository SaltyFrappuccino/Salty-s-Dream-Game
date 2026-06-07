import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import { RoomControls } from "./RoomControls";
import { useRoomPage } from "./useRoomPage";

export function RoomPage() {
  const roomPage = useRoomPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Комната</h1>
        {!roomPage.room && (
          <Panel>
            <div>Подключаемся к комнате. Если ты пришёл по ссылке-приглашению, состояние появится автоматически.</div>
          </Panel>
        )}
        <RoomControls
          decks={roomPage.decks}
          room={roomPage.room}
          selectedDeckId={roomPage.selectedDeckId}
          onSelectedDeckChange={roomPage.setSelectedDeckId}
        />
      </div>
    </PageContainer>
  );
}
