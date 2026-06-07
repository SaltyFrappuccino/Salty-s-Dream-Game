import { Outlet } from "react-router-dom";
import { TopBar } from "../TopBar/TopBar";
import { SocketErrorBanner } from "../SocketErrorBanner";
import styles from "./AppShell.module.scss";

export function AppShell() {
  return (
    <div className={styles.root}>
      <TopBar />
      <SocketErrorBanner />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
