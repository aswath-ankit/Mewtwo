var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":5,"version":"0jTgnWiI1MsCtlAedITSuDQJ8ZKfDuHV","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"IuFEpJx2sD1dcypFvMepy_.sDlTUwhR6","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":1,"version":"H9oXbwToZ4ZgRhf7ae5yTm_Ys6wjEIFo","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----




var PLAY = 1;
var END = 0;
var gameState = PLAY;



var monkey = createSprite(400,-100,20,50);
monkey.setAnimation("monkey");


monkey.setCollider("circle",0,0,30);


monkey.scale = 0.1;
monkey.x = 50;




var ground = createSprite(400,380,800,10);

ground.x = ground.width /2;


var invisibleGround = createSprite(200,336,400,5);
invisibleGround.visible = false;

var ObstaclesGroup = createGroup();
var BananasGroup = createGroup();
BananasGroup.setVisibleEach(false);

var count = 0;
var banscore = 0;

textSize(18);
fill("rEd");

function draw() {

 
  background("LIGHTBLUE");

  
  text("S u r v ival time :"+ count, 120, 60);

  if(gameState === PLAY){
    
    ground.velocityX = -(0.5 + 3*20/200);
    
    count = count+Math.round(World.frameRate/20);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    
    
    if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -12 ;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnBananas();
    
    if (monkey.isTouching(BananasGroup)) {
    var bansound = randomNumber(1,6);
    playSound("banana"+bansound+".mp3");
    BananasGroup.destroyEach();
    //gives 20 points of each and every bananas ate
    banscore = banscore+20;
    fill("yellow");
    text("Bananas Eaten :- " + banscore, 120, 80); 
    }
    fill("yellow");
    text("Bananas Eaten :- " + banscore, 120, 80);
    
  
    spawnObstacles();
    
  
    
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
    
   if (monkey.isTouching(ObstaclesGroup)) {
      ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
   }

    
     ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);
    
     var total = count + banscore;
    fill("yellow");
    text("Bananas Eaten :- " + banscore, 120, 80);
    fill("blue");
    textSize(40);
    text ("   ! Game Over !",50,180);
    text ("Total Score :- " + total ,50,220);
    textSize(20);
    text ("    ! Reset / Refresh to Play Again !",50,255);
  }

  
  monkey.collide(invisibleGround);
  
  
  drawSprites();
}
function spawnObstacles() {

  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,356,10,40);
    obstacle.velocityX = - (1 + 3*1/10);
    
    var rand = randomNumber(1,4);
    obstacle.setAnimation("Stone" );
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  if (World.frameCount % 120 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = randomNumber(200,300);
    banana.setAnimation("Banana");
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.visible = false;
     if (monkey.y >= 250) {
    banana.visible = true;
  }
    banana.lifetime = 160;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    BananasGroup.add(banana);
  }
  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
