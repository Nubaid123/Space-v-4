var spaceShip, spaceShipImg;
var ufo, ufoImg;
var bg, bgImg;
var obs, obsImg;
var obstacles;
var bulletGroup;
var bullet;
var health = 3;
var score = 0;
var gameState = 0;

function preload(){
    bgImg = loadImage("space3.jpg")
    
    spaceShipImg = loadImage("pngwing.com (1).png")
    
    ufoImg = loadImage("Daco_233939.png")
    obsImg = loadImage("meteorite.png")
    }
    
    function setup(){

        createCanvas(windowWidth - 200,windowHeight - 200);
      //background image
      bg = createSprite(200,200,width,height);
      bg.addImage(bgImg);
      

    spaceShip = createSprite(100,200,20,50);
    spaceShip.addImage(spaceShipImg);
    spaceShip.scale = 0.2;

    obstacles= new Group();
    
    }
    function spawnMeteorites() 
    {
          if(World.frameCount % 60 === 0) {
            obs = createSprite(450,Math.round(random(10,100)),40,50);
        obs.addImage(obsImg);
        obstacles.add(obs);
        
        
        
        obs.scale = 0.1;
        obs.velocityX = -4;
    
        

    
       obs.lifetime = 80;
        
       spaceShip.depth = spaceShip.depth + 1;
       
          }
    }
    function spawnUfo() 
    {
          if(World.frameCount % 80 === 0) {
            ufo = createSprite(500,Math.round(random(200,400)),40,50);
        ufo.addImage(ufoImg);
        obstacles.add(ufo);
        
        ufo.scale = 0.1;
        ufo.velocityX = -4;
    
        

    
       ufo.lifetime = 80;
        
       spaceShip.depth = spaceShip.depth + 1;
       
          }
    }






function draw() {
    if(keyDown(UP_ARROW)){
        spaceShip.y = spaceShip.y-3;
    }
    if(keyDown(DOWN_ARROW)){
        spaceShip.y = spaceShip.y+3;
    }
    if(keyDown(RIGHT_ARROW)){
        spaceShip.x = spaceShip.x+3;
    }
    if(keyDown(LEFT_ARROW)){
        spaceShip.x = spaceShip.x-3;
    }
    
   

  
   
    spawnMeteorites();
    spawnUfo();
    

    drawSprites();
    if(health<=0){
        gameState = 1;
    }
    textSize(50);
    fill("white");
   text("Health:"+health, 100, 50);

   if(obstacles.isTouching(spaceShip)){
    for(var i=0;i<obstacles.length;i=i+1){
        if(obstacles[i].isTouching(spaceShip)){
            obstacles[i].destroy();
            health = health-1;
            
            
        }
    }
}



if (gameState===1){
    fill("white");
    textSize(100);
    text("Game Over", 300, 200);
    spaceShip.destroy();
    obstacles.setVelocityXEach(0);
    obstacles.setLifetimeEach(-1);
    obstacles.destroyEach();
    ufoGroup.destroyEach();
}
}