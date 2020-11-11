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
import { Level9 } from "./Level9.js"; 


class MainMenu extends GameScene {

    constructor() {
        super('MainMenu');
        GameScene.sf_volume = 1.0;
        GameScene.ms_volume = 1.0;
        GameScene.current_music = null;
        this.bell;
    }

    preload() {
        
        //Background Image
        this.load.image('mainbackground', 'assets/Background.png');

        //Main Menu Title
        this.load.image('mmtitle', 'assets/Titles/SheerMadnessTitle.png');

        //Main Menu Buttons
        this.load.spritesheet('play', 'assets/Buttons/Play.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('levelselect', 'assets/Buttons/LevelSelect.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('settings', 'assets/Buttons/Settings.png', {frameWidth: 506, frameHeight: 105});
        this.load.spritesheet('about', 'assets/Buttons/About.png', {frameWidth: 506, frameHeight: 105});
        
        //Main Menu Audio
        this.load.audio('menu', 'music/menu.mp3');
        this.load.audio('bell', 'sfx/Cowbell.mp3');
    }

    create() {
        super.create();
        console.log(GameScene.sf_volume);
        if(!GameScene.in_menu) {
            GameScene.menu_music_needed = true;
        }
        GameScene.in_menu = true;
        this.bell = this.sound.add('bell');

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        //Main Menu Title
        var mmtitle     = this.add.sprite(960, 150, 'mmtitle');

        //Play Button
        var start = this.add.sprite(960, 450, 'play')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => start.setFrame(1))
        .on('pointerout', () => start.setFrame(0));
        //Level Select Button
        var levelsel = this.add.sprite(960, 570, 'levelselect')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => levelsel.setFrame(1))
        .on('pointerout', () => levelsel.setFrame(0));
        //Settings Button
        var setting = this.add.sprite(960, 690, 'settings')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => setting.setFrame(1))
        .on('pointerout', () => setting.setFrame(0));
        //About Button
        var about = this.add.sprite(960, 810, 'about')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => about.setFrame(1))
        .on('pointerout', () => about.setFrame(0));

        start.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level1');
        }, this);
        levelsel.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('LevelSelectMenu')
        }, this);
        setting.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('SettingMenu');
        }, this);
        about.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
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
        
        //Background Image
        this.load.image('mainbackground', 'assets/Background.png');

        //Level Select Title
        this.load.image('lstitle', 'assets/Titles/LevelSelectTitle.png');

        //Level Select Level Buttons
        this.load.spritesheet('l1', 'assets/Levels/Level1.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l2', 'assets/Levels/Level2.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l3', 'assets/Levels/Level3.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l4', 'assets/Levels/Level4.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l5', 'assets/Levels/Level5.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l6', 'assets/Levels/Level6.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l7', 'assets/Levels/Level7.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l8', 'assets/Levels/Level8.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l9', 'assets/Levels/Level9.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l10', 'assets/Levels/Level10.png', {frameWidth: 105, frameHeight: 105});
        this.load.spritesheet('l11', 'assets/Levels/Level11.png', {frameWidth: 105, frameHeight: 105});
        this.load.image('ll', 'assets/Levels/LevelLock.png');

        //Level Select Buttons
        this.load.spritesheet('back', 'assets/Buttons/Back.png', {frameWidth: 506, frameHeight: 105});

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

        var lstitle = this.add.sprite(960, 150, 'lstitle');

        //Level 1 Button
        var l1 = this.add.sprite(585, 450, 'l1')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l1.setFrame(1))
        .on("pointerout", () => l1.setFrame(0));
        //Level 2 Button
        var l2 = this.add.sprite(735, 450, 'l2')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l2.setFrame(1))
        .on("pointerout", () => l2.setFrame(0));
        //Level 3 Button
        var l3 = this.add.sprite(885, 450, 'l3')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l3.setFrame(1))
        .on("pointerout", () => l3.setFrame(0));
        //Level 4 Button
        var l4 = this.add.sprite(1035, 450, 'l4')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l4.setFrame(1))
        .on("pointerout", () => l4.setFrame(0));
        //Level 5 Button
        var l5 = this.add.sprite(1185, 450, 'l5')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l5.setFrame(1))
        .on("pointerout", () => l5.setFrame(0));
        //Level 6 Button
        var l6 = this.add.sprite(1335, 450, 'l6')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l6.setFrame(1))
        .on("pointerout", () => l6.setFrame(0));
        //Level 7 Button
        var l7 = this.add.sprite(585, 600, 'l7')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l7.setFrame(1))
        .on("pointerout", () => l7.setFrame(0));
        //Level 8 Button
        var l8 = this.add.sprite(735, 600, 'l8')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l8.setFrame(1))
        .on("pointerout", () => l8.setFrame(0));
        //Level 9 Button
        var l9 = this.add.sprite(885, 600, 'l9')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l9.setFrame(1))
        .on("pointerout", () => l9.setFrame(0));
        //Level 10 Button
        var l10 = this.add.sprite(1035, 600, 'l10')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l10.setFrame(1))
        .on("pointerout", () => l10.setFrame(0));
        //Level 11 Button
        var l11 = this.add.sprite(1185, 600, 'l11')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => l11.setFrame(1))
        .on("pointerout", () => l11.setFrame(0));
        var lock = this.add.sprite(1335, 600, 'll').setInteractive();

        //Back Button
        var back = this.add.sprite(960, 1000, 'back')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => back.setFrame(1))
        .on('pointerout', () => back.setFrame(0));

        l1.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level1');
        }, this);
        l2.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level2');
        }, this);
        l3.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level3');
        }, this);
        l4.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level4');
        }, this);
        l5.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level5');
        }, this);
        l6.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level6');
        }, this);
        l7.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level7');
        }, this);
        l8.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level8');
        }, this);
        l9.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level9');
        }, this);
        lock.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('Level0');
        }, this);

        back.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
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

        //Background Image
        this.load.image('mainbackground', 'assets/Background.png');

        //Settings Title
        this.load.image('stitle', 'assets/Titles/SettingsTitle.png');

        //Settings Menu
        this.load.image('settingMenu', 'assets/Menus/SettingMenu.png');

        //Settings Menu Button
        this.load.spritesheet('back', 'assets/Buttons/Back.png', {frameWidth: 506, frameHeight: 105});

        //Settings Icons
        this.load.spritesheet('icons', 'assets/Icons.png', {frameWidth: 64, frameHeight: 64});

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

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

        var stitle = this.add.sprite(960, 150, 'stitle');
        var settings = this.add.sprite(960, 600, 'settingMenu');
        var volume = this.add.sprite(1050, 510, 'icons', 0);
        this.add.text(1100, 480, ": VOLUME", { fontFamily: 'font1', fontSize: "44px", color: '#000'});
        var music = this.add.sprite(1050, 650, 'icons', 2);
        this.add.text(1100, 620, ": MUSIC", { fontFamily: 'font1', fontSize: "44px", color: '#000'});


        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;
        //Sound Effect Volume
        var sf_slider = this.rexUI.add.slider({
            x: 1350,
            y: 560,
            width: 600,
            height: 20,
            orientation: 'x',
            value: GameScene.sf_volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                GameScene.sf_volume = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        })
            .layout();

        //Music Volume
        var ms_slider = this.rexUI.add.slider({
            x: 1350,
            y: 700,
            width: 600,
            height: 20,
            orientation: 'x',
            value: GameScene.ms_volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                GameScene.ms_volume = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        })
            .layout();

        sf_slider.value = GameScene.sf_volume;
        ms_slider.value = GameScene.ms_volume;

        //Back Button
        var back = this.add.sprite(960, 1000, 'back')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => back.setFrame(1))
        .on('pointerout', () => back.setFrame(0));

        back.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
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

        //Background Image
        this.load.image('mainbackground', 'assets/Background.png');

        //About Title
        this.load.image('atitle', 'assets/Titles/AboutTitle.png');

        //About Menu
        this.load.image('aboutMenu', 'assets/Menus/AboutMenu.png');

        //About Button
        this.load.spritesheet('back', 'assets/Buttons/Back.png', {frameWidth: 506, frameHeight: 105});

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

        var lstitle = this.add.sprite(960, 150, 'atitle');
        var about = this.add.sprite(960, 600, 'aboutMenu');

        //Back Button
        var back = this.add.sprite(960, 1000, 'back')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => back.setFrame(1))
        .on('pointerout', () => back.setFrame(0));

        back.on('pointerdown', function(event) {
            GameScene.playSound(this.bell);
            this.scene.start('MainMenu');
        }, this);

    }

    update() {
        super.update();
    }
}

class Congratulation extends GameScene {
    constructor() {
        super('Congratulation');
        
    }

    preload() {

        //Main Background
        this.load.image('mainbackground', 'asset/Background.png');

        //Congratulation
        this.load.image('congratulation', 'assets/Congratulation.png');

        //Congratuation Button
        this.load.image('mainmenu', 'assets/Buttons/MainMenu.png');
    }

    create() {
        super.create();

        var background = this.add.tileSprite(960, 540, 0, 0, 'mainbackground');
        background.setDepth(-1);

        var congratulation = this.add.sprite(960, 500, 'congratulation');
        //Main Menu Button
        var mainmenu = this.add.sprite(960, 1000, 'mainmenu')
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => mainmenu.setFrame(1))
        .on('pointerout', () => mainmenu.setFrame(0));;

        mainmenu.on('pointerdown', function(event) {
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
    scene : [ MainMenu, LevelSelectMenu, AboutMenu, SettingMenu, Congratulation, Level0, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9 ]
};

var game = new Phaser.Game(config);
