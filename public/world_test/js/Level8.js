import { Level } from "./Level.js";

export class Level8 extends Level {
    constructor() {
        super('Level8');
        this.setRequiredScore(1000);
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        /*
        this.music = this.game.sound.add('lv8');
        this.music.loop = true;
        this.music.play();
        */

        this.createBoxOfFences(32, 32, 25, 30);
        this.createFinishSpace(32, 32, 672+160, 150);

        this.setPlayerPosition(610, 920);
        this.createSheep(610, 700);
        this.createSheep(320, 320);

        this.createHorizontalFences(504, 775, 8, 1, false, false);
        this.createLFence(472, 775, 90);
        this.createLFence(472 + 9 * 32, 775, 180);
        this.createVerticalFences(472, 807, 5, 1, false, true);
        this.createVerticalFences(472 + 9 * 32, 807, 5, 1, false, true);

        this.createHorizontalFences(64, 390, 10, 1, true, false);
        this.createVerticalFences(64 + 10 * 32, 358, 6, -1, false, true);
        this.createLFence(64 + 10 * 32, 390, -90);

        this.createWolf(450, 700, 120, 0, 1800);
    }

    update() {
        super.update();
        if(this.lvdone){
            //this.music.stop();
        }
    }
}