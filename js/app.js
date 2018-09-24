var initialPlayerX=200;
var initialPlayerY=380;

// Enemies our player must avoid
var Enemy = function(uniqueName) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/rock.png';
    //this.sprite = 'images/enemy-bug.png';
    this.sprite = uniqueName;

    //randomly find a row for the sprite
    this.y=(Math.floor(Math.random() * 3))*85 +60;
    
    //randomly assign a speed to this sprite
    this.speed=Math.random() * 5 + 1;

    this.x = Math.floor(Math.random() * 5)*100 - 100;
    //window.alert(this.x + ' ' + this.y);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x>=500)
    {
        this.x=-100;
        //randomly find a new row for the sprite
        this.y=(Math.floor(Math.random() * 3))*85 +60;
        //randomly assign a new speed to this sprite
        this.speed=Math.random() * 5 + 1;
    }

    this.x +=dt*this.speed*50;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.constructor = function(uniqueName) {
    this.sprite = uniqueName;
    window.alert("constructor called");
};

//This method checks to see if the player is too close to any enemies and resets the  
//player to the beginning if it is too close to any enemies
var checkCollisions = function(enemy) {
    //this should refer to the  player when this function is called
    if ((Math.abs(player.positionX-enemy.x) <=50) && (Math.abs(player.positionY - enemy.y) <= 10))
    {
        //Then a collision was detected!
        player.positionY=initialPlayerY;
        player.positionX=initialPlayerX;
    }  
};

//Checks to see if the player is in the winning row
var checkWin = function() {

    if(player.positionY<40)
    {//then player has won
        alert("You WIN!");
        player.positionY=initialPlayerY;
        player.positionX=initialPlayerX;
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.positionX=initialPlayerX;
        this.positionY=initialPlayerY;
        this.chosenSprite = 'images/char-boy.png';
    }

    //Returns the player's 'x' coordinate
    getX(){
        return this.x;

    }

    //Returns the player's 'y' coordinate
    getY(){
        return this.y;
    }
    update() {
        //can either check for collisions and victory here, in game engine's logic, or in an enemies logic.
        //Enemies move with their update function.  The player does not because it moves by handleinput
        allEnemies.forEach(checkCollisions);
        checkWin();
    }

    render() {
        ctx.drawImage(Resources.get(this.chosenSprite), this.positionX, this.positionY);

    }

    //This function handles movement by taking already interpretted key presses and moving the character within the bounds of the game
    handleInput(e) {

        //test for the input being valid or not
        if(e!=undefined)
        {
            //window.alert("good unput" + e);
            if(e=='down')
            {
                if(this.positionY>=380)
                {
                    this.positionY=380;
                }
                else
                {
                    this.positionY+=80;
                }
            }
            else if (e=='up')
            {
                if(this.positionY<=-20)
                {
                    this.positionY=-20;
                }
                else
                {
                    this.positionY-=80;
                }
            }
            else if (e=='right')
            {
                if(this.positionX>=400)
                {
                    this.positionX=400;
                }
                else
                {
                    this.positionX+=100;
                }   
            }
            else //then left
            {
                if(this.positionX<=0)
                {
                    this.positionX=0;
                }
                else
                {
                    this.positionX-=100;
                }   
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var enemy1 = new Enemy('images/enemy-bug.png');
var enemy2 = new Enemy('images/enemy-bug.png');
var enemy3 = new Enemy('images/enemy-bug.png');
var enemy4 = new Enemy('images/enemy-bug.png');
var enemy5 = new Enemy('images/rock.png');
var enemy6 = new Enemy('images/rock.png');

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
