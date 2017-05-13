'use strict';

class TextObject extends AbstractObject {

  constructor(x, y, text, font, color) {
    super(x, y);
    this._text = text;
    this._font = font;
    this._color = color;
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    const context = this.scene.context;
    context.font = this._font;
    context.fillStyle = this._color;
    context.textAlign = 'center';
    context.fillText(this._text, this.x, this.y);
  }
}
