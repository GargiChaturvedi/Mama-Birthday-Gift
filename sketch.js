var mamaSprite, mamaWalking, mamaJump, mamaDuck, mamaHooray;
var candle, candleGroup, candle1, candle2, candle3, candle4, candle5;
var obs44, obs44Image, obs44Group;
var backdrop, backdropImage, invisibleGround, cake, cake1, cake2, cake3, cake4, cakeGroup;
var lives = 10;
var gameState = "play";
var score = 0;
var checkpoint, hit, jump, music, win;
var life1, life2, life3, life4, life5, life6, life7, life8, life9, life10, lifeImage;
var replay, replayImage;

function preload() {
  mamaWalking = loadAnimation("images/Mama_right.png", "images/Mama_left.png");
  mamaJump = loadAnimation("images/Mama_jump.png");
  mamaDuck = loadAnimation("images/Mama_duck.png");
  mamaHooray = loadAnimation("images/Mama_hooray.png");
  candle1 = loadImage("images/candle1.png");
  candle2 = loadImage("images/candle2.png");
  candle3 = loadImage("images/candle3.png");
  candle4 = loadImage("images/candle4.png");
  candle5 = loadImage("images/candle5.png");
  obs44Image = loadImage("images/44.png");
  backdropImage = loadImage("images/backdrop1.png");
  cake1 = loadImage("images/cake1.png");
  cake2 = loadImage("images/cake2.png");
  cake3 = loadImage("images/cake3.png");
  cake4 = loadImage("images/cake4.png");
  lifeImage = loadImage("images/life.png");
  replayImage = loadImage("images/replay.png");
  checkpoint = loadSound("sounds/checkpoint.mp3");
  hit = loadSound("sounds/hit.mp3");
  jump = loadSound("sounds/jump.wav");
  music = loadSound("sounds/music.mp3");
  win = loadSound("sounds/win.wav");
}

function setup() {
  createCanvas(1280, 600);

  music.loop();
  hit.volume = 5;
  win.volume = 5;
  checkpoint.volume = 5;
  jump.volume = 5;

  backdrop = createSprite(640, 200);
  backdrop.addImage("backdrop", backdropImage);

  invisibleGround = createSprite(640, 560, 1280, 20);
  invisibleGround.visible = false;
  invisibleGround.debug = false;

  mamaSprite = createSprite(150, 560);
  mamaSprite.addAnimation("walking", mamaWalking);
  mamaSprite.addAnimation("jump", mamaJump);
  mamaSprite.addAnimation("duck", mamaDuck);
  mamaSprite.addAnimation("hooray", mamaHooray);
  mamaSprite.debug = false;
  mamaSprite.frameDelay = 15;
  mamaSprite.scale = 0.4;
  mamaSprite.setCollider("rectangle", 0, 0, 80, 500);

  life1 = createSprite(20, 20);
  life1.addImage("life1", lifeImage);
  life1.visible = false;
  life2 = createSprite(50, 20);
  life2.addImage("life2", lifeImage);
  life2.visible = false;
  life3 = createSprite(80, 20);
  life3.addImage("life3", lifeImage);
  life3.visible = false;
  life4 = createSprite(110, 20);
  life4.addImage("life4", lifeImage);
  life4.visible = false;
  life5 = createSprite(140, 20);
  life5.addImage("life5", lifeImage);
  life5.visible = false;
  life6 = createSprite(170, 20);
  life6.addImage("life6", lifeImage);
  life6.visible = false;
  life7 = createSprite(200, 20);
  life7.addImage("life7", lifeImage);
  life7.visible = false;
  life8 = createSprite(230, 20);
  life8.addImage("life8", lifeImage);
  life8.visible = false;
  life9 = createSprite(260, 20);
  life9.addImage("life9", lifeImage);
  life9.visible = false;
  life10 = createSprite(290, 20);
  life10.addImage("life10", lifeImage);
  life10.visible = false;

  replay = createSprite(640, 100);
  replay.addImage("replay", replayImage);
  replay.scale = 0.3;
  replay.visible = false;

  candleGroup = new Group();
  obs44Group = new Group();
  cakeGroup = new Group();
}

