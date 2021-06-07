var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

var PLAY  = 1
var END = 0
var gameState = PLAY


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bgImg = loadImage('jungle.jpg')
 
}



function setup() {
  
  createCanvas(600,400);
  
 
  ground = createSprite(0,0,600,20);
  ground.addImage(bgImg)
  ground.x = ground.width/2;
  ground.scale = 1.3

  invisibleGround = createSprite(300,380,600,20)
  invisibleGround.visible = false

  monkey = createSprite(80,height-100,20,20);
  monkey.addAnimation("Running Monkey", monkey_running);
  monkey.scale=0.1;

  
  bananaGroup =  new Group();
  obstacleGroup =  new Group();
  
}


function draw() {
  background('pink');
  
  textSize(20);
  
  if(gameState === PLAY){
    
    ground.velocityX = -4;
    
    survivalTime = Math.round(frameCount/getFrameRate());
    
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")){
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    food();
    obstacles();
    
     if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();
      } 
  
  if(obstacleGroup.isTouching(monkey)){
    
       gameState = END
    
  }    
    
  } else if(gameState === END){
        ground.velocityX = 0;
    
        text("Game Over!!", 250,200);
    
        monkey.pause();
    
        monkey.velocityY = 0;
        ground.velocityX = 0;
        
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
           
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
  }  
  
 
 monkey.collide(invisibleGround)
  drawSprites(); 
  fill("white")
  text("Survival Time: "+ survivalTime, 400,50);
}

function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(700,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
    
    monkey.depth = banana.depth;
    banana.depth = banana.depth + 1;
  }  
}

function obstacles(){
   if(frameCount % 300 === 0){
     obstacle = createSprite(700,350,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.21;
     obstacle.velocityX = -4;
     obstacle.lifetime = 200;
     obstacleGroup.add(obstacle);
   }
  
}






