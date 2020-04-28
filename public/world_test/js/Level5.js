import { Level } from "./Level.js"

export class Level5 extends Level {
    constructor() {
        super('Level5');
        
    }

    create() {
        super.create();
    
        this.setPlayerPosition(600, 900);
        this.createSheep(600, 1000);
        this.createSheep(500, 900);
        this.createFinishSpace(550, 0, 300, 32);
        
        //Pond 1
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(272 + (32 * i), 728 - (32 * j));
        }

        //Pond 2
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(960 + (32 * i), 524 - (32 * j));
        }

        //Pond 3
        for(var i = 0; i <= 4; i++){
            for(var j = 0; j <= 4; j++)
                this.createPond(648 + (32 * i), 242 - (32 * j));
        }

        //Wolf 1
        this.createWolf(992, 728, 100, 0, 3600);

        //Wolf 2
        this.createWolf(680, 396, 0, 100, 3600);

        //Wolf 3
        this.createWolf(400, 114, 0, 100, 3600);

    }

    update() {
        super.update();
    }
}