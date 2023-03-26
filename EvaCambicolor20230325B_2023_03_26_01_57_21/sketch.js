let posX,  posY, acelerX, acelerY, cambiaColor, cambiaColor02, cambiaColor03, elTexto, altoTExto, anchoTexto ;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(width/7);
  elTexto = "EVA KIM";
  anchoTexto = textWidth(elTexto);
  altoTExto = textAscent();
  posX = random(width-anchoTexto);
  posY = random(altoTExto,height);
  acelerX = 1;
  acelerY = 1.2;
  cambiaColor = 0
  cambiaColor02 = 0;
  cambiaColor03 = 0;
    background(220);
}

function draw() {

  fill(255 * abs(sin(cambiaColor)),255 * abs(sin(cambiaColor02)),255 * abs(sin(cambiaColor03)));
  cambiaColor+= 0.01;
  cambiaColor02+= 0.0003;
  cambiaColor03+= 0.005;
  text(elTexto, posX, posY);
  
  posX+= acelerX;
  posY+= acelerY;
  
  
  if(posX > width-anchoTexto || posX < 0){    
    acelerX = -acelerX;
  }
    if(posY > height || posY < 0+altoTExto){    
    acelerY = -acelerY;
  }
}