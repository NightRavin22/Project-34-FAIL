var dog, happyDog, database, foods, foodStock;
var foodNumber
function preload()
{
  dogImage = loadImage("Dog.png");
  hpDogImage = loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.1;
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
}


function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(hpDogImage);
  }
  drawSprites();
  fill("black");
  text("Food = " + database.ref('food'),85,100);
}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}