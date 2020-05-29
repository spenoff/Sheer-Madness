import { Level } from "./Level.js"
import { GameScene } from "./GameScene.js";

export class Level7 extends Level {
    constructor() {
        super('Level7');
        
    }

    create() {
        super.create();
        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv7');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);

        this.level = this.add.text(0, 0, "Level 7", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.level.setX(1920 - this.level.width);
    
        this.setRequiredScore(500);

        this.createBoxOfFences(32, 32, 40, 31);
        this.createFinishSpace(32*34, 32, 32*8, 32*32);

        this.setPlayerPosition(32*3, 32*16);
        this.createSheep(32*7, 32*13);
        this.createSheep(32*7, 32*16);
        this.createSheep(32*7, 32*19);

        this.createVerticalFences(32*10, 32, 13);
        this.createVerticalFences(32*10, 32*33, 13, -1);
        this.createVerticalFences(32*34, 32, 13);
        this.createVerticalFences(32*34, 32*33, 13, -1);

        //Pond
        for(var i=2; i<=32; i++) {
            if(i>=15 && i <=19) {
                continue;
            }
            this.createPond(32*11, 32*i);
            this.createPond(32*12, 32*i);
            this.createPond(32*13, 32*i);
            // this.createPond(32*14, 32*i);
            // this.createPond(32*15, 32*i);
            // this.createPond(32*16, 32*i);
            this.createPond(32*17, 32*i);
            this.createPond(32*18, 32*i);
            this.createPond(32*19, 32*i);
            this.createPond(32*20, 32*i);
            // this.createPond(32*21, 32*i);
            // this.createPond(32*22, 32*i);
            // this.createPond(32*23, 32*i);
            this.createPond(32*24, 32*i);
            this.createPond(32*25, 32*i);
            this.createPond(32*26, 32*i);
            this.createPond(32*27, 32*i);
            // this.createPond(32*28, 32*i);
            // this.createPond(32*29, 32*i);
            // this.createPond(32*30, 32*i);
            this.createPond(32*31, 32*i);
            this.createPond(32*32, 32*i);
            this.createPond(32*33, 32*i);

        }

        this.createWolf(32*15, 32*3, 0, 170, 300);
        this.createWolf(32*22, 32*31, 0, -170, 300);
        this.createWolf(32*29, 32*3, 0, 170, 300);

        
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start("Level8");
        }
        /*
        this.wolf.children.iterate((child) => {
            console.log(child.x);
        });
        */
    }

}