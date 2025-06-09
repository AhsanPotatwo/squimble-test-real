// --- Player Class ---
class Player extends Entity {
  constructor(playerID, worldX, worldY, width, height, playerSpeed) {
    super(worldX, worldY, width, height, true);
    this.playerID = playerID;
    this.playerSpeed = playerSpeed;
    this.velX = 0;
    this.velY = 0;
    this.acceleration = 0.6;
    this.friction = 0.85;
    this.maxSpeed = playerSpeed * 2;
  }

  update(cameraX, cameraY) {
    this.move();
    this.physicsUpdate(entities);
  }

  render(cameraX, cameraY) {
    let x = this.worldX;
    let y = -this.worldY;
    push();
    //noStroke();
    rectMode(CENTER);
    fill(0, 150, 255); // Example color for player
    rect(x, y, this.width, this.height); // Rounded rectangle
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.playerID, x, y - this.height / 2 - 10);
    pop();
  }

move() {
  // Input
  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(87)) moveY += 1; // W
  if (keyIsDown(83)) moveY -= 1; // S
  if (keyIsDown(65)) moveX -= 1; // A
  if (keyIsDown(68)) moveX += 1; // D

  // Normalize diagonal movement
  if (moveX !== 0 && moveY !== 0) {
    moveX *= Math.SQRT1_2;
    moveY *= Math.SQRT1_2;
  }

  // Acceleration
  this.velX += moveX * this.acceleration;
  this.velY += moveY * this.acceleration;

  // Clamp speed
  this.velX = constrain(this.velX, -this.maxSpeed, this.maxSpeed);
  this.velY = constrain(this.velY, -this.maxSpeed, this.maxSpeed);

  // Apply friction
  this.velX *= this.friction;
  this.velY *= this.friction;
}

physicsUpdate(entities) {
  // --- X axis ---
  this.worldX += this.velX;
  for (let i = 1; i < entities.length; i++) {
    const other = entities[i];
    if (this.isCollidingWith(other)) {
      this.worldX -= this.velX;
      this.velX = 0;
      break;
    }
  }
  // --- Y axis ---
  this.worldY += this.velY;
  for (let i = 1; i < entities.length; i++) {
    const other = entities[i];
    if (this.isCollidingWith(other)) {
      this.worldY -= this.velY;
      this.velY = 0;
      break;
    }
  }
}


}