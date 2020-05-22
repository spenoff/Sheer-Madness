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
        this.setPlayerPosition(600, 900);
        this.createSheep(600, 975);
        this.createSheep(500, 900);
        this.createBoxOfFences(127, 32, 31, 30);
        this.createFinishSpace(127, 25, 1022, 60);
        
        //Pond 1
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(222 + (32 * i), 781 - (32 * j));
        }

        //Pond 2
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(910 + (32 * i), 524 - (32 * j));
        }

        //Pond 3
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(566 + (32 * i), 267 - (32 * j));
        }

        //Wolf 1
        this.createWolf(850, 728, 100, 0, 2400);

        //Wolf 2
        this.createWolf(530, 476, 100, 0, 2400);

        //Wolf 3
        this.createWolf(170, 214, 100, 0, 2400);

        this.createVerticalFences(458, 119, 7);
        this.createVerticalFences(458, 376, 7);
        this.createVerticalFences(458, 629, 7);

        this.createVerticalFences(802, 119, 7);
        this.createVerticalFences(802, 376, 7);
        this.createVerticalFences(802, 629, 7);

    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level6');
        }
    }
}