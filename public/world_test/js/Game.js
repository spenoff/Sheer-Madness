import { Controls } from "./Controls.js";
import { Dog } from "./Dog.js"
import { Sheep } from "./Sheep.js";
import { Level } from "./Level.js";

//Do we even need this? 
//The class can self reference variables
export class Game {
    constructor() {
        this.allSheep = [];
        this.allFences = [];
        this.allPonds = [];
        this.allWolves = [];
    }

    setActiveScene(key) {
        this.activeScene = key;
    }

    setGame(game) {
        this.game = game;
    }

    setPlayer(player) {
        this.player = player;
    }

    setFencesGroup(fencesGroup) {
        this.fencesGroup = fencesGroup;
    }

    setSheepGroup(sheepGroup) {
        this.sheepGroup = sheepGroup;
    }

    createSheep(x, y) {
        if (this.sheepGroup) {
            var sheep = this.sheepGroup.create(x,y);
            sheep.body.collideWorldBounds = true;
            var sheepAI = new Sheep(this.game, this.player, "IDLE", sheep);
            this.allSheep.add(sheepAI);
        }
    }

    createFence(x,y) {}

    createPond(x,y) {}
}

//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');



class NewTestLevel extends Level {
    constructor() {
        super("NewTestLevel");
    }
}


class TestLevel extends Phaser.Scene {
    constructor() {
        super({key: 'TestLevel'});
    }


    preload () {
        this.load.image('dog', 'assets/058.png');
        this.load.image('sheep', 'assets/sheep.png');
    }
    
    create () {
        this.dog = this.physics.add.group({
            defaultKey: "dog"
        });
        this.player = this.dog.create(960, 540);
        this.player.body.collideWorldBounds = true;
    
        this.sheep = this.physics.add.group({
            defaultKey: "sheep"
        });
        
    
        this.fences = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, this.fences);
        this.physics.add.collider(this.sheep, this.fences);

        //console.log(player);
    
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;

        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.PlayerControls = new Controls(this, cursors, this.player, spaceKey, pointer, this.sheep);
        this.DogPlayer = new Dog(this.game, this.player, this.sheep, this.fences);

        var sheepObj = this.sheep.create(961, 541);
        sheepObj.body.collideWorldBounds = true;
        this.sheepAI = new Sheep(this.game, this.DogPlayer, "IDLE", sheepObj);
    
        //Can I move this to controls?
        this.input.on("pointerup", function(pointer) {
            console.log("lasso");
        });

        this.fences.create(1100, 600);
    }   
    
    update() {
        this.PlayerControls.update();
        this.sheepAI.update();
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            console.log("cee1");
            this.scene.start('TestLevel2');
        }
    }
}

class TestLevel2 extends Phaser.Scene {
    constructor() {
        super({key: 'TestLevel2'});
    }


    preload () {
        this.load.image('dog', 'assets/058.png');
        this.load.image('sheep', 'assets/sheep.png');
    }
    
    create () {
        this.dog = this.physics.add.group({
            defaultKey: "dog"
        });
        this.player = this.dog.create(50, 50);
        this.player.body.collideWorldBounds = true;
        
    
        this.sheep = this.physics.add.group({
            defaultKey: "sheep"
        });
    
        this.fences = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, this.fences);
        this.physics.add.collider(this.sheep, this.fences);

        //console.log(player);
    
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;

        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.PlayerControls = new Controls(this, cursors, this.player, spaceKey, pointer, this.sheep);
        this.DogPlayer = new Dog(this.game, this.player, this.sheep, this.fences);
        this.sheepAI = new Sheep(this.game, this.DogPlayer, "IDLE", this.sheep.create(961, 541));
    
        //Can I move this to controls?
        this.input.on("pointerup", function(pointer) {
            console.log("lasso");
        });
    }   
    
    update() {
        this.PlayerControls.update();
        this.sheepAI.update();
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            console.log("cee2");
            this.scene.start('TestLevel');
        }
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
    //scene: [ TestLevel, TestLevel2 ]
    scene : [ NewTestLevel, TestLevel ]
};

var game = new Phaser.Game(config);
game.scene.add('TestLevel2', TestLevel2);

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