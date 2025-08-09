function stage(cameraX, cameraY) {
  push();
  fill(255, 0, 0);

  pop();
}

// Helper to draw a world object relative to the camera
function drawWorldRect(worldX, worldY, size) {
  rect(worldX, -worldY, size); // direct world coordinates - REMEMBER THIS!
}

const TILESETS = {
  grass: [
    { name: "Grass 1", color: [100, 200, 100] },
    { name: "Grass 2", color: [80, 180, 80] },
    { name: "Grass Path", color: [120, 220, 120] },
  ],

  dirt: [
    { name: "Dirt 1", color: [160, 110, 60] },
    { name: "Dirt Path", color: [180, 130, 80] },
  ],

  water: [
    { name: "Water 1", color: [80, 120, 255] },
    { name: "Water 2", color: [80, 0, 255] },
  ],

  stone: [
    { name: "Stone 1", color: [150, 150, 150] },
    { name: "Stone 2", color: [130, 130, 130] },
    { name: "Stone Path", color: [170, 170, 170] }
  ],

  sand: [
    { name: "Sand 1", color: [210, 180, 140] },
    { name: "Sand Path", color: [220, 200, 160] },
  ],

  // I can add more categories and variants as needed!!
};

function makeStage1() {
  const decorativeBlocksData = [
    { x: 0, y: 0, category: "grass", variant: 0 }, // Grass 1
    { x: 50, y: 0, category: "grass", variant: 1 }, // Grass 2
    { x: 100, y: 0, category: "grass", variant: 2 }, // Grass Path
    { x: 0, y: 50, category: "dirt", variant: 0 }, // Dirt 1
    { x: 50, y: 50, category: "dirt", variant: 1 }, // Dirt Path
    { x: 100, y: 50, category: "water", variant: 0 } // Water 1
  ];
  const decorative = decorativeBlocksData.map(
    d => new DecorativeBlock(d.x, d.y, 50, 50, d.category, d.variant)
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