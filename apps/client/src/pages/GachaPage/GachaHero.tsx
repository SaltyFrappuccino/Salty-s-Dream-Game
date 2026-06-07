import type { BannerDefinition } from "@sdg/shared";
import { Button } from "../../components/ui/Button/Button";
import styles from "./GachaPage.module.scss";

type Props = {
  activeBannerId: string;
  banners: BannerDefinition[];
  loading: boolean;
  onBannerChange: (bannerId: string) => void;
  onRollOne: () => void;
  onRollTen: () => void;
};

export function GachaHero({ activeBannerId, banners, loading, onBannerChange, onRollOne, onRollTen }: Props) {
  const activeBanner = banners.find((banner) => banner.id === activeBannerId);

  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.eyebrow}>Призыв</span>
        <h1>{activeBanner?.name ?? "Зачарованные клинки"}</h1>
        <p>
          {activeBanner?.description
            ?? "Сначала тратятся билеты призыва. Если билетов не хватает, остаток оплачивается иенами."}
        </p>
      </div>
      <div className={styles.ratePanel}>
        <span>Шансы баннера</span>
        <strong>UR 3%</strong>
        <small>SSR 12% · SR 30% · R 55%</small>
      </div>
      <div className={styles.bannerTabs}>
        {banners.map((banner) => (
          <Button
            disabled={loading}
            key={banner.id}
            onClick={() => onBannerChange(banner.id)}
            variant={banner.id === activeBannerId ? "primary" : "secondary"}
          >
            {banner.type === "weapon" ? "Оружие" : "Персонажи"}
          </Button>
        ))}
      </div>
      <div className={styles.actions}>
        <Button disabled={loading} onClick={onRollOne}>Крутка x1 · 1 билет / ¥ 1000</Button>
        <Button disabled={loading} onClick={onRollTen} variant="secondary">Крутка x10 · билеты сначала / до ¥ 9000</Button>
      </div>
    </section>
  );
}
