import type { PropsWithChildren } from "react";
import styles from "./Panel.module.scss";

export function Panel({ children }: PropsWithChildren) {
  return <section className={styles.root}>{children}</section>;
}
