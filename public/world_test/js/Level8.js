import { Level } from "./Level.js"
import { GameScene } from "./GameScene.js";

export class Level8 extends Level {
    constructor() {
        super('Level8');
        
    }

    create() {
        super.create();
        this.game.sound.stopAll();

        this.lvdone = false;

        this.music = this.game.sound.add('lv8');
        this.music.loop = true;
        //this.music.play();
        GameScene.playMusic(this.music);

        this.level = this.add.text(0, 0, "Level 8", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.level.setX(1920 - this.level.width);

        this.createBoxOfFences(32, 32, 40, 31);
        this.createFinishSpace(32*15, 32, 32*13, 32*5);
        
        //Right Vertical
        this.createVerticalFences(32*15, 32*6, 28, 1);
        //Left Vertical
        this.createVerticalFences(32*28, 32*6, 28, 1);
        //Top Horizontal
        this.createHorizontalFences(32*15, 32*6, 14, 1)

        //Left Maze
        //Top
        this.createHorizontalFences(32, 32*6, 5, 1);
        this.createHorizontalFences(32*15, 32*6, 5, -1);
        //Left Box
        this.createBoxOfFences(32*6, 32*11, 3, 7);
        //Bottom
        this.createHorizontalFences(32, 32*24, 5, 1);
        this.createHorizontalFences(32*15, 32*24, 5, -1);

        //Right Maze
        //Top 
        this.createHorizontalFences(32*28, 32*6, 5, 1);
        this.createHorizontalFences(32*42, 32*6, 5, -1);
        //Right Box
        this.createBoxOfFences(32*33, 32*11, 3, 7);
        //Bottom
        this.createHorizontalFences(32*28, 32*24, 5, 1);
        this.createHorizontalFences(32*42, 32*24, 5, -1);

        //Pond
        for(var i=16; i<=27; i++) {
            if(i>=20 && i<=23) {
                continue;
            }
            this.createPond(32*i, 32*7);
            this.createPond(32*i, 32*8);
            this.createPond(32*i, 32*9);
            this.createPond(32*i, 32*10);
            this.createPond(32*i, 32*11);
            this.createPond(32*i, 32*12);
            this.createPond(32*i, 32*13);
            this.createPond(32*i, 32*14);
            this.createPond(32*i, 32*15);
            this.createPond(32*i, 32*16);
            this.createPond(32*i, 32*17);
            this.createPond(32*i, 32*18);
            this.createPond(32*i, 32*19);
            this.createPond(32*i, 32*20);
            this.createPond(32*i, 32*21);
            this.createPond(32*i, 32*22);
            this.createPond(32*i, 32*23);
            this.createPond(32*i, 32*24);
        }
  
        this.setPlayerPosition(32*21, 900);
        this.createSheep(32*8, 950);
        this.createSheep(32*35, 950);
        // this.createSheep(400, 950);

        // this.createWolf(368, 320, 0, 100, 260);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level9');
        }
    }

}