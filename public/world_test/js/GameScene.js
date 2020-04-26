export class GameScene extends Phaser.Scene {

    constructor(name) {
        super({key: name});
    }

    preload() {

    }

    create() {
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.zeroKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
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
    }

    stopLevel() {}
}