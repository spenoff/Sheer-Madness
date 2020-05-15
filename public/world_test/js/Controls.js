import { Sheep } from "./Sheep.js";

export class Controls {
    constructor(game, cursors, player, spaceKey, wKey, aKey, sKey, dKey, sheep) {
        this.game = game;
        this.cursors = cursors;
        this.player = player;
        this.spaceKey = spaceKey;
        this.wKey = wKey;
        this.aKey = aKey;
        this.sKey = sKey;
        this.dKey = dKey;
        this.sheep = sheep;
        this.barkRadius = 250;
    }

    update() {
        if(this.player == undefined) { return; }
        if (this.player.body != null) {

            if (this.cursors.left.isDown || this.aKey.isDown) {
                this.player.setVelocityX(-160);
            }
            else if (this.cursors.right.isDown || this.dKey.isDown) {
                this.player.setVelocityX(160);
            }
            else {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown || this.wKey.isDown) {
                this.player.setVelocityY(-160);
            }
            else if (this.cursors.down.isDown || this.sKey.isDown) {
                this.player.setVelocityY(160);
            }
            else {
                this.player.setVelocityY(0);
            }

            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                this.sf = this.game.sound.add('bark');
                this.sf.play();
                console.log("Space");
                var vx = Math.sin(this.player.rotation);
                var vy = Math.cos(this.player.rotation);
                this.sheep.children.iterate((child) => {
                    if (Math.sqrt(Math.pow(this.player.x - child.x, 2) + Math.pow(this.player.y - child.y, 2)) < this.barkRadius) {
                        //child.dogAlert = true;
                        console.log(this.player.angle);
                        if(this.player.angle == 0) {
                            Sheep.barkEvent(child, 0, 1)
                        } else if (this.player.angle == -180) {
                            Sheep.barkEvent(child, 0, -1)
                        }
                        else if(this.player.angle == -90 || this.player.angle == 90){
                            console.log("horz");
                            Sheep.barkEvent(child, this.player.angle / 90, 0)
                        } else {
                            Sheep.barkEvent(child, vx, vy);
                        }
                        this.game.time.addEvent({
                            delay: 2000,
                            loop: false,
                            callback: () => {
                                //child.dogAlert = false;
                                Sheep.endBarkEvent(child);
                            }
                        })
                    }
                })
            }

        }
    }
}