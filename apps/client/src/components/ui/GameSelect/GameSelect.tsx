import { useEffect, useId, useRef, useState } from "react";
import styles from "./GameSelect.module.scss";

export type GameSelectOption = {
  disabled?: boolean;
  label: string;
  meta?: string;
  value: string;
};

type Props = {
  label: string;
  onChange: (value: string) => void;
  options: GameSelectOption[];
  placeholder?: string;
  value: string;
};

export function GameSelect({ label, onChange, options, placeholder = "Выберите значение", value }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectOption(option: GameSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange(option.value);
    setOpen(false);
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <span className={styles.label}>{label}</span>
      <button
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        type="button"
      >
        <span>{selected?.label ?? placeholder}</span>
        <span aria-hidden="true" className={styles.chevron}>⌄</span>
      </button>
      {open && (
        <div className={styles.options} id={listboxId} role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className={styles.option}
              disabled={option.disabled}
              key={option.value}
              onClick={() => selectOption(option)}
              role="option"
              type="button"
            >
              <span>{option.label}</span>
              {option.meta && <small>{option.meta}</small>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
