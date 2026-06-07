import type { CardDefinition } from "@sdg/shared";
import { getCardArtPath, getCardFallbackPath } from "../../../services/assetPaths";
import { AssetImage } from "../AssetImage";
import { Badge } from "../../ui/Badge/Badge";
import { Panel } from "../../ui/Panel/Panel";
import styles from "./GameCard.module.scss";

type Props = {
  card: CardDefinition;
};

export function GameCard({ card }: Props) {
  return (
    <Panel>
      <div className={styles.root}>
        <AssetImage className={styles.art} src={getCardArtPath(card)} fallbackSrc={getCardFallbackPath()} alt={card.name} loading="lazy" />
        <strong>{card.name}</strong>
        <div>{card.description}</div>
        <Badge>{card.type}</Badge>
      </div>
    </Panel>
  );
}

