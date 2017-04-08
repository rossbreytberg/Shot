'use strict';

class GameLevel {
  constructor() {
    if (new.target === GameLevel) {
      throw Error('Instantiating abstract class ' + this.constructor.name);
    }
    this._completionHandlers = [];
    this._complete = false;
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
  }

  addCompletionHandler(handler) {
    this._completionHandlers.push(handler);
  }

  /**
   * Protected Functions
   */

   addObjectsToScene() {
     throw Error('Must implement addObjectsToScene() method');
   }

  complete() {
    if (this._complete) {
      return;
    }
    this.scene.stop();
    this.timer.stop();
    this._completionHandlers.forEach(handler => handler());
    this._complete = true;
  }

  getBackgroundObject() {
    return new BackgroundObject();
  }

  getCursorObject() {
    return new CursorObject();
  }

  getScoreGoal() {
    throw Error('Must implement getScoreGoal() method');
  }

  getScoreObject() {
    if (!this.score) {
      this.score = new ScoreObject(this.getScoreGoal());
      this.score.addCompletionHandler(this.complete.bind(this));
    }
    return this.score;
  }

  getTimeLimitInSec() {
    throw Error('Must implement getTimeLimitInSec() method');
  }

  getTimerObject() {
    if (!this.timer) {
      this.timer = new TimerObject(this.getTimeLimitInSec());
      this.timer.addCompletionHandler(this.complete.bind(this));
    }
    return this.timer;
  }
}
