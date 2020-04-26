export class Controls {
    constructor(game, cursors, player, spaceKey, mouse, sheep) {
        this.game = game;
        this.cursors = cursors;
        this.player = player;
        this.spaceKey = spaceKey;
        this.mouse = mouse;
        this.sheep = sheep;
        this.barkRadius = 250;
    }

    update() {
        if (this.player.body != null) {

            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
            }
            else {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-160);
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(160);
            }
            else {
                this.player.setVelocityY(0);
            }

            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                console.log("bark");
                this.sheep.children.iterate((child) => {
                    if (Math.sqrt(Math.pow(this.player.x - child.x, 2) + Math.pow(this.player.y - child.y, 2)) < this.barkRadius) {
                        child.alert = true;
                    }
                })
            }

        }
    }
}