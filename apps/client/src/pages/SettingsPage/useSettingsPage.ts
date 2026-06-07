import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { usePlayerStore } from "../../stores/playerStore";
import { useProgressStore } from "../../stores/progressStore";
import { useUiStore, type AnimationQuality } from "../../stores/uiStore";

export function useSettingsPage() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clear);
  const displayName = useAuthStore((state) => state.displayName);
  const settings = useUiStore();
  const mode = useProgressStore((state) => state.mode);
  const activeSeason = useProgressStore((state) => state.activeSeason);
  const setLocalMode = useProgressStore((state) => state.setLocalMode);
  const exportLocalProfile = useProgressStore((state) => state.exportLocalProfile);
  const importLocalProfile = useProgressStore((state) => state.importLocalProfile);
  const bootstrap = usePlayerStore((state) => state.bootstrap);
  const loadPlayer = usePlayerStore((state) => state.load);
  const [exportCode, setExportCode] = useState("");
  const [importCode, setImportCode] = useState("");

  const logout = () => {
    clearAuth();
    navigate("/auth");
  };

  const setAnimationQuality = (value: string) => {
    settings.setAnimationQuality(value as AnimationQuality);
  };

  const revealExportCode = async () => {
    const code = await exportLocalProfile();
    setExportCode(code);
  };

  const restoreLocalProfile = async () => {
    await importLocalProfile(importCode);
    setLocalMode();
    await bootstrap(displayName).then(loadPlayer);
  };

  return {
    ...settings,
    activeSeason,
    exportCode,
    importCode,
    logout,
    mode,
    revealExportCode,
    restoreLocalProfile,
    setAnimationQuality,
    setImportCode,
    setLocalMode
  };
}
