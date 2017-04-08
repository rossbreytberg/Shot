'use strict';

class Level2 extends GameLevel {

  /**
   * Protected Functions
   */

  addObjectsToScene() {
    this.scene.addObjectToNewLayer(this._getTargetObject());

    for (let n = 0; n < 500; n++) {
      this.scene.addObjectToTopLayer(new ParticleObject(
        Math.random() * this.scene.width,
        Math.random() * this.scene.height,
        Math.random() * 3,
        Math.random() * 20
      ));
    }
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
      90,
      50
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
