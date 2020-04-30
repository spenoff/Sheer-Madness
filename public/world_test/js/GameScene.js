export class GameScene extends Phaser.Scene {

    constructor(name) {
        super({key: name});
    }

    preload() {

    }

    create() {
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.zeroKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.fourKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.fiveKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.sixKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
        this.sevenKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
        this.eightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
        this.hKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.stopLevel();
            this.scene.restart();
        }
        if (Phaser.Input.Keyboard.JustDown(this.zeroKey)) {
            this.stopLevel();
            this.scene.start('Level0');  
        }
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.stopLevel();
            this.scene.start('Level1');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            this.stopLevel();
            this.scene.start('Level2');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.threeKey)) {
            this.stopLevel();
            this.scene.start('Level3');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.fourKey)) {
            this.stopLevel();
            this.scene.start('Level4');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.fiveKey)) {
            this.stopLevel();
            this.scene.start('Level5');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.sixKey)) {
            this.stopLevel();
            this.scene.start('Level6');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.sevenKey)) {
            //this.stopLevel();
            //this.scene.start('Level6');  
            alert("Level 7 is not yet available, but level 8 is available"); 
        }
        if (Phaser.Input.Keyboard.JustDown(this.eightKey)) {
            this.stopLevel();
            this.scene.start('Level8');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.hKey)) {
            this.stopLevel();
            this.scene.start('MainMenu');
        }
    }

    stopLevel() {
        console.log("Stop all");
        this.game.sound.stopAll();
    }
}