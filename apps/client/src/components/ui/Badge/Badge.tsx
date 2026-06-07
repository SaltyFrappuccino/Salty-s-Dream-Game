import type { PropsWithChildren } from "react";
import styles from "./Badge.module.scss";

export function Badge({ children }: PropsWithChildren) {
  return <span className={styles.root}>{children}</span>;
}
