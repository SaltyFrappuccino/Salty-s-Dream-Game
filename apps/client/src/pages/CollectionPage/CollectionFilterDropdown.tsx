import { useEffect, useRef, useState } from "react";
import type { CollectionFilterGroup, CollectionFilters } from "./collectionFilters";
import styles from "./CollectionPage.module.scss";

type Props<T extends string> = {
  group: CollectionFilterGroup<T>;
  selected: T[];
  onToggle: (id: T) => void;
};

export function CollectionFilterDropdown<T extends string>({ group, onToggle, selected }: Props<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedCount = selected.length;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className={styles.filterDropdown} ref={rootRef}>
      <button
        aria-expanded={open}
        className={styles.filterTrigger}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        type="button"
      >
        <span>{group.label}</span>
        <strong>{selectedCount === 0 ? "Все" : selectedCount}</strong>
      </button>
      {open && (
        <div className={styles.filterMenu}>
          {group.options.map((option) => (
            <label className={styles.filterOption} key={option.id}>
              <input
                checked={selected.includes(option.id)}
                onChange={() => onToggle(option.id)}
                type="checkbox"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function getActiveFilterCount(filters: CollectionFilters): number {
  return filters.ownership.length + filters.rarities.length + filters.roles.length;
}
