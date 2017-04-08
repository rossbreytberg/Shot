'use strict';

class Level1 extends GameLevel {

  /**
   * Protected Functions
   */

  addObjectsToScene() {
    this.scene.addObjectToNewLayer(this._getTargetObject());
  }

  getScoreGoal() {
    return 50;
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
      100,
      30
    );
    target.setHitHandler(type => {
      if (type === 'center') {
        this.getScoreObject().addScore(10);
        this.getTimerObject().addTimeInSec(3);
      } else {
        this.getScoreObject().addScore(5);
      }
    });
    return target;
  }
}
