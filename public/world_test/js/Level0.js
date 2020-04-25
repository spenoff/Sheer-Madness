import { Level } from "./Level.js"
import { Sheep } from "./Sheep.js"

export class Level0 extends Level {
    constructor() {
        super("Level0");
    }

    create() {
        super.create();
    
        this.bgtile = this.add.tileSprite(800, 100, 128, 128, 'red'); //xy are the center
        this.bgtile.setDepth(-1);

        this.allFinishSpaces = [
            {
                x: 800,
                y: 100,
                width: 128,
                height: 128
            }
        ]

        var sheepObj = this.sheep.create(900, 600);
        sheepObj.body.collideWorldBounds = true;
        sheepObj.lassoed = false;
        var sheepAI = new Sheep(this.game, this.DogPlayer, "IDLE", sheepObj);
        this.allSheep.push(sheepAI);
        this.player.x = 800;
        this.player.y = 800;

        this.createVerticalFences(400, 32, 10);
        this.createVerticalFences(1200, 32, 10);
        this.createHorizontalFences(600, 700, 15);
    }

    update() {
        super.update();
        if (this.status === 0) {
            for (var i = 0; i < this.allFinishSpaces.length; i++) {
                var space = this.allFinishSpaces[i];
                for (var j = 0; j < this.allSheep.length; j++) {
                    var sheep = this.allSheep[i].asset;
                    if (sheep.x - sheep.width/2 >= space.x - space.width/2 && sheep.x + sheep.body.width/2 <= space.x + space.width/2 &&
                        sheep.y - sheep.height/2 >= space.y - space.height/2 && sheep.y + sheep.body.height/2 <= space.y + space.height/2) {
                        //end sequence
                        this.status = 1;
                        this.player.setVelocity(0);
                        sheep.setVelocity(0);
                        alert("Level complete!");
                    }
                }
            }
        }
    }
}