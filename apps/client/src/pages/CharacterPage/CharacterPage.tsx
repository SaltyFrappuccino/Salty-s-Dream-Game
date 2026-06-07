import { AssetImage } from "../../components/game/AssetImage";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Panel } from "../../components/ui/Panel/Panel";
import { getCharacterFallbackPath, getCharacterFullPath } from "../../services/assetPaths";
import sharedStyles from "../shared.module.scss";
import { CharacterCards } from "./CharacterCards";
import { CharacterDetails } from "./CharacterDetails";
import styles from "./CharacterPage.module.scss";
import { useCharacterPage } from "./useCharacterPage";

export function CharacterPage() {
  const page = useCharacterPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>{page.character?.displayName ?? "Персонаж не найден"}</h1>
        {page.character && (
          <div className={styles.layout}>
            <Panel>
              <AssetImage
                alt={page.character.displayName}
                className={styles.portrait}
                fallbackSrc={getCharacterFallbackPath()}
                src={getCharacterFullPath(page.character)}
              />
            </Panel>
            <CharacterDetails
              character={page.character}
              equippedWeapon={page.equippedWeapon}
              message={page.message}
              nextRequirement={page.nextRequirement}
              onEquipWeapon={(weaponId) => void page.equip(weaponId)}
              onUpgrade={() => void page.upgrade()}
              owned={page.owned}
              ownedWeapons={page.ownedWeaponDefinitions}
            />
          </div>
        )}
        <h2>Карты персонажа</h2>
        <CharacterCards cards={page.characterCards} />
      </div>
    </PageContainer>
  );
}
