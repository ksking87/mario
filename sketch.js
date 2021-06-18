var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var a 
var PLAY=1;
var END=0
var gameState=1

function preload() {
  trex_running = loadAnimation("mario1.png","mario3.png");
  trex_collided = loadImage("marioold.jpg");

  groundImage = loadImage("ground2.png")
  backgroundimage = loadImage("mario background.png")
  cloudImage=loadImage("mario cloud.png")
  obstacle1 = loadAnimation("goomba.png");
  obstacle2 = loadImage("kapro.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);
  a=createSprite (200,195,400,20)
  a.visible=false

//create a trex sprite

  background1 = createSprite(200,100,600,200)
  background1.addImage(backgroundimage)
  background1.scale=1.3
  trex = createSprite(50,190,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
//create a ground sprite
ground = createSprite(200,190,400,20);
ground.addImage("ground",groundImage);
background1.x = background1.width /2;

  ground.visible=false
  obstacleGroup=createGroup()
  cloudGroup=createGroup()
  inviGroup=createGroup()
  trex.setCollider("rectangle",0,0,40,80)
 // trex.debug=true
}

function draw() {
background('white');
  console.log(trex.y)
if(gameState===1){
//jump when the space button is pressed
if (keyDown("space")&&trex.y>=140) {
  trex.velocityY = -10;
}
background1.velocityX = -4;
trex.velocityY = trex.velocityY + 0.8

if (background1.x < 90) {
 background1.x = 200;
}
   spawnObstacles();
    spawnClouds();
  if(obstacleGroup.isTouching(trex)){
    gameState=0
  }
  if(inviGroup.isTouching(trex)){
    obstacleGroup.destroyEach()
  }
}
  else if(gameState===0){
    background1.velocityX = 0;
    obstacleGroup.setVelocityXEach(0)
    trex.velocityY=0
      cloudGroup.setVelocityXEach(0)
      obstacleGroup.setLifetimeEach(-1)
     cloudGroup.setLifetimeEach(-1)
  }

trex.collide(a);
   
drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud)
    }
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,160,10,40);
   obstacle.velocityX = -6;
  obstacle.debug=true
   invi =createSprite(400,130,10,10);
   invi.velocityX=-6
   invi.visible=false
    // //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1:           obstacle.addAnimation("ob1",obstacle1);
              obstacle.scale=0.2
        obstacle.setCollider("rectangle",-100,0,80,40)
        obstacle.debug=true
        obstacle.y=165
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale=0.3
          obstacle.setCollider("rectangle",-10,0,80,40)
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
  //  obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   invi.lifetime=300             
   obstacleGroup.add(obstacle)
   inviGroup.add(invi)
 }
}

