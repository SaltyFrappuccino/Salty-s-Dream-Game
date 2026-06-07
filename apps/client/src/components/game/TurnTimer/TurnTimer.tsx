import { useSocketStore } from "../../../stores/socketStore";
import styles from "./TurnTimer.module.scss";

export function TurnTimer() {
  const match = useSocketStore((state) => state.match);

  return (
    <div className={styles.root}>
      Ход: {match?.turn.number ?? 0}
    </div>
  );
}
