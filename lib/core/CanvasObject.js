'use strict';

class CanvasObject {
  constructor() {
    if (new.target === CanvasObject) {
      throw Error('Instantiating abstract class ' + this.constructor.name);
    }
    this._clickHandlers = [];
  }

  /**
   * Public Functions
   */

  draw() {
    throw Error('Must implement draw() method');
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

  onClick(x, y) {
    return;
  }

  onSceneUpdated() {
    return;
  }
}
