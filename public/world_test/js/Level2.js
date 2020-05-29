import { Level } from "./Level.js";
import { GameScene } from "./GameScene.js";


export class Level2 extends Level {
    constructor() {
        super('Level2');
        this.setRequiredScore(500);
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv2');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);

        this.level = this.add.text(0, 0, "Level 2", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.level.setX(1920 - this.level.width);
        
        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);

        this.setPlayerPosition(32 + 336, 950);
        this.createSheep(32 + 336, 850);

        //this.createSheep(1000, 1000);

        for (var y = 600; y <= 632; y+=32) {
            for (var x = 240; x <= 240 + 32 * 8; x+=32) {
                this.createPond(x, y);
            }
        } 

        for (var x = 64; x <= 32 + 32 * 5; x += 32) {
            this.createPond(x, 300);
        }
        for (var x = 672; x >= 672 - 32 * 5; x -= 32) {
            this.createPond(x, 300);
        }


    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level3');
        }
    }
}