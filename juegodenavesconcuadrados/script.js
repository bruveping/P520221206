/*
Diseñado por Ángel Jara 2025 03 24
*/
let player;
let enemies = [];
let bullets = [];
let enemyBullets = [];
let explosions = [];
let playerSpeed = 5;
let bulletSpeed = 7;
let enemySpeed = 2;
let enemyBulletSpeed = 3;
let enemyFireRate = 60;
let enemyDirection = 1;
let lives = 5;
let gameOver = false;
let enemiesDestroyed = 0; // Variable para contar enemigos destruidos
let showCredit = true; // Variable para mostrar el crédito
let creditStartTime; // Variable para el tiempo de inicio del crédito

let tamano = 70;
let backgrounds = ["#8ee066", "#7d8cad", "#a97dad", "#c575a4", "#8b95e4"];
let currentBackground;

let epicMusic;
let playerShootSound;
let enemyShootSound;
let playerExplosionSound;
let enemyExplosionSound;
let gameOverSound;
let restartSound;

// Precargar sonidos
function preload() {
  epicMusic = loadSound('assets/epic_music.mp3');
  playerShootSound = loadSound('assets/player_shoot.mp3');
  enemyShootSound = loadSound('assets/enemy_shoot.mp3');
  playerExplosionSound = loadSound('assets/player_explosion.mp3');
  enemyExplosionSound = loadSound('assets/enemy_explosion.mp3');
  gameOverSound = loadSound('assets/game_over.mp3');
  restartSound = loadSound('assets/restart.mp3');
}

// Configuración inicial
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  resetGame();
  epicMusic.loop();
  creditStartTime = millis();
}

// Dibujar en pantalla
function draw() {
  background(currentBackground);

  // Mostrar crédito al principio durante 3 segundos
  if (showCredit && millis() - creditStartTime < 3000) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Diseñado por Ángel Jara", width / 2, height / 2);
    return;
  } else {
    showCredit = false;
  }

  if (gameOver) {
    drawGameOverScreen();
    return;
  }

  player.update();
  player.show();

  for (let bullet of bullets) {
    bullet.update();
    bullet.show();
  }

  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
    if (frameCount % enemyFireRate === 0) {
      enemyBullets.push(new Bullet(enemy.x, enemy.y, enemyBulletSpeed, 'DOWN', enemyShootSound));
    }
  }

  for (let bullet of enemyBullets) {
    bullet.update();
    bullet.show();
  }

  handleCollisions();
  spawnEnemies();
  displayLives();

  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].show();
    if (explosions[i].isDone()) {
      explosions.splice(i, 1);
    }
  }
}

// Manejar teclas presionadas
function keyPressed() {
  if (key === ' ') {
    bullets.push(new Bullet(player.x, player.y, bulletSpeed, 'UP', playerShootSound));
  }
  if (gameOver && (key === 'n' || key === 'N')) {
    resetGame();
    restartSound.play();
  }
}

// Manejar colisiones
function handleCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].hits(enemies[j])) {
        explosions.push(new Explosion(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h, enemyExplosionSound));
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        enemiesDestroyed++; // Incrementar contador de enemigos destruidos
        break;
      }
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (enemyBullets[i].hits(player)) {
      explosions.push(new Explosion(player.x, player.y, player.w, player.h, playerExplosionSound));
      lives--;
      enemyBullets.splice(i, 1);
      if (lives <= 0) {
        gameOver = true;
        gameOverSound.play();
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (player.hits(enemies[i])) {
      explosions.push(new Explosion(player.x, player.y, player.w, player.h, playerExplosionSound));
      lives--;
      enemies.splice(i, 1);
      if (lives <= 0) {
        gameOver = true;
        gameOverSound.play();
      }
    }
  }
}

// Generar enemigos
function spawnEnemies() {
  if (enemies.length < 5) {
    enemies.push(new Enemy(random(width), random(-100, -height / 2)));
  }
}

// Mostrar vidas en pantalla
function displayLives() {
  fill(0, 0, 0, 50); // Fondo negro con alfa 50%
  rect(75, 40, 150, 40); // Rectángulo para resaltar texto
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Vidas: " + lives, 75, 30);
}

// Dibujar pantalla de Game Over
function drawGameOverScreen() {
  fill(0, 0, 0, 50); // Fondo negro con alfa 50%
  rect(width / 2, height / 2, 400, 200); // Rectángulo para resaltar texto
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Juego Terminado", width / 2, height / 2 - 40);
  textSize(16);
  text("Enemigos destruidos: " + enemiesDestroyed, width / 2, height / 2);
  text("Presiona 'N' para reiniciar", width / 2, height / 2 + 40);
}

// Reiniciar juego
function resetGame() {
  player = new Player();
  enemies = [];
  bullets = [];
  enemyBullets = [];
  explosions = [];
  lives = 5;
  gameOver = false;
  enemiesDestroyed = 0; // Reiniciar contador de enemigos destruidos
  currentBackground = random(backgrounds);
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy(random(width), random(-100, -height / 2)));
  }
}

// Clase para el jugador
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 100; // Aparecer un poco más arriba
    this.w = tamano;
    this.h = tamano;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += playerSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= playerSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += playerSpeed;
    }

    // Limitar la movilidad del protagonista dentro del área visible
    this.x = constrain(this.x, 0 + this.w / 2, width - this.w / 2);
    this.y = constrain(this.y, height / 2, height - this.h / 2);
  }

  show() {
    fill(255, 0, 0); // Color rojo
    rect(this.x, this.y, this.w, this.h);
  }

  hits(target) {
    return (
      this.x < target.x + target.w &&
      this.x + this.w > target.x &&
      this.y < target.y + target.h &&
      this.y + this.h > target.y
    );
  }
}

// Clase para los enemigos
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = tamano;
    this.h = tamano;
  }

  update() {
    this.y += enemySpeed;
    this.x += enemyDirection * enemySpeed;

    // Cambiar la dirección cuando el enemigo alcanza el borde de la pantalla
    if (this.x < 0 + this.w / 2 || this.x > width - this.w / 2) {
      enemyDirection *= -1;
    }

    // Resetear la posición al alcanzar el borde inferior
    if (this.y > height) {
      this.y = random(-100, -height / 2);
      this.x = random(width);
    }
  }

  show() {
    fill(0, 0, 255); // Color azul
    rect(this.x, this.y, this.w, this.h);
  }
}

// Clase para las balas
class Bullet {
  constructor(x, y, speed, direction, sound) {
    this.x = x;
    this.y = y;
    this.w = tamano / 3;
    this.h = tamano / 3;
    this.speed = speed;
    this.direction = direction;
    this.sound = sound;
    this.sound.play();
  }

  update() {
    if (this.direction === 'UP') {
      this.y -= this.speed;
    } else if (this.direction === 'DOWN') {
      this.y += this.speed;
    }
  }

  show() {
    fill('#fb41fd'); // Color de las balas
    rect(this.x, this.y, this.w, this.h);
  }

  hits(target) {
    return (
      this.x < target.x + target.w &&
      this.x + this.w > target.x &&
      this.y < target.y + target.h &&
      this.y + this.h > target.y
    );
  }
}

// Clase para las explosiones
class Explosion {
  constructor(x, y, w, h, sound) {
    this.x = x;
    this.y = y;
    this.w = w + 4;
    this.h = h + 4;
    this.start = millis();
    this.duration = 1000; // 1 segundo
    this.sound = sound;
    this.sound.play();
  }

  isDone() {
    return millis() - this.start > this.duration;
  }

  show() {
    fill(255, 255, 0); // Color amarillo
    rect(this.x, this.y, this.w, this.h);
  }
}