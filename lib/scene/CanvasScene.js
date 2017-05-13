'use strict';

class CanvasScene {
  constructor(canvasElement, drawWidth, drawHeight) {
    this.context = canvasElement.getContext('2d');
    this.width = drawWidth || canvasElement.clientWidth;
    this.height = drawHeight || canvasElement.clientHeight;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    this._objectsByLayer = [[]]; // Objects in scene starting with bottom layer.
    canvasElement.addEventListener('click', this._onClick.bind(this));
    this._stop = false;
  }

  /**
   * Public Functions
   */

  addObjectToLayer(object, layer) {
    if (!this._objectsByLayer[layer]) {
      this._objectsByLayer[layer] = [];
    }
    object.setScene(this);
    this._objectsByLayer[layer].push(object);
  }

  addObjectToNewLayer(object) {
    this.addObjectToLayer(object, this._objectsByLayer.length);
  }

  addObjectToTopLayer(object) {
    this.addObjectToLayer(object, this._objectsByLayer.length - 1);
  }

  run() {
    this._draw();
  }

  stop() {
    this._stop = true;
  }

  clear() {
    this._objectsByLayer = [[]];
  }

  /**
   * Private Functions
   */

  _draw() {
    // Clear canvas
    this.context.clearRect(0, 0, this.width, this.height);
    // Draw all objects in new frame, starting with bottom layer and going up
    this._objectsByLayer.forEach(
      layer => layer.forEach(object => object.draw())
    );
    if (this._stop) {
      this._stop = false;
      return;
    }
    requestAnimationFrame(this._draw.bind(this));
  }

  _getTopObjectAtPosition(x, y) {
    // Iterate through layers top to bottom
    for (let i = this._objectsByLayer.length - 1; i >= 0; i--) {
      // Iterate through objects in layer in reverse order
      const objects = this._objectsByLayer[i];
      for (let j = objects.length - 1; j >= 0; j--) {
        const object = objects[j];
        if (object.isCoveringPosition(x, y)) {
          return object;
        }
      }
    }
    return null;
  }

  _onClick(event) {
    const x = event.clientX - this.context.canvas.offsetLeft;
    const y = event.clientY - this.context.canvas.offsetTop;
    const clickedObject = this._getTopObjectAtPosition(x, y);
    clickedObject && clickedObject.onClick(x, y);
  }
}
