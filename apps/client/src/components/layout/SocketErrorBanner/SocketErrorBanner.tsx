import { useSocketStore } from "../../../stores/socketStore";
import styles from "./SocketErrorBanner.module.scss";

export function SocketErrorBanner() {
  const error = useSocketStore((state) => state.error);
  const clearError = useSocketStore((state) => state.clearError);
  if (!error) {
    return null;
  }

  return (
    <div className={styles.root} role="alert">
      <span>{error.message}</span>
      <button type="button" onClick={clearError}>Закрыть</button>
    </div>
  );
}
