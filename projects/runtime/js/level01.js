var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "myObject", "x": 1200, "y": groundY - 120 },
                { "type": "Enemy", "x": 1200, "y": groundY - 50}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = 1800;
        sawBladeHitZone.y = groundY;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        
        
        function createSawBlade(x, y)
        {
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        }
        
        
        createSawBlade(500, 250);
        createSawBlade(700, 250);
        createSawBlade(1600, 250);
        
        for(var i = 0; i < levelData.gameItems.length; i++)
        {
            var object= levelData.gameItems[i];
            if(object.type === "sawblade")
            {
                createSawBlade(object.x, object.y);
            }
            if(object.type === "myObject")
            {
                createMyObstacle(object.x, object.y);
            }
            if(object.type === "Enemy")
            {
                createEnemy(object.x, object.y);
            }
            
        }
        
        function createMyObstacle(x,y)
        {
        var herHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        herHitZone.x = x;
        herHitZone.y = y;
        game.addGameItem(herHitZone);
        var obstacleImage = draw.bitmap('img/OH NO.png');
        herHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        }
        
        
        //createMyObstacle(100, 100);
        //TODO 11 ,12 and 13
        function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            
            game.addGameItem(enemy);
            enemy.velocityX = -3;
            enemy.rotationalVelocity = 20;
            
            enemy.onPlayerCollision = function() {
                //console.log('yo mama');
                game.changeIntegrity(-10);
            }
            
            enemy.onProjectileCollision = function() {
                enemy.fadeOut();
            }
        }
        
        function createReward()
        {
            var reward =  game.createGameItem('reward',25);
            var greenSquare = draw.rect(50,50,'green');
            greenSquare.x = -25;
            greenSquare.y = -25;
            reward.addChild(greenSquare);
            reward.x = 1600;
            reward.y = groundY-150;
            
            game.addGameItem(reward);
            reward.velocityX = -1.5;
            reward.rotationalVelocity = 10;
            
            reward.onPlayerCollision = function() {
                console.log('yo mama');
                game.increaseScore(10);
                reward.fadeOut();
            };
        }
        createReward();
        
        // I AM ALMOST DONE, JUST MAKE THE REWARD
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
