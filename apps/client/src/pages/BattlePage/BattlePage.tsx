import { PhaserGame } from "../../game/phaser/PhaserGame";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { MatchLog } from "../../components/game/MatchLog/MatchLog";
import { TurnTimer } from "../../components/game/TurnTimer/TurnTimer";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import { BattleActions } from "./BattleActions";
import { BattleHand } from "./BattleHand";
import { BattleTeams } from "./BattleTeams";
import { useBattlePage } from "./useBattlePage";
import { useBattleResultRedirect } from "./useBattleResultRedirect";

export function BattlePage() {
  const page = useBattlePage();
  useBattleResultRedirect(page.match);

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Бой</h1>
        <TurnTimer />
        <PhaserGame match={page.match} />
        <Panel>
          <BattleTeams match={page.match} />
          {page.match && <BattleActions disabled={!page.isActiveTurn} matchId={page.match.id} playerId={page.playerId} source={page.source} target={page.target} />}
          {page.match && page.activePlayer && (
            <BattleHand
              cardsById={page.cardsById}
              disabled={!page.isActiveTurn}
              hand={page.activePlayer.hand}
              matchId={page.match.id}
              playerId={page.playerId}
              source={page.source}
              target={page.target}
              team={page.activePlayer.team}
            />
          )}
        </Panel>
        <MatchLog />
      </div>
    </PageContainer>
  );
}
