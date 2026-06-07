import { create } from "zustand";

export type AnimationQuality = "Low" | "Medium" | "High";

type UiState = {
  musicVolume: number;
  effectsVolume: number;
  animationQuality: AnimationQuality;
  reducedMotion: boolean;
  screenShake: boolean;
  setMusicVolume: (value: number) => void;
  setEffectsVolume: (value: number) => void;
  setAnimationQuality: (value: AnimationQuality) => void;
  setReducedMotion: (value: boolean) => void;
  setScreenShake: (value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  musicVolume: 70,
  effectsVolume: 80,
  animationQuality: "High",
  reducedMotion: false,
  screenShake: true,
  setMusicVolume: (musicVolume) => set({ musicVolume }),
  setEffectsVolume: (effectsVolume) => set({ effectsVolume }),
  setAnimationQuality: (animationQuality) => set({ animationQuality }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setScreenShake: (screenShake) => set({ screenShake })
}));
