import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import sharedStyles from "../shared.module.scss";
import { AvailableCardsColumn } from "./components/AvailableCardsColumn";
import { DeckColumn } from "./components/DeckColumn";
import { TeamColumn } from "./components/TeamColumn";
import styles from "./DeckBuilderPage.module.scss";
import { useDeckBuilder } from "./useDeckBuilder";

export function DeckBuilderPage() {
  const builder = useDeckBuilder();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Конструктор колоды</h1>
        <div className={styles.layout}>
          <TeamColumn characters={builder.characters} onTeamChange={builder.updateTeam} team={builder.team} />
          <AvailableCardsColumn
            cards={builder.filteredCards}
            filter={builder.filter}
            onAddCard={builder.addCard}
            onFilterChange={builder.setFilter}
            selectedCards={builder.selectedCards}
          />
          <DeckColumn
            cards={builder.cards}
            deckName={builder.deckName}
            onDeckNameChange={builder.setDeckName}
            onRemoveCard={builder.removeCard}
            onSave={() => void builder.save()}
            saveMessage={builder.saveMessage}
            selectedCards={builder.selectedCards}
            totalCards={builder.totalCards}
            validation={builder.validation}
          />
        </div>
      </div>
    </PageContainer>
  );
}
