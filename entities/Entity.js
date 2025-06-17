// --- Base Entity Class ---
class Entity {
  constructor(worldX, worldY, width = 20, height = 20, collidable = false) {
    this.worldX = worldX;
    this.worldY = worldY;
    this.width = width;
    this.height = height;
    this.collidable = collidable;
  }

  // Override in subclasses if needed
  update(cameraX, cameraY) {}

  // Axis-aligned bounding box collision for rectangles
  isCollidingWith(other) {
    if (!this.collidable || !other.collidable) return false;
    return (
      Math.abs(this.worldX - other.worldX) < (this.width + other.width) / 2 &&
      Math.abs(this.worldY - other.worldY) < (this.height + other.height) / 2
    );
  }
}

// WorldBlock now has its own render logic
class WorldBlock extends Entity {
  constructor(worldX, worldY, width, height) {
    super(worldX, worldY, width, height, true);
  }

  render(cameraX, cameraY) {
    let x = this.worldX;
    let y = -this.worldY;
    push();
    noStroke();
    rectMode(CENTER);
    fill(200, 50, 50); // Example color for blocks
    rect(x, y, this.width + 0, this.height + 0);
    pop();
  }
}


class DecorativeBlock extends Entity {
  constructor(worldX, worldY, width, height, category = "grass", variant = 0) {
    super(worldX, worldY, width, height, false);
    this.category = category;
    this.variant = variant;
  }

  render(cameraX, cameraY) {
    let x = this.worldX;
    let y = -this.worldY;
    const tileDef = TILESETS[this.category]?.[this.variant] || TILESETS["grass"][0];
    push();
    noStroke();
    rectMode(CENTER);
    fill(...tileDef.color);
    rect(x, y, this.width, this.height);
    pop();
  }
}