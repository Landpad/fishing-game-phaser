import Phaser from "phaser";

export default class Fish extends Phaser.Physics.Arcade.Sprite {  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, minSpeed: number, maxSpeed: number) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    const velocity = Phaser.Math.Between(minSpeed, maxSpeed) * -1;    
    this.setVelocityX(velocity);
  }

  
}