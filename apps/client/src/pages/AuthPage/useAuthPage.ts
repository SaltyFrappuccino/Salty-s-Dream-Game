import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { usePlayerStore } from "../../stores/playerStore";
import { useProgressStore } from "../../stores/progressStore";

export function useAuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const finalize = useAuthStore((state) => state.finalize);
  const clear = useAuthStore((state) => state.clear);
  const bootstrap = usePlayerStore((state) => state.bootstrap);
  const joinSeason = useProgressStore((state) => state.joinSeason);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [lobbyCode, setLobbyCode] = useState(searchParams.get("season") ?? "");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function submit() {
    const normalizedLogin = loginValue.trim();
    const normalizedLobbyCode = lobbyCode.trim().toUpperCase();
    const pendingRoomId = searchParams.get("room")?.trim().toUpperCase();

    setLoading(true);
    setError(undefined);

    try {
      const session = mode === "login"
        ? login(normalizedLogin, password)
        : register(normalizedLogin, password);

      finalize(session);

      if (normalizedLobbyCode) {
        await joinSeason(normalizedLobbyCode);
        await bootstrap(session.displayName);
        navigate(pendingRoomId ? `/lobby?room=${pendingRoomId}` : "/lobby");
        return;
      }

      await bootstrap(session.displayName);
      navigate("/");
    } catch (submissionError) {
      clear();
      navigate("/auth", { replace: true });
      setError(submissionError instanceof Error ? submissionError.message : "Не удалось выполнить вход.");
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    lobbyCode,
    loginValue,
    mode,
    password,
    setLobbyCode,
    setLoginValue,
    setMode,
    setPassword,
    submit
  };
}
