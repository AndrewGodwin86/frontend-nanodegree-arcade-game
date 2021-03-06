// Lives
var numberOfLives = 5;
var livesContainer = document.getElementById("lives");
var enemyLanes = [60,144,228];
var enemyVelocities = [100,125,150,175,200,225,250];


var Life = function(pos) {
    this.sprite = 'images/Heart_small.png';
    this.x = pos*40;
    this.y = -10;
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 68);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = enemyLanes[Math.floor(Math.random()*3)];
    this.velocity = enemyVelocities[Math.floor(Math.random()*7)]

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 606){
        this.x = -101;
        this.velocity = 50+(Math.random()*200);
        //this.y = Math.floor(Math.random()*2.999);
    } else {
        this.x += this.velocity * dt;
    }

    // Send player back to start when hit by an enemy
    if(player.x >= this.x - 75 && player.x <= this.x + 75){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            player.x = 200;
            player.y = 400;
            numberOfLives --;
            lives.pop();
            livesContainer.innerHTML = lives.length;
            if(numberOfLives === 0){
                ctx.font = "48px serif";
                ctx.fillStyle = "white";
                ctx.fillText = ("Game Over",300,200);
                console.log("Game over");
                allEnemies.forEach(function(enemy) {
                    enemy.velocity = 0;
                });
            }
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0) {
        this.x -= 101;
        console.log(this.x+", "+this.y);
    }
    if (keyCode === 'up' && this.y > 64) {
        this.y -= 84;
        console.log(this.x+", "+this.y);
    }
    if (keyCode === 'right' && this.x < 400) {
        this.x += 101;
        console.log(this.x+", "+this.y);
    }
    if (keyCode === 'down' && this.y < 400) {
        this.y += 84;
        console.log(this.x+", "+this.y);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var lives = [];
for (var i=0; i<numberOfLives; i++){
    lives.push(new Life(i));
}
var allEnemies = [];
var player = new Player();

var numberOfEnemies = 5;
for (var j=0; j<numberOfEnemies;j++){
    allEnemies.push(new Enemy());
}
livesContainer.innerHTML = lives.length;



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
