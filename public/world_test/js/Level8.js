import { Level } from "./Level.js";
import { GameScene } from "./GameScene.js";

export class Level8 extends Level {
    constructor() {
        super('Level8');
        this.setRequiredScore(500);
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        
        this.music = this.game.sound.add('lv8');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);
        

       let text = "Try pressing the space bar";
       let style = { font: "65px Arial", fill: "#ff0044", align: "center" };

       var t = this.add.text(900, 800, text, style);

        this.createBoxOfFences(32, 32, 25, 31);
        this.createFinishSpace(32, 32, 672+160, 150);

        this.setPlayerPosition(610, 920);
        this.createSheep(610, 700);
        this.createSheep(250, 280);

        //Dog Box
        this.createHorizontalFences(504, 775, 8, 1, false, false);
        this.createLFence(472, 775, 90);
        this.createLFence(472 + 9 * 32, 775, 180);
        this.createVerticalFences(472, 807, 5, 1, false, true);
        this.createVerticalFences(472 + 9 * 32, 807, 5, 1, false, true);

        //Sheep Box
        this.createHorizontalFences(32, 32*12, 12, 1);
        this.createVerticalFences(32*12, 32, 12, 1);

        this.createWolf(400, 700, 120, 0, 2000);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level9');
        }
    }
}