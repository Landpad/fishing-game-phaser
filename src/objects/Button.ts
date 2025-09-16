export default class LaunchButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    callback: () => void
  ) {
    super(scene, x, y, label, { fontSize: "24px", color: "#fff" });

    this.setOrigin(0.5);
    this.setInteractive({ useHandCursor: true })
      .on("pointerdown", () => callback());

    scene.add.existing(this);
  }
}