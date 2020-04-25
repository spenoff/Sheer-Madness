import { Controls } from "./Controls.js";
import { Dog } from "./Dog.js"
import { Sheep } from "./Sheep.js";
import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";


//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');



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
    scene : [ Level0 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);

/*
var GameObject = new Game();
GameObject.setGame(game);
GameObject.setPlayer(DogPlayer);
GameObject.setFencesGroup(fences);
GameObject.setSheepGroup(sheep);
GameObject.setActiveScene('TestLevel');

console.log(game.scene);
console.log(game.scene.getScene('TestLevel'));
console.log(game.scene.getScene(GameObject.activeScene));
*/