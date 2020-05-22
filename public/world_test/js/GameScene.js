export class GameScene extends Phaser.Scene {
    static in_menu;
    static menu_music_needed;

    constructor(name) {
        super({key: name});
        GameScene.in_menu = true;
        GameScene.menu_music_needed = true;
    }

    preload() {
        this.load.audio('menu', 'music/menu.mp3');
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
        this.nineKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
        this.hKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        this.music = this.sound.add('menu');
        this.music.loop = true;
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
            this.stopLevel();
            this.scene.start('Level7');
        }
        if (Phaser.Input.Keyboard.JustDown(this.eightKey)) {
            this.stopLevel();
            this.scene.start('Level8');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.nineKey)) {
            this.stopLevel();
            this.scene.start('Level9');   
        }
        if (Phaser.Input.Keyboard.JustDown(this.hKey)) {
            this.stopLevel();
            //this.scene.music_started = false;
            this.scene.start('MainMenu');
        }
        if(GameScene.in_menu) {
            if(GameScene.menu_music_needed) {
                console.log("here");
                this.game.sound.stopAll();
                //this.music.play();
                GameScene.playMusic(this.music);
                GameScene.menu_music_needed = false;
            }
        }
    }

    stopLevel() {
        console.log("Stop all");
        this.game.sound.stopAll();
    }

    static playSound(sound) {
        sound.volume = GameScene.sf_volume;
        sound.play();
    }

    static playMusic(music) {
        music.volume = GameScene.ms_volume;
        GameScene.current_music = music;
        music.play();
    }
}