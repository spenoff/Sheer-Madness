import { GameScene } from "./GameScene.js";
import { Controls } from "./Controls.js";
import { Sheep } from "./Sheep.js";
import { Wolf } from "./Wolf.js";

export class Level extends GameScene {
    constructor(levelName) {
        super(levelName);
        this.player = null;
        this.allSheep = [];
        this.allFences = [];
        this.allPonds = [];
        this.allWolves = [];
        this.allFinishSpaces = [];
        this.score = 0;
        this.requiredScore = 500;
        this.sheepScore = 500;
        this.numStartingSheep = 0;
        this.lvdone = true;
    }

    preload() {
        //Load images and assets
        this.load.spritesheet('dog', 'assets/Dog.png', {frameWidth: 32, frameHeight: 32}); //Need to add animation
        this.load.image('sheep', 'assets/sheep.png'); //Change the spritesheet and add animation?
        this.load.spritesheet('fence', 'assets/Fence.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('grass', 'assets/green.png'); //replace when grass sprite is created
        this.load.image('red', 'assets/red.png');
        this.load.image('pond', 'assets/blue.png'); //replace when pond sprite is created
        this.load.image('finishSpace', 'assets/red.png'); //victory tile - replace if we make one?
        this.load.spritesheet('wolf', 'assets/Wolf.png', {frameWidth: 32, frameHeight: 32}); //wolf image - replace when created
        this.load.image('lasso', 'assets/Lasso.png', {frameWidth: 32, frameHeight: 32}); 
        //this.load.image('igg', 'assets/InGameGUI.png');

        //load music
        this.load.audio('lv1', 'music/Level1.mp3');
        this.load.audio('lv2', 'music/Level2.mp3');
        this.load.audio('lv3', 'music/Level3.mp3');
        this.load.audio('lv4', 'music/Level4.mp3');
        this.load.audio('lv5', 'music/Level5.mp3');
        this.load.audio('lv6', 'music/Level6.mp3');
        this.load.audio('lv7', 'music/Level7.mp3');
        this.load.audio('menu', 'music/menu.mp3');
        this.load.audio('bell', 'sfx/Cowbell.mp3');

        //load sfx
        this.load.audio('bark', 'sfx/Bark.mp3');
        this.load.audio('baa', 'sfx/Baa.mp3');
        this.load.audio('bite', 'sfx/Biting.mp3');
        this.load.audio('drown', 'sfx/Bubbles.mp3');
        this.load.audio('pause', 'sfx/Pause.mp3');
        this.load.audio('win', 'sfx/Win.mp3');
        this.load.audio('lose', 'sfx/Lose.mp3');

        //Pause Menu
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('titles', 'assets/Titles.png', {frameWidth: 801, frameHeight: 200});
    }

    create() {
        super.create();
        this.baa = this.sound.add('baa');

        this.status = 0; //0 = in progress, 1 = complete, 2 = fail, 3 = restart/change level, 4 = paused
        this.startTime = Date.now(); //epoch in ms

        var bgtile = this.add.tileSprite(0, 0, 1920*2, 1080*2, 'grass');
        bgtile.setDepth(-1);

        this.dog = this.physics.add.group({
            defaultKey: "dog"
        }); 
        this.sheep = this.physics.add.group({
            defaultKey: "sheep"
        });
        this.wolf = this.physics.add.group({
            defaultKey: 'wolf'
        });
        this.lasso = this.physics.add.staticGroup({
            defaultKey: "lasso"
        });
        this.fence = this.physics.add.staticGroup({
            defaultKey: "fence"
        });
        this.pond = this.physics.add.staticGroup({
            defaultKey: 'pond'
        });
        this.finishSpace = this.physics.add.staticGroup({
            defaultKey: 'finishSpace'
        });
        //this.igg = this.physics.add.staticGroup({
        //    defaultKey: "igg"
        //})



        this.player = this.dog.create(960, 540, undefined, 0);
        // animate the dog
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('dog', {start: 1, end: 4})
        });
        //wolf animation
        this.anims.create({
            key: 'wolf_walk',
            frames: this.anims.generateFrameNames('wolf', {start: 1, end: 4})
        });
        //this.igg.create(960, 540, undefined, 0);

        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(11, 32);

        this.physics.add.collider(this.dog, this.fence);
        this.physics.add.collider(this.sheep, this.fence);
        this.physics.add.collider(this.sheep, this.sheep);
        this.physics.add.collider(this.dog, this.sheep);
        this.physics.add.collider(this.dog, this.pond, (dog, pond) => {
            this.levelDoneSequence(2, 'Game over! You are too tired from doggypaddling out of the lake that you cannot do your duties for the rest of the day.\nPress R to restart the level');
        });
        this.physics.add.collider(this.sheep, this.pond, (sheep, pond) => {
            this.drown = this.game.sound.add('drown');
            this.drown.play();
            this.removeSheep(sheep);
            //Do we add something to let the player know the sheep drowned? sfx, anything else?
        });
        this.physics.add.collider(this.sheep, this.finishSpace, (sheep, space) => {
            this.score += this.sheepScore;
            this.removeSheep(sheep);
        });
        this.physics.add.collider(this.wolf, this.fence);
        this.physics.add.collider(this.wolf, this.pond, (wolf, pond) => {
            this.removeWolf(wolf);
        }); //do I have an event? - weird interaction
        this.physics.add.collider(this.wolf, this.dog, (wolf, dog) => {
            this.bite = this.game.sound.add('bite');
            this.bite.play();
            this.levelDoneSequence(2, "Game over! The wolf killed you!\nPress R to restart the level");
            this.player.destroy();
        }); //do I have an event? - weird interaction
        this.physics.add.collider(this.wolf, this.sheep, (wolf, sheep) => {
            this.bite = this.game.sound.add('bite');
            this.bite.play();
            this.removeSheep(sheep);
        }); //do I have an event?
        this.player.lassoAsset = null;

        //var in_game_gui = this.add.sprite(200, 100, 'igg');
        //in_game_gui.create();


        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.controls = new Controls(this, cursors, this.player, spaceKey, this.wKey, this.aKey, this.sKey, this.dKey, this.sheep);

        //Is it possible to move this to controls? Likely not, since setting an event
        //Lasso needs to be improved
        //Dog can push into sheep position weirdly
        this.input.on('pointerup', (pointer) => {
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
                    //scale down player velocity
                }
            }
            else {
                this.player.lassoTarget.lassoed = false;
                this.player.lassoTarget = null;
                //scale back up player velocity if lower than amt
            }
        });
        
        //Level Pausing
        this.esckey = this.input.keyboard.addKey('ESC');
    }

    update() {
        if (this.status == 0) {
            this.controls.update();

            if (this.player.body != null && (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0)) {
                this.player.angle = 90 + Math.atan2(this.player.body.velocity.y, this.player.body.velocity.x) * 180 / Math.PI;
            }

            if(this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0) {
                console.log('walk');
                this.player.play('walk');
            }

            this.allSheep.forEach(function(sheep) {
                sheep.update();
                if (sheep.asset.body.velocity.x != 0 || sheep.asset.body.velocity.y != 0) {
                    sheep.asset.angle = 90 + Math.atan2(sheep.asset.body.velocity.y, sheep.asset.body.velocity.x) * 180 / Math.PI;
                }
            });

            if(this.player.lassoTarget != null && this.player.lassoAsset == null) {
                this.player.lassoAsset = this.lasso.create(this.player.lassoTarget.x, this.player.lassoTarget.y, undefined, 0);
            } else if(this.player.lassoTarget == null && this.player.lassoAsset != null) {
                this.player.lassoAsset.destroy();
                this.player.lassoAsset = null;
            } 
            if(this.player.lassoAsset != null) {
                this.player.lassoAsset.x = this.player.lassoTarget.x;
                this.player.lassoAsset.y = this.player.lassoTarget.y;
                this.player.lassoAsset.angle = this.player.lassoTarget.angle - 180;
                if(this.player.lassoAsset.angle == -180){
                    this.player.lassoAsset.y -= 16;
                } else if(this.player.lassoAsset.angle == 0) {
                    this.player.lassoAsset.y += 16;
                } else if(this.player.lassoAsset.angle == 90) {
                    this.player.lassoAsset.x -= 16;
                } else if(this.player.lassoAsset.angle == -90) {
                    this.player.lassoAsset.x += 16;
                }
            }

            this.allWolves.forEach(function(wolf) {
                wolf.update();
                if(wolf.asset.body.velocity.x != 0 || wolf.asset.body.velocity.y != 0) {
                    const newLocal = 'wolf_walk';
                    wolf.asset.play(newLocal);
                }
                /* //add in when wolf sprite created
                //currently handled in wolf.update
                if (wolf.asset.body.velocity.x != 0 || wolf.asset.body.velocity.y != 0) {
                    wolf.asset.angle = 90 + Math.atan2(wolf.asset.body.velocity.y, wolf.asset.body.velocity.x) * 180 / Math.PI; 
                }
                */
            });

            //figure out how to implement just straight up collision
            for (var i = 0; i < this.allFinishSpaces.length; i++) {
                var space = this.allFinishSpaces[i];
                //console.log(space.x - space.width/2, space.x + space.width/2, space.y - space.height/2, space.y + space.height/2);
                for (var j = 0; j < this.allSheep.length; j++) {
                    var sheep = this.allSheep[j].asset;
                    //console.log(sheep);
                    //console.log(sheep.x , sheep.y);
                    if (sheep.x >= space.x - space.width/2 && sheep.x <= space.x + space.width/2 &&
                        sheep.y >= space.y - space.height/2 && sheep.y <= space.y + space.height/2) {
                        console.log("scored");
                        this.score += this.sheepScore;
                        this.baa.play();
                        this.removeSheep(sheep);
                    }
                }
            }

            if (this.score >= this.numStartingSheep * this.sheepScore) {
                var finishTime = Date.now();
                this.score += Math.floor(1000 * 100 * this.score / (finishTime - this.startTime));
                this.levelDoneSequence(1, 'Level complete!\nYour score is: ' + this.score + '\nPress N to go to the next level');
                console.log("SCORE: " + this.score);
            }

            if (this.allSheep.length * this.sheepScore + this.score < this.requiredScore) {
                this.levelDoneSequence(2, 'Game over! You did not herd enough sheep.\nPress R to restart the level');
            }

        }

        //Level Pausing
        if (Phaser.Input.Keyboard.JustDown(this.esckey)) {
            //this.scene.pause(this.levelName);
            this.status = 4;
            
            var pausetitle      = this.add.sprite(960, 150, 'titles', 4);
            var resume          = this.add.sprite(960, 450, 'buttons', 5).setInteractive();
            var levelsel        = this.add.sprite(960, 570, 'buttons', 1).setInteractive();
            var mainmenu        = this.add.sprite(960, 690, 'buttons', 6).setInteractive();
            
            resume.on('pointerdown', function(event) {
                this.status = 0;
                pausetitle.destroy();
                resume.destroy();
                levelsel.destroy();
                mainmenu.destroy(); 
            }, this);
            levelsel.on('pointerdown', function(event) {
                this.scene.start('LevelSelectMenu'); 
                this.stopLevel();
            }, this);
            mainmenu.on('pointerdown', function(event) {
                this.scene.start('MainMenu'); 
                this.stopLevel();
            }, this);
        }

       super.update();
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
        this.numStartingSheep = 0;
    }

    play_filler() {
        this.filler = this.game.sound.add('menu');
        this.filler.play();
    }

    levelDoneSequence(status, msg) {
        this.status = status;
        this.player.setVelocity(0);
        this.allSheep.forEach((sheep) => {
            sheep.asset.setVelocity(0);
        });
        this.allWolves.forEach((wolf) => {
            wolf.asset.setVelocity(0);
        })
        this.lvdone = true;

        if(status == 1) {
            this.res_sound = this.game.sound.add('win');
        } else {
            this.res_sound = this.game.sound.add('lose');
        }
        this.game.sound.stopAll();
        this.res_sound.play();
        var pf = this.play_filler();
        setTimeout(pf, 5000);
        this.add.text(600, 400, msg, {backgroundColor: "0x0000ff", fontSize: "36px", fixedWidth: 660, align: "center", "padding": {x: 20, y: 20}, "wordWrap": {"width": 660}});
        //alert(msg);
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
        sheepObj.alert = false;
        sheepObj.dogAlert = false;
        sheepObj.body.setSize(11, 11);
        var sheepAI = new Sheep(this, this.player, "IDLE", sheepObj);
        this.allSheep.push(sheepAI);
        this.numStartingSheep++;
        return sheepAI;
    }

    removeSheep(sheep) {
        var remove_index = -1;
        for (var i = 0; i < this.allSheep.length; i++) {
            if (this.allSheep[i].asset === sheep) {
                remove_index = i;
            }
        }
        if (remove_index != -1) {
            console.log(remove_index);
            this.allSheep.splice(remove_index, 1);
        }
        if (this.player.lassoTarget == sheep) {
            this.player.lassoTarget = null;
        }
        sheep.destroy();
    }

    createWolf(x, y, startVelocityX=0, startVelocityY=0, ms=0, startStep=0) {
        var wolfObj = this.wolf.create(x, y);
        wolfObj.play('walk');
        wolfObj.body.collideWorldBounds = true;
        var wolfAI = new Wolf(this, this.sheep, "IDLE", wolfObj);
        wolfAI.setPatrol(startVelocityX, startVelocityY, ms, startStep);
        this.allWolves.push(wolfAI);
        return wolfAI; 
    }

    removeWolf(wolf) {
        var remove_index = -1;
        for (var i = 0; i < this.allWolves.length; i++) {
            if (this.allWolves[i].asset === wolf) {
                remove_index = i;
            }
        }
        if (remove_index != -1) {
            console.log(remove_index);
            this.allWolves.splice(remove_index, 1);
        }
        wolf.destroy();
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

    /*
    numHorizonFences = number of horizontal fences between the corners
    numVerticFences = number of vertical fences between the corners
    */
    createBoxOfFences(startX, startY, numHorizFences, numVerticFences) {
        this.createVerticalFences(startX, startY + 32, numVerticFences, 1, false, false);
        this.createVerticalFences(startX + 32 * (numHorizFences + 1), startY + 32, numVerticFences, 1, false, false);
        this.createHorizontalFences(startX + 32, startY, numHorizFences, 1, false, false);
        this.createHorizontalFences(startX + 32, startY + 32 * (numVerticFences + 1), numHorizFences, 1, false, false);

        this.createLFence(startX, startY, 90);
        this.createLFence(startX, startY + 32 * (numVerticFences + 1), 0);
        this.createLFence(startX + 32 * (numHorizFences + 1), 32, 180);
        this.createLFence(startX + 32 * (numHorizFences + 1), startY + 32 * (numVerticFences + 1), -90);
    }

    //Create finish area starting at (x,y) with width and height
    createFinishSpace(x, y, width, height) {
        var spaceBgTile = this.add.tileSprite(x + width/2, y + height/2, width, height, 'red');
        spaceBgTile.setDepth(-1);
        /* //does not work right now
        this.physics.add.collider(spaceBgTile, this.sheep, (tile, sheep) => {
            console.log("hi");
        });
        */

        this.allFinishSpaces.push({
            x: x + width/2,
            y: y + height/2,
            width: width,
            height: height
        })
    }

    createPond(x, y) {
        var pond = this.pond.create(x, y);
        pond.setDepth(-1);
    }
}