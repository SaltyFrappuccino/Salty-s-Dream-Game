import { Button } from "../../components/ui/Button/Button";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import { useMatchResultPage } from "./useMatchResultPage";

export function MatchResultPage() {
  const { goHome, match, playAgain, resultLabel } = useMatchResultPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Результат матча</h1>
        <Panel>
          <div className={sharedStyles.stack}>
            <h2>{resultLabel}</h2>
            <p>Матч: {match?.id ?? "нет активных данных"}</p>
            <p>Ходов: {match?.turn.number ?? 0}</p>
            <p>Победа: +1200 иен. Поражение: +500 иен. Награда зависит от антиабуз-проверки сервера.</p>
            <div>
              <Button onClick={playAgain}>Сыграть ещё</Button>
              {" "}
              <Button variant="secondary" onClick={goHome}>На главный экран</Button>
            </div>
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}
