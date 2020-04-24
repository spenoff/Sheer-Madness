import { Controls } from "./Controls.js";
import { Dog } from "./Dog.js"
import { Sheep } from "./Sheep.js";

//Try to find a way to build a container
class Game {
    constructor() {}

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
}

//currently messy since outside level classes
var PlayerControls;
var DogPlayer;
var sheepAI;

export var dog;
export var fences;
export var player;
export var sheep;

class TestLevel extends Phaser.Scene {
    constructor() {
        super({key: 'TestLevel'});
    }


    preload () {
        this.load.image('dog', 'assets/058.png');
        this.load.image('sheep', 'assets/sheep.png');
    }
    
    create () {
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
    
        //console.log(player);
    
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;

        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        PlayerControls = new Controls(this, cursors, player, spaceKey, pointer, sheep);
        DogPlayer = new Dog(game, player, sheep, fences);
        sheepAI = new Sheep(game, DogPlayer, "IDLE", sheep.create(961, 541));
    
        //Can I move this to controls?
        this.input.on("pointerup", function(pointer) {
            console.log("lasso");
        });
    }   
    
    update() {
        PlayerControls.check();
        sheepAI.update();
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
        dog = this.physics.add.group({
            defaultKey: "dog"
        });
        player = dog.create(50, 50);
        player.body.collideWorldBounds = true;
    
        sheep = this.physics.add.group({
            defaultKey: "sheep"
        });
    
        fences = this.physics.add.staticGroup();
        this.physics.add.collider(player, fences);
    
        //console.log(player);
    
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;

        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        PlayerControls = new Controls(this, cursors, player, spaceKey, pointer, sheep);
        DogPlayer = new Dog(game, player, sheep, fences);
        sheepAI = new Sheep(game, DogPlayer, "IDLE", sheep.create(961, 541));
    
        //Can I move this to controls?
        this.input.on("pointerup", function(pointer) {
            console.log("lasso");
        });
    }   
    
    update() {
        PlayerControls.check();
        sheepAI.update();
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
    scene: [ TestLevel, TestLevel2 ]
};

var game = new Phaser.Game(config);


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



var GameObject = new Game();
GameObject.setGame(game);
GameObject.setPlayer(DogPlayer);
GameObject.setFencesGroup(fences);
GameObject.setSheepGroup(sheep);
