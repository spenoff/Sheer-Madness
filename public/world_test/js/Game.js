import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";


//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');

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
    scene : [ Level0 , Level1 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);