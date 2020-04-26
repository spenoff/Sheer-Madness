import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";


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
        var quit        = this.add.sprite(960, 840, 'menubuttons', 4).setInteractive();

        start.on('pointerdown', function() {
            alert("start");
        });
        levelsel.on('pointerdown', function() {
            alert("levelsel");
        });
        setting.on('pointerdown', function() {
            alert("setting");
        });
        about.on('pointerdown', function() {
            alert("about");
        });
        quit.on('pointerdown', function() {
            alert("quit");
        });
    }

    update() {

    }

}

class NewTestLevel extends Level {
    constructor() {
        super("NewTestLevel");
    }
}

//placeholder
class Level1 extends Level {
    constructor() {
        super('Level1');
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
    scene : [ MainMenu ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);