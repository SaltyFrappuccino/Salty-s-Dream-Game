import type { CardDefinition, MatchCardInstance, MatchCharacterState } from "@sdg/shared";
import { Button } from "../../components/ui/Button/Button";
import { emitDiscardDeadCard, emitPlayCard } from "./battleSocketActions";

type Props = {
  cardsById: Map<string, CardDefinition>;
  disabled: boolean;
  hand: MatchCardInstance[];
  matchId: string;
  playerId: string;
  source?: MatchCharacterState;
  target?: MatchCharacterState;
  team: MatchCharacterState[];
};

export function BattleHand({ cardsById, disabled, hand, matchId, playerId, source, target, team }: Props) {
  if (hand.length === 0) {
    return <p>Р СѓРєР° РїСѓСЃС‚Р°.</p>;
  }

  return (
    <div>
      <h2>Р СѓРєР°</h2>
      {hand.map((cardInstance) => {
        const card = cardsById.get(cardInstance.cardId);
        const owner = card?.ownerCharacterVersionId
          ? team.find((character) => character.characterVersionId === card.ownerCharacterVersionId)
          : source;
        const canDiscardDead = Boolean(owner?.defeated && card?.ownerCharacterVersionId);
        const targetId = card?.targetMode === "EnemyCharacter" ? target?.instanceId : owner?.instanceId ?? source?.instanceId;

        return (
          <div key={cardInstance.instanceId}>
            <strong>{card?.name ?? cardInstance.cardId}</strong>{" "}
            <Button disabled={disabled || !card || !owner || owner.defeated} onClick={() => emitPlayCard(matchId, playerId, cardInstance.instanceId, owner?.instanceId, targetId)}>
              РРіСЂР°С‚СЊ
            </Button>{" "}
            {canDiscardDead && (
              <Button variant="secondary" onClick={() => emitDiscardDeadCard(matchId, playerId, cardInstance.instanceId)}>
                РЎР±СЂРѕСЃРёС‚СЊ СЂР°РґРё РґРѕР±РѕСЂР°
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

