import { Level } from "./Level.js"

export class Level3 extends Level {
    constructor() {
        super('Level3');
    }

    create() {
        super.create();
    
        this.setRequiredScore(500);
        this.setPlayerPosition(368, 1000);
        this.createSheep(332, 968);
        this.createSheep(400, 968);

        //Left side
        for(var i = 0; i < 9; i++) {
            this.createPond(68 + (32 * i),216);
            this.createPond(68 + (32 * i),248);
            this.createPond(68 + (32 * i),280);
            this.createPond(68 + (32 * i),312);
            this.createPond(68 + (32 * i),344);
            this.createPond(68 + (32 * i),376);
            this.createPond(68 + (32 * i),408);
            this.createPond(68 + (32 * i),440);
            this.createPond(68 + (32 * i),472);
            this.createPond(68 + (32 * i),504);
            this.createPond(68 + (32 * i),536);
            this.createPond(68 + (32 * i),568);
            this.createPond(68 + (32 * i),600);
            this.createPond(68 + (32 * i),632);
            this.createPond(68 + (32 * i),664);
            this.createPond(68 + (32 * i),696);
            this.createPond(68 + (32 * i),728);
        }

        //right side
        for(var i = 0; i < 9; i++) {
            this.createPond(400 + (32 * i),216);
            this.createPond(400 + (32 * i),248);
            this.createPond(400 + (32 * i),280);
            this.createPond(400 + (32 * i),312);
            this.createPond(400 + (32 * i),344);
            this.createPond(400 + (32 * i),376);
            this.createPond(400 + (32 * i),408);
            this.createPond(400 + (32 * i),440);
            this.createPond(400 + (32 * i),472);
            this.createPond(400 + (32 * i),504);
            this.createPond(400 + (32 * i),536);
            this.createPond(400 + (32 * i),568);
            this.createPond(400 + (32 * i),600);
            this.createPond(400 + (32 * i),632);
            this.createPond(400 + (32 * i),664);
            this.createPond(400 + (32 * i),696);
            this.createPond(400 + (32 * i),728);
        }


        this.createBoxOfFences(32, 32, 20, 30);
        this.createFinishSpace(32, 32, 672, 150);
    }

    update() {
        super.update();
    }
}