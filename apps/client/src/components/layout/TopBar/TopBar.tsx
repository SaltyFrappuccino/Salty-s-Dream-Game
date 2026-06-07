import { Link } from "react-router-dom";
import { PageContainer } from "../PageContainer/PageContainer";
import { CurrencyBar } from "../../game/CurrencyBar/CurrencyBar";
import styles from "./TopBar.module.scss";

export function TopBar() {
  return (
    <header className={styles.root}>
      <PageContainer>
        <div className={styles.inner}>
          <Link className={styles.brand} to="/">
            SDG
          </Link>
          <nav className={styles.nav}>
            <Link className={styles.link} to="/collection">Коллекция</Link>
            <Link className={styles.link} to="/decks">Колоды</Link>
            <Link className={styles.link} to="/gacha">Призыв</Link>
            <Link className={styles.link} to="/lobby">Сезоны</Link>
            <Link className={styles.link} to="/matches">История</Link>
          </nav>
          <CurrencyBar />
        </div>
      </PageContainer>
    </header>
  );
}
