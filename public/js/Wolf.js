export class Wolf {
    constructor(game, sheep, state, asset) {
        this.game = game;
        this.sheep = sheep;
        this.state = state;
        this.asset = asset;
        this.frames = 0;
        this.startVelocityX = 0;
        this.startVelocityY = 0;
        this.stepCounter = 0;
        this.startStep = 0;
        this.respondToBark = false;
        this.asset.sheep_in_range = [];
        this.startPositionX = this.asset.x;
        this.startPositionY = this.asset.y;
        this.update_counter = 0;
        this.p_stage = 0;
        this.type == ""
        this.moving = true;
        this.asset.state = "";
    }

    addSheep(sheep) {
        this.sheep.push(sheep);
    }

    setPatrol(startVelocityX, startVelocityY, frames, startStep=0) {
        this.startVelocityX = startVelocityX;
        this.startVelocityY = startVelocityY;
        this.frames = frames;
        this.startStep = startStep;
        if(startVelocityX == 0) { this.type = "verti"; }
        if(startVelocityY == 0) { this.type = "hori"; }
        
        if(!(startVelocityX != 0 && startVelocityY != 0)){
            this.asset.setVelocityX(startVelocityX);
            this.asset.setVelocityY(startVelocityY);
            // this.event = this.game.time.addEvent({delay: ms, 
            //     callback: () => {
            //         if (this.asset.body) { //Can I remove this after wolf dies?
            //             this.asset.body.velocity.x *= -1;
            //             this.asset.body.velocity.y *= -1;
            //         }
            //     }, 
            //     loop: true});
        } else {
            this.asset.setVelocityX(startVelocityX);
            //There will be 4 stages
            //0 - move left
            //1 - move up
            //2 - move right
            //3 - move down
            //var p_stage = 0;
            // this.event = this.game.time.addEvent({delay: ms, 
            //     callback: () => {
            //         if (this.asset.body) { //Can I remove this after wolf dies?
            //             switch(p_stage) {
            //                 case 0:
            //                     //move to stage 1
            //                     this.asset.setVelocityX(0);
            //                     this.asset.setVelocityY(startVelocityY);
            //                     p_stage++;
            //                     break;
            //                 case 1:
            //                     //move to stage 2
            //                     this.asset.setVelocityX(-1 * startVelocityX);
            //                     this.asset.setVelocityY(0);
            //                     p_stage++;
            //                     break;
            //                 case 2:
            //                     //move to stage 3
            //                     this.asset.setVelocityX(0);
            //                     this.asset.setVelocityY(-1 * startVelocityY);
            //                     p_stage++;
            //                     break;
            //                 case 3:
            //                     //move back to stage 0
            //                     this.asset.setVelocityX(startVelocityX);
            //                     this.asset.setVelocityY(0);
            //                     p_stage = 0;
            //                     break;
            //             }
            //         }
            //     }, 
            //     loop: true});
        }
    }

    moveTo(x, y) {
        if(x > this.asset.x) {
            this.asset.setVelocityX(50);
        } else if(x < this.asset.x) {
            this.asset.setVelocityX(-50);
        }

        if(y > this.asset.y) {
            this.asset.setVelocityY(50);
        } else if(y < this.asset.y) {
            this.asset.setVelocityY(-50);
        }
    }

    patrol() {
        if (!this.asset.body) { return; }
        if(this.update_counter < this.frames) {
            //console.log(this.update_counter)
            this.update_counter += 1;
            return;
            
        }
        if(!(this.startVelocityX != 0 && this.startVelocityY != 0)){
            if (this.asset.body) { //Can I remove this after wolf dies?
                // if(this.type == "hori") {
                //     this.asset.setVelocityX(this.asset.body.velocity.x * -1);
                //     this.asset.setVelocityY(0);
                // } else{
                //     this.asset.setVelocityY(this.asset.body.velocity.y * -1);
                //     this.asset.setVelocityX(0);
                // }
                this.asset.body.velocity.x *= -1;
                this.asset.body.velocity.y *= -1;
            }
        }
        else { //Can I remove this after wolf dies?
            switch(this.p_stage) {
                case 0:
                    //move to stage 1
                    this.asset.setVelocityX(0);
                    this.asset.setVelocityY(this.startVelocityY);
                    this.p_stage++;
                    break;
                case 1:
                    //move to stage 2
                    this.asset.setVelocityX(-1 * this.startVelocityX);
                    this.asset.setVelocityY(0);
                    this.p_stage++;
                    break;
                case 2:
                    //move to stage 3
                    this.asset.setVelocityX(0);
                    this.asset.setVelocityY(-1 * this.startVelocityY);
                    this.p_stage++;
                    break;
                case 3:
                    //move back to stage 0
                    this.asset.setVelocityX(this.startVelocityX);
                    this.asset.setVelocityY(0);
                    this.p_stage = 0;
                    break;
            }
        }
        this.update_counter = 0;
    }

    update() {
        console.log(this.state);
        if(this.asset.state == "STOPPED") {
            this.state = "STOPPED";
        }
        //update rotation
        if(this.asset.body.velocity.x < 0) {
            this.asset.angle = -90;
            this.asset.body.setSize(64, 20);
        } else if(this.asset.body.velocity.x > 0) {
            this.asset.angle = 90;
            this.asset.body.setSize(64, 20);
        } else if(this.asset.body.velocity.y > 0) {
            this.asset.angle = -180;
            this.asset.body.setSize(20, 64);
        } else {
            this.asset.angle = 0;
            this.asset.body.setSize(20, 64);
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
       //console.log(this.state);
       //console.log(this.asset.sheep_in_range.length);
       //console.log(this.event.paused);
       switch(this.state) {
           case "PATROL":
               this.patrol();
               //Check if we should switch to the "HUNT" state
               if(this.asset.sheep_in_range.length > 0) {
                   //console.log("Now hunt");
                   //this.event.paused = true;
                   this.state = "HUNT";
               }
               break;
           case "HUNT":
               //Check if we should switch to the  "PATROL" state
               if(this.asset.sheep_in_range.length <= 0) {
                    //this.moveTo(this.startPositionX, this.startPositionY);
                    //console.log("x: " + this.asset.x);
                    //console.log("y: " + this.asset.y);
                    //console.log("sx: " + this.startPositionX);
                    //console.log("sy: " + this.startPositionY);

                    // if(this.asset.x < this.startPositionX + 3 && this.asset.x > this.startPositionX - 3) {
                         this.asset.x = this.startPositionX;
                    // }
                     //if(this.asset.y < this.startPositionY + 3 && this.asset.y > this.startPositionY - 3) {
                         this.asset.y = this.startPositionY;
                    // }
                    //if(this.asset.x === this.startPositionX && this.asset.y === this.startPositionY) {
                        //console.log("x: " + this.asset.startVelocityX);
                        //console.log("y: " + this.asset.startVelocityY);
                        //console.log("ms: " + this.asset.ms);
                        //console.log("ss: " + this.asset.startStep);
                        //this.setPatrol(this.asset.startVelocityX, this.asset.startVelocityY, this.asset.ms, this.asset.startStep);
                        //this.asset.setVelocityX(0);
                        //this.asset.setVelocityY(0);
                        //this.asset.angle = this.asset.startAngle;
                        //this.event.paused = false;
                        //this.event.remove();
                        //this.setPatrol(this.asset.startVelocityX, this.asset.startVelocityY, this.asset.ms, this.asset.startStep);
                        this.asset.setVelocityX(this.startVelocityX);
                        this.asset.setVelocityY(this.startVelocityY);
                        this.p_stage = 0;
                        this.update_counter = 0;
                        //console.log("now patrol");
                        this.state = "PATROL";
                   // }
               } else {
                   //console.log("accelerating to sheep");
                   var eyed_sheep = this.asset.sheep_in_range[0];
                   this.moveTo(eyed_sheep.x, eyed_sheep.y);
               }
               break;
            case "STOPPED":
                this.asset.setVelocityX(0);
                this.asset.setVelocityX(0);
       }
    }

}
