'use strict';

class SimpleGameLevel extends AbstractGameLevel {

  constructor(levelNumber) {
    super();
    this._levelNumber = levelNumber;
  }

  /**
   * Protected Functions
   */

  addObjectsToScene() {
    this.scene.addObjectToNewLayer(this._getTargetObject());
  }

  getLevelLabelObject(scene) {
    return new TextObject(
      'Level ' + this._levelNumber,
      scene.width / 2,
      scene.height / 2,
      '128px Helvetica, Arial',
      'white'
    );
  }

  getScoreGoal() {
    return 100;
  }

  getTimeLimitInSec() {
    return 10;
  }

  /**
   * Private Functions
   */

  _getTargetObject() {
    const target = new TargetObject(
      this.scene.width / 2,
      this.scene.height / 2,
      100 - this._levelNumber * 3, // radius
      30 + this._levelNumber, // velocity
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
