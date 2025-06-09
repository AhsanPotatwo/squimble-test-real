function stage(cameraX, cameraY) {
  push();
  fill(255, 0, 0);

  pop();
}

// Helper to draw a world object relative to the camera
function drawWorldRect(worldX, worldY, size) {
  rect(worldX, -worldY, size); // direct world coordinates
}

function makeStage1() {
  return [
    new WorldBlock(50, 50, 50, 50),
    new WorldBlock(0, 50, 50, 50),
    new WorldBlock(-50, 50, 50, 50),
    new WorldBlock(50, -50, 30, 30),
    // Add more blocks as needed
  ];
}

function makeStage2() {
  return [
    new WorldBlock(0, 0, 100, 100),
    new WorldBlock(100, 0, 50, 50),
    // Different layout for stage 2
  ];
}