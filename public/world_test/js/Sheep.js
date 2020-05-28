import { GameScene } from "./GameScene.js";

/**
 * This is a wrapper class for the sheep which can be herded by a dog.
 * 
 * This gives the sheep location and states to be used in the game.
 * Note that this is currently designed with the assumption that there is only one dog in the game.
 * 
 * @file This file defines the Sheep class.
 * @author Spencer Nisonoff
 * @since April 20th, 2020
 * 
*/
export class Sheep {

    /**
     * Contructs the Sheep object.
     * @param {Game} game The game that the sheep is in.
     * @param {GameObject} dog The dog in the game.
     * @param {String} state Represents the curent state of the sheep.
     * @param {GameObject} asset The game object to reference
     */
    constructor(game, dog, wolves, state, asset) {
        this.game = game;
        this.dog = dog;
        this.state = state;
        this.asset = asset;
        this.asset.in_bark_event = false;
        this.asset.done = false;
        this.asset.collided_with_fence = false;
        this.asset.collided_with_fence_waiting_response = false;
        this.asset.collided_fence = null;
        this.asset.be_vx = 0;
        this.asset.be_vy = 0;
        this.lassoAsset = null;
        this.ready_to_baa = true;
        this.baa = this.game.sound.add('baa');
        this.wolves = wolves;
    }

    setState(state) {
        this.state = state; 
    }

    getState() {
        return this.state;
    }

    dogFacingForward() {
        return this.dog.angle == 0;
    }

    dogFacingBackward() {
        return this.dog.angle == -180;
    }

    dogFacingLeft() {
        return this.dog.angle == -90;
    }

    dogFacingRight() {
        return this.dog.angle == 90;
    }

    setLassoAsset(lassoAsset) {
        this.lassoAsset = lassoAsset;
        this.lassoAsset.enableBody = false;
        //this.lassoAsset.body.setCollisionGroup(this.game.physics.p2.createCollisionGroup());
    }

    static barkEvent(asset, vx, vy) {
        console.log("bark event");
        asset.setVelocityX(140 *  vx);
        asset.setVelocityY(-140 * vy);
        asset.in_bark_event = true;
        asset.be_vx = vx;
        asset.be_vy = vy;
    }

    static endBarkEvent(asset) {
        if(typeof asset === 'undefined') { return; }
        if(asset == null) { return; }
        if(asset.done) { return; }
        asset.setVelocityX(0);
        asset.setVelocityY(0);
        asset.in_bark_event = false;
    }

    update() {
        if(typeof this.asset === 'undefined' || typeof this.dog === 'undefined') { return; }
        if(this.asset == null || this.dog == null) { return; }
        if(this.asset.done) { return; }
        
        var dogX = this.dog.x;
        var dogY = this.dog.y;

        if (!this.asset.lassoed) {
            var randomFactor = 10;
            if(this.lassoAsset != null) {
                this.lassoAsset.destroy();
                this.lassoAsset = null;
            }

            this.asset.alert = Math.sqrt(Math.pow(dogX - this.asset.x, 2) + Math.pow(dogY - this.asset.y, 2)) <= 120; //herding radius
            this.asset.wolfWatch = null;
            this.wolves.children.iterate((wolf) => {
                if (Math.sqrt(Math.pow(wolf.x - this.asset.x, 2) + Math.pow(wolf.y - this.asset.y, 2)) <= 100) {
                    //wolf detection radius
                    if (this.asset.wolfWatch == null || Math.sqrt(Math.pow(wolf.x - this.asset.x, 2) + Math.pow(wolf.y - this.asset.y, 2)) < Math.sqrt(Math.pow(this.asset.wolfWatch.x - this.asset.x, 2) + Math.pow(this.asset.wolfWatch.y - this.asset.y, 2))) {
                        this.asset.wolfWatch = wolf;
                        if(!wolf.sheep_in_range.includes(this.asset)) {
                            console.log(wolf.sheep_in_range.push(this.asset));
                        }
                    } else {
                        if(wolf.sheep_in_range.includes(this.asset)) {
                            remove(wolf.sheep_in_range(this.asset));
                            console.log(wolf.sheep_in_range.length);
                        }
                    }
                }
            });

           if(this.asset.in_bark_event) {
            console.log(this.asset.be_vy);
            this.asset.setVelocityX(140 *  this.asset.be_vx);
            this.asset.setVelocityY(-140 * this.asset.be_vy);
           }
            if (this.asset.lassoed) {
               this.asset.setVelocityX(this.dog.body.velocity.x);
               this.asset.setVelocityY(this.dog.body.velocity.y);
           }
           else if(this.asset.collided_with_fence) {
               if(this.asset.collided_fence == null) { return; }
               if(this.asset.wait_count < 120) {
                   this.asset.wait_count++;
                   if(this.asset.alert || this.asset.dogAlert) {
                       this.asset.collided_with_fence = false;
                       this.asset.wait_count = 0;
                   }
                   return;
               }
               switch(this.asset.collided_fence.type) {
                   case 0: //horizontal
                        console.log("horz");
                        if(this.asset.collided_fence.y > this.asset.y) {
                            //fence is below the sheep
                            this.asset.setVelocityY(-16);
                            console.log("t");
                            if(Math.abs(this.asset.collided_fence.y - this.asset.y) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityY(0);
                            }
                        } else if(this.asset.collided_fence.y < this.asset.y) {
                            //fence is above the sheep
                            this.asset.setVelocityY(16);
                            console.log("y");
                            if(Math.abs(this.asset.collided_fence.y - this.asset.y) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityY(0);
                            }
                        }
                        break;
                   case 1: //vertical
                       if(this.asset.collided_fence.x > this.asset.x) {
                            //fence is below the sheep
                            this.asset.setVelocityX(-16);
                            console.log("t");
                            if(Math.abs(this.asset.collided_fence.x - this.asset.x) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityX(0);
                            }
                        } else if(this.asset.collided_fence.x < this.asset.x) {
                            //fence is above the sheep
                            this.asset.setVelocityX(16);
                            console.log("y");
                            if(Math.abs(this.asset.collided_fence.x - this.asset.x) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityX(0);
                             }
                        }
                        break;
                   case 3: //L
                       if(this.asset.collided_fence.y > this.asset.y) {
                            //fence is below the sheep
                            this.asset.setVelocityY(-16);
                            if(Math.abs(this.asset.collided_fence.y - this.asset.y) > 64) {
                                //this.asset.collided_with_fence = false;
                                this.asset.setVelocityY(0);
                            }
                        } else if(this.asset.collided_fence.y < this.asset.y) {
                            //fence is above the sheep
                            this.asset.setVelocityY(16);
                            if(Math.abs(this.asset.collided_fence.y - this.asset.y) > 64) {
                                //this.asset.collided_with_fence = false;
                                this.asset.setVelocityY(0);
                            }
                        }

                        if(this.asset.collided_fence.x > this.asset.x) {
                            //fence is below the sheep
                            this.asset.setVelocityX(-16);
                            console.log("t");
                            if(Math.abs(this.asset.collided_fence.x - this.asset.x) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityX(0);
                            }
                        } else if(this.asset.collided_fence.x < this.asset.x) {
                            //fence is above the sheep
                            this.asset.setVelocityX(16);
                            console.log("y");
                            if(Math.abs(this.asset.collided_fence.x - this.asset.x) > 64) {
                                this.asset.collided_with_fence = false;
                                this.asset.wait_count = 0;
                                this.asset.setVelocityX(0);
                             }
                        }
                        break;
               }
           }
           else if(this.asset.in_bark_event) {
            console.log(this.asset.be_vy);
            this.asset.setVelocityX(140 *  this.asset.be_vx);
            this.asset.setVelocityY(-140 * this.asset.be_vy);
            this.asset.body.velocity.x += Math.floor((Math.random() * randomFactor * 2 + 1)) - randomFactor;
            this.asset.body.velocity.y += Math.floor((Math.random() * randomFactor * 2 + 1)) - randomFactor;
           }
           else if (this.asset.alert || this.asset.dogAlert) {
               if(this.ready_to_baa) {
                   //this.baa.play();
                   GameScene.playSound(this.baa);
                   this.ready_to_baa = false;
               }

                if (dogX < this.asset.x) {
                    this.asset.setVelocityX(140);
                } 
                else if (dogX > this.asset.x) {
                    this.asset.setVelocityX(-140);
                }

                if (dogY < this.asset.y) {
                    this.asset.setVelocityY(140);
                } 
                else if (dogY > this.asset.y) {
                    this.asset.setVelocityY(-140);
                }

                this.asset.body.velocity.x += Math.floor((Math.random() * randomFactor * 2 + 1)) - randomFactor;
                this.asset.body.velocity.y += Math.floor((Math.random() * randomFactor * 2 + 1)) - randomFactor;
            }
            else if (this.asset.wolfWatch) {
                if (this.asset.wolfWatch.x < this.asset.x) {
                    this.asset.setVelocityX(160);
                }
                else if (this.asset.wolfWatch.x > this.asset.x) {
                    this.asset.setVelocityX(-160);
                }
 
                if (this.asset.wolfWatch.y < this.asset.y) {
                    this.asset.setVelocityY(160);
                }
                else if (this.asset.wolfWatch.y > this.asset.y) {
                    this.asset.setVelocityY(-160);
                }
            }

            //somehow add slight randomization of velocities to above cases not lassoing or fence collide

            else {
                this.asset.setVelocityX(0);
                this.asset.setVelocityY(0);

                if(!this.ready_to_baa){
                    setTimeout(function(){this.ready_to_baa = true}, 10000);
                }
            }
        } else if(this.asset.collided_with_fence_waiting_response) {
            this.asset.collided_with_fence = true;
        }
        if(this.asset.lassoed) {
            if(this.dogFacingForward()) {
                this.asset.x = this.dog.x;
                this.asset.y = this.dog.y + 32;
            }
            else if(this.dogFacingBackward()) {
                this.asset.x = this.dog.x;
                this.asset.y = this.dog.y - 32;
            }
            else if(this.dogFacingLeft()) {
                this.asset.x = this.dog.x + 32;
                this.asset.y = this.dog.y;
            }
            else if(this.dogFacingRight()) {
                this.asset.x = this.dog.x - 32;
                this.asset.y = this.dog.y;
            }
            if(this.lassoAsset != null){
                this.lassoAsset.x = this.asset.x;
                this.lassoAsset.y = this.asset.y;
            }
            this.asset.setVelocityX(this.dog.body.velocity.x);
            this.asset.setVelocityY(this.dog.body.velocity.y);
           
        }
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