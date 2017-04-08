'use strict';

class ParticleObject extends CanvasMovableObject {
  constructor(x, y, radius, velocity) {
    super(x, y);
    this._radius = radius;
    this._velocity = velocity;
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    this._drawCircle('white');
    if (!this.isMoving()) {
      this._moveToRandomPosition();
    }
  }

  getVelocity() {
    return this._velocity;
  }

  /**
   * Private Functions
   */

  _drawCircle(color) {
    const context = this.scene.context;
    context.beginPath();
    context.ellipse(
      this.x,
      this.y,
      this._radius,
      this._radius,
      0,
      0,
      2 * Math.PI
    );
    context.strokeStyle = color;
    context.fillStyle = color;
    context.fill();
    context.stroke();
  }

  _moveToRandomPosition() {
    this.moveTo(
      Math.random() * (this.scene.width - 1 - this._radius * 2) + this._radius,
      Math.random() * (this.scene.height - 1 - this._radius * 2) + this._radius
    );
  }
}
