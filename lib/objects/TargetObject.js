'use strict';

class TargetObject extends AbstractObject {

  constructor(x, y, radius, velocity) {
    super(x, y);
    this._radius = radius;
    this._velocity = velocity;
    this._defaultColor = 'red';
    this._color = this._defaultColor;
    this._hitAnimationDuration = 45;
    this._onDrawFlashingHandler = null;
    this._onDrawBulletHoleHandler = null;
    this._centerHitHandler = null;
    this._nonCenterHitHandler = null;
    this._centerHitSound = new Audio('sounds/ding.wav');
    this._nonCenterHitSound = new Audio('sounds/hit.mp3');
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    this._drawCircle(this.x, this.y, this._radius, this._color);
    this._drawCircle(this.x, this.y, this._radius * 2 / 3, 'white');
    this._drawCircle(this.x, this.y, this._radius / 3, this._color);
    this._onDrawFlashingHandler && this._onDrawFlashingHandler();
    this._onDrawBulletHoleHandler && this._onDrawBulletHoleHandler();
  }

  getVelocity() {
    return this._velocity;
  }

  isCoveringPosition(x, y) {
    return this._getDistance(this.x, this.y, x, y) < this._radius;
  }

  onClick(x, y) {
    if (this._getDistance(this.x, this.y, x, y) < this._radius / 3) {
      this._playCenterHitSound();
      this._animateFlashing('gold', this._hitAnimationDuration);
      this._centerHitHandler();
    } else {
      this._playNonCenterHitSound();
      this._animateFlashing('pink', this._hitAnimationDuration);
      this._nonCenterHitHandler();
    }
    this._animateBulletHole(x, y, this._hitAnimationDuration);
    this._moveToRandomPosition();
  }

  setCenterHitHandler(handler) {
    this._centerHitHandler = handler;
  }

  setNonCenterHitHandler(handler) {
    this._nonCenterHitHandler = handler;
  }

  /**
   * Private Functions
   */

  _animateBulletHole(x, y, duration) {
    const xOffset = x - this.x;
    const yOffset = y - this.y;
    let frameCount = 0;
    this._onDrawBulletHoleHandler = () => {
      if (frameCount > duration) {
        this._onDrawBulletHoleHandler = null;
        return;
      }
      this._drawCircle(
        this.x + xOffset,
        this.y + yOffset,
        4,
        'rgba(0, 0, 0, ' + (1 - frameCount / duration) + ')'
      );
      frameCount++;
    };
  }

  _animateFlashing(color, duration) {
    let frameCount = 0;
    this._onDrawFlashingHandler = () => {
      if (frameCount > duration) {
        this._hitAnimationHandler = null;
        return;
      }
      if (frameCount >= 0 && frameCount <= duration * (1/6) ||
          frameCount >= duration * (2/6) && frameCount <= duration * (3/6) ||
          frameCount >= duration * (4/6) && frameCount <= duration * (5/6)) {
        this._color = color;
      } else {
        this._color = this._defaultColor;
      }
      frameCount++;
    };
  }

  _drawCircle(x, y, radius, color) {
    const context = this.scene.context;
    context.beginPath();
    context.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.fill();
    context.stroke();
  }

  _getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  _moveToRandomPosition() {
    this.moveTo(
      Math.random() * (this.scene.width - 1 - this._radius * 2) + this._radius,
      Math.random() * (this.scene.height - 1 - this._radius * 2) + this._radius
    );
  }

  _playCenterHitSound() {
    this._centerHitSound.pause();
    this._centerHitSound.currentTime = 0;
    this._centerHitSound.play();
  }

  _playNonCenterHitSound() {
    this._nonCenterHitSound.pause()
    this._nonCenterHitSound.currentTime = 0;
    this._nonCenterHitSound.play();
  }
}
