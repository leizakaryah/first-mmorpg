class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init() {
        this.scene.launch('Ui');
        this.score = 0;

    }

    create() {

        this.createAudio();
        this.createChests();
        this.createWalls();        
        this.createPlayer();
        this.addCollisions();
        this.createInput(); 

    }


    update() {
        this.player.update(this.cursors);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound');
    }

    createPlayer() {
        this.player = new Player(this, 32, 32, 'characters', 4);
    }

    createChests() {
        //create a chest group
        this.chest = this.physics.add.group();
        //create chest positions array
        this.chestPositions = [[100,100], [200,200], [300,300], [400,400], [500,500]]
        //specify the max number of chest we can have
        this.maxNumberOfChests = 3;
        //spawn a chest
        for ( let i = 0; i < this.maxNumberOfChests; i += 1) {
            this.spawnChest();
        }
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
        
        let chest = this.chest.getFirstDead();
        console.log(chest);
        
        if (!chest) {
            const chest = new Chest (this, location[0], location[1], 'items', 0);
            this.chest.add(chest);
        } else {
            chest.setPosition(location[0], location[1]);
            chest.makeActive();
        }


    }

    createWalls() {
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    }

    createInput(){
        this.cursors = this.input.keyboard.createCursorKeys();    
    }

    addCollisions(){
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this);
    }


    collectChest(player, chest) {
        //pickup audio
        this.goldPickupAudio.play();
        //update our score
        this.score += chest.coins;
        //update score in the ui
        this.events.emit('updateScore', chest.coins);
        //make chest game inactive
        chest.makeInactive();
        //spawn new chest
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }
}