export class Wolf {
    constructor(game, sheep, state, asset) {
        this.game = game;
        this.sheep = sheep;
        this.state = state;
        this.asset = asset;
        this.ms = 0;
        this.startVelocityX = 0;
        this.startVelocityY = 0;
        this.stepCounter = 0;
        this.startStep = 0;
        this.respondToBark = false;
        this.asset.sheep_in_range = [];
        this.startPositionX = this.asset.x;
        this.startPositionY = this.asset.y;
    }

    addSheep(sheep) {
        this.sheep.push(sheep);
    }

    setPatrol(startVelocityX, startVelocityY, ms, startStep=0) {
        this.startVelocityX = startVelocityX;
        this.startVelocityY = startVelocityY;
        this.ms = ms;
        this.startStep = startStep;
        
        if(!(startVelocityX != 0 && startVelocityY != 0)){
            this.asset.setVelocityX(startVelocityX);
            this.asset.setVelocityY(startVelocityY);
            this.event = this.game.time.addEvent({delay: ms, 
                callback: () => {
                    if (this.asset.body) { //Can I remove this after wolf dies?
                        this.asset.body.velocity.x *= -1;
                        this.asset.body.velocity.y *= -1;
                    }
                }, 
                loop: true});
        } else {
            this.asset.setVelocityX(startVelocityX);
            //There will be 4 stages
            //0 - move left
            //1 - move up
            //2 - move right
            //3 - move down
            var p_stage = 0;
            this.event = this.game.time.addEvent({delay: ms, 
                callback: () => {
                    if (this.asset.body) { //Can I remove this after wolf dies?
                        switch(p_stage) {
                            case 0:
                                //move to stage 1
                                this.asset.setVelocityX(0);
                                this.asset.setVelocityY(startVelocityY);
                                p_stage++;
                                break;
                            case 1:
                                //move to stage 2
                                this.asset.setVelocityX(-1 * startVelocityX);
                                this.asset.setVelocityY(0);
                                p_stage++;
                                break;
                            case 2:
                                //move to stage 3
                                this.asset.setVelocityX(0);
                                this.asset.setVelocityY(-1 * startVelocityY);
                                p_stage++;
                                break;
                            case 3:
                                //move back to stage 0
                                this.asset.setVelocityX(startVelocityX);
                                this.asset.setVelocityY(0);
                                p_stage = 0;
                                break;
                        }
                    }
                }, 
                loop: true});
        }
    }

    update() {
        //update rotation
        if(this.asset.body.velocity.x < 0) {
            this.asset.angle = -90;
        } else if(this.asset.body.velocity.x > 0) {
            this.asset.angle = 90;
        } else if(this.asset.body.velocity.y > 0) {
            this.asset.angle = -180;
        } else {
            this.asset.angle = 0;
        }
        if(this.asset.body.velocity.x != 0 || this.asset.body.velocity.y != 0) {
            const newLocal = 'wolf_walk';
            this.asset.play(newLocal);
        }
        /*
        if (this.stepCounter < this.stepLimit) {
            this.stepCounter++;
        }
        else {
            this.asset.body.velocity.x *= -1;
            this.asset.body.velocity.y *= -1;
            this.stepCounter = 0;
        }
        */
       // check if sheep are in range
       console.log(this.state);
       console.log(this.event.paused);
       switch(this.state) {
           case "PATROL":
               //Check if we should switch to the "HUNT" state
               if(this.asset.sheep_in_range.length > 0) {
                   console.log("Now hunt");
                   this.event.paused = true;
                   this.state = "HUNT";

               }
               break;
           case "HUNT":
               //Check if we should switch to the  "PATROL" state
               if(!(this.asset.sheep_in_range.lenth > 0)) {
                    this.game.physics.accelerateTo(this.asset, this.startPositionX, this.startPositionY, 140, 140);
                    if(this.asset.x === this.startPositionX && this.asset.y === this.startPositionY) {
                        console.log("Now patrol");
                        this.event.paused = false;
                        this.state = "PATROL";
                    }
               } else {
                   console.log("accelerating to sheep");
                   var eyed_sheep = this.asset.sheep_in_range[0];
                   this.game.physics.accelerateToObject(this.asset, eyed_sheep, 100, 240);
               }
               break;
       }
    }

}
