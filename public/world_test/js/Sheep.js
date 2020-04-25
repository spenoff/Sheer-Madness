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
     * @param {Dog} dog The dog in the game.
     * @param {String} state Represents the curent state of the sheep.
     * @param {GameObject} asset The game object to reference
     */
    constructor(game, dog, state, asset) {
        this.game = game;
        this.dog = dog;
        this.state = state;
        this.asset = asset;
    }

    setState(state) {
        this.state = state; 
    }

    getState() {
        return this.state;
    }

    update() {
        var dogX = this.dog.player.x;
        var dogY = this.dog.player.y;

        if (!this.asset.lassoed) {
            if(Math.sqrt(Math.pow(dogX - this.asset.x, 2) + Math.pow(dogY - this.asset.y, 2)) <= 60) {
                //distance between the dog and the sheep is less than 50
                //The sheep must move away from the dog
                if(dogX < this.asset.x) {
                    //this.asset.x++;
                    this.asset.setVelocityX(140);
                } else if(dogX > this.asset.x) {
                    //this.asset.x--;
                    this.asset.setVelocityX(-140);
                }

                if(dogY < this.asset.y) {
                    //this.asset.y++;
                    this.asset.setVelocityY(140);
                } else if(dogY > this.asset.y) {
                    //this.asset.y--;
                    this.asset.setVelocityY(-140);
                }
            }
            else {
                this.asset.setVelocityX(0);
                this.asset.setVelocityY(0);
            }
        }
        else {
            this.asset.setVelocityX(this.dog.player.body.velocity.x);
            this.asset.setVelocityY(this.dog.player.body.velocity.y);
        }
    }
}