let entities = [];

let worldWidth = 2000;
let worldHeight = 2000;

let camera;

let showDebug = false;
let showDebugText = false;

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);

  camera = new Camera();

  // Spawn player in world space
   entities.push(new Player("Dude_even_more_awesome", 0, 0, 20, 30, 5));

     let stageBlocks = makeStage1(); // or makeStage2(), etc.
  for (let block of stageBlocks) {
    entities.push(block);
  }

}

function draw() {
  background(220);

  updateEntities();
  updateCamera();

  push();
  applyCameraTransform();
  drawWorld();
  drawEntities();
  pop();

  drawDebugConsole();
}

function keyPressed() {
  // Toggle debug info with the backtick (`) key
  if (key == '1') {
    showDebug = !showDebug;
  }
   if (key == '2') {
    showDebugText = !showDebugText;
  }
  if (key == "q") {
    camera.zoomIn();
  }

  if (key == "e") {
    camera.zoomOut();
  }
  
}

function updateEntities() {
  const cameraX = camera.getX();
  const cameraY = camera.getY();
  for (let entity of entities) {
    if (entity.update) entity.update(cameraX, cameraY, entities);
  }
}

function updateCamera() {
  const player = entities[0];
  camera.follow(player.worldX, player.worldY);
}

function applyCameraTransform() {
  const cameraX = camera.getX();
  const cameraY = camera.getY();
  const zoom = camera.getZoom();
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-cameraX, cameraY);
}

function drawWorld() {
  const cameraX = camera.getX();
  const cameraY = camera.getY();
  //stage(cameraX, cameraY);
}

function drawEntities() {
  const cameraX = camera.getX();
  const cameraY = camera.getY();
  for (let entity of entities) {
    entity.render(cameraX, cameraY);
  }
}

function drawDebugConsole() {
  if (!showDebug) return;

  const player = entities[0];
  const cameraX = camera.getX();
  const cameraY = camera.getY();

  // Calculate world mouse position
  const zoom = camera.getZoom();
  const worldMouseX = (mouseX - width / 2) / zoom + cameraX;
  const worldMouseY = -( (mouseY - height / 2) / zoom - cameraY );

  drawDebugGrid(cameraX, cameraY, zoom);

  push();
  fill(0, 180);
  rectMode(CORNER);
  noStroke();
  rect(10, 10, 320, 170, 8);

  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  let debugText = 
    `Player X: ${player.worldX.toFixed(2)}\n` +
    `Player Y: ${player.worldY.toFixed(2)}\n` +
    `Camera X: ${cameraX.toFixed(2)}\n` +
    `Camera Y: ${cameraY.toFixed(2)}\n` +
    `Mouse X: ${mouseX}\n` +
    `Mouse Y: ${mouseY}\n` +
    `World Mouse X: ${worldMouseX.toFixed(2)}\n` +
    `World Mouse Y: ${worldMouseY.toFixed(2)}\n` +
    `FPS: ${nf(frameRate(), 2, 1)}`;
  text(debugText, 20, 20);
  pop();
}

function drawDebugGrid(cameraX, cameraY, zoom) {
  push();
  stroke(180, 180, 255, 150);
  strokeWeight(1);
  noFill();
  textAlign(CENTER, CENTER);

  const gridSize = 50;

  // Find the visible world bounds
  const left = ((-width / 2) / zoom) + cameraX;
  const right = ((width / 2) / zoom) + cameraX;
  const top = ((-height / 2) / zoom) + cameraY;
  const bottom = ((height / 2) / zoom) + cameraY;

  // Snap to nearest grid line
  const startX = Math.floor(left / gridSize) * gridSize;
  const endX = Math.ceil(right / gridSize) * gridSize;
  const startY = Math.floor(top / gridSize) * gridSize;
  const endY = Math.ceil(bottom / gridSize) * gridSize;

  // Draw vertical grid lines (X axis)
  for (let x = startX; x <= endX; x += gridSize) {
    let sx = (x - cameraX) * zoom + width / 2;
    line(sx, 0, sx, height);
  }

  // Draw horizontal grid lines (Y axis, invert for world-to-screen)
  for (let y = startY; y <= endY; y += gridSize) {
    let sy = (-y + cameraY) * zoom + height / 2;
    line(0, sy, width, sy);
  }

  // Draw coordinates at the center of each tile
    if (showDebugText) {
    textSize(9);
    fill(255, 120, 120, 180);
    for (let x = startX; x < endX; x += gridSize) {
      for (let y = startY; y < endY; y += gridSize) {
        let centerX = x + gridSize / 2;
        let centerY = y + gridSize / 2;
        let sx = (centerX - cameraX) * zoom + width / 2;
        let sy = (-centerY + cameraY) * zoom + height / 2;
        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          text(`${centerX},${centerY}`, sx, sy);
        }
      }
    }

    // Draw coordinates at each corner of every tile
    textSize(9);
    fill(30, 90, 140, 180);
    for (let x = startX; x <= endX; x += gridSize) {
      for (let y = startY; y <= endY; y += gridSize) {
        let sx = (x - cameraX) * zoom + width / 2;
        let sy = (-y + cameraY) * zoom + height / 2;
        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          text(`${x},${y}`, sx, sy);
        }
      }
    }
  }

  pop();
}