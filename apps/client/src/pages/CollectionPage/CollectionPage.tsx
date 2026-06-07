import { CharacterCard } from "../../components/game/CharacterCard/CharacterCard";
import { WeaponCard } from "../../components/game/WeaponCard";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Button } from "../../components/ui/Button/Button";
import {
  ownershipFilterGroup,
  rarityFilterGroup,
  roleFilterGroup
} from "./collectionFilters";
import { CollectionFilterDropdown, getActiveFilterCount } from "./CollectionFilterDropdown";
import styles from "./CollectionPage.module.scss";
import { useCollectionPage } from "./useCollectionPage";

export function CollectionPage() {
  const {
    clearFilters,
    filteredCharacters,
    filteredWeapons,
    filters,
    ownedById,
    ownedWeaponsById,
    setView,
    toggleFilter,
    view
  } = useCollectionPage();
  const activeFilterCount = getActiveFilterCount(filters);
  const visibleCount = view === "characters" ? filteredCharacters.length : filteredWeapons.length;

  return (
    <PageContainer>
      <div className={styles.stack}>
        <div className={styles.header}>
          <h1>Коллекция</h1>
          <span>{visibleCount} {view === "characters" ? "персонажей" : "предметов"}</span>
        </div>

        <div className={styles.viewTabs}>
          <Button onClick={() => setView("characters")} variant={view === "characters" ? "primary" : "secondary"}>
            Персонажи
          </Button>
          <Button onClick={() => setView("weapons")} variant={view === "weapons" ? "primary" : "secondary"}>
            Оружие
          </Button>
        </div>

        <div className={styles.filters}>
          <CollectionFilterDropdown
            group={ownershipFilterGroup}
            onToggle={(value) => toggleFilter("ownership", value)}
            selected={filters.ownership}
          />
          <CollectionFilterDropdown
            group={rarityFilterGroup}
            onToggle={(value) => toggleFilter("rarities", value)}
            selected={filters.rarities}
          />
          {view === "characters" && (
            <CollectionFilterDropdown
              group={roleFilterGroup}
              onToggle={(value) => toggleFilter("roles", value)}
              selected={filters.roles}
            />
          )}
          <Button disabled={activeFilterCount === 0} onClick={clearFilters} variant="secondary">
            Сбросить
          </Button>
        </div>

        {view === "characters" ? (
          <div className={styles.characterGrid}>
            {filteredCharacters.map((character) => (
              <CharacterCard
                character={character}
                key={character.id}
                owned={ownedById.has(character.id)}
                shards={ownedById.get(character.id)?.shards}
                stars={ownedById.get(character.id)?.stars}
              />
            ))}
          </div>
        ) : (
          <div className={styles.characterGrid}>
            {filteredWeapons.map((weapon) => (
              <WeaponCard
                key={weapon.id}
                ownedWeapon={ownedWeaponsById.get(weapon.id)}
                weapon={weapon}
              />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
