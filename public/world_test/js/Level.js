import { Controls } from "./Controls.js";
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
        this.score = 0;
        this.requiredScore = 500; //500 is default
        this.sheepScore = 500;
    }

    preload() {
        //Load images and assets
        this.load.spritesheet('dog', 'assets/Dog.png', {frameWidth: 32, frameHeight: 32}); //Need to add animation
        this.load.image('sheep', 'assets/Sheep.png'); //Change the spritesheet and add animation?
        this.load.spritesheet('fence', 'assets/Fence.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('grass', 'assets/green.png'); //replace when grass sprite is created
        this.load.image('red', 'assets/red.png');
        this.load.image('pond', 'assets/blue.png'); //replace when pond sprite is created
        this.load.image('finishSpace', 'assets/red.png'); //victory tile
        //wolf image
    }

    create() {
        this.status = 0; //0 = in progress, 1 = complete, 2 = fail, 3 = restart/change level

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
        //Need to animate the dog

        this.player.body.collideWorldBounds = true;

        this.physics.add.collider(this.dog, this.fence);
        this.physics.add.collider(this.sheep, this.fence);
        this.physics.add.collider(this.dog, this.sheep);
        this.physics.add.collider(this.dog, this.pond, (dog, pond) => {
            this.status = 2;
            dog.destroy();
            alert("Game over! {explanation for why?} Press R to restart the level");
        });
        this.physics.add.collider(this.sheep, this.pond, (sheep, pond) => {
            this.removeSheep(sheep);
            //Do we add something to let the player know the sheep drowned? sfx, anything else?
        });
        this.physics.add.collider(this.sheep, this.finishSpace, (sheep, space) => {
            this.score += 500; //sheep score right now is 500
            this.removeSheep(sheep);
        });

        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;
        this.controls = new Controls(this, cursors, this.player, spaceKey, pointer, this.sheep);

        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.zeroKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        //Is it possible to move this to controls? Likely not, since setting an event
        this.input.on("pointerup", (pointer) => {
            if (this.player.lassoTarget == null) {
                var target = null;
                for (var i = 0; i < this.allSheep.length; i++) {
                    var sheep = this.allSheep[i].asset;
                    if (Math.sqrt(Math.pow(this.player.x - sheep.x, 2) + Math.pow(this.player.y - sheep.y, 2)) <= 32 + 30) {
                        //When do I override the lasso target? Currently, the sheep to lasso will be the last one in list to fulfill conditions
                        target = sheep;
                    }
                }
                if (target != null) {
                    target.lassoed = true;
                    this.player.lassoTarget = target;
                }
            }
            else {
                this.player.lassoTarget.lassoed = false;
                this.player.lassoTarget = null;
            }
        });
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

            //figure out how to implement just straight up collision
            for (var i = 0; i < this.allFinishSpaces.length; i++) {
                var space = this.allFinishSpaces[i];
                for (var j = 0; j < this.allSheep.length; j++) {
                    var sheep = this.allSheep[i].asset;
                    if (sheep.x - sheep.width/2 >= space.x - space.width/2 && sheep.x + sheep.body.width/2 <= space.x + space.width/2 &&
                        sheep.y - sheep.height/2 >= space.y - space.height/2 && sheep.y + sheep.body.height/2 <= space.y + space.height/2) {
                        this.score += 500;
                        this.removeSheep(sheep);
                    }
                }
            }

            if (this.score >= this.requiredScore) {
                this.status = 1;
                this.player.setVelocity(0);
                this.allSheep.forEach((sheep) => {
                    sheep.asset.setVelocity(0);
                });
                alert('Level complete!');
            }

        }
        
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.stopLevel();
            this.scene.restart();
        }
        if (Phaser.Input.Keyboard.JustDown(this.zeroKey)) {
            this.stopLevel();
            this.scene.start('Level0');  
        }
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.stopLevel();
            this.scene.start('Level1');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            this.stopLevel();
            this.scene.start('Level2');   
        }
    }

    stopLevel() {
        this.status = 3;
        this.player = null;
        this.allSheep = [];
        this.allFences = [];
        this.allPonds = [];
        this.allWolves = [];
        this.allFinishSpaces = [];
        this.score = 0; 
    }

    setRequiredScore(s) {
        this.requiredScore = s;
    }

    setPlayerPosition(x, y) {
        this.player.x = x;
        this.player.y = y;
    }

    createSheep(x, y) {
        var sheepObj = this.sheep.create(x, y);
        sheepObj.body.collideWorldBounds = true;
        sheepObj.lassoed = false;
        var sheepAI = new Sheep(this.game, this.player, "IDLE", sheepObj);
        this.allSheep.push(sheepAI);
    }

    removeSheep(sheep) {
        var remove_index = -1;
        for (var i = 0; i < this.allSheep.length; i++) {
            if (this.allSheep[i].asset === sheep) {
                remove_index = i;
            }
        }
        if (remove_index != -1) {
            this.allSheep.splice(remove_index);
        }
        if (this.player.lassoTarget == sheep) {
            this.player.lassoTarget = null;
        }
        sheep.destroy();
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
        var f = this.fence.create(x, y, undefined, 1);
        f.angle += 180 + angle;
    }   

    createPlusFence(x, y) {
        var f = this.fence.create(x, y, undefined, 4);
    }

    //Create finish area centered at (x,y) with width and height
    createFinishSpace(x, y, width, height) {
        var spaceBgTile = this.add.tileSprite(x, y, width, height, 'red');
        spaceBgTile.setDepth(-1);
        /* //does not work right now
        this.physics.add.collider(spaceBgTile, this.sheep, (tile, sheep) => {
            console.log("hi");
        });
        */

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
    }

}