import { lazy, Suspense, type ComponentType, type ReactElement } from "react";
import { Navigate, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell/AppShell";
import { Panel } from "../components/ui/Panel/Panel";
import { useAuthStore } from "../stores/authStore";

function lazyPage<T extends ComponentType<object>>(loader: () => Promise<{ [key: string]: T }>, exportName: string) {
  return lazy(async () => {
    const module = await loader();
    return { default: module[exportName] };
  });
}

const AuthPage = lazyPage(() => import("../pages/AuthPage/AuthPage"), "AuthPage");
const HomePage = lazyPage(() => import("../pages/HomePage/HomePage"), "HomePage");
const CollectionPage = lazyPage(() => import("../pages/CollectionPage/CollectionPage"), "CollectionPage");
const CharacterPage = lazyPage(() => import("../pages/CharacterPage/CharacterPage"), "CharacterPage");
const GachaPage = lazyPage(() => import("../pages/GachaPage/GachaPage"), "GachaPage");
const DecksPage = lazyPage(() => import("../pages/DecksPage/DecksPage"), "DecksPage");
const DeckBuilderPage = lazyPage(() => import("../pages/DeckBuilderPage/DeckBuilderPage"), "DeckBuilderPage");
const LobbyPage = lazyPage(() => import("../pages/LobbyPage/LobbyPage"), "LobbyPage");
const RoomPage = lazyPage(() => import("../pages/RoomPage/RoomPage"), "RoomPage");
const BattlePage = lazyPage(() => import("../pages/BattlePage/BattlePage"), "BattlePage");
const MatchResultPage = lazyPage(() => import("../pages/MatchResultPage/MatchResultPage"), "MatchResultPage");
const MatchHistoryPage = lazyPage(() => import("../pages/MatchHistoryPage/MatchHistoryPage"), "MatchHistoryPage");
const ProfilePage = lazyPage(() => import("../pages/ProfilePage/ProfilePage"), "ProfilePage");
const SettingsPage = lazyPage(() => import("../pages/SettingsPage/SettingsPage"), "SettingsPage");
const NotFoundPage = lazyPage(() => import("../pages/NotFoundPage/NotFoundPage"), "NotFoundPage");

function withSuspense(element: ReactElement) {
  return (
    <Suspense fallback={<Panel>Загрузка экрана...</Panel>}>
      {element}
    </Suspense>
  );
}

function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate replace to="/auth" />;
  }

  return <Outlet />;
}

function RequireGuest() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <RequireGuest />,
    children: [
      {
        path: "/auth",
        element: withSuspense(<AuthPage />)
      }
    ]
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AppShell />,
        children: [
          { index: true, element: withSuspense(<HomePage />) },
          { path: "collection", element: withSuspense(<CollectionPage />) },
          { path: "characters/:characterId", element: withSuspense(<CharacterPage />) },
          { path: "gacha", element: withSuspense(<GachaPage />) },
          { path: "decks", element: withSuspense(<DecksPage />) },
          { path: "deck-builder", element: withSuspense(<DeckBuilderPage />) },
          { path: "lobby", element: withSuspense(<LobbyPage />) },
          { path: "room", element: withSuspense(<RoomPage />) },
          { path: "battle", element: withSuspense(<BattlePage />) },
          { path: "result", element: withSuspense(<MatchResultPage />) },
          { path: "matches", element: withSuspense(<MatchHistoryPage />) },
          { path: "profile", element: withSuspense(<ProfilePage />) },
          { path: "settings", element: withSuspense(<SettingsPage />) }
        ]
      }
    ]
  },
  {
    path: "*",
    element: withSuspense(<NotFoundPage />)
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
