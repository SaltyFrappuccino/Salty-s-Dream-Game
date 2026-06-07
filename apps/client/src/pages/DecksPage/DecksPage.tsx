import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { useDeckStore } from "../../stores/deckStore";
import sharedStyles from "../shared.module.scss";
import { DeckCard } from "./DeckCard";

export function DecksPage() {
  const decks = useDeckStore((state) => state.decks);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Колоды</h1>
        <Button onClick={() => navigate("/deck-builder")}>Создать колоду</Button>
        <div className={sharedStyles.grid}>
          {decks.map((deck) => (
            <DeckCard deck={deck} key={deck.id} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
