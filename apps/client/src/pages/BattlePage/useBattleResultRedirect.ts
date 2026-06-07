import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { MatchState } from "@sdg/shared";

export function useBattleResultRedirect(match: MatchState | null): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (match?.turn.phase === "Finished") {
      navigate("/result");
    }
  }, [match?.turn.phase, navigate]);
}

