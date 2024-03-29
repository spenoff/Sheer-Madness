import { Level } from "./Level.js"

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
        this.music.play();

        this.createBoxOfFences(32, 32, 20, 30);

        //top horizontal
        this.createHorizontalFences(32, 322, 10, 1);
        //bottom horizontal
        this.createHorizontalFences(32, 800, 10, 1);
        //top vertical
        this.createVerticalFences(322, 322, 4, 1);
        //bottom vertical
        this.createVerticalFences(322, 544, 9, 1);
        //box
        this.createHorizontalFences(160, 416, 6, 1);
        this.createHorizontalFences(160, 542, 6, 1);
        this.createVerticalFences(160, 416, 5, 1);

        //top horizontal
        this.createHorizontalFences(416, 322, 10, 1);
        //bottom horizontal
        this.createHorizontalFences(416, 800, 10, 1);
        //top vertical
        this.createVerticalFences(416, 322, 9, 1);
        //bottom vertical
        this.createVerticalFences(416, 704, 4, 1);
        //box
        this.createHorizontalFences(416, 576, 6, 1);
        this.createHorizontalFences(416, 704, 6, 1);
        this.createVerticalFences(576, 576, 5, 1);

        this.createFinishSpace(32, 32, 672, 150);
  
        this.setPlayerPosition(600, 900);
        this.createSheep(200, 950);
        this.createSheep(300, 950);
        this.createSheep(400, 950);

        this.createWolf(368, 320, 0, 100, 4600);
    }

    update() {
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Level8');
        }
    }

}