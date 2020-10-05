class uiButton extends Phaser.GameObjects.Container{
    constructor(scene, x, y, key, hoverKey, text, targetCallback){
        super(scene, x, y);
        this.scene = scene; //the scene this container will be added to
        this.x = x; //x pos of our container
        this.y = y; //y pos of our container
        this.key = key; //background img of our button
        this.hoverKey = hoverKey; // img that will be displayed when the player hovers over the button
        this.text = text; //text displayed on the button
        this.targetCallback = targetCallback; //callback function that will be called when the player clicks the button

        //create ui button
        this.createButton();
        //add this container to our Phaser Scene
        this.scene.add.existing(this); 

    }

    createButton(){
    //create play game button
    this.button = this.scene.add.image(0, 0, this.key);
    //make button interactive
    this.button.setInteractive();
    //scale the button
    this.button.setScale(1.4);

    //create button text
    this.buttonText = this.scene.add.text(0, 0, this.text, {fontSize: '26px', fill: '#fff'});
    //center the button text inside the ui button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    //add the two game objects to our container
    this.add(this.button);
    this.add(this.buttonText);

    //listen for events
    this.button.on('pointerdown',() => {
    this.targetCallback();
    });

    this.button.on('pointerover',() => {
    this.button.setTexture(this.hoverKey);
    });

    this.button.on('pointerout',() => {
    this.button.setTexture(this.key);
    });
    }
}

