import { useEffect, useRef } from "react";
import Phaser from "phaser";
import type { MatchState } from "@sdg/shared";
import { PreloadScene } from "./scenes/PreloadScene";
import { BattleScene } from "./scenes/BattleScene";
import { publishMatchState } from "./phaserEvents";

type Props = {
  height?: number;
  match: MatchState | null;
};

export function PhaserGame({ height = 420, match }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) {
      return;
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 960,
      height,
      parent: containerRef.current,
      scene: [PreloadScene, BattleScene]
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    publishMatchState(match);
  }, [match]);

  return <div ref={containerRef} />;
}

