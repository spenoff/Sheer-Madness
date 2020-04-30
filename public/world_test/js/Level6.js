import { Level } from "./Level.js"

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
        this.music.play();
    
        this.setRequiredScore(1000);
        this.setPlayerPosition(600, 900);
        this.createSheep(600, 1000);
        this.createSheep(500, 900);
        this.createSheep(500, 1000);
        this.createFinishSpace(550, 0, 300, 32);

        //Wolf 1
        this.createWolf(680, 628, 100, 100, 3600);

        //Wolf 2
        this.createWolf(680, 296, 100, 100, 3600);

    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            alert("Next level coming soon!");
        }
    }

}