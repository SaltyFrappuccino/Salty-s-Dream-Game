import { Link } from "react-router-dom";
import type { HomeAction } from "./homeActions";
import styles from "./HomePage.module.scss";

type Props = {
  actions: HomeAction[];
};

export function HomeActionGrid({ actions }: Props) {
  return (
    <div className={styles.menuGrid}>
      {actions.map((action) => (
        <Link className={`${styles.menuCard} ${styles[action.tone]}`} key={action.to} to={action.to}>
          <span className={styles.menuKicker}>{action.kicker}</span>
          <strong>{action.label}</strong>
          <span>{action.description}</span>
        </Link>
      ))}
    </div>
  );
}
