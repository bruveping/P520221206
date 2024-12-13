let elAncho,
  elEspacio,
  cantidadBotones,
  piedra,
  papel,
  tijera,
  eleccionUsuario,
  eleccMaquina,
  ubicaTextResulX,
  ubicaTextResulY,
  resultado,
  tamanoTexto,
  usuarioTiro,
  altoCuad,
  elAlto,
  elRandom;
  let imagen = [];
  function preload() {
    for (let i = 0; i< 3; i++){
      imagen[i]=loadImage("/data/insumoPPT"+i+".png");
    }
  }
function setup() {
  createCanvas(windowWidth, windowHeight);


  altoCuad=0;
  elAncho = width / 10;
  elAlto = height/20;
  cantidadBotones = 3;
  elEspacio = width / (width / elAncho / 3.65);
  tamanoTexto = elAlto;
  textSize(tamanoTexto);
  piedra = false;
  papel = false;
  tijera = false;
  usuarioTiro = false;
  eleccionUsuario = "";
  eleccMaquina = "";
  resultado = "";
  ubicaTextResulX = width / 2;
  ubicaTextResulY = height / 2;
}

function draw() {
  background(220);
  altoCuad = elAlto*3;
  for (let i = 0; i < cantidadBotones; i++) {
    elString = "";
    let elColor;
    if (i == 0) {
      elColor = color(255, 0, 0);
      elString = "piedra";
    } else if (i == 1) {
      elColor = color(0, 255, 0);
      elString = "papel";
    } else {
      elColor = color(0, 0, 255);
      elString = "tijera";
    }
    fill(0);
    text(elString, elEspacio * i + elEspacio / 4, elAlto*2);
    fill(elColor);
    rect(elEspacio * i + elEspacio / 4, altoCuad, elAncho, elAncho);
    image(imagen[i],elEspacio * i + elEspacio / 4, altoCuad, elAncho, elAncho);
  }
  let usuElige = "el usuario eligió";
  let maquinaElige = "la máquina eligió";

  text(usuElige, ubicaTextResulX - textWidth(usuElige) / 2, ubicaTextResulY);
  text(
    eleccionUsuario,
    ubicaTextResulX - textWidth(usuElige) / 2,
    ubicaTextResulY + tamanoTexto * 1
  );
  text(
    maquinaElige,
    ubicaTextResulX - textWidth(usuElige) / 2,
    ubicaTextResulY + tamanoTexto * 2
  );
  if (usuarioTiro) {
    elRandom = int(random(30)) % 3;
    usuarioTiro = false;
  }
  if (elRandom == 0) {
    eleccMaquina = "piedra";
  } else if (elRandom == 1) {
    eleccMaquina = "papel";
  } else if (elRandom == 2) {
    eleccMaquina = "tijera";
  }

  text(
    eleccMaquina,
    ubicaTextResulX - textWidth(usuElige) / 2,
    ubicaTextResulY + tamanoTexto * 3
  );
  let numeroUsu;
  if (piedra == true) {
    numeroUsu = 0;
  } else if (papel == true) {
    numeroUsu = 1;
  } else if (tijera == true) {
    numeroUsu = 2;
  }
  if (piedra || papel || tijera) {
    if (elRandom == numeroUsu) {
      resultado = "empate";
    } else if (
      (numeroUsu == 0 && elRandom == 1) ||
      (numeroUsu == 1 && elRandom == 2) ||
      (numeroUsu == 2 && elRandom == 0)
    ) {
      resultado = "ganó la máquina";
    } else {
      resultado = "ganó el usuario";
    }
  }

  fill(255, 0, 0);
  text(
    "el resultado es: ",
    ubicaTextResulX - textWidth(usuElige) / 2,
    ubicaTextResulY + tamanoTexto * 4
  );
  text(
    resultado,
    ubicaTextResulX - textWidth(usuElige) / 2,
    ubicaTextResulY + tamanoTexto * 5
  );
}

function mouseReleased() {
  if (
    mouseX > elEspacio * 0 + elEspacio / 4 &&
    mouseX < elEspacio * 0 + elEspacio / 4 + elAncho &&
    mouseY > altoCuad &&
    mouseY < altoCuad + elAncho
  ) {

    piedra = true;
    papel = false;
    tijera = false;
    eleccionUsuario = "piedra";
    usuarioTiro = true;
  } else if (
    mouseX > elEspacio * 1 + elEspacio / 4 &&
    mouseX < elEspacio * 1 + elEspacio / 4 + elAncho &&
    mouseY > altoCuad &&
    mouseY < altoCuad + elAncho
  ) {

    piedra = false;
    papel = true;
    tijera = false;
    eleccionUsuario = "papel";
    usuarioTiro = true;
  } else if (
    mouseX > elEspacio * 2 + elEspacio / 4 &&
    mouseX < elEspacio * 2 + elEspacio / 4 + elAncho &&
    mouseY > altoCuad &&
    mouseY < altoCuad + elAncho
  ) {

    piedra = false;
    papel = false;
    tijera = true;
    eleccionUsuario = "tijera";
    usuarioTiro = true;
  }
}
