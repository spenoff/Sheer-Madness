import { Level } from "./Level.js";

export class Level2 extends Level {
    constructor() {
        super('Level2');
        this.requiredScore = 1000;
    }

    create() {
        super.create();

        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);

        this.setPlayerPosition(32 + 336, 1000);


    }

    update() {
        super.update();
    }
}