import Phaser from "phaser";
import Fish from "../objects/Fish";
import Marlin from "../objects/Marlin";
import Harpoon from "../objects/Harpoon";
import BasicHarpoon from "../objects/BasicHarpoon";
import Button from "../objects/Button";
export default class GameScene extends Phaser.Scene {

  private harpoon!: BasicHarpoon;
  constructor() {
    super("GameScene");
  }

  preload() {
    // más adelante: cargar sprites aquí
  }

  create() {
    const marlin = new Marlin(this, 900, 400);
    this.add.existing(marlin);
    this.physics.add.existing(marlin);

    this.harpoon = new BasicHarpoon(this, 400, 300);
    this.add.existing(this.harpoon);
    this.physics.add.existing(this.harpoon);
    
    new Button(this, 400, 550, "Launch", () => {      
      this.harpoon.launch();
    }).setName("launchBtn").setVisible(true);

    new Button(this, 400, 550, "Retrieve", () => {      
      this.harpoon.pullStep();
    }).setName("RetrieveBtn").setVisible(false);
  }

  update(time: number, delta: number) {    
    this.harpoon.update(time,delta, this.time.now);
    
  }
}