import { useNavigate } from "react-router-dom";
import { useSocketStore } from "../../stores/socketStore";

export function useMatchResultPage() {
  const navigate = useNavigate();
  const match = useSocketStore((state) => state.match);
  const playerId = localStorage.getItem("sdg_demo_user") ?? "demo-player";
  const won = match?.winnerUserId === playerId;

  return {
    goHome: () => navigate("/"),
    playAgain: () => navigate("/lobby"),
    resultLabel: match ? (won ? "РџРѕР±РµРґР°" : "РџРѕСЂР°Р¶РµРЅРёРµ") : "РњР°С‚С‡ Р·Р°РІРµСЂС€С‘РЅ",
    match
  };
}

