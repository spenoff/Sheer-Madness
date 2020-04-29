import { Level } from "./Level.js"

export class Level0 extends Level {
    constructor() {
        super('Level0');
        
    }

    create() {
        super.create();
    
        this.setPlayerPosition(800, 800);
        this.createSheep(900, 600);
        this.createPond(400, 700);
        this.createFinishSpace(800, 100, 128, 128);

        this.createVerticalFences(400, 32, 10);
        this.createHorizontalFences(600, 700, 15);

        this.createWolf(200, 400, 120, 0, 1500);
        this.createWolf(300, 700, 120, 0, 1500)
    }

    update() {
        super.update();
    }
}