import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import { MatchHistoryCard } from "./MatchHistoryCard";
import { useMatchHistoryPage } from "./useMatchHistoryPage";

export function MatchHistoryPage() {
  const { error, items, loading } = useMatchHistoryPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>История матчей</h1>
        {loading && <Panel>Загрузка...</Panel>}
        {error && <Panel>{error}</Panel>}
        {!loading && !error && items.length === 0 && <Panel>Матчей пока нет.</Panel>}
        <div className={sharedStyles.grid}>
          {items.map((item, index) => (
            <MatchHistoryCard item={item} key={`${item.matchId ?? "match"}_${index}`} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
