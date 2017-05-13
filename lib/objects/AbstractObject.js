'use strict';

class AbstractObject {
  constructor(x, y) {
    if (new.target === AbstractObject) {
      throw Error('Instantiating abstract class ' + this.constructor.name);
    }
    this.x = x;
    this.y = y;
    this.destinationX = x;
    this.destinationY = y;
  }

  /**
   * Public Functions
   */

  draw() {
    const diffX = Math.abs(this.destinationX - this.x);
    const diffY = Math.abs(this.destinationY - this.y);
    const velocityX = this.getVelocity() * diffX / (diffX + diffY);
    const velocityY = this.getVelocity() * diffY / (diffX + diffY);
    this.x = this._getNewCoordinate(
      this.x,
      this.destinationX,
      velocityX
    );
    this.y = this._getNewCoordinate(
      this.y,
      this.destinationY,
      velocityY
    );
    this.drawWithPosition();
  }

  isCoveringPosition(x, y) {
    return false;
  }

  setScene(canvasScene) {
    this.scene = canvasScene;
    this.onSceneUpdated();
  }

  /**
   * Protected Functions
   */
  drawWithPosition() {
    throw Error('Must implement drawWithPosition() method');
  }

  getVelocity() {
    return 1;
  }

  isMoving() {
    return this.x !== this.destinationX || this.y !== this.destinationY;
  }

  moveTo(x, y) {
    this.destinationX = x;
    this.destinationY = y;
  }

  onClick(x, y) {
    return;
  }

  onSceneUpdated() {
    return;
  }

  /**
   * Private Functions
   */

  _getNewCoordinate(currentValue, destinationValue, velocity) {
    if (currentValue < destinationValue) {
      return Math.min(currentValue + velocity, destinationValue);
    }
    if (currentValue > destinationValue) {
      return Math.max(currentValue - velocity, destinationValue);
    }
    return currentValue;
  }
}
