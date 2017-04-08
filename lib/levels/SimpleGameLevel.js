'use strict';

class SimpleGameLevel extends GameLevel {

  constructor(scoreGoal, timeLimit, targetRadius, targetVelocity) {
    super();
    this._completionHandlers = [];
    this._complete = false;
    this._scoreGoal = scoreGoal;
    this._timeLimit = timeLimit;
    this._targetRadius = targetRadius;
    this._targetVelocity = targetVelocity;
  }

  /**
   * Protected Functions
   */

  addObjectsToScene() {
    this.scene.addObjectToNewLayer(this._getTargetObject());
  }

  getScoreGoal() {
    return this._scoreGoal;
  }

  getTimeLimitInSec() {
    return this._timeLimit;
  }

  /**
   * Private Functions
   */

  _getTargetObject() {
    const target = new TargetObject(
      this.scene.width / 2,
      this.scene.height / 2,
      this._targetRadius,
      this._targetVelocity
    );
    target.setCenterHitHandler(() => {
      this.getScoreObject().addScore(10);
      this.getTimerObject().addTimeInSec(3);
    });
    target.setNonCenterHitHandler(() => {
      this.getScoreObject().addScore(5);
    });
    return target;
  }
}
