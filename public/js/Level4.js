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

        this.level = this.add.text(0, 0, "Level 4", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.level.setX(1920 - this.level.width);

        this.createBoxOfFences(32, 32, 40, 31);
        this.createFinishSpace(32*34, 32, 32*8, 32*5);

        this.setPlayerPosition(32*5, 32*3);
        this.createSheep(32*4, 32*6);
        this.createSheep(32*6, 32*6);
        this.createSheep(32*8, 32*6);

        //Left Wolf
        this.createWolf(32*12, 32*17, 120, 0, 120);
        //Right Wolf
        this.createWolf(32*24, 32*17, 120, 0, 120);

        this.createVerticalFences(32*10, 32, 23);
        this.createVerticalFences(32*34, 32, 23);
        this.createVerticalFences(32*22, 32*33, 23, -1);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level5');
        }
    }
}