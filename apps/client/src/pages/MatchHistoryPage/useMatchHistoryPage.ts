import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import type { MatchHistoryItem } from "./matchHistoryTypes";

export function useMatchHistoryPage() {
  const [items, setItems] = useState<MatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let active = true;
    apiClient.get<MatchHistoryItem[]>("/api/matches/history")
      .then((history) => {
        if (!active) {
          return;
        }
        setItems(history);
        setLoading(false);
      })
      .catch((caught) => {
        if (!active) {
          return;
        }
        setError(caught instanceof Error ? caught.message : "Ошибка загрузки истории.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { error, items, loading };
}
