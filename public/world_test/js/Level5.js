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
        this.createBoxOfFences(32, 32, 38, 30);
        this.createFinishSpace(32, 25, 1248, 48);
        
        //Pond 1
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(222 + (32 * i), 728 - (32 * j));
        }

        //Pond 2
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(910 + (32 * i), 524 - (32 * j));
        }

        //Pond 3
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(598 + (32 * i), 242 + 25 - (32 * j));
        }

        //Wolf 1
        this.createWolf(922, 728, 100, 0, 2400);

        //Wolf 2
        this.createWolf(630, 376, 0, 100, 3800);

        //Wolf 3
        this.createWolf(350, 114, 0, 100, 3600);

    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level6');
        }
    }
}