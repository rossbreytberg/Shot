'use strict';

class TimerObject extends AbstractObject {

  constructor(timeLimitInSec) {
    super();
    this._timeRemainingInSec = timeLimitInSec;
    this._completionHandlers = [];
    this._stopped = false;
  }

  /**
   * Public Functions
   */

   addCompletionHandler(handler) {
     this._completionHandlers.push(handler);
   }

   addTimeInSec(extraTimeInSec) {
     this._timeRemainingInSec += extraTimeInSec;
   }

  draw() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this._timeRemainingInSec--;
        if (this._timeRemainingInSec <= 0 || this._stopped) {
          clearInterval(this.timer);
          this._completionHandlers.forEach(handler => handler());
        }
      }, 1000);
    }
    const context = this.scene.context;
    context.font = '64px Helvetica, Arial';
    context.fillStyle = 'yellow';
    context.textAlign = 'center';
    context.fillText(this._timeRemainingInSec, this.scene.width / 2, 64);
  }

  stop() {
    this._stopped = true;
  }

  setRemainingTimeInSec(remainingTimeInSec) {
    this._timeRemainingInSec = remainingTimeInSec;
  }
}
