import { useEffect, useMemo, useState } from "react";
import { apiClient } from "../../services/apiClient";
import type { ProfileMatchItem } from "./profileStatsTypes";

export function useProfileStats() {
  const [matches, setMatches] = useState<ProfileMatchItem[]>([]);

  useEffect(() => {
    let active = true;
    apiClient.get<ProfileMatchItem[]>("/api/matches/history")
      .then((history) => {
        if (active) {
          setMatches(history);
        }
      })
      .catch(() => {
        if (active) {
          setMatches([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return useMemo(() => ({
    losses: matches.filter((match) => match.result === "loss").length,
    matchesCount: matches.length,
    wins: matches.filter((match) => match.result === "win").length
  }), [matches]);
}
