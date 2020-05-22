import { Level } from "./Level.js"
import { GameScene } from "./GameScene.js";

export class Level9 extends Level {
    constructor() {
        super('Level9');
    }

    create() {
        super.create();

        this.game.sound.stopAll();

        this.lvdone = false;

        //this.music = this.game.sound.add('lv3');
        this.music.loop = true;
        //this.music.play();
        //GameScene.playMusic(this.music);
    
        this.setRequiredScore(500);
        this.setPlayerPosition(368, 970);
        this.createSheep(332, 968);
        this.createSheep(400, 968);
        this.createSheep(368, 950);;

        //Left side
        for(var i = 0; i < 9; i++) {
            this.createPond(742 + (32 * i),408+256);
            this.createPond(742 + (32 * i),440+256);
            this.createPond(742 + (32 * i),472+256);
            this.createPond(742 + (32 * i),504+256);
            this.createPond(742 + (32 * i),536+256);
            this.createPond(742 + (32 * i),568+256);
            this.createPond(742 + (32 * i),600+256);
            this.createPond(742 + (32 * i),632+256);
            this.createPond(742 + (32 * i),664+256);
            this.createPond(742 + (32 * i),696+256);
            this.createPond(742 + (32 * i),728+256);
        }

        //right side
        for(var i = 0; i < 8; i++) {
            this.createPond(1088 + (32 * i),408);
            this.createPond(1088 + (32 * i),440);
            this.createPond(1088 + (32 * i),472);
            this.createPond(1088 + (32 * i),504);
            this.createPond(1088 + (32 * i),536);
            this.createPond(1088 + (32 * i),568);
            this.createPond(1088 + (32 * i),600);
            this.createPond(1088 + (32 * i),632);
            this.createPond(1088 + (32 * i),664);
            this.createPond(1088 + (32 * i),696);
            this.createPond(1088 + (32 * i),728);
        }

        //Bottom Wolf
        this.createWolf(80, 768, 120, 0, 5000);
        //Middle Wolf
        this.createWolf(488, 640, -120, 0, 1800);
        //Top Wolf
        this.createWolf(670, 512, -120, 0, 5000);
        //Vertical Wolf
        this.createWolf(700, 350, 0, 120, 2800);

        this.createVerticalFences(742, 344, 5, -1, false, true);
        this.createHorizontalFences(742 + (32*7), 184+32, 8, -1, false, true);
        this.createVerticalFences(990, 344, 5, -1, false, true);
        this.createSheep(742+128, 344 - 64);

        this.createVerticalFences(1070, 344, 5, -1, false, true);
        this.createHorizontalFences(1070 + (32*7) + 12, 344+16, 8, -1, false, true);
        this.createVerticalFences(1318, 344, 5, -1, false, true);
        this.createSheep(742+128+326, 344 - 64);

        this.createSheep(232, 332);

        this.createBoxOfFences(32, 32, 40, 30);
        this.createFinishSpace(32, 32, 1312, 150);
    }

    update() {
        super.update();
        this.game.sound.context.resume();
        this.sound.context.resume();
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start('Congratulation');
        }
    }
}