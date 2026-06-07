import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x181822, 1);
    graphics.fillRoundedRect(0, 0, 128, 128, 16);
    graphics.lineStyle(2, 0xd73737, 0.8);
    graphics.strokeRoundedRect(1, 1, 126, 126, 16);
    graphics.generateTexture("placeholder", 128, 128);
    graphics.destroy();
    this.scene.start("BattleScene");
  }
}
