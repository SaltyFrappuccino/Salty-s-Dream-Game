import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { socketClient } from "../../services/socketClient";
import { useAuthStore } from "../../stores/authStore";
import { useProgressStore } from "../../stores/progressStore";
import { useSocketStore } from "../../stores/socketStore";

export function SocketProvider({ children }: PropsWithChildren) {
  const connect = useSocketStore((state) => state.connect);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const mode = useProgressStore((state) => state.mode);
  const activeSeasonId = useProgressStore((state) => state.activeSeason?.id);

  useEffect(() => {
    if (isAuthenticated) {
      socketClient.disconnect();
      connect();
      return;
    }

    socketClient.disconnect();
  }, [connect, isAuthenticated, mode, activeSeasonId]);

  return <>{children}</>;
}
