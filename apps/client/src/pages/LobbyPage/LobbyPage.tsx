import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import { useLobbyPage } from "./useLobbyPage";

export function LobbyPage() {
  const lobby = useLobbyPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <section className={sharedStyles.hero}>
          <h1>Сезоны</h1>
          <p>
            Здесь создаются живые лобби на несколько дней. Внутри сезона у игроков отдельный прогресс,
            своя валюта, своя коллекция и собственная мета для карточных боёв.
          </p>
          <div className={sharedStyles.grid}>
            <Panel>
              <div className={sharedStyles.stack}>
                <h2>Текущий режим</h2>
                <p>
                  {lobby.mode === "SEASON" && lobby.activeSeason
                    ? `Активен сезон "${lobby.activeSeason.name}" до ${new Date(lobby.activeSeason.endsAt).toLocaleString("ru-RU")}`
                    : "Сейчас активен локальный профиль без сезонного лобби."}
                </p>
                {lobby.mode === "SEASON" && (
                  <Button variant="secondary" onClick={lobby.setLocalMode}>
                    Вернуться к локальному профилю
                  </Button>
                )}
              </div>
            </Panel>
            <Panel>
              <div className={sharedStyles.stack}>
                <h2>Быстрый вход в бой</h2>
                <Button onClick={lobby.createRoom}>Создать PvP-комнату</Button>
                <Input
                  value={lobby.roomId}
                  onChange={(event) => lobby.updateRoomId(event.target.value)}
                  placeholder="Код комнаты"
                />
                <Button variant="secondary" onClick={lobby.joinRoom}>Войти по коду</Button>
              </div>
            </Panel>
          </div>
        </section>

        <div className={sharedStyles.grid}>
          <Panel>
            <div className={sharedStyles.stack}>
              <h2>Запустить новый сезон</h2>
              <p>Создай отдельное недельное или короткое лобби для своей компании.</p>
              <Input
                value={lobby.seasonName}
                onChange={(event) => lobby.updateSeasonName(event.target.value)}
                placeholder="Название сезона"
              />
              <Input
                value={lobby.seasonDurationDays}
                onChange={(event) => lobby.updateSeasonDurationDays(event.target.value)}
                placeholder="Длительность в днях"
                type="number"
              />
              <Button onClick={() => void lobby.submitSeasonCreate()}>Запустить сезон</Button>
            </div>
          </Panel>

          <Panel>
            <div className={sharedStyles.stack}>
              <h2>Подключиться к сезону</h2>
              <p>Если друг уже поднял лобби, введи код и перейди в его мету.</p>
              <Input
                value={lobby.seasonCode}
                onChange={(event) => lobby.updateSeasonCode(event.target.value.toUpperCase())}
                placeholder="Код сезона"
              />
              <Button variant="secondary" onClick={() => void lobby.submitSeasonJoin()}>
                Войти в сезон
              </Button>
            </div>
          </Panel>
        </div>

        <Panel>
          <div className={sharedStyles.stack}>
            <h2>Активные сезоны</h2>
            {lobby.seasons.length === 0 && <p>Активных сезонов пока нет.</p>}
            {lobby.seasons.length > 0 && (
              <div className={sharedStyles.grid}>
                {lobby.seasons.map((season) => (
                  <div key={season.id}>
                    <strong>{season.name}</strong>
                    <div>Код входа: {season.joinCode}</div>
                    <div>Завершение: {new Date(season.endsAt).toLocaleString("ru-RU")}</div>
                    <div>Статус: {season.status === "Active" ? "Активен" : "Завершён"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}
