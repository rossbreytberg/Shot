'use strict';

class ScoreObject extends CanvasObject {

  constructor(goal) {
    super();
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

  draw() {
    if (this._score >= this._goal) {
      this._completionHandlers.forEach(handler => handler());
    }

    const context = this.scene.context;
    context.font = '64px Helvetica, Arial';
    context.fillStyle = 'yellow';
    context.textAlign = 'center';
    context.fillText(this._score + '/' + this._goal, this.scene.width / 2, 128);
  }

  setScore(score) {
    this._score = score;
  }
}
