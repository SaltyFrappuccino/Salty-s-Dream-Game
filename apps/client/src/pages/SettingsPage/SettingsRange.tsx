type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export function SettingsRange({ label, value, onChange }: Props) {
  return (
    <label>
      {label}: {value}%
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
