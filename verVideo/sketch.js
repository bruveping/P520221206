
let playing = false;
let fingers;
let button;

function setup() {
  noCanvas();
  // especificar múltiples formatos para distintos navegadores
  fingers = createVideo(['https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4']);
  button = createButton('play');
  button.mousePressed(toggleVid); // adjuntar un listener al botón
}

// reproduce o pausa el video dependiendo de su estado actual
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}