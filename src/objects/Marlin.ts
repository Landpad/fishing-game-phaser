import Fish from "./Fish";

export default class Marlin extends Fish {
  constructor(scene: Phaser.Scene, x: number, y: number) {

    const minSpeed = 100;
    const maxSpeed = 300;
    
    super(scene, x, y, "marlin", minSpeed, maxSpeed);
      
  }
}