var girl, boy
var girlImg, boyImg
var monster, monsterImg
var sword, swordImg
var bg, bg2
var bgImg, bg2Img
var player,  monsterGroup
var gameState=0
var score=0

function preload(){
girlImg = loadAnimation("./assets/g1.jpg","./assets/g2.jpg","./assets/g3.jpg","./assets/g4.jpg","./assets/g5.jpg","./assets/g6.jpg","./assets/g7.jpg","./assets/g8.jpg","./assets/g9.jpg","./assets/g10.jpg","./assets/g11.jpg","./assets/g12.jpg","./assets/g13.jpg","./assets/g14.jpg",)

boyImg = loadAnimation("./assets/boy 1.jpg", "./assets/boy 2.jpg","./assets/boy 3.jpg","./assets/boy 4.jpg", "./assets/boy 5.jpg","./assets/boy 6.jpg","./assets/boy 7.jpg", "./assets/boy 8.jpg","./assets/boy 9.jpg", "./assets/boy 10.jpg")

swordImg = loadImage("./assets/sword.jpg")

monsterImg = loadAnimation("./assets/m1.jpg","./assets/m2.jpg","./assets/m3.jpg","./assets/m4.jpg","./assets/m5.jpg","./assets/m6.jpg","./assets/m7.jpg")

bgImg = loadImage("./assets/bg.jpg")
bg2Img= loadImage("./assets/bg2.jpg")
}


function setup(){
createCanvas(windowWidth, windowHeight)

player = createSprite(100,100)
player.scale=0.1

monsterGroup = new Group();

sword = createSprite(200,200)
sword.addImage(swordImg)
sword.scale = 0.3
sword.visible=false

boyButton = createImg("./assets/boy 1.jpg");
boyButton.position(width / 2 - 90, height / 2 - 20);
boyButton.size(100,100)
boyButton.mousePressed(boy)

girlButton = createImg("./assets/g1.jpg");
girlButton.position(width / 2 + 90, height / 2 - 20);
girlButton.size(100,100)
girlButton.mousePressed(girl)


}

function draw() {
   
 background(0);
  

if(gameState===0){
   background(bgImg);
}

if(gameState===1){

   background(bg2Img)
   
   if(keyDown(UP_ARROW)){
      player.position.y -= 15
   }
   if(keyDown(DOWN_ARROW)){
      player.position.y += 15
   }
   if(keyDown(RIGHT_ARROW)){
      player.position.x += 15
   }
   if(keyDown(LEFT_ARROW)){
      player.position.x -= 15
   }
if(score===10){
   sword.visible=true
}
   
spawnMonsters()

if(monsterGroup.isTouching(player)){
      monsterGroup.destroyEach();
      score=score+5
      console.log(score)
      
}
   if(player.isTouching(sword)&& score===10){
      console.log("yes")
      gameState=2
   }
   
   drawSprites()
}
if(gameState===2){
   background(bgImg)
   gameOver()
}
if(gameState===1){
   fill("red");
   textSize(50);
   text("score: "+score,width-250,100);
}
}


function gameOver(){
 swal({
   title: `Well done!`,
   confirmButtonColor: '#3085d6',
  imageUrl:
       "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
     imageSize: "100x100",
     confirmButtonText: "Thanks For Playing"
}).then(function(){
   alert("The confirm button was clicked");
   gameState=0
}).catch(function(reason){
   alert("The alert was dismissed by the user: "+reason);
});
}

function boy(){
    gameState=1
    player.addAnimation("boyImg",boyImg)
player.changeAnimation(boyImg)
boyButton.hide()
girlButton.hide()
 }

 function girl(){
    gameState=1
    player.addAnimation("girlImg",girlImg)
    player.changeAnimation(girlImg)
    boyButton.hide()
girlButton.hide()
 }

 function spawnMonsters() {
   //write code here to spawn the clouds
   if (frameCount % 200 === 0) {
      var x = Math.round(random(0,800))
      var y = Math.round(random(0,800))
      monster = createSprite(x,y)
      monster.addAnimation("monsterImg", monsterImg) 
      monster.scale = 0.1
      monster.changeAnimation("monsterImg")
      p=Math.round(random(-3,3))
      q=Math.round(random(-3,3))
      monster.velocityX = p;
      monster.velocityY = q;
      monster.debug=true
      monsterGroup.add(monster)
     //assign lifetime to the variable
     monster.lifetime = 400;
   }
}
