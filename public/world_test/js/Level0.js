import { Level } from "./Level.js"

export class Level0 extends Level {
    constructor() {
        super('Level0');
    }

    create() {
        super.create();
    
        this.setRequiredScore(500);
        this.setPlayerPosition(800, 800);
        this.createSheep(900, 600);
        this.createPond(400,700);
        this.createFinishSpace(800, 100, 128, 128);

        this.createVerticalFences(400, 32, 10);
        this.createVerticalFences(1200, 32, 10);
        this.createHorizontalFences(600, 700, 15);
    }

    update() {
        super.update();
        if (this.status === 0) {

            //do I check the sheep entering to a basic collide? or leave it like this (sheep has to fully enter a finish area)
            for (var i = 0; i < this.allFinishSpaces.length; i++) {
                var space = this.allFinishSpaces[i];
                for (var j = 0; j < this.allSheep.length; j++) {
                    var sheep = this.allSheep[i].asset;
                    if (sheep.x - sheep.width/2 >= space.x - space.width/2 && sheep.x + sheep.body.width/2 <= space.x + space.width/2 &&
                        sheep.y - sheep.height/2 >= space.y - space.height/2 && sheep.y + sheep.body.height/2 <= space.y + space.height/2) {
                        this.score += 500;
                        this.removeSheep(sheep);
                    }
                }
            }
        }
    }
}