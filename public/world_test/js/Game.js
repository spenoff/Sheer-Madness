import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";
import { Level1 } from "./Level1.js";
import { Level2 } from "./Level2.js";

//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');

class MainMenu extends Phaser.Scene {

    preload() {
        
        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('menubuttons', 'assets/MenuButtons.png', {frameWidth: 500, frameHeight: 101});

    }

    create() {

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
        setting.on('pointerdown', function() {
            alert("setting");
        });
        about.on('pointerdown', function(event) {
            alert("about");
            //this.scene.start('AboutMenu');
        }, this);
    }

    update() {

    }

}

class AboutMenu extends Phaser.Scene {

    preload() {

        this.load.image("aboutmenu", 'imgs/About.png');
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
    scene : [ MainMenu, Level0, Level1, Level2 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);