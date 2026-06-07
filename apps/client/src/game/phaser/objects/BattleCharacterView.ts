import Phaser from "phaser";
import type { MatchCharacterState } from "@sdg/shared";

export class BattleCharacterView extends Phaser.GameObjects.Container {
  private readonly hpText: Phaser.GameObjects.Text;
  private readonly resourceText: Phaser.GameObjects.Text;
  private readonly plate: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number, character: MatchCharacterState, enemy: boolean) {
    super(scene, x, y);
    this.plate = scene.add.rectangle(0, 0, 180, 86, enemy ? 0x311014 : 0x111827, 0.92).setStrokeStyle(1, enemy ? 0xd73737 : 0xd8a74a);
    const nameText = scene.add.text(-82, -34, character.displayName, { color: "#f4f1ea", fontSize: "16px" });
    this.hpText = scene.add.text(-82, -8, "", { color: "#ffcc66", fontSize: "13px" });
    this.resourceText = scene.add.text(-82, 14, "", { color: "#c8c2b8", fontSize: "12px" });
    this.add([this.plate, nameText, this.hpText, this.resourceText]);
    this.updateCharacter(character);
    scene.add.existing(this);
  }

  updateCharacter(character: MatchCharacterState): void {
    this.hpText.setText(`HP ${character.hp}/${character.maxHp}`);
    this.resourceText.setText(`Р”Р­ ${character.spiritualEnergy}/${character.maxSpiritualEnergy}  Р’Р«Рќ ${character.stamina}/${character.maxStamina}`);
    this.setAlpha(character.defeated ? 0.38 : 1);
    this.plate.setFillStyle(character.defeated ? 0x1b1b22 : Number(this.plate.fillColor), character.defeated ? 0.65 : 0.92);
  }

  pulseDamage(): void {
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.06,
      scaleY: 1.06,
      yoyo: true,
      duration: 90
    });
  }
}

