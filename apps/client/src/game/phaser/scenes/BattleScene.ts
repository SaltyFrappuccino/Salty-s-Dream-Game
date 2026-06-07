import Phaser from "phaser";
import type { MatchState } from "@sdg/shared";
import { BattleCharacterView } from "../objects/BattleCharacterView";
import { phaserEvents } from "../phaserEvents";

export class BattleScene extends Phaser.Scene {
  private views = new Map<string, BattleCharacterView>();
  private lastHp = new Map<string, number>();

  constructor() {
    super("BattleScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#07070a");
    this.addBattleBackdrop();
    phaserEvents.addEventListener("match:state", this.handleMatchState);
  }

  shutdown(): void {
    phaserEvents.removeEventListener("match:state", this.handleMatchState);
  }

  private readonly handleMatchState = (event: Event) => {
    const match = (event as CustomEvent<MatchState | null>).detail;
    this.renderMatch(match);
  };

  private addBattleBackdrop(): void {
    this.add.rectangle(480, 210, 900, 320, 0x101017, 0.95).setStrokeStyle(1, 0x4a1f24);
    this.add.text(32, 24, "РџРѕРґРїРѕР»СЊРЅР°СЏ РґСѓСЌР»СЊ", { color: "#d8a74a", fontSize: "22px" });
    this.add.line(480, 210, -380, 0, 380, 0, 0xd73737, 0.35);
  }

  private renderMatch(match: MatchState | null): void {
    if (!match) {
      return;
    }

    match.players.forEach((player, playerIndex) => {
      const y = playerIndex === 0 ? 300 : 110;
      player.team.forEach((character, index) => {
        const x = 190 + index * 285;
        const key = character.instanceId;
        const current = this.views.get(key) ?? new BattleCharacterView(this, x, y, character, playerIndex === 1);
        this.views.set(key, current);
        current.updateCharacter(character);

        const previousHp = this.lastHp.get(key);
        if (previousHp !== undefined && character.hp < previousHp) {
          current.pulseDamage();
          this.showDamageNumber(x, y - 58, previousHp - character.hp);
        }
        this.lastHp.set(key, character.hp);
      });
    });
  }

  private showDamageNumber(x: number, y: number, value: number): void {
    const text = this.add.text(x, y, `-${value}`, { color: "#ff4d4d", fontSize: "24px", fontStyle: "bold" }).setOrigin(0.5);
    this.tweens.add({
      targets: text,
      y: y - 34,
      alpha: 0,
      duration: 700,
      onComplete: () => text.destroy()
    });
  }
}

