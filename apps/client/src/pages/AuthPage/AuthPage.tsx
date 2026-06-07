import { Panel } from "../../components/ui/Panel/Panel";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { AuthForm } from "./AuthForm";
import { useAuthParallax } from "./useAuthParallax";
import styles from "./AuthPage.module.scss";

export function AuthPage() {
  const parallax = useAuthParallax();

  return (
    <div
      ref={parallax.rootRef}
      className={styles.screen}
      onMouseMove={parallax.handleMouseMove}
      onMouseLeave={parallax.handleMouseLeave}
    >
      <div className={styles.backdrop} />
      <div className={styles.ambient} />
      <div className={styles.grid} />
      <PageContainer>
        <div className={styles.center}>
          <div className={styles.frame}>
            <div className={styles.header}>
              <span className={styles.kicker}>СЕЗОННАЯ АРЕНА ДЛЯ ДРУЗЕЙ</span>
              <span className={styles.brand}>SDG</span>
            </div>
            <div className={styles.card}>
              <Panel>
                <AuthForm />
              </Panel>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
