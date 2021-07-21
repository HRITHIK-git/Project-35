var dog, dogImg, happydog;
var foodS, foodStock;
var database;



function preload() {
  dogImg = loadImage("images/dog.png")
  happydog = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 325, 50, 50)
  dog.addImage("dog", dogImg)
  dog.scale = 0.15;
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
}


function draw() {
  background(46, 139, 87)
  drawSprites();

  if (keyWentUp(UP_ARROW)) {
    writeStock(foodS)
    dog.changeImage("happydog", happydog)
  }

  stroke("black")
  fill("black")
  text("NOTE : Press UP ARROW key to feed drago milk.", 110, 30)
  text("Food:" + foodS, 250, 60)
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;

  } else {
    x = x - 1
  }

  database.ref('/').update({
    data: x
  })
}