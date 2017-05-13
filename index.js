'use strict';

window.onload = () => {
  const scene = new CanvasScene(document.getElementById('canvas'));
  scene.run();
  // Create levels
  const levels = [];
  for (let i = 0; i < 20; i++) {
    levels.push(new SimpleGameLevel(i + 1));
  }
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
