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
        this.allFinishSpaces = [];
        this.status = 0; //0 = in progress, 1 = complete, 2 = fail, 3 = restart
    }

    preload() {
        //Load images and assets
        //this.load.image('dog', 'assets/058.png');
        this.load.spritesheet('dog', 'assets/Dog.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('sheep', 'assets/Sheep.png');
        //this.load.image('fence', 'assets/Fence.png');
        this.load.spritesheet('fence', 'assets/Fence.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('grass', 'assets/green.png');
        this.load.image('red', 'assets/red.png');
        this.load.image('pond', 'assets/blue.png');
    }

    create() {
        var bgtile = this.add.tileSprite(0, 0, 1920*2, 1080*2, 'grass');
        bgtile.setDepth(-1);

        this.dog = this.physics.add.group({
            defaultKey: "dog"
        });
    
        this.sheep = this.physics.add.group({
            defaultKey: "sheep"
        });

        this.fence = this.physics.add.staticGroup({
            defaultKey: "fence"
        });

        this.pond = this.physics.add.staticGroup({
            defaultKey: 'pond'
        });

        this.wolf = this.physics.add.staticGroup({
            defaultKey: 'wolf'
        });

        this.finishSpace = this.physics.add.staticGroup({
            defaultKey: 'finishSpace'
        });


        this.player = this.dog.create(960, 540, undefined, 0);
        //need to animate


        this.player.body.collideWorldBounds = true;

        this.physics.add.collider(this.dog, this.fence);
        this.physics.add.collider(this.sheep, this.fence);
        this.physics.add.collider(this.dog, this.sheep);
        this.physics.add.collider(this.dog, this.pond, (dog, pond) => {
            console.log("oops");
            this.status = 2;
            dog.destroy();
            alert("Game over???");
        });
        this.physics.add.collider(this.sheep, this.pond, (sheep, pond) => {
            var remove_index = -1;
            for (var i = 0; i < this.allSheep.length; i++) {
                if (this.allSheep[i].asset === sheep) {
                    remove_index = i;
                }
            }
            if (remove_index != -1) {
                this.allSheep.splice(remove_index);
            }
            sheep.destroy();
        });

        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;
        this.controls = new Controls(this, cursors, this.player, spaceKey, pointer, this.sheep);

        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.OneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.TwoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.ThreeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        //Can I move this to controls?
        this.input.on("pointerup", (pointer) => {
            console.log("lasso");
            //check for sheep within range
            console.log(this.player.lassoTarget);
            if (this.player.lassoTarget == null) {
                var target = null;
                for (var i = 0; i < this.allSheep.length; i++) {
                    var sheep = this.allSheep[i].asset;
                    if (Math.sqrt(Math.pow(this.player.x - sheep.x, 2) + Math.pow(this.player.y - sheep.y, 2)) <= 32 + 30) {
                        target = sheep;
                    }
                    //when to override target?
                }
                if (target) {
                    target.lassoed = true;
                    this.player.lassoTarget = target;
                    console.log("lassoed!!!");
                }
            }
            else {
                this.player.lassoTarget.lassoed = false;
                this.player.lassoTarget = null;
            }
        });

        //this.DogPlayer = new Dog(this.game, this.player, this.sheep, this.fences); //not currently in use, all functionality currently in controls
    }

    update() {
        if (this.status == 0) {
            this.controls.update();

            if (this.player.body != null && (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0)) {
                this.player.angle = 90 + Math.atan2(this.player.body.velocity.y, this.player.body.velocity.x) * 180 / Math.PI;
            }

            this.allSheep.forEach(function(sheep) {
                sheep.update();
                if (sheep.asset.body.velocity.x != 0 || sheep.asset.body.velocity.y != 0) {
                    sheep.asset.angle = 90 + Math.atan2(sheep.asset.body.velocity.y, sheep.asset.body.velocity.x) * 180 / Math.PI;
                }
            });
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.status = 3;
            this.allSheep = [];
            this.allFences = [];
            this.allPonds = [];
            this.allWolves = [];
            this.allFinishSpaces = [];
            this.player = null;
            this.scene.restart();
            this.status = 0;
        }
    }

    /*
        startX: x coordinate of first fence
        startY: y coordinate of first fence
        num: number of consecutive fences
        dir: direction, -1 or 1, negative or positive direction in the axis
        startTerminate: end the fence line at start
        endTerminate: end the fence line at end
    */
    createHorizontalFences(startX, startY, num, dir=1, startTerminate=true, endTerminate=true) {
        var f;
        if (num == 1) {
            f = this.fence.create(startX, startY, undefined, 0);
            f.angle += 90;
        }
        else {
            var incrementer = dir * 32;
            for (var i = 0; i < num; i++) {
                if (i == 0 && startTerminate) {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 2);
                    f.angle -= 90 * dir;
                }
                else if (i == num - 1 && endTerminate) {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 2);
                    f.angle += 90 * dir;
                }
                else {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 0);
                    f.angle += 90;
                }
            }
        }
    }

    createVerticalFences(startX, startY, num, dir=1, startTerminate=true, endTerminate=true) {
        var f;
        if (num == 1) {
            f = this.fence.create(startX, startY, undefined, 0);
        }
        else {
            var incrementer = dir * 32;
            for (var i = 0; i < num; i++) {
                if (i == 0 && startTerminate) {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 2);
                    if (dir == -1) {
                        f.angle += 180;
                    }
                }
                else if (i == num - 1 && endTerminate) {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 2);
                    if (dir == 1) {
                        f.angle += 180;
                    }
                }
                else {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 0);
                }
            }
        }
    }

    createTFence(x, y, angle) {
        var f = this.fence.create(x, y, undefined, 3);
        f.angle += angle;
    }

    createLFence(x, y, angle) {
        var f = this.fence.create(x, y, undefined, 3);
        f.angle += 180 + angle;
    }   

    createPlusFence(x, y) {
        var f = this.fence.create(x, y, undefined, 4);
    }

    createFinishSpace(x, y, width, height) {
        var spaceBgTile = this.add.tileSprite(x, y, width, height, 'red');
        spaceBgTile.setDepth(-1);
        this.allFinishSpaces.push({
            x: x,
            y: y,
            width: width,
            height: height
        })
    }

    createPond(x, y) {
        var pond = this.pond.create(x, y);
        pond.setDepth(-1);
        pond.body.onCollide = true;
    }

}