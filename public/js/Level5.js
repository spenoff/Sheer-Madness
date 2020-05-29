import { Level } from "./Level.js"
import { GameScene } from "./GameScene.js";

export class Level5 extends Level {
    constructor() {
        super('Level5');
        
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv5');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);
    
        this.setRequiredScore(500);

        this.createBoxOfFences(32, 32, 40, 31);
        this.createFinishSpace(32*37, 32, 32*5, 32*32);

        //Dog Box
        this.createHorizontalFences(32, 32*14, 37);
        this.createHorizontalFences(32, 32*20, 37);
        this.createVerticalFences(32*37,32*14, 7);
        
        this.setPlayerPosition(32*3, 32*17);
        this.createSheep(32*4, 32*12);
        this.createSheep(32*4, 32*22);

        //Top Maze
        this.createVerticalFences(32*9, 32*14, 8, -1);
        this.createVerticalFences(32*18, 32, 8, 1);

        //Bottom Maze
        this.createVerticalFences(32*9, 32*20, 8, 1);
        this.createVerticalFences(32*18, 32*33, 8, -1);

        //Ponds
        for(var i=24; i<=36; i++) {
            //Top Pond Top
            this.createPond(32*i, 32*2);
            this.createPond(32*i, 32*3);
            this.createPond(32*i, 32*4);
            this.createPond(32*i, 32*5);
            //Top Pond Bottom
            this.createPond(32*i, 32*10);
            this.createPond(32*i, 32*11);
            this.createPond(32*i, 32*12);
            this.createPond(32*i, 32*13);
            //Bottom Pond Top
            this.createPond(32*i, 32*21);
            this.createPond(32*i, 32*22);
            this.createPond(32*i, 32*23);
            this.createPond(32*i, 32*24);
            //Bottom Pond Bottom
            this.createPond(32*i, 32*29);
            this.createPond(32*i, 32*30);
            this.createPond(32*i, 32*31);
            this.createPond(32*i, 32*32);
        }

    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level6');
        }
    }
}