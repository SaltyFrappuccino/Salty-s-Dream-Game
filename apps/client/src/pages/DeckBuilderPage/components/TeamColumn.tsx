import type { CharacterUnit } from "@sdg/shared";
import { GameSelect } from "../../../components/ui/GameSelect";
import { Panel } from "../../../components/ui/Panel/Panel";
import styles from "../DeckBuilderPage.module.scss";

type Props = {
  characters: CharacterUnit[];
  onTeamChange: (slot: 0 | 1 | 2, characterId: string) => void;
  team: [string, string, string];
};

export function TeamColumn({ characters, onTeamChange, team }: Props) {
  return (
    <Panel>
      <div className={styles.section}>
        <h2>Команда</h2>
        {team.map((characterId, index) => (
          <GameSelect
            key={`${characterId}_${index}`}
            label={`Слот ${index + 1}`}
            onChange={(value) => onTeamChange(index as 0 | 1 | 2, value)}
            options={characters.map((character) => ({
              disabled: team.includes(character.id) && character.id !== characterId,
              label: character.displayName,
              meta: `${character.rarity} / ${character.role}`,
              value: character.id
            }))}
            placeholder="Выберите персонажа"
            value={characterId}
          />
        ))}
      </div>
    </Panel>
  );
}
