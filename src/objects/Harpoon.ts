import { World } from "matter";
import Phaser from "phaser";

export default class Harpoon extends Phaser.Physics.Arcade.Sprite {
    
    public name: string;
    private rotationSpeed: number;
    private launchSpeed: number;
    private returnSpeed: number;
    private harpoonType: string;
    private rotatingForward: boolean;
    private iniTime!: number;
    private amplitude!: number;
    private frecuency!: number;
    private isRotating!: boolean;
    private isLaunched!: boolean;
    private isOutOfBounds!: boolean;
    public originX:number;
    public originY: number;
    
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, name: string, rotationSpeed: number, launchSpeed: number, returnSpeed: number, harpoonType: string) {
    super(scene, x, y, texture);

    this.name = name;
    this.rotationSpeed = rotationSpeed;
    this.launchSpeed = launchSpeed;
    this.returnSpeed = returnSpeed;
    this.harpoonType = harpoonType;
    this.rotatingForward = true    
    this.angle = 0;
    this.originX = x;
    this.originY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    (this.body as Phaser.Physics.Arcade.Body).onWorldBounds = true; 
    
        
  }

  update(time: number, delta: number, iniTime: number) {    
    this.rotate(delta, iniTime);
    if(this.isOutOfBounds){
      this.retrieve();
    }
  }


  public rotate(delta: number, iniTime: number)
    { 
      if(this.isLaunched || this.isRotating) return;
      this.iniTime += delta / 1000;                 
      this.frecuency = Math.PI / this.rotationSpeed;
      this.amplitude = 90;
      
      //creates the pendulum motion of the harpoon
      const angle = this.amplitude * Math.sin(iniTime * this.frecuency);

      this.angle = 90 + angle;                
    }
  
  public launch(){
    if (this.isLaunched) return;

    this.isRotating = false;
    this.isLaunched = true;
       

    // Calcular vector de dirección según el ángulo actual
    const rad = Phaser.Math.DegToRad(this.angle);
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
        
    this.body!.velocity.x = dx * this.launchSpeed;
    this.body!.velocity.y = dy * this.launchSpeed;
    
    // Cuando toca un borde, cambiar a retrieve
    this.scene.physics.world.on("worldbounds", (body: any) => {
      if (body.gameObject === this) {
        const launchBtn = this.scene.children.getByName("launchBtn") as Phaser.GameObjects.Text
        launchBtn.visible = false;
        this.isOutOfBounds = true;
        this.retrieve();        
      }
    });
  }

    
    
  public retrieve(){
    console.log("entro");
    this.body?.stop();
    const retrieveBtn = this.scene.children.getByName("RetrieveBtn") as Phaser.GameObjects.Text
    retrieveBtn.visible = true;

    

    this.scene.physics.moveTo(this, this.originX, this.originY, this.returnSpeed);

    if (Phaser.Math.Distance.Between(this.x, this.y, this.originX, this.originY) < 10) {
      console.log(this.x, this.y, this.originX, this.originY);
      this.body?.stop();
      this.setPosition(this.originX, this.originY);
      this.isLaunched = false;
      this.isOutOfBounds = false;
      
      retrieveBtn.visible = false;
      const launchBtn = this.scene.children.getByName("launchBtn") as Phaser.GameObjects.Text
      launchBtn.visible = true;
    }
  }

  public pullStep(){
    this.scene.physics.moveTo(this, this.originX, this.originY, 1000);
  }

  
}