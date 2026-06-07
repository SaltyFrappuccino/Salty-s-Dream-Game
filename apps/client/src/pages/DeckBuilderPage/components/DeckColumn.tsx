import type { CardDefinition, DeckValidationResult } from "@sdg/shared";
import { Button } from "../../../components/ui/Button/Button";
import { Input } from "../../../components/ui/Input/Input";
import { Panel } from "../../../components/ui/Panel/Panel";
import type { DeckCardEntry } from "../deckBuilder.types";
import styles from "../DeckBuilderPage.module.scss";

type Props = {
  cards: CardDefinition[];
  deckName: string;
  onDeckNameChange: (value: string) => void;
  onRemoveCard: (cardId: string) => void;
  onSave: () => void;
  saveMessage?: string;
  selectedCards: DeckCardEntry[];
  totalCards: number;
  validation: DeckValidationResult;
};

export function DeckColumn({
  cards,
  deckName,
  onDeckNameChange,
  onRemoveCard,
  onSave,
  saveMessage,
  selectedCards,
  totalCards,
  validation
}: Props) {
  return (
    <Panel>
      <div className={styles.section}>
        <h2>РўРµРєСѓС‰Р°СЏ РєРѕР»РѕРґР°</h2>
        <Input value={deckName} onChange={(event) => onDeckNameChange(event.target.value)} />
        <strong className={totalCards === 30 ? styles.success : styles.error}>{totalCards} / 30</strong>
        <div className={styles.list}>
          {selectedCards.map((entry) => {
            const card = cards.find((item) => item.id === entry.cardId);
            return (
              <div className={styles.row} key={entry.cardId}>
                <span>{card?.name ?? entry.cardId} x{entry.quantity}</span>
                <Button variant="secondary" onClick={() => onRemoveCard(entry.cardId)}>-</Button>
              </div>
            );
          })}
        </div>
        {validation.errors.length === 0
          ? <div className={styles.success}>РљРѕР»РѕРґР° РІР°Р»РёРґРЅР°.</div>
          : validation.errors.map((error) => <div className={styles.error} key={error}>{error}</div>)}
        {saveMessage && <div>{saveMessage}</div>}
        <Button onClick={onSave}>РЎРѕС…СЂР°РЅРёС‚СЊ</Button>
      </div>
    </Panel>
  );
}

