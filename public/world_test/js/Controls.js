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
        this.lassoed = false;
    }

    update() {
        if(this.player == undefined) { return; }
        if (this.player.body != null) {
            var l = false;
            this.sheep.children.iterate((child) => {
                //console.log(this.lassoed);
                if(child.lassoed){
                    l = true;
                }
            })
            this.lassoed = l;

            var moving_x = false;

            if (this.cursors.left.isDown || this.aKey.isDown) {
                if(this.lassoed) {
                    this.player.setVelocityX(-80);
                }else{
                    this.player.setVelocityX(-160);
                }
                this.player.moving = true;
                moving_x = true;
            }
            else if (this.cursors.right.isDown || this.dKey.isDown) {
                if(this.lassoed) {
                    this.player.setVelocityX(80);
                } else {
                    this.player.setVelocityX(160);
                }
                this.player.moving = true;
                moving_x = true;
            }
            else {
                this.player.setVelocityX(0);
                this.player.moving = false;
            }

            if (this.cursors.up.isDown || this.wKey.isDown) {
                if(this.lassoed) {
                    this.player.setVelocityY(-80);
                } else {
                    this.player.setVelocityY(-160);
                }
                this.player.moving = true;
            }
            else if (this.cursors.down.isDown || this.sKey.isDown) {
                if(this.lassoed) {
                    this.player.setVelocityY(80);
                } else {
                    this.player.setVelocityY(160);
                }
                this.player.moving = true;
            }
            else {
                this.player.setVelocityY(0);
                if(!moving_x) {
                    this.player.moving = false;
                }
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
                        child.collided_with_fence = false;
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