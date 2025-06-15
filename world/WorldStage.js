function stage(cameraX, cameraY) {
  push();
  fill(255, 0, 0);

  pop();
}

// Helper to draw a world object relative to the camera
function drawWorldRect(worldX, worldY, size) {
  rect(worldX, -worldY, size); // direct world coordinates
}

const DECORATIVE_TILE_TYPES = {
  grass: { color: [100, 200, 100], image: null },
  dirt:  { color: [160, 110, 60],  image: null },
  water: { color: [80, 120, 255],  image: null },
  sand:  { color: [230, 220, 120], image: null },
  stone: { color: [180, 180, 180], image: null },
  void:  { color: [0, 0, 0],       image: null },
  // Add more as needed!
};

function makeStage1() {
  const decorativeBlocksData = [
    { x: 0, y: 0, type: "grass" },
    { x: 50, y: 0, type: "dirt" },
    { x: 100, y: 0, type: "water" },
    { x: 150, y: 0, type: "void" },
  ];
  const decorative = decorativeBlocksData.map(
    d => new DecorativeBlock(d.x, d.y, 50, 50, d.type)
  );

  const worldBlocksData = [
    { x: 0, y: 100, w: 50, h: 50 },
    { x: 50, y: 100, w: 50, h: 50 },
  ];
  const world = worldBlocksData.map(
    b => new WorldBlock(b.x, b.y, b.w, b.h)
  );

  return { decorative, world };
}

function makeStage2() {

}