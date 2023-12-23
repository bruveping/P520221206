let Uncuadrado, laCantidad, uncolor, elFondo, otraVerdad;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  //createCanvas(400,400);
  laCantidad = 12;
  Uncuadrado = [laCantidad];
uncolor = [laCantidad];
otraVerdad = [laCantidad];
elFondo=color(random(255),random(255),random(255));
  for(let i = 0; i<laCantidad; i++){
    uncolor[laCantidad]=color(random(255),random(255),random(255));
    otraVerdad[i] = false;
      Uncuadrado[i] = new elCuadrado(uncolor[laCantidad] );
  }
  noStroke();

}


function draw() {
  background(elFondo);

  for(let i = 0; i<laCantidad; i++){
    Uncuadrado[i].muestra(otraVerdad[i]);
  }

}

function elCuadrado(unColor ) {

  this.unColor = unColor;
  this.veloY = round(random(1,5));
  this.mueveX = 0;
  this.posX = round(random(width));
  this.posY = round(random(-height,-100));
  this.tamanoX = round(random(20,50));
  this.tamanoY= round(random(40,120));

  this.muestra = (laVerdad)=> {
      this.laVerdad = laVerdad;
    fill(this.unColor);
      rect(this.posX+this.mueveX,this.posY,this.tamanoX,this.tamanoY);
    this.posY+=this.veloY;
    this.mueveX = this.mueveX;
    if(this.posY>height){
      this.posY = round(random(-height,-100));
    }
    if(this.laVerdad){
      this.posY = round(random(-height,-100));

    }
  }
}

function mouseReleased() {
  for(let i = 0; i<laCantidad; i++){
  if(mouseX>Uncuadrado[i].posX&&mouseX<Uncuadrado[i].posX+Uncuadrado[i].tamanoX&&mouseY>Uncuadrado[i].posY&&mouseY<Uncuadrado[i].posY+Uncuadrado[i].tamanoY){
otraVerdad[i]=!otraVerdad[i];
}else{
        otraVerdad[i]=false;
}
}
}