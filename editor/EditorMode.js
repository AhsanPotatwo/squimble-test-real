// Editor mode state and camera
window.editorMode = false;
window.editorCamera = null;

// Editor camera movement logic
window.updateEditorCamera = function() {
  const speed = 20;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) editorCamera.x -= speed; // A or Left
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) editorCamera.x += speed; // D or Right
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) editorCamera.y += speed; // W or Up (Y+ is up in world)
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) editorCamera.y -= speed; // S or Down
};

// Editor UI overlay
window.drawEditorUI = function() {
  push();
  fill(0, 180);
  rect(10, 10, 430, 50, 8);
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("EDITOR MODE (F2 to exit)", 10, 10);
  pop();
};