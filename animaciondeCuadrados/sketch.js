let otroCuadrado01,otroCuadrado02,otroCuadrado03, laCantidad;

let unColor;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
laCantidad = 20;
unColor = [3];
unColor[0] = color(255,255,0);
  unColor[1] = color(255,0,0);
    unColor[2] = color(100,0,255);
  otroCuadrado01 = [laCantidad];
    otroCuadrado02 = [laCantidad];
      otroCuadrado03 = [laCantidad];
for (let i = 0; i < laCantidad; i++){
otroCuadrado01[i] = new unCuadrado(unColor[0]);
}
for (let i = 0; i < laCantidad; i++){
otroCuadrado02[i] = new unCuadrado(unColor[1]);
}
for (let i = 0; i < laCantidad; i++){
otroCuadrado03[i] = new unCuadrado(unColor[2]);
}
noStroke();
}




function draw() {
      background(0,255,230);

for (let i = 0; i < laCantidad; i++){
otroCuadrado01[i].dibujaCuad();
}
for (let i = 0; i < laCantidad; i++){
otroCuadrado02[i].dibujaCuad();
}
for (let i = 0; i < laCantidad; i++){
otroCuadrado03[i].dibujaCuad();
}
}


function unCuadrado(unColor){
  this.unColor = unColor;
  this.velocidad = (random(1,12))
this.posX = random(width);
this.posY;
    this.posY = random(-height,-height/2);
this.tamanoX =  random(10,width/5);
this.tamanoY = random(30,height/2);
 // fill(random(255),random(255),random(255));

  this.dibujaCuad= function(){
// fill(this.unColor);
  fill(unColor);
    rect(this.posX,this.posY ,this.tamanoX,this.tamanoY);
    this.posY= this.posY+this.velocidad ;

    if(this.posY > height){
  this.posY = random(-height,-height/2);
    }
  }

}
