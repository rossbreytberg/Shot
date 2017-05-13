'use strict';

class ScoreObject extends AbstractObject {

  constructor(x, y, goal) {
    super(x, y);
    this._goal = goal;
    this._score = 0;
    this._completionHandlers = [];
  }

  /**
   * Public Functions
   */

   addCompletionHandler(handler) {
     this._completionHandlers.push(handler);
   }

   addScore(extraScore) {
     this._score += extraScore;
   }

  setScore(score) {
    this._score = score;
  }

  /**
   * Protected Functions
   */

  drawWithPosition() {
    if (this._score >= this._goal) {
      this._completionHandlers.forEach(handler => handler());
    }

    const context = this.scene.context;
    context.font = '48px Helvetica, Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(
      'Goal: ' + this._score + '/' + this._goal,
      this.x,
      this.y
    );
  }
}
