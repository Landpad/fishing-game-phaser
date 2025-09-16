import Harpoon from "./Harpoon";

export default class BasicHarpoon extends Harpoon{
    constructor(scene:Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "basicHarpoon", "basicHarpoon", 3000, 300, 300, "basic");
    }
}