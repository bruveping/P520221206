// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples
// revised Daniel Shiffman

let x, y, z;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  x = 0;
  y = 0;
  z = 0;
}

function draw() {
  background(255, 255, 255, 255);

  // acceleration
  x += accelerationX * 0.05;
  y += accelerationY * 0.05;
  z += accelerationZ * 0.05;

  fill(255, 0, 255);
  rect(0, -height / 2, 3, height);
  fill(x * 255, y * 255, z * 255);

  rect(x * width, -120, 3, 30);
  rect(y * width, 0, 3, 30);
  rect(z * width, 120, 3, 30);
}
