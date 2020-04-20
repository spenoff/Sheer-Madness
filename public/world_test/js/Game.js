import { Controls } from "./Controls.js";
import { Dog } from "./Dog.js"
import { Sheep } from "./Sheep.js";

//Try to find a way to build a container
class Game {
    constructor() {}

    setPlayer(player) {
        this.player = player;
    }

    setFencesGroup(fencesGroup) {
        this.fencesGroup = fencesGroup;
    }

    setSheepGroup(sheepGroup) {
        this.sheepGroup = sheepGroup;
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var PlayerControls;
var DogPlayer;
var sheepAI;

export var dog;
export var fences;
export var player;
export var sheep;

function preload () {
    this.load.image('dog', 'assets/058.png');
    this.load.image('sheep', 'assets/sheep.png');
}

function create () {
    dog = this.physics.add.group({
        defaultKey: "dog"
    });
    player = dog.create(960, 540);
    player.body.collideWorldBounds = true;

    sheep = this.physics.add.group({
        defaultKey: "sheep"
    });

    fences = this.physics.add.staticGroup();
    this.physics.add.collider(player, fences);

    console.log(player);

    var cursors = this.input.keyboard.createCursorKeys();
    var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    var pointer = this.input.activePointer;
    PlayerControls = new Controls(this, cursors, player, spaceKey, pointer, sheep);
    DogPlayer = new Dog(game, player, sheep, fences);
    sheepAI = new Sheep(game, DogPlayer, "IDLE", sheep.create(961, 541));

    //Can I move this to controls?
    this.input.on("pointerup", function(pointer) {
        console.log("lasso");
    });
}   

function update() {
    PlayerControls.check();
    sheepAI.update();
}

//get sheep positions
//get dog positions
//get pond positions
//get fence positions

//fence/pond?

/*
Dog = game.physics.add.group({
    defaultKey: "dog"
});
player = Dog.create(960, 540);
player.body.collideWorldBounds = true;

Fences = game.physics.add.staticGroup();
game.physics.add.collider(player, Fences);

console.log(player);

cursors = game.input.keyboard.createCursorKeys();
controls = new Controls(game, cursors, player);
*/

