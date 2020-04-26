import { Level } from "./Level.js"

export class Level3 extends Level {
    constructor() {
        super('Level3');
    }

    create() {
        super.create();
    
        this.setRequiredScore(500);
        this.setPlayerPosition(800, 800);
        this.createSheep(836, 800);

        this.createPond(70,600);
        this.createPond(70,632);

        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);
    }

    update() {
        super.update();
    }
}