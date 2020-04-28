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
    }

    setPatrol(startVelocityX, startVelocityY, ms, startStep=0) {
        this.startVelocityX = startVelocityX;
        this.startVelocityY = startVelocityY;
        this.ms = ms;
        this.startStep = startStep;
        this.asset.setVelocityX(startVelocityX);
        this.asset.setVelocityY(startVelocityY);
        this.game.time.addEvent({delay: ms, callback: () => {
            this.asset.body.velocity.x *= -1;
            this.asset.body.velocity.y *= -1;
        }, loop: true});
    }

    update() {
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
    }

}