import type { MatchState } from "@sdg/shared";
import sharedStyles from "../shared.module.scss";

export function BattleTeams({ match }: { match: MatchState | null }) {
  return (
    <div className={sharedStyles.grid}>
      {match?.players.map((player) => (
        <div key={player.userId}>
          <h2>{player.userId}</h2>
          {player.team.map((character) => (
            <div key={character.instanceId}>
              {character.displayName}: HP {character.hp}/{character.maxHp}, Р”Р­ {character.spiritualEnergy}, Р’Р«Рќ {character.stamina}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

