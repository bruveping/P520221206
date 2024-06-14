let tamano;
let indice;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  frameRate(4);
  indice = 24
  tamano = width/indice;
  textSize(tamano);
}

function draw() {
  background(0);
  
  for(i = 0; i<indice; i++){
    for(j = 0; j<indice; j++){
    fill(0,255,0);
      let unDigito01 = random(4);
    text(floor(unDigito01%2),tamano*i+tamano,tamano*j);
    
  }}
}