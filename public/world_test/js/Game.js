import { GameScene } from "./GameScene.js";
import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";
import { Level1 } from "./Level1.js";
import { Level2 } from "./Level2.js";
import { Level3 } from "./Level3.js";
import { Level4 } from "./Level4.js";
import { Level5 } from "./Level5.js";

//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');

class MainMenu extends GameScene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        
        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('titles', 'assets/Titles.png', {frameWidth: 801, frameHeight: 200});

    }

    create() {
        super.create();

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var mmtitle     = this.add.sprite(960, 150, 'titles', 0);

        var start       = this.add.sprite(960, 450, 'buttons', 0).setInteractive();
        var levelsel    = this.add.sprite(960, 570, 'buttons', 1).setInteractive();
        var setting     = this.add.sprite(960, 690, 'buttons', 2).setInteractive();
        var about       = this.add.sprite(960, 810, 'buttons', 3).setInteractive();

        start.on('pointerdown', function(event) {
            this.scene.start('Level1');
        }, this);
        levelsel.on('pointerdown', function(event) {
            this.scene.start('LevelSelectMenu')
        }, this);
        setting.on('pointerdown', function(event) {
            this.scene.start('SettingMenu');
        }, this);
        about.on('pointerdown', function(event) {
            this.scene.start('AboutMenu');
        }, this);
    }

    update() {
        super.update();
    }

}

class LevelSelectMenu extends GameScene {

    constructor() {
        super('LevelSelectMenu');
    }

    preload() {
        
        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('levelselectbuttons', 'assets/Levels.png', {frameWidth: 105, frameHeight: 105});

    }

    create() {
        super.create();

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 1);

        var l1      = this.add.sprite(585, 450, 'levelselectbuttons', 0).setInteractive();
        var l2      = this.add.sprite(735, 450, 'levelselectbuttons', 1).setInteractive();
        var l3      = this.add.sprite(885, 450, 'levelselectbuttons', 2).setInteractive();
        var l4      = this.add.sprite(1035, 450, 'levelselectbuttons', 3).setInteractive();
        var l5      = this.add.sprite(1185, 450, 'levelselectbuttons', 4).setInteractive();
        var l6      = this.add.sprite(1335, 450, 'levelselectbuttons', 5).setInteractive();
        var l7      = this.add.sprite(585, 600, 'levelselectbuttons', 6).setInteractive();
        var l8      = this.add.sprite(735, 600, 'levelselectbuttons', 7).setInteractive();
        var l9      = this.add.sprite(885, 600, 'levelselectbuttons', 8).setInteractive();
        var l10     = this.add.sprite(1035, 600, 'levelselectbuttons', 9).setInteractive();
        var l11     = this.add.sprite(1185, 600, 'levelselectbuttons', 10).setInteractive();
        var lock    = this.add.sprite(1335, 600, 'levelselectbuttons', 11).setInteractive();

        var back    = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        l1.on('pointerdown', function(event) {
            this.scene.start('Level1');
        }, this);
        l2.on('pointerdown', function(event) {
            this.scene.start('Level2');
        }, this);
        l3.on('pointerdown', function(event) {
            this.scene.start('Level3');
        }, this);
        l4.on('pointerdown', function(event) {
            this.scene.start('Level4');
        }, this);
        l5.on('pointerdown', function(event) {
            this.scene.start('Level5');
        }, this);
        lock.on('pointerdown', function(event) {
            this.scene.start('Level0');
        }, this);

        back.on('pointerdown', function(event) {
            this.scene.start('MainMenu');
        }, this);
    }

    update() {
        super.update();
    }
}

class SettingMenu extends GameScene {

    constructor() {
        super('SettingMenu');
    }

    preload() {

        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.image('settings', 'assets/Settings.png');

    }

    create() {
        super.create();

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 2);
        var settings = this.add.sprite(960, 600, 'settings');
        var back = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        back.on('pointerdown', function(event) {
            this.scene.start('MainMenu');
        }, this);
        
    }

    update() {
        super.update();
    }
}

class AboutMenu extends GameScene {

    constructor() {
        super('AboutMenu');
    }

    preload() {

        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.image('about', 'assets/AboutV2.png');

    }

    create() {
        super.create();
        
        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 3);
        var about = this.add.sprite(960, 600, 'about');
        var back = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        back.on('pointerdown', function(event) {
            this.scene.start('MainMenu');
        }, this);

    }

    update() {
        super.update();
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene : [ MainMenu, LevelSelectMenu, AboutMenu, SettingMenu, Level0, Level1, Level2, Level3, Level4, Level5 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);