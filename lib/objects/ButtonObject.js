'use strict';

class ButtonObject extends AbstractObject {

  constructor(x, y, width, height, label, font, labelColor, bodyColor) {
    super(x, y);
    this._label = label;
    this._width = width;
    this._height = height;
    this._font = font;
    this._labelColor = labelColor;
    this._bodyColor = bodyColor;
    this._clickHandler = null;
  }

  /**
   * Public Functions
   */
  setClickHandler(handler) {
    this._clickHandler = handler;
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    const context = this.scene.context;
    context.fillStyle = this._bodyColor;
    context.fillRect(
      this.x - this._width / 2,
      this.y - this._height / 2,
      this._width,
      this._height
    );
    context.font = this._font;
    context.fillStyle = this._labelColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this._label, this.x, this.y);
  }

  isCoveringPosition(x, y) {
    return Math.abs(this.x - x) <= this._width / 2 &&
      Math.abs(this.y - y) <= this._height / 2;
  }

  onClick(x, y) {
    this._clickHandler && this._clickHandler(x, y);
  }
}
