import type { MatchCharacterState } from "@sdg/shared";
import { Button } from "../../components/ui/Button/Button";
import { emitBasicAttack, emitConcede, emitDefend, emitEndTurn, emitFocus, emitRest } from "./battleSocketActions";

type Props = {
  disabled: boolean;
  matchId: string;
  playerId: string;
  source?: MatchCharacterState;
  target?: MatchCharacterState;
};

export function BattleActions({ disabled, matchId, playerId, source, target }: Props) {
  if (!source) {
    return null;
  }

  return (
    <div>
      <Button disabled={disabled || !target} onClick={() => target && emitBasicAttack(matchId, playerId, source.instanceId, target.instanceId)}>
        Р‘Р°Р·РѕРІР°СЏ Р°С‚Р°РєР°
      </Button>{" "}
      <Button variant="secondary" disabled={disabled} onClick={() => emitDefend(matchId, playerId, source.instanceId)}>
        Р—Р°С‰РёС‚Р°
      </Button>{" "}
      <Button variant="secondary" disabled={disabled} onClick={() => emitFocus(matchId, playerId, source.instanceId)}>
        Р¤РѕРєСѓСЃ
      </Button>{" "}
      <Button variant="secondary" disabled={disabled} onClick={() => emitRest(matchId, playerId, source.instanceId)}>
        РћС‚РґС‹С…
      </Button>{" "}
      <Button variant="secondary" disabled={disabled} onClick={() => emitEndTurn(matchId, playerId)}>
        Р—Р°РІРµСЂС€РёС‚СЊ С…РѕРґ
      </Button>{" "}
      <Button variant="secondary" onClick={() => emitConcede(matchId, playerId)}>
        РЎРґР°С‚СЊСЃСЏ
      </Button>
    </div>
  );
}

