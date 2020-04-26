import { GameScene } from "./GameScene.js";
import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";
import { Level1 } from "./Level1.js";
import { Level2 } from "./Level2.js";
import { Level3 } from "./Level3.js";

//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');

class MainMenu extends GameScene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        
        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('menubuttons', 'assets/MenuButtons.png', {frameWidth: 500, frameHeight: 101});

    }

    create() {
        super.create();

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var start       = this.add.sprite(960, 360, 'menubuttons', 0).setInteractive();
        var levelsel    = this.add.sprite(960, 480, 'menubuttons', 1).setInteractive();
        var setting     = this.add.sprite(960, 600, 'menubuttons', 2).setInteractive();
        var about       = this.add.sprite(960, 720, 'menubuttons', 3).setInteractive();

        start.on('pointerdown', function(event) {
            this.scene.start('Level0');
        }, this);
        levelsel.on('pointerdown', function() {
            alert("levelsel");
        });
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

class SettingMenu extends Phaser.Scene {

    constructor() {
        super("SettingMenu");
    }

    preload() {
        this.load.image("settingmenu", 'assets/Controls.png');
    }

    create() {
        var settingmenu = this.add.tileSprite(960, 540, 0, 0, 'settingmenu');
        settingmenu.setDepth(-1);
    }

    update() {

    }
}

class AboutMenu extends Phaser.Scene {

    constructor() {
        super("AboutMenu");
    }

    preload() {

        this.load.image('aboutmenu', 'assets/About.png');
    }

    create() {

        var aboutmenu = this.add.tileSprite(960, 540, 0, 0, 'aboutmenu');
        aboutmenu.setDepth(-1);
    }

    update() {

    }
}

class NewTestLevel extends Level {
    constructor() {
        super("NewTestLevel");
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
    scene : [ MainMenu, Level0, Level1, Level2, Level3 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);