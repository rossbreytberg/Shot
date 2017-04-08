'use strict';

class GameLevel {
  constructor() {
    if (new.target === GameLevel) {
      throw Error('Instantiating abstract class ' + this.constructor.name);
    }
    this._completionHandlers = [];
    this._failureHandlers = [];
    this._isRunning = false;
  }

  /**
   * Public Functions
   */

  run(scene) {
    this.scene = scene;
    this.scene.clear();
    this.scene.addObjectToTopLayer(this.getBackgroundObject());
    this.scene.addObjectToNewLayer(this.getTimerObject());
    this.scene.addObjectToTopLayer(this.getScoreObject());
    this.addObjectsToScene();
    this.scene.addObjectToNewLayer(this.getCursorObject());
    this.scene.run();
    this._isRunning = true;
  }

  addCompletionHandler(handler) {
    this._completionHandlers.push(handler);
  }

  addFailureHandler(handler) {
    this._failureHandlers.push(handler);
  }

  /**
   * Protected Functions
   */

   addObjectsToScene() {
     throw Error('Must implement addObjectsToScene() method');
   }

  complete() {
    if (!this._isRunning) {
      return;
    }
    this._stop();
    this._completionHandlers.forEach(handler => handler());
  }

  fail() {
    if (!this._isRunning) {
      return;
    }
    this._stop();
    this._failureHandlers.forEach(handler => handler());
  }

  getBackgroundObject() {
    return new BackgroundObject('black');
  }

  getCursorObject() {
    return new CursorObject();
  }

  getScoreGoal() {
    throw Error('Must implement getScoreGoal() method');
  }

  getScoreObject() {
    if (!this._score) {
      this._score = new ScoreObject(this.getScoreGoal());
      this._score.addCompletionHandler(this.complete.bind(this));
    }
    return this._score;
  }

  getTimeLimitInSec() {
    throw Error('Must implement getTimeLimitInSec() method');
  }

  getTimerObject() {
    if (!this._timer) {
      this._timer = new TimerObject(this.getTimeLimitInSec());
      this._timer.addCompletionHandler(this.fail.bind(this));
    }
    return this._timer;
  }

  /**
   * Private Functions
   */
  _stop() {
    if (!this._isRunning) {
      return;
    }
    this.scene.stop();
    this.getTimerObject().stop();
    this._isRunning = false;
  }
}
