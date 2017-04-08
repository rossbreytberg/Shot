'use strict';

class BackgroundObject extends CanvasObject {

  constructor(color) {
    super();
    this._color = color;
  }

  /**
   * Public Functions
   */

  draw() {
    const context = this.scene.context;
    context.fillStyle = this._color;
    context.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Protected Functions
   */

  onSceneUpdated() {
    this.width = this.scene.width;
    this.height = this.scene.height;
  }
}
