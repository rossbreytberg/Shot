'use strict';

class TextObject extends AbstractObject {

  constructor(text, x, y, font, color) {
    super();
    this._text = text;
    this._x = x;
    this._y = y;
    this._font = font;
    this._color = color;
  }

  /**
   * Public Functions
   */

  draw() {
    const context = this.scene.context;
    context.font = this._font;
    context.fillStyle = this._color;
    context.textAlign = 'center';
    context.fillText(this._text, this._x, this._y);
  }
}
