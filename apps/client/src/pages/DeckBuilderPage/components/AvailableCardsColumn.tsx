import type { CardDefinition } from "@sdg/shared";
import { Button } from "../../../components/ui/Button/Button";
import { Panel } from "../../../components/ui/Panel/Panel";
import { cardTypeFilters, getFilterLabel } from "../deckBuilder.constants";
import type { DeckBuilderFilter, DeckCardEntry } from "../deckBuilder.types";
import { getCardQuantity } from "../deckBuilder.utils";
import styles from "../DeckBuilderPage.module.scss";

type Props = {
  cards: CardDefinition[];
  filter: DeckBuilderFilter;
  onAddCard: (card: CardDefinition) => void;
  onFilterChange: (filter: DeckBuilderFilter) => void;
  selectedCards: DeckCardEntry[];
};

export function AvailableCardsColumn({ cards, filter, onAddCard, onFilterChange, selectedCards }: Props) {
  return (
    <Panel>
      <div className={styles.section}>
        <h2>Р”РѕСЃС‚СѓРїРЅС‹Рµ РєР°СЂС‚С‹</h2>
        <div className={styles.filterRow}>
          {cardTypeFilters.map((item) => (
            <Button
              key={item}
              onClick={() => onFilterChange(item)}
              variant={filter === item ? "primary" : "secondary"}
            >
              {getFilterLabel(item)}
            </Button>
          ))}
        </div>
        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <div className={styles.miniCard} key={card.id}>
              <strong>{card.name}</strong>
              <span className={styles.muted}>{card.type} / {card.rarity}</span>
              <span>{card.description}</span>
              <div className={styles.row}>
                <span>Р’ РєРѕР»РѕРґРµ: {getCardQuantity(selectedCards, card.id)}</span>
                <Button onClick={() => onAddCard(card)}>+</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

