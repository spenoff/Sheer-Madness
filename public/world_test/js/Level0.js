import { Level } from "./Level.js"

export class Level0 extends Level {
    constructor() {
        super('Level0');
        
    }

    create() {
        super.create();
    
        //this.setPlayerPosition(900, 1000);
        //this.createSheep(900, 400);
        //this.createPond(400, 700);
        //this.createFinishSpace(800, 100, 128, 128);

        //this.createWolf(900, 520, 0, 120, 3000);
        //this.createWolf(750, 500, 120, 0, 3000);

        //this.createVerticalFences(400, 32, 10);
        //this.createHorizontalFences(600, 700, 15);

        //this.createWolf(200, 400, 120, 120, 1000, 1500);
        //this.createWolf(300, 700, 120, 0, 1500)
        //this.createBoxOfFences(0, 0, 60, 30);
        //this.createHorizontalFences(900, 450, 1, 1, true, true, true);
        this.setPlayerPosition(500, 500);
        this.createSheep(475, 500);
        this.createSheep(525, 500);
        this.createSheep(500, 475);
        this.createSheep(500, 525);
    }

    update() {
        super.update();
    }
}