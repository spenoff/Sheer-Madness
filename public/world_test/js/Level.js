import { Controls } from "./Controls.js";
import { Dog } from "./Dog.js"
import { Sheep } from "./Sheep.js";

export class Level extends Phaser.Scene {
    constructor(levelName) {
        super({key: levelName});
        this.player = null;
        this.allSheep = [];
        this.allFences = [];
        this.allPonds = [];
        this.allWolves = [];
    }

    preload() {
        //Load images and assets
        this.load.image('dog', 'assets/058.png');
        this.load.image('sheep', 'assets/sheep.png');
    }

    create() {
        this.dog = this.physics.add.group({
            defaultKey: "dog"
        });
    
        this.sheep = this.physics.add.group({
            defaultKey: "sheep"
        });

        this.fences = this.physics.add.staticGroup({
            defaultKey: "fence"
        });

        this.ponds = this.physics.add.staticGroup({
            defaultKey: 'pond'
        });

        this.wolves = this.physics.add.staticGroup({
            defaultKey: 'wolf'
        });

        this.player = this.dog.create(960, 540);
        this.player.body.collideWorldBounds = true;

        this.physics.add.collider(this.player, this.fences);
        this.physics.add.collider(this.sheep, this.fences);

        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;

        //Can I move this to controls?
        this.input.on("pointerup", function(pointer) {
            console.log("lasso");
        });

        this.controls = new Controls(this, cursors, this.player, spaceKey, pointer, this.sheep);
        this.DogPlayer = new Dog(this.game, this.player, this.sheep, this.fences); //not currently in use, all functionality currently in controls

        //TESTING START
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        var sheepObj = this.sheep.create(961, 541);
        sheepObj.body.collideWorldBounds = true;
        var sheepAI = new Sheep(this.game, this.DogPlayer, "IDLE", sheepObj);
        this.allSheep.push(sheepAI);

        this.fences.create(1100, 600);
        //TESTING END
    }

    update() {
        this.controls.update();
        this.allSheep.forEach(function(sheep) {
            sheep.update();
        });
    }
}