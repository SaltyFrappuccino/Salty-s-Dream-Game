import { useSocketStore } from "../../../stores/socketStore";
import { Panel } from "../../ui/Panel/Panel";
import styles from "./MatchLog.module.scss";

export function MatchLog() {
  const match = useSocketStore((state) => state.match);
  const events = match?.eventLog ?? [];

  return (
    <Panel>
      <div className={styles.root}>
        <strong>Лог боя</strong>
        {events.map((event) => (
          <div className={styles.entry} key={event.id}>
            {event.text}
          </div>
        ))}
      </div>
    </Panel>
  );
}
