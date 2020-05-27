import { Level } from "./Level.js"
import { GameScene } from "./GameScene.js";

export class Level6 extends Level {
    constructor() {
        super('Level6');
        
    }

    create() {
        super.create();
        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv6');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);
    
        this.setRequiredScore(500);
        this.setPlayerPosition(498, 880);
        this.createSheep(498, 980);
        this.createSheep(398, 880);
        this.createSheep(398, 980);
        this.createBoxOfFences(204, 32, 12, 31);
        this.createFinishSpace(204, 25, 416, 96);

        //Wolf 1
        this.createWolf(550, 498, -180, 180, 1500);
        this.createBoxOfFences(332, 550, 4, 4, false);

        //Wolf 2
        this.createWolf(280, 166, 180, 180, 1500);
        this.createBoxOfFences(332, 218, 4, 4, false);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start("Level7");
        }
        /*
        this.wolf.children.iterate((child) => {
            console.log(child.x);
        });
        */
    }

}