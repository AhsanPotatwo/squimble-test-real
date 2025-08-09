// Editor mode state and camera
window.editorMode = false;
window.editorCamera = null;
window.editorButtons = [];
window.tileCategories = Object.keys(TILESETS);
window.selectedCategoryIndex = 0;
window.selectedVariantIndex = 0;

// Editor camera movement logic
window.updateEditorCamera = function() {
  const speed = 20;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) editorCamera.x -= speed; // A or Left
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) editorCamera.x += speed; // D or Right
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) editorCamera.y += speed; // W or Up (Y+ is up in world) REMEMBER!
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) editorCamera.y -= speed; // S or Down
};


window.drawEditorUI = function() {
  push();
  fill(0, 180);
  rect(10, 10, 430, 90, 8);
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("EDITOR MODE (F2 to exit)", 10, 10);
  pop();

  updateEditorButtonHover(mouseX, mouseY);
  for (let btn of editorButtons) {
    btn.draw();
  }

  // Always get the current category from the index!
  const currentCategory = tileCategories[selectedCategoryIndex];
  push();
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0, 0, 0);
  text(
    currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1),
    100, 88 // Centered between arrows!!
  );
  pop();
};

class EditorButton {
  constructor(x, y, w, h, label, options = {}, onClick = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClick = onClick;

    // Customization options??? wip
    this.bg = options.bg || color(60, 120, 200);
    this.bgHover = options.bgHover || color(90, 160, 255);
    this.textColor = options.textColor || color(255);
    this.textSize = options.textSize || 16;
    this.radius = options.radius || 8;
    this.enabled = options.enabled !== undefined ? options.enabled : true;

    this.hovered = false;
  }

 draw(isSelected = false) {
  push();
  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textSize(this.textSize);
  noStroke();
  fill(isSelected ? color(255, 200, 60) : (this.hovered ? this.bgHover : this.bg));
  rect(this.x, this.y, this.w, this.h, this.radius);
  fill(this.textColor);
  text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  pop();
}

  contains(mx, my) {
    return mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h;
  }

  handleMouse(mx, my, pressed) {
    this.hovered = this.contains(mx, my);
    if (this.enabled && pressed && this.hovered && this.onClick) {
      this.onClick();
    }
  }
}

window.updateEditorButtonHover = function(mx, my) {
  for (let btn of editorButtons) {
    btn.hovered = btn.contains(mx, my);
  }
};

window.setupEditorButtons = function() {
  editorButtons = [
    // Left arrow
    new EditorButton(
      20, 70, 36, 36, "<",
      { bg: color(60, 120, 200), bgHover: color(100, 100, 100), textColor: color(255), radius: 8 },
      () => {
        selectedCategoryIndex = (selectedCategoryIndex - 1 + tileCategories.length) % tileCategories.length;
        selectedCategory = tileCategories[selectedCategoryIndex];
        // Optionally reset selectedVariant here IF I NEED TO
      }
    ),
    // Right arrow
    new EditorButton(
      140, 70, 36, 36, ">",
      { bg: color(60, 120, 200), bgHover: color(100, 100, 100), textColor: color(255), radius: 8 },
      () => {
        selectedCategoryIndex = (selectedCategoryIndex + 1) % tileCategories.length;
        selectedCategory = tileCategories[selectedCategoryIndex];
        // Optionally reset selectedVariant here IF I NEED TO
      }
    )
  ];
};
