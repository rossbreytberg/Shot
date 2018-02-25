'use strict';

class AbstractGameLevel {
  constructor() {
    if (new.target === AbstractGameLevel) {
      throw Error('Instantiating abstract class ' + this.constructor.name);
    }
    this._shotSound = new Audio('sounds/shot.mp3');
    this._startSound = new Audio('sounds/reload.mp3');
    this._completionHandlers = [];
    this._failureHandlers = [];
    this._clickHandler = null;
    this._isRunning = false;
  }

  /**
   * Public Functions
   */

  run(scene) {
    this.scene = scene;
    this.scene.clear();
    this.scene.addObjectToTopLayer(this.getBackgroundObject());
    this.scene.addObjectToTopLayer(this.getLevelLabelObject(this.scene));
    setTimeout(() => {
      this.scene.clear();
      this.scene.addObjectToTopLayer(this.getBackgroundObject());
      this.addObjectsToScene();
      this.scene.addObjectToNewLayer(this.getTimerObject());
      this.scene.addObjectToTopLayer(this.getScoreObject());
      this.scene.addObjectToNewLayer(this.getCursorObject());
      this._isRunning = true;
    }, 1000);
    this._clickHandler = this.scene.context.canvas.addEventListener(
      'mousedown',
      event => {
        this.playShotSound();
      },
    );
    this.playStartSound();
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

  getLevelLabelObject() {
    throw Error('Must implement getLevelLabel() method');
  }

  getCursorObject() {
    return new CursorObject();
  }

  getScoreGoal() {
    throw Error('Must implement getScoreGoal() method');
  }

  getScoreObject() {
    if (!this._score) {
      this._score = new ScoreObject(
        this.scene.width / 2,
        64,
        this.getScoreGoal()
      );
      this._score.addCompletionHandler(this.complete.bind(this));
    }
    return this._score;
  }

  getTimeLimitInSec() {
    throw Error('Must implement getTimeLimitInSec() method');
  }

  getTimerObject() {
    if (!this._timer) {
      this._timer = new TimerObject(
        this.scene.width / 2,
        110,
        this.getTimeLimitInSec()
      );
      this._timer.addCompletionHandler(this.fail.bind(this));
    }
    return this._timer;
  }

  playShotSound() {
    this._shotSound.pause();
    this._shotSound.currentTime = 0;
    this._shotSound.play();
  }

  playStartSound() {
    this._startSound.pause();
    this._startSound.currentTime = 0;
    this._startSound.play();
  }

  /**
   * Private Functions
   */
  _stop() {
    if (!this._isRunning) {
      return;
    }
    this.scene.context.canvas.removeEventListener('click', this._clickHandler);
    this.scene.clear();
    this.getTimerObject().stop();
    this._timer = null;
    this._score = null;
    this._isRunning = false;
  }
}
