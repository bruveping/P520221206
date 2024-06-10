/*Juego en proceso realizado por Ánge Jara 2024 06 10*/

let cols, rows;
let w = 120;  // Ancho de cada celda del laberinto
let grid;
let current;
let stack = [];
let player;
let gameWon = false;

function setup() {
  createCanvas(1000, 900);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = new Array(cols);

  // Inicializar el laberinto
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  current = grid[0][0];
  player = new Player(current.i * w, current.j * w);
}

function draw() {
  background(51);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  if (!gameWon) {
    current.visited = true;
    let next = current.checkNeighbors();
    if (next != null) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
    if (current == grid[cols - 1][rows - 1]) {
      gameWon = true;
    }
  }

  player.show();
  player.highlightMovableCells();

  if (mouseIsPressed) {
    player.move(mouseX, mouseY);
    if (player.i == cols - 1 && player.j == rows - 1) {
      textSize(32);
      fill(255);
      text("¡Has encontrado la salida!", width / 4, height / 2);
    }
  }

  // Mostrar reglas del juego
  fill(255);
  textSize(16);
  text("Usa el mouse para mover el jugador (círculo verde) a través del laberinto.\n" +
       "Solo puedes moverte a celdas adyacentes sin paredes bloqueando el camino.\n" +
       "Encuentra la salida en la esquina inferior derecha.", 10, height - 60);
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  show() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) line(x, y, x + w, y);        // Pared superior
    if (this.walls[1]) line(x + w, y, x + w, y + w);  // Pared derecha
    if (this.walls[2]) line(x + w, y + w, x, y + w);  // Pared inferior
    if (this.walls[3]) line(x, y + w, x, y);        // Pared izquierda

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }

    // Pintar celda de salida de color naranja
    if (this.i == cols - 1 && this.j == rows - 1) {
      noStroke();
      fill(255, 165, 0, 100); // Color naranja con transparencia
      rect(x, y, w, w);
    }
  }

  highlight() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }

  checkNeighbors() {
    let neighbors = [];

    let top = (this.j > 0) ? grid[this.i][this.j - 1] : null;
    let right = (this.i < cols - 1) ? grid[this.i + 1][this.j] : null;
    let bottom = (this.j < rows - 1) ? grid[this.i][this.j + 1] : null;
    let left = (this.i > 0) ? grid[this.i - 1][this.j] : null;

    if (top != null && !top.visited) {
      neighbors.push(top);
    }
    if (right != null && !right.visited) {
      neighbors.push(right);
    }
    if (bottom != null && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left != null && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return null;
    }
  }
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.i = floor(this.x / w);
    this.j = floor(this.y / w);
  }

  show() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x + w / 2, this.y + w / 2, w / 2, w / 2);
  }

  move(newX, newY) {
    let newI = floor(newX / w);
    let newJ = floor(newY / w);

    if (newI >= 0 && newI < cols && newJ >= 0 && newJ < rows) {
      let destination = grid[newI][newJ];

      // Verificar si el jugador puede moverse a la celda destino
      if (this.i == newI && this.j - 1 == newJ && !grid[this.i][this.j].walls[0] && !destination.walls[2]) { // Arriba
        this.x = newI * w;
        this.y = newJ * w;
        this.i = newI;
        this.j = newJ;
      } else if (this.i == newI && this.j + 1 == newJ && !grid
[this.i][this.j].walls[2] && !destination.walls[0]) { // Abajo
        this.x = newI * w;
        this.y = newJ * w;
        this.i = newI;
        this.j = newJ;
      } else if (this.i - 1 == newI && this.j == newJ && !grid[this.i][this.j].walls[3] && !destination.walls[1]) { // Izquierda
        this.x = newI * w;
        this.y = newJ * w;
        this.i = newI;
        this.j = newJ;
      } else if (this.i + 1 == newI && this.j == newJ && !grid[this.i][this.j].walls[1] && !destination.walls[3]) { // Derecha
        this.x = newI * w;
        this.y = newJ * w;
        this.i = newI;
        this.j = newJ;
      }
    }
  }

  highlightMovableCells() {
    // Iluminar celdas a las que el jugador puede moverse
    if (this.j > 0 && !grid[this.i][this.j].walls[0] && !grid[this.i][this.j - 1].walls[2]) { // Arriba
      grid[this.i][this.j - 1].highlight();
    }
    if (this.j < rows - 1 && !grid[this.i][this.j].walls[2] && !grid[this.i][this.j + 1].walls[0]) { // Abajo
      grid[this.i][this.j + 1].highlight();
    }
    if (this.i > 0 && !grid[this.i][this.j].walls[3] && !grid[this.i - 1][this.j].walls[1]) { // Izquierda
      grid[this.i - 1][this.j].highlight();
    }
    if (this.i < cols - 1 && !grid[this.i][this.j].walls[1] && !grid[this.i + 1][this.j].walls[3]) { // Derecha
      grid[this.i + 1][this.j].highlight();
    }
  }
}
