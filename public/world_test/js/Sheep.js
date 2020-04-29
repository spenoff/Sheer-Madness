/**
 * This is a wrapper class for the sheep which can be herded by a dog.
 * 
 * This gives the sheep location and states to be used in the game.
 * Note that this is currently designed with the assumption that there is only onne dog in the game.
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
    constructor(game, dog, state, asset) {
        this.game = game;
        this.dog = dog;
        this.state = state;
        this.asset = asset;
        this.lassoAsset = null;
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

    update() {
        var dogX = this.dog.x;
        var dogY = this.dog.y;

        if (!this.asset.lassoed) {

            if(this.lassoAsset != null) {
                this.lassoAsset.destroy();
                this.lassoAsset = null;
            }

            /*
            -Change this part so that sheep are set to alert (this.asset.alert) if within a range
            -Set sheep to not be alert if not within range
            -If sheep is alert, then it moves away from the dog
            -How do we conjoin this with bark? If sheep is not in range for natural alert, but is in range for bark alert, sheep will only move once for bark
               Do we have an alert timer or something?
            */

           this.asset.alert = Math.sqrt(Math.pow(dogX - this.asset.x, 2) + Math.pow(dogY - this.asset.y, 2)) <= 60;

           if (this.asset.lassoed) {
               this.asset.setVelocityX(this.dog.body.velocity.x);
               this.asset.setVelocityY(this.dog.body.velocity.y);
           }
           else if (this.asset.alert || this.asset.dogAlert) {
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
            }
            else {
                this.asset.setVelocityX(0);
                this.asset.setVelocityY(0);
            }
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