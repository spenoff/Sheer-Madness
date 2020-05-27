import { Level } from "./Level.js";
import { GameScene } from "./GameScene.js";

export class Level4 extends Level {
    constructor() {
        super('Level4');
        this.requiredScore = 500;
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv4');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);

        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);

        this.setPlayerPosition(32 + 336, 950);
        this.createSheep(32 + 336, 850);

        this.createWolf(288, 640, 0, -120, 1600);
        this.createWolf(488, 640, 0, -120, 1600);
        this.createHorizontalFences(32, 386, 15, 1);
        this.createHorizontalFences(288, 704, 14, 1);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level5');
        }
    }
}