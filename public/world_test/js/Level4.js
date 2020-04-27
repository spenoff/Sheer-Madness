import { Level } from "./Level.js";

export class Level4 extends Level {
    constructor() {
        super('Level4');
        this.requiredScore = 500;
    }

    create() {
        super.create();

        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);

        this.setPlayerPosition(32 + 336, 950);
        this.createSheep(32 + 336, 850);

        this.createWolf(288, 672, 100, 100);
        this.createWolf(488, 672, 100, 100);
        this.createHorizontalFences(32, 386, 14, 1);
        this.createHorizontalFences(288, 704, 14, 1);
    }

    update() {
        super.update();
    }
}