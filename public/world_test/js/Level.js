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
        this.sheepHerded = 0;
        this.requiredSheepHerded = 1;
        this.lvdone = true;
        this.scoreText = null;
        this.timeText = null;
        this.pausedTime = 0;
        this.pauseStart = 0;
    }

    preload() {
        //Load images and assets
        this.load.spritesheet('dog', 'assets/Dog.png', {frameWidth: 64, frameHeight: 64}); //Need to add animation
        this.load.spritesheet('sheep', 'assets/sheep.png', {frameWidth: 64, frameHeight: 63});
        this.load.spritesheet('fence', 'assets/Fence.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('grass', 'assets/GrassTiles.png');
        this.load.image('red', 'assets/red.png');
        this.load.image('pond', 'assets/WaterTile.png'); //replace when pond sprite is created?
        this.load.image('finishSpace', 'assets/red.png'); //victory tile - replace if we make one?
        this.load.spritesheet('wolf', 'assets/Wolf.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('lasso', 'assets/Lasso.png', {frameWidth: 32, frameHeight: 32}); 

        //load music
        this.load.audio('lv1', 'music/Level1.mp3');
        this.load.audio('lv2', 'music/Level2.mp3');
        this.load.audio('lv3', 'music/Level3.mp3');
        this.load.audio('lv4', 'music/Level4.mp3');
        this.load.audio('lv5', 'music/Level5.mp3');
        this.load.audio('lv6', 'music/Level6.mp3');
        this.load.audio('lv7', 'music/Level7.mp3');
        this.load.audio('lv8', 'music/Level8.mp3');
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
        //Pause Title
        this.load.image('ptitle', 'assets/Titles/PauseTitle.png');
        //Pause Buttons
        this.load.spritesheet('resume', 'assets/Buttons/Resume.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('levelsel', 'assets/Buttons/LevelSelect.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('mainmenu', 'assets/Buttons/MainMenu.png', {frameWidth: 506, frameHeight: 105});
        
        this.lose_in_update = false;
    }

    create() {
        super.create();
        GameScene.in_menu = false;
        this.baa = this.sound.add('baa');
        this.pause_sound = this.sound.add('pause');
        this.bell = this.sound.add('bell');
        this.filler = this.sound.add('menu');
        this.drown = this.sound.add('drown');
        this.bite = this.sound.add('bite');
        this.win = this.sound.add('win');
        this.lose = this.sound.add('lose');

        this.startTime = Date.now(); //epoch in ms

        /*
        var bgtile = this.add.tileSprite(0, 0, 1920*2, 1080*2, 'grass');
        bgtile.setDepth(-1);
        */
       
        var bgTileSize = 30;

        var levelTiles = [];
        for (var y = 0; y < 1080; y += bgTileSize) {
            var row = [];
            for (var x = 0; x < 1920; x += bgTileSize) {
                //console.log(x,y);
                var frameKey = 6;
                //special cases for edges and corners
                if (x == 0 && y == 0) {
                    frameKey = 0;
                }
                else if (x == 0 && y == 1050) {
                    frameKey = 10;
                }
                else if (x == 1890 && y == 0) {
                    frameKey = 2;
                }
                else if (x == 1890 && y == 1050) {
                    frameKey = 12;
                }
                else if (y == 0) {
                    frameKey = 1;
                }
                else if (x == 0) {
                    frameKey = 5;
                }
                else if (x == 1890) {
                    frameKey = 7;
                }
                else if (y == 1050) {
                    //console.log("bottom");
                    frameKey = 11;
                }
                row.push(frameKey);
            }
            levelTiles.push(row);
        }
        var map = this.make.tilemap({data: levelTiles, tileWidth: bgTileSize, tileHeight: bgTileSize});
        var tiles = map.addTilesetImage('grass');
        var layer = map.createStaticLayer(0, tiles, 0, 0);
        layer.setDepth(-1);

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
        this.walls = this.add.group();

        this.player = this.dog.create(960, 540, undefined, 0);
        this.player.lassoAsset = null;
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
        //Dog drowning
        this.anims.create({
            key: 'drown',
            frames: this.anims.generateFrameNames('dog', {start: 9, end: 11})
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('dog', {start: 12, end: 12})
        });
        //this.igg.create(960, 540, undefined, 0);

        this.player.body.collideWorldBounds = true;
        //this.player.body.setSize(11, 32);

        this.physics.add.collider(this.dog, this.fence);
        this.physics.add.collider(this.sheep, this.fence, (sheep, fence) => {
            sheep.in_bark_event = false;
            sheep.wait_count = 0;
            sheep.setVelocityX(0);
            sheep.setVelocityY(0);
            if(fence.x < sheep.x) {
                sheep.x++;
            } else if (fence.x > sheep.x) {
                sheep.x--;
            }
            if(fence.y < sheep.y) {
                sheep.y++;
            } else if (fence.y > sheep.y) {
                sheep.y--;
            }
            sheep.collided_with_fence = true;
            sheep.collided_fence = fence;
        });
        this.physics.add.collider(this.sheep, this.sheep);
        this.physics.add.collider(this.dog, this.sheep);
        this.physics.add.collider(this.dog, this.pond, (dog, pond) => {
            if(dog.drowned) { return; }
            dog.play('drown');
            dog.ac = false;
            dog.drowned = true;
            dog.x = pond.x;
            dog.y = pond.y;
            dog.pond = pond;
            //var doSomething = () => {
                //if(dog.ac) { return; }
                //dog.ac = true;
                GameScene.playSound(this.drown);
                this.levelDoneSequence(2, 'Game over! You are too tired from doggypaddling out of the lake that you cannot do your duties for the rest of the day.\nPress R to restart the level');
            //}
            //dog.on('animationcomplete', doSomething);

            
        });
        this.physics.add.collider(this.sheep, this.pond, (sheep, pond) => {
            //this.drown.play();
            GameScene.playSound(this.drown);
            this.removeSheep(sheep);
            //Do we add something to let the player know the sheep drowned? sfx, anything else?
        });
        /*
        this.physics.add.collider(this.sheep, this.finishSpace, (sheep, space) => {
            this.score += this.sheepScore;
            this.removeSheep(sheep);
        });
        */
        this.physics.add.collider(this.wolf, this.fence);
        this.physics.add.collider(this.wolf, this.pond, (wolf, pond) => {
            GameScene.playSound(this.drown);
            this.removeWolf(wolf);
        }); //do I have an event? - weird interaction
        this.physics.add.collider(this.wolf, this.dog, (wolf, dog) => {
            //this.bite.play();
            dog.play("die");
            //var doSomething = () => {
                //if(dog.ac) { return; }
                //dog.ac = true;
                GameScene.playSound(this.bite);
                this.levelDoneSequence(2, "Game over! The wolf killed you!\nPress R to restart the level");
                //this.player.destroy();
            //}
            //dog.on('animationcomplete', doSomething);
        }); //do I have an event? - weird interaction
        this.physics.add.collider(this.wolf, this.sheep, (wolf, sheep) => {
            //this.bite.play();
            GameScene.playSound(this.bite);
            wolf.state = "STOPPED";
            wolf.setVelocityX(0);
            wolf.setVelocityY(0);
            //console.log(wolf.sheep_in_range.length);
            if(wolf.sheep_in_range.includes(sheep)) {
                remove(wolf.sheep_in_range, sheep);
                //console.log(wolf.sheep_in_range.length);
            }
            this.removeSheep(sheep);
        }); //do I have an event?
        this.player.lassoAsset = null;
        this.player.moving = false;
        this.player.drowned = false;

        this.scoreText = this.add.text(0, 40, "Sheep herded:0\n\nScore:0", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.scoreText.setX(1920 - this.scoreText.width);

        this.timeText = this.add.text(0, 180, "0:00", {fontSize: "36px", color: "black", align: "right", "padding": {x: 20, y: 20}});
        this.timeText.setX(1920 - this.timeText.width);

        var cursors = this.input.keyboard.createCursorKeys();
        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var pointer = this.input.activePointer;
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.controls = new Controls(this, cursors, this.player, spaceKey, this.wKey, this.aKey, this.sKey, this.dKey, this.sheep, this.wolf);

        //Is it possible to move this to controls? Likely not, since setting an event
        //Lasso needs to be improved
        //Dog can push into sheep position weirdly
        this.input.on('pointerup', (pointer) => {
            if (this.player.lassoTarget == null) {
                var target = null;
                for (var i = 0; i < this.allSheep.length; i++) {
                    var sheep = this.allSheep[i].asset;
                    if (Math.sqrt(Math.pow(this.player.x - sheep.x, 2) + Math.pow(this.player.y - sheep.y, 2)) <= 32 * 2 + 20) { //lasso radius
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

        this.status = 0; //0 = in progress, 1 = complete, 2 = fail, 3 = restart/change level, 4 = paused
    }

    update() {
        if (this.status == 0) {
            this.controls.update();

            if (this.player.body != null && (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0)) {
                this.player.angle = 90 + Math.atan2(this.player.body.velocity.y, this.player.body.velocity.x) * 180 / Math.PI;
            }
            
            if (this.player.angle % 180 == 0) {
                this.player.body.setSize(22, 64);
            }
            else if (this.player.angle % 90 == 0) {
                this.player.body.setSize(64, 16);
            }
            else {
                this.player.body.setSize(60, 60);
            }
            
            

            if(this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0) {
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
                        //console.log("scored");
                        var finishTime = Date.now();
                        this.score += this.sheepScore;
                        this.score += Math.floor(8000 *  1000 / (finishTime - this.startTime - this.pausedTime)); //balance needs to be checked
                        this.sheepHerded += 1;
                        var k;
                        for(k = 0; k < this.allWolves.length; k++) {
                            var wolf = this.allWolves[k];
                            if(wolf.asset.sheep_in_range.includes(sheep)) {
                                remove(wolf.asset.sheep_in_range, sheep);
                            }
                        }
                        //this.baa.play();
                        GameScene.playSound(this.baa);
                        this.removeSheep(sheep);
                        this.updateScoreText();
                    }
                }
            }

            if (this.allSheep.length == 0) {
                if (this.score >= this.requiredScore && this.sheepHerded >= this.requiredSheepHerded) {
                    this.levelDoneSequence(1, 'Level complete!\nYour score is: ' + this.score + '\nPress N to go to the next level');
                    //console.log("SCORE: " + this.score);
                    status = 1;
                }
                else {
                    this.levelDoneSequence(2, 'Game over! You did not herd enough sheep.\nPress R to restart the level');
                    status = 2;
                }
            }


            this.sheep.children.iterate((sheep) => {
               this.fence.children.iterate((wall) => {
                   if (Math.sqrt(Math.pow(wall.x - sheep.x, 2) + Math.pow(wall.y - sheep.y, 2)) < sheep.body.width + wall.body.width) {
                       if (((wall.x - sheep.x < 0) == (sheep.body.velocity.x < 0)) && ((wall.y - sheep.y < 0) == (sheep.body.velocity.y < 0))) { //if moving towards fence 
                           sheep.setVelocity(0);
                       }
                   }
               })
            });


            this.updateTimeText();
        }

        //Level Pausing
        if (Phaser.Input.Keyboard.JustDown(this.esckey)) {
            //this.scene.pause(this.levelName);
            if(this.status == 4 || this.status == 1 || this.status == 2) { return; }
            this.status = 4;
            this.pauseStart = Date.now();
            //this.pause_sound.play();

            this.allWolves.forEach(function(wolf) {
                wolf.storedX = wolf.asset.body.velocity.x;
                wolf.storedY = wolf.asset.body.velocity.y;
                wolf.asset.setVelocityX(0);
                wolf.asset.setVelocityY(0);
                
                // if (wolf.event) {
                //     //console.log(wolf.event);
                //     //wolf.event.pause();
                //     if(wolf.state === "PATROL") {
                //         wolf.event.paused = true;
                //     }
                // }
                
            });
            

            GameScene.playSound(this.pause_sound);
            
            var pausetitle      = this.add.sprite(960, 150, 'ptitle');
            //Resume Button
            var resume = this.add.sprite(960, 450, 'resume')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resume.setFrame(1))
            .on('pointerout', () => resume.setFrame(0));
            //Level Select Button
            var levelsel = this.add.sprite(960, 570, 'levelselect')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => levelsel.setFrame(1))
            .on('pointerout', () => levelsel.setFrame(0));
            //Main Menu Button
            var mainmenu = this.add.sprite(960, 690, 'mainmenu')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => mainmenu.setFrame(1))
            .on('pointerout', () => mainmenu.setFrame(0));
            
            resume.on('pointerdown', function(event) {
                this.status = 0;
                //this.bell.play();
                GameScene.playSound(this.bell);
                pausetitle.destroy();
                resume.destroy();
                levelsel.destroy();
                mainmenu.destroy(); 
                this.pausedTime += (Date.now() - this.pauseStart);
                // this.allWolves.forEach(function(wolf) {
                //     wolf.asset.setVelocityX(wolf.storedX);
                //     wolf.asset.setVelocityY(wolf.storedY);
                    
                //     // if (wolf.event) {
                //     //     //wolf.event.resume();
                //     //     if(wolf.state === "PATROL") {
                //     //         wolf.event.paused = false;
                //     //     }
                //     // }
                    
                // });

            }, this);
            levelsel.on('pointerdown', function(event) {
                //this.bell.play();
                GameScene.playSound(this.bell);
                this.scene.start('LevelSelectMenu'); 
                this.stopLevel();
            }, this);
            mainmenu.on('pointerdown', function(event) {
                //this.bell.play();
                GameScene.playSound(this.bell);
                this.game.sound.stopAll();
                //this.filler.play();
                GameScene.playMusic(this.filler);
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
        this.sheepHerded = 0;
    }

    play_filler() { 
        //this.filler.play();
        GameScene.playMusic(this.filler);
    }

    levelDoneSequence(status, msg) {
        this.status = status;
        
        this.player.setVelocity(0);
        this.allSheep.forEach((sheep) => {
            sheep.asset.setVelocity(0);
        });
        this.allWolves.forEach((wolf) => {
            wolf.asset.setVelocity(0);
            //wolf.event.paused = true;
        })
        this.lvdone = true;

        if(status == 1) {
            this.res_sound = this.win;
        } else {
            this.res_sound = this.lose;
        }

        if(this.player.drowned) {
            if(this.player.x != this.player.pond.x) {
                return;
            }
            if(this.player.y != this.player.pond.y) {
                return;
            }
        }
        
        GameScene.playMusic(this.res_sound);
        pause(1600);
        this.game.sound.stopAll();
        //this.res_sound.play();
        this.add.text(600, 400, msg, {backgroundColor: "0x0000ff", fontSize: "36px", fixedWidth: 660, align: "center", "padding": {x: 20, y: 20}, "wordWrap": {"width": 660}});
        
        var pf = this.play_filler();
        setTimeout(pf, 5000);
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
        var sheepObj = this.sheep.create(x, y, undefined, 0);
        sheepObj.body.collideWorldBounds = true;
        sheepObj.body.immovable = true;
        sheepObj.lassoed = false;
        sheepObj.alert = false;
        sheepObj.dogAlert = false;
        sheepObj.body.setSize(44, 44);
        var sheepAI = new Sheep(this, this.player, this.wolf, "IDLE", sheepObj);
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
            this.allSheep.splice(remove_index, 1);
        }
        if (this.player.lassoTarget == sheep) {
            this.player.lassoTarget = null;
        }
        sheep.done = true;
        sheep.destroy();
    }

    createWolf(x, y, startVelocityX=0, startVelocityY=0, frames=0, startStep=0) {
        var wolfObj = this.wolf.create(x, y);
        wolfObj.play('walk');
        wolfObj.body.collideWorldBounds = true;
        //wolfObj.body.immovable = true;
        wolfObj.body.setSize(20, 64);
        wolfObj.respondToBark = false;
        var wolfAI = new Wolf(this, this.sheep, "PATROL", wolfObj);
        wolfAI.setPatrol(startVelocityX, startVelocityY, frames, startStep);
        wolfObj.startAngle = wolfObj.angle;
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
    createHorizontalFences(startX, startY, num, dir=1, startTerminate=true, endTerminate=true, wall=false) {
        var f;
        if (num == 1) {
            f = this.fence.create(startX, startY, undefined, 0);
            f.angle += 90;
            f.type = 0;
            if (wall) {
                this.walls.add(f);
            }
        }
        else {
            var incrementer = dir * 32;
            for (var i = 0; i < num; i++) {
                if (i == 0 && startTerminate) {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 2);
                    f.angle -= 90 * dir;
                    f.type = 0;
                }
                else if (i == num - 1 && endTerminate) {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 2);
                    f.angle += 90 * dir;
                    f.type = 0;
                }
                else {
                    f = this.fence.create(startX + incrementer * i, startY, undefined, 0);
                    f.angle += 90;
                    f.type = 0;
                }
                if (wall) {
                    this.walls.add(f);
                }
            }
        }
    }

    createVerticalFences(startX, startY, num, dir=1, startTerminate=true, endTerminate=true, wall=false) {
        var f;
        if (num == 1) {
            f = this.fence.create(startX, startY, undefined, 0);
            f.type = 1;
            if (wall) {
                this.walls.add(f);
            }
        }
        else {
            var incrementer = dir * 32;
            for (var i = 0; i < num; i++) {
                if (i == 0 && startTerminate) {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 2);
                    if (dir == -1) {
                        f.angle += 180;
                    }
                    f.type = 1;
                }
                else if (i == num - 1 && endTerminate) {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 2);
                    if (dir == 1) {
                        f.angle += 180;
                    }
                    f.type = 1;
                }
                else {
                    f = this.fence.create(startX, startY + incrementer * i, undefined, 0);
                    f.type = 1;
                }
                if (wall) {
                    this.walls.add(f);
                }
            }
        }
    }

    createTFence(x, y, angle, wall=false) {
        var f = this.fence.create(x, y, undefined, 3);
        f.angle += angle;
        f.type = 2;
        if (wall) {
            this.walls.add(f);
        }
    }

    createLFence(x, y, angle, wall=false) {
        var f = this.fence.create(x, y, undefined, 1);
        f.angle += 180 + angle;
        f.type = 3;
        if (wall) {
            this.walls.add(f);
        }
    }   

    createPlusFence(x, y, wall=false) {
        var f = this.fence.create(x, y, undefined, 4);
        f.type = 4;
        if (wall) {
            this.walls.add(f);
        }
    }

    /*
    numHorizonFences = number of horizontal fences between the corners
    numVerticFences = number of vertical fences between the corners
    */
    createBoxOfFences(startX, startY, numHorizFences, numVerticFences, walls=true) {
        this.createVerticalFences(startX, startY + 32, numVerticFences, 1, false, false, walls);
        this.createVerticalFences(startX + 32 * (numHorizFences + 1), startY + 32, numVerticFences, 1, false, false, walls);
        this.createHorizontalFences(startX + 32, startY, numHorizFences, 1, false, false, walls);
        this.createHorizontalFences(startX + 32, startY + 32 * (numVerticFences + 1), numHorizFences, 1, false, false, walls);

        this.createLFence(startX, startY, 90, walls);
        this.createLFence(startX, startY + 32 * (numVerticFences + 1), 0, walls);
        this.createLFence(startX + 32 * (numHorizFences + 1), startY, 180, walls);
        this.createLFence(startX + 32 * (numHorizFences + 1), startY + 32 * (numVerticFences + 1), -90, walls);
    }

    //Create finish area starting at (x,y) with width and height
    createFinishSpace(x, y, width, height) {
        var spaceBgTile = this.add.tileSprite(x + width/2, y + height/2, width, height, 'red');
        spaceBgTile.setDepth(-1);
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

    updateScoreText() {
        this.scoreText.setText("Sheep herded: " + this.sheepHerded + "\n\nScore: " + this.score);
        this.scoreText.setX(1920 - this.scoreText.width);
    }

    updateTimeText() {
        var currTime = Date.now();
        var totalSecondsPassed = Math.floor((currTime - this.startTime - this.pausedTime) / 1000);
        var minutesPassedStr = (Math.floor(totalSecondsPassed / 60)).toString();
        var secondsPassedStr = (totalSecondsPassed % 60).toString();
        if (totalSecondsPassed % 60 < 10) {
            secondsPassedStr = "0" + secondsPassedStr;
        }
        this.timeText.setText(minutesPassedStr + ":" + secondsPassedStr);
        this.timeText.setX(1920 - this.timeText.width);
    }

    
}

function pause(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
            return; 
    } 
} 

function remove(arr, element) {
    var i;
    for(i = 0; i < arr.length; i++) {
        if(arr[i] === element) {
            arr.splice(i, 1);
        }
    }
}