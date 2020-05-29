import { Level } from "./Level.js";
import { GameScene } from "./GameScene.js";

export class Level1 extends Level {
    constructor() {
        super('Level1');
        this.requiredScore = 500;
    }

    create() {
        super.create();

        this.game.sound.stopAll();
        //this.game.sound.context.resume();

        this.lvdone = false;

        this.music = this.game.sound.add('lv1');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);

        this.level = this.add.text(0, 0, "Level 1", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.level.setX(1920 - this.level.width);

        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);

        this.setPlayerPosition(32 + 336, 950);
        this.createSheep(32 + 336, 850);

        this.createHorizontalFences(32, 386, 14, 1);
        this.createHorizontalFences(288, 704, 14, 1);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level2');
        }
    }
}