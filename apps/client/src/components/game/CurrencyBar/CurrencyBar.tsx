import { usePlayerStore } from "../../../stores/playerStore";
import styles from "./CurrencyBar.module.scss";

export function CurrencyBar() {
  const wallet = usePlayerStore((state) => state.wallet);

  return (
    <div className={styles.root}>
      <div className={styles.item}>¥ {wallet?.yen ?? 0}</div>
      <div className={styles.item}>🎟 {wallet?.summonTickets ?? 0}</div>
    </div>
  );
}
