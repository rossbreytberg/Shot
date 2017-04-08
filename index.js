'use strict';

window.onload = () => {
  const scene = new CanvasScene(document.getElementById('canvas'));
  // Transition to next level on completion
  for (let i = 0; i < levels.length - 1; i++) {
    levels[i].addCompletionHandler(() => {
      levels[i + 1].run(scene);
    });
  }
  // Show red screen on failure
  for (let i = 0; i < levels.length; i++) {
    levels[i].addFailureHandler(() => {
      scene.addObjectToTopLayer(new BackgroundObject('red'));
      scene.addObjectToNewLayer(new TextObject(
        'Game Over',
        scene.width / 2,
        scene.height / 2,
        '128px Helvetica, Arial',
        'white'
      ));
      scene.run();
    });
  }
  // Show green screen on game completion
  levels[levels.length - 1].addCompletionHandler(() => {
    scene.addObjectToTopLayer(new BackgroundObject('green'));
    scene.addObjectToNewLayer(new TextObject(
      'Winner',
      scene.width / 2,
      scene.height / 2,
      '128px Helvetica, Arial',
      'white'
    ));
    scene.run();
  });
  // Start running the first level
  levels[0].run(scene);
};

const levels = [
  // scoreGoal, timeLimit, targetRadius, targetVelocity
  new SimpleGameLevel(20, 10, 200, 20),
  new SimpleGameLevel(40, 8, 150, 25),
  new SimpleGameLevel(60, 6, 50, 30),
];