function draw() {
  background(255, 255, 255);

  if(gameState === "play") {
    backdrop.setVelocity(-10, 0);
    mamaSprite.velocityY = mamaSprite.velocityY + 0.5;
    spawnCandles();
    spawn44();
    spawnCake();
    score = Math.round(score + getFrameRate() / 60);
  }

  if(score % 200 === 0) {
    checkpoint.play();
  }
  if (backdrop.x < 320 && gameState === "play") {
    backdrop.x = width / 2;
  }

  if ((keyDown(UP_ARROW) || touches.length >= 1) && gameState === "play") {
    mamaSprite.setVelocity(0, -10);
    jump.play();
    touches = [];
  }

  if (keyWentUp(UP_ARROW) && gameState === "play") {
    mamaSprite.changeAnimation("walking", mamaWalking);
  }

  if(obs44Group.isTouching(invisibleGround) && gameState === "play") {
    obs44.setVelocity(-15, 0);
  }

  if(lives === 10) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = true;
    life7.visible = true;
    life8.visible = true;
    life9.visible = true;
    life10.visible = true;
  }
  if(lives === 9) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = true;
    life7.visible = true;
    life8.visible = true;
    life9.visible = true;
    life10.visible = false;
  }
  if(lives === 8) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = true;
    life7.visible = true;
    life8.visible = true;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 7) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = true;
    life7.visible = true;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 6) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = true;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 5) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 4) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = false;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 3) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = false;
    life5.visible = false;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 2) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 1) {
    life1.visible = true;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
  }
  if(lives === 0) {
    life1.visible = false;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
    life6.visible = false;
    life7.visible = false;
    life8.visible = false;
    life9.visible = false;
    life10.visible = false;
    gameState = "end";
  }

  if(gameState === "end") {
    backdrop.setVelocity(0, 0);
    candleGroup.setVelocityEach(0, 0);
    obs44Group.setVelocityEach(0, 0);
    cakeGroup.setVelocityEach(0, 0);
    mamaSprite.changeAnimation("hooray", mamaHooray);
    replay.visible = true;
    mamaSprite.scale = 0.7;
  }

  if(obs44Group.isTouching(mamaSprite) && lives != 0 && lives != 1 && lives != 2) {
    lives -= 3;
    hit.play();
    obs44Group.destroyEach();
  }

  if(candleGroup.isTouching(mamaSprite) && lives != 0) {
    lives--;
    hit.play();
    candleGroup.destroyEach();
  }

  if(cakeGroup.isTouching(mamaSprite) && lives != 10 && lives != 9) {
    lives += 2;
    cakeGroup.destroyEach();
    win.play();
  }

  if((mousePressedOver(replay) && touches.length >= 1) && gameState === "end") {
    reset();
  }

  mamaSprite.collide(invisibleGround);

  drawSprites();

  textSize(20);
  fill("red");
  text("Score: " + score, 1100, 20);
}

function spawnCandles() {
  if (frameCount % 100 === 0) {
    candle = createSprite(1280, 450);
    candle.setVelocity(-10, 0);
    candle.scale = 1.5;
    candle.collide(invisibleGround);
    candle.debug = false;
    candleRandSwitch = Math.round(random(1, 5));
    candle.scale = 0.5;
    switch (candleRandSwitch) {
      case 1: candle.addImage("candle1", candle1);
        break;
      case 2: candle.addImage("candle2", candle2);
        break;
      case 3: candle.addImage("candle3", candle3);
        break;
      case 4: candle.addImage("candle4", candle4);
        break;
      case 5: candle.addImage("candle5", candle5);
        break;
      default:
        break;
    }
    candleGroup.add(candle);
    candle.lifetime = 150;
  }

  console.log(lives);
}

function spawn44() {
  if (frameCount % 180 === 0) {
    obs44RandX = Math.round(random(300, 1250));
    obs44 = createSprite(obs44RandX, 0);
    obs44.setVelocity(0, 15);
    obs44.collide(invisibleGround);
    obs44.setCollider("circle", 0, 0, 150);
    obs44.scale = 0.5;
    obs44.addImage("43", obs44Image);
    obs44Group.add(obs44);
    obs44.debug = false;
    obs44.lifetime = 100;
  }
}

function spawnCake() {
  if(frameCount % 200 === 0) {
    cakeRandX = Math.round(random(200, 1250));
    cakeRandY = Math.round(random(30, 500));
    cake = createSprite(cakeRandX, cakeRandY);
    cake.setVelocity(-20, 0);
    cakeRandSwitch = Math.round(random(1, 4));
    switch(cakeRandSwitch) {
      case 1: cake.addImage("cake1", cake1);
      break;
      case 2: cake.addImage("cake2", cake2); cake.scale = 0.4;
      break;
      case 3: cake.addImage("cake3", cake3); cake.scale = 0.8;
      break;
      case 4: cake.addImage("cake4", cake4); cake.scale = 0.3;
      break;
      default:
      break;
    }
    cake.lifetime = 70;
    cakeGroup.add(cake);
  }
}

function reset() {
  score = 0;
  obs44Group.destroyEach();
  cakeGroup.destroyEach();
  candleGroup.destroyEach();
  mamaSprite.changeAnimation("walking", mamaWalking);
  gameState = "play";
  mamaSprite.scale = 0.4;
  lives = 10;
  replay.visible = false;
  touches = [];
}
