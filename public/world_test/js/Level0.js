import { Level } from "./Level.js"

export class Level0 extends Level {
    constructor() {
        super('Level0');
        
    }

    create() {
        super.create();
    
        this.setPlayerPosition(900, 800);
        this.createSheep(900, 600);
        this.createPond(400, 700);
        this.createFinishSpace(800, 100, 128, 128);

        //this.createVerticalFences(400, 32, 10);
        //this.createHorizontalFences(600, 700, 15);

        //this.createWolf(200, 400, 120, 120, 1000, 1500);
        //this.createWolf(300, 700, 120, 0, 1500)
        //this.createBoxOfFences(0, 0, 60, 30);
        this.createHorizontalFences(900, 450, 1, 1, true, true, true);
    }

    update() {
        super.update();
    }
}