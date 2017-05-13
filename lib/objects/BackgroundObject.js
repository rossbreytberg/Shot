'use strict';

class BackgroundObject extends AbstractObject {

  constructor(color) {
    super(0, 0);
    this._color = color;
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    const context = this.scene.context;
    context.fillStyle = this._color;
    context.fillRect(this.x, this.y, this._width, this._height);
  }

  onSceneUpdated() {
    this._width = this.scene.width;
    this._height = this.scene.height;
  }
}
