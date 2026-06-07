import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { usePlayerStore } from "../../stores/playerStore";
import sharedStyles from "../shared.module.scss";
import { ProfileSummary } from "./ProfileSummary";
import { useProfileStats } from "./useProfileStats";

export function ProfilePage() {
  const profile = usePlayerStore((state) => state.profile);
  const stats = useProfileStats();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Профиль</h1>
        <ProfileSummary profile={profile} stats={stats} />
      </div>
    </PageContainer>
  );
}
