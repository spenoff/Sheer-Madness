import { GameScene } from "./GameScene.js";
import { Level } from "./Level.js";
import { Level0 } from "./Level0.js";
import { Level1 } from "./Level1.js";
import { Level2 } from "./Level2.js";
import { Level3 } from "./Level3.js";
import { Level4 } from "./Level4.js";
import { Level5 } from "./Level5.js";
import { Level6 } from "./Level6.js";
import { Level7 } from "./Level7.js";
import { Level8 } from "./Level8.js";

//CHANGE SCENE within scene class
//this.scene.start('TestLevel2');

class MainMenu extends GameScene {

    constructor() {
        super('MainMenu');
        this.bell;
    }

    preload() {
        
        //Background Image
        this.load.image('mainbackground', 'assets/Background.png');

        //Main Menu Title
        this.load.image('mmtitle', 'assets/Titles/SheerMadnessTitle.png');

        //Main Menu Buttons
        this.load.image('play', 'assets/Buttons/Play.png');
        this.load.image('levelselect', 'assets/Buttons/LevelSelect.png');
        this.load.image('settings', 'assets/Buttons/Settings.png');
        this.load.image('about', 'assets/Buttons/About.png');
        
        this.load.spritesheet('titles', 'assets/Titles.png', {frameWidth: 801, frameHeight: 200});
        //Main Menu Audio
        this.load.audio('menu', 'music/menu.mp3');
        this.load.audio('bell', 'sfx/Cowbell.mp3');
    }

    create() {
        super.create();
        if(!GameScene.in_menu) {
            GameScene.menu_music_needed = true;
        }
        GameScene.in_menu = true;
        this.bell = this.sound.add('bell');

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var mmtitle     = this.add.sprite(960, 150, 'mmtitle');

        var start       = this.add.sprite(960, 450, 'play').setInteractive();
        var levelsel    = this.add.sprite(960, 570, 'levelselect').setInteractive();
        var setting     = this.add.sprite(960, 690, 'settings').setInteractive();
        var about       = this.add.sprite(960, 810, 'about').setInteractive();

        start.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level1');
        }, this);
        levelsel.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('LevelSelectMenu')
        }, this);
        setting.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('SettingMenu');
        }, this);
        about.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('AboutMenu');
        }, this);
    }

    update() {
        super.update();
    }

}

class LevelSelectMenu extends GameScene {

    constructor() {
        super('LevelSelectMenu');
    }

    preload() {
        this.in_menu = true;
        
        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('levelselectbuttons', 'assets/Levels.png', {frameWidth: 105, frameHeight: 105});

    }

    create() {
        super.create();
        if(!GameScene.in_menu) {
            GameScene.menu_music_needed = true;
        }
        GameScene.in_menu = true;
        this.bell = this.sound.add('bell');

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 1);

        var l1      = this.add.sprite(585, 450, 'levelselectbuttons', 0).setInteractive();
        var l2      = this.add.sprite(735, 450, 'levelselectbuttons', 1).setInteractive();
        var l3      = this.add.sprite(885, 450, 'levelselectbuttons', 2).setInteractive();
        var l4      = this.add.sprite(1035, 450, 'levelselectbuttons', 3).setInteractive();
        var l5      = this.add.sprite(1185, 450, 'levelselectbuttons', 4).setInteractive();
        var l6      = this.add.sprite(1335, 450, 'levelselectbuttons', 5).setInteractive();
        var l7      = this.add.sprite(585, 600, 'levelselectbuttons', 6).setInteractive();
        var l8      = this.add.sprite(735, 600, 'levelselectbuttons', 7).setInteractive();
        var l9      = this.add.sprite(885, 600, 'levelselectbuttons', 8).setInteractive();
        var l10     = this.add.sprite(1035, 600, 'levelselectbuttons', 9).setInteractive();
        var l11     = this.add.sprite(1185, 600, 'levelselectbuttons', 10).setInteractive();
        var lock    = this.add.sprite(1335, 600, 'levelselectbuttons', 11).setInteractive();

        var back    = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        l1.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level1');
        }, this);
        l2.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level2');
        }, this);
        l3.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level3');
        }, this);
        l4.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level4');
        }, this);
        l5.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level5');
        }, this);
        l6.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level6');
        }, this);
        l7.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level7');
        }, this);
        l8.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level8');
        }, this);
        lock.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('Level0');
        }, this);

        back.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('MainMenu');
        }, this);
    }

    update() {
        super.update();
    }
}

class SettingMenu extends GameScene {

    constructor() {
        super('SettingMenu');
    }

    preload() {
        this.in_menu = true;

        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.image('settings', 'assets/Settings.png');

    }

    create() {
        super.create();
        if(!GameScene.in_menu) {
            GameScene.menu_music_needed = true;
        }
        GameScene.in_menu = true;
        this.bell = this.sound.add('bell');

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 2);
        var settings = this.add.sprite(960, 600, 'settings');
        var back = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        back.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('MainMenu');
        }, this);
        
    }

    update() {
        super.update();
    }
}

class AboutMenu extends GameScene {

    constructor() {
        super('AboutMenu');
    }

    preload() {

        this.load.image('mainbackground', 'assets/Background.png');
        this.load.spritesheet('titles', 'Titles.png', {frameWidth: 801, frameHeight: 200});
        this.load.spritesheet('buttons', 'assets/Buttons.png', {frameWidth: 506, frameHeight: 105});
        this.load.image('about', 'assets/About.png');

    }

    create() {
        super.create();
        if(!GameScene.in_menu) {
            GameScene.menu_music_needed = true;
        }
        GameScene.in_menu = true;
        this.bell = this.sound.add('bell');
        
        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var lstitle = this.add.sprite(960, 150, 'titles', 3);
        var about = this.add.sprite(960, 600, 'about');
        var back = this.add.sprite(960, 1000, 'buttons', 7).setInteractive();

        back.on('pointerdown', function(event) {
            this.bell.play();
            this.scene.start('MainMenu');
        }, this);

    }

    update() {
        super.update();
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene : [ MainMenu, LevelSelectMenu, AboutMenu, SettingMenu, Level0, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8 ]
};

var game = new Phaser.Game(config);
//game.scene.add('NewTestLevel', NewTestLevel);