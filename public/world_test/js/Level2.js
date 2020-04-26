import { Level } from "./Level.js";

export class Level2 extends Level {
    constructor() {
        super('Level2');
        this.requiredScore = 1000;
    }

    create() {
        super.create();
        
        /*
        this.createVerticalFences(32, 64, 20, 1, false, false);
        this.createVerticalFences(352+32, 64, 20, 1, false, false);
        this.createHorizontalFences(64, 32, 10, 1, false, false);
        this.createHorizontalFences(64, 32+32*20+32, 10, 1, false, false);

        this.createLFence(32, 32, 90);
        this.createLFence(32, 32+32*20+32, 0);
        this.createLFence(352+32, 32, 180);
        this.createLFence(352+32, 32+32*20+32, -90);
        */

        this.createBoxOfFences(32, 32, 20, 30);
    }

    update() {
        super.update();
    }
}