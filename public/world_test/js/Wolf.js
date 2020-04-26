export class Wolf {
    constructor(game, sheep, state, asset) {
        this.game = game;
        this.sheep = sheep;
        this.state = state;
        this.asset = asset;
        this.stepLimit = 0;
        this.startVelocityX = 0;
        this.startVelocityY = 0;
        this.stepCounter = 0;
    }

    setPatrol(startVelocityX, startVelocityY, stepLimit) {
        this.startVelocityX = startVelocityX;
        this.startVelocityY = startVelocityY;
        this.stepLimit = stepLimit;
        console.log(this.asset);
        this.asset.setVelocityX(startVelocityX);
        this.asset.setVelocityY(startVelocityY);
    }

    update() {
        console.log(this.stepCounter);
        if (this.stepCounter < this.stepLimit) {
            this.stepCounter++;
        }
        else {
            this.asset.body.velocity.x *= -1;
            this.asset.body.velocity.y *= -1;
            this.stepCounter = 0;
        }

        //when to make the wolf eat sheep? at collision or in range


    }

}