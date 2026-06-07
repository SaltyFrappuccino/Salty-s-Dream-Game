import type { CharacterUnit } from "@sdg/shared";
import { Link } from "react-router-dom";
import { getCharacterFallbackPath, getCharacterPortraitPath } from "../../../services/assetPaths";
import { Badge } from "../../ui/Badge/Badge";
import { Panel } from "../../ui/Panel/Panel";
import { AssetImage } from "../AssetImage";
import styles from "./CharacterCard.module.scss";

type Props = {
  character: CharacterUnit;
  owned?: boolean;
  shards?: number;
  stars?: number;
};

export function CharacterCard({ character, owned = false, shards = 0, stars = 0 }: Props) {
  return (
    <Panel>
      <Link className={`${styles.root} ${owned ? "" : styles.locked}`} to={`/characters/${character.id}`}>
        <AssetImage
          alt={character.displayName}
          className={styles.portrait}
          fallbackSrc={getCharacterFallbackPath()}
          loading="lazy"
          src={getCharacterPortraitPath(character)}
        />
        <div className={styles.meta}>
          <strong>{character.displayName}</strong>
          <div className={styles.status}>
            <Badge>{character.rarity}</Badge>
            <Badge>{character.role}</Badge>
            <Badge>{owned ? `★ ${stars}` : "Не открыт"}</Badge>
            {owned && <Badge>{shards} осколков</Badge>}
          </div>
        </div>
      </Link>
    </Panel>
  );
}
