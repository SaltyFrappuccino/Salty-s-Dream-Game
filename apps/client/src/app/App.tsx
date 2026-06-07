import { useEffect } from "react";
import { SupabaseProvider } from "./providers/SupabaseProvider";
import { SocketProvider } from "./providers/SocketProvider";
import { AppRouter } from "./Router";
import { Panel } from "../components/ui/Panel/Panel";
import { useAuthStore } from "../stores/authStore";
import { useCollectionStore } from "../stores/collectionStore";
import { useDeckStore } from "../stores/deckStore";
import { useGachaStore } from "../stores/gachaStore";
import { usePlayerStore } from "../stores/playerStore";
import { useProgressStore } from "../stores/progressStore";

export function App() {
  const initAuth = useAuthStore((state) => state.init);
  const displayName = useAuthStore((state) => state.displayName);
  const authInitialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initProgress = useProgressStore((state) => state.init);
  const progressInitialized = useProgressStore((state) => state.initialized);
  const progressMode = useProgressStore((state) => state.mode);
  const activeSeasonId = useProgressStore((state) => state.activeSeason?.id);
  const loadSeasons = useProgressStore((state) => state.loadSeasons);
  const bootstrap = usePlayerStore((state) => state.bootstrap);
  const loadPlayer = usePlayerStore((state) => state.load);
  const loadCatalog = useCollectionStore((state) => state.loadCatalog);
  const loadDecks = useDeckStore((state) => state.load);
  const loadBanners = useGachaStore((state) => state.loadBanners);

  useEffect(() => {
    initAuth();
    initProgress();
  }, [initAuth, initProgress]);

  useEffect(() => {
    if (!authInitialized || !progressInitialized || !isAuthenticated) {
      return;
    }

    void (async () => {
      if (progressMode === "SEASON") {
        await loadSeasons();
      }

      await Promise.all([
        bootstrap(displayName).then(loadPlayer),
        loadCatalog(),
        loadDecks(),
        loadBanners()
      ]);
    })();
  }, [
    authInitialized,
    progressInitialized,
    isAuthenticated,
    displayName,
    progressMode,
    activeSeasonId,
    loadSeasons,
    bootstrap,
    loadPlayer,
    loadCatalog,
    loadDecks,
    loadBanners
  ]);

  if (!authInitialized || !progressInitialized) {
    return <Panel>Загрузка...</Panel>;
  }

  return (
    <SupabaseProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </SupabaseProvider>
  );
}
