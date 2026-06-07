import styles from "./Toggle.module.scss";

type Props = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Toggle({ label, checked, onChange }: Props) {
  return (
    <label className={styles.root}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
