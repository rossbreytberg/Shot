'use strict';

class AbstractObject {
  constructor() {
    if (new.target === AbstractObject) {
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
