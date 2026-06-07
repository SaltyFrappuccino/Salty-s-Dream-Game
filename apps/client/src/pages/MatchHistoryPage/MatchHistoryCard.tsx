import { Panel } from "../../components/ui/Panel/Panel";
import { getResultLabel } from "./matchHistoryLabels";
import type { MatchHistoryItem } from "./matchHistoryTypes";

type Props = {
  item: MatchHistoryItem;
};

export function MatchHistoryCard({ item }: Props) {
  const finishedAt = item.finishedAt ? new Date(item.finishedAt).toLocaleString("ru-RU") : "Дата неизвестна";

  return (
    <Panel>
      <h2>{getResultLabel(item.result)}</h2>
      <p>Матч: {item.matchId}</p>
      <p>Ходов: {item.turnCount ?? 0}</p>
      <p>Награда: ¥ {item.rewards?.yen ?? 0}</p>
      <p>{item.eligibleForRewards ? "Награда засчитана" : "Награда не выдана"}</p>
      <p>{finishedAt}</p>
    </Panel>
  );
}
