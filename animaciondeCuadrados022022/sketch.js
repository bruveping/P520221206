let Uncuadrado, laCantidad;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  //createCanvas(400,400);
  laCantidad = 40;
  Uncuadrado = [laCantidad];
  for(let i = 0; i<laCantidad; i++){
      Uncuadrado[i] = new elCuadrado();
  }
  noStroke();
fill(255,0,100);
}


function draw() {
  background(0,0,220);

  for(let i = 0; i<laCantidad; i++){
    Uncuadrado[i].muestra();
  }

}

function elCuadrado() {
  this.veloY = random(1,9);
  this.mueveX = 0;
  this.posX = random(width);
  this.posY = random(-height,-100);
  this.tamanoX = random(20,50);
  this.tamanoY= random(40,120);
  this.muestra = ()=> {
      rect(this.posX+this.mueveX,this.posY,this.tamanoX,this.tamanoY);
    this.posY+=this.veloY;
    this.mueveX = this.mueveX +(random(-2,2));
    if(this.posY>height){
      this.posY = random(-height,-100);
    }
  }

}
