'use strict';

class CursorObject extends CanvasMovableObject {
  constructor() {
    super(0, 0);
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    this._drawRing(10, 1, 'black');
    this._drawRing(13, 4, 'yellow');
    this._drawRing(15, 1, 'black');
    this._drawRect(this.x - 20, this.y - 2, 14, 4, 'black', 'yellow');
    this._drawRect(this.x + 6, this.y - 2, 14, 4, 'black', 'yellow');
    this._drawRect(this.x - 2, this.y - 20, 4, 14, 'black', 'yellow');
    this._drawRect(this.x - 2, this.y + 6, 4, 14, 'black', 'yellow');
  }

  getVelocity() {
    // Arbitrary but guaranteed to move anywhere within one frame.
    return this.scene.width + this.scene.height;
  }

  onSceneUpdated() {
    const canvasElement = this.scene.context.canvas;
    canvasElement.addEventListener('mousemove', event => {
      const x = event.clientX - canvasElement.offsetLeft;
      const y = event.clientY - canvasElement.offsetTop;
      this.moveTo(x, y);
    });
  }

  /**
   * Private Functions
   */

  _drawRect(x1, y1, width, height, strokeColor, fillColor) {
    const context = this.scene.context;
    context.beginPath();
    context.fillStyle = fillColor;
    context.lineWidth = 1;
    context.strokeStyle = strokeColor;
    context.rect(x1, y1, width, height);
    context.fillRect(x1, y1, width, height);
    context.stroke();
  }

  _drawRing(radius, lineWidth, color) {
    const context = this.scene.context;
    context.beginPath();
    context.ellipse(this.x, this.y, radius, radius, 0, 0, 2 * Math.PI);
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  }
}
