import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Button } from "../../components/ui/Button/Button";
import { HomeActionGrid } from "./HomeActionGrid";
import { homeActions } from "./homeActions";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className={styles.root}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Сезонная мультифандомная арена</span>
            <h1>SDG</h1>
            <p>
              Создавай живые лобби на несколько дней, собирай сезонную команду, открывай героев и снаряжение,
              а карточные бои используй как главный способ решать конфликты внутри сезона.
            </p>
            <div className={styles.heroActions}>
              <Button onClick={() => navigate("/lobby")}>Открыть сезоны</Button>
              <Button variant="secondary" onClick={() => navigate("/deck-builder")}>
                Собрать состав
              </Button>
            </div>
          </div>
          <div className={styles.heroCard} aria-hidden="true">
            <span>СЕЗОН</span>
            <strong>Лобби на 7 дней</strong>
          </div>
        </section>
        <HomeActionGrid actions={homeActions} />
        <section className={styles.statusStrip} aria-label="Сводка сезона">
          <div>
            <span>Формат</span>
            <strong>Лобби + дуэли</strong>
          </div>
          <div>
            <span>Прогресс</span>
            <strong>Локальный и сезонный</strong>
          </div>
          <div>
            <span>Ядро</span>
            <strong>Чистый game-core</strong>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
