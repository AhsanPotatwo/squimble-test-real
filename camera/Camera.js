class Camera {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.smoothing = 0.05;
    this.zoom = 1.0; // normal zoom (1x)
    this.minZoom = 0.2;
    this.maxZoom = 3.0;
    this.zoomSpeed = 0.1;
  }

  follow(targetX, targetY) {
    this.x = lerp(this.x, targetX, this.smoothing);
    this.y = lerp(this.y, targetY, this.smoothing);
  }

  getX() { return this.x; }
  getY() { return this.y; }
  getZoom() { return this.zoom; }

  zoomIn() {
    this.zoom = constrain(this.zoom + this.zoomSpeed, this.minZoom, this.maxZoom);
  }

  zoomOut() {
    this.zoom = constrain(this.zoom - this.zoomSpeed, this.minZoom, this.maxZoom);
  }
}

function updateEditorCamera() {
  const speed = 20;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) editorCamera.x -= speed; // A or Left
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) editorCamera.x += speed; // D or Right
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) editorCamera.y += speed; // W or Up (Y+ is up in world)
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) editorCamera.y -= speed; // S or Down
}