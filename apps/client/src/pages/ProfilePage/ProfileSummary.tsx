import type { PlayerProfile } from "@sdg/shared";
import { Panel } from "../../components/ui/Panel/Panel";
import sharedStyles from "../shared.module.scss";
import type { ProfileStats } from "./profileStatsTypes";

type Props = {
  profile?: PlayerProfile | null;
  stats: ProfileStats;
};

export function ProfileSummary({ profile, stats }: Props) {
  const registrationDate = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("ru-RU") : "...";

  return (
    <Panel>
      <div className={sharedStyles.stack}>
        <p>РќРёРє: {profile?.displayName ?? "..."}</p>
        <p>ID: {profile?.id ?? "..."}</p>
        <p>РњР°С‚С‡РµР№: {stats.matchesCount}</p>
        <p>РџРѕР±РµРґС‹: {stats.wins}</p>
        <p>РџРѕСЂР°Р¶РµРЅРёСЏ: {stats.losses}</p>
        <p>Р›СЋР±РёРјР°СЏ РєРѕР»РѕРґР°: Р±СѓРґРµС‚ СЂР°СЃСЃС‡РёС‚Р°РЅР° РїРѕСЃР»Рµ РЅР°РєРѕРїР»РµРЅРёСЏ РёСЃС‚РѕСЂРёРё.</p>
        <p>Р”Р°С‚Р° СЂРµРіРёСЃС‚СЂР°С†РёРё: {registrationDate}</p>
      </div>
    </Panel>
  );
}

