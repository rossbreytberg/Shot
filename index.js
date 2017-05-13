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

  // Function to start the game
  const showStartMenuFunc =
    () => showStartMenu(scene, () => levels[0].run(scene));

  // Show red screen on failure
  for (let i = 0; i < levels.length; i++) {
    levels[i].addFailureHandler(
      () => showGameOverMenu(scene, showStartMenuFunc)
    );
  }
  // Show green screen on game completion
  levels[levels.length - 1].addCompletionHandler(
    () => showGameWonMenu(scene, showStartMenuFunc)
  );

  // Start running the first level
  showStartMenuFunc();
};

function showStartMenu(scene, startButtonClickHandler) {
  scene.addObjectToTopLayer(new BackgroundObject('black'));
  scene.addObjectToNewLayer(new TextObject(
    scene.width / 2,
    scene.height / 2 - 200,
    'SHOT',
    '128px Helvetica, Arial',
    'white'
  ));
  const startButton = new ButtonObject(
    scene.width / 2,
    scene.height / 2,
    210,
    90,
    'Start',
    '64px Helvetica, Arial',
    'white',
    'orange'
  );
  startButton.setClickHandler(startButtonClickHandler);
  scene.addObjectToTopLayer(startButton);
  scene.addObjectToNewLayer(new CursorObject());
}

function showGameOverMenu(scene, restartButtonClickHandler) {
  scene.addObjectToTopLayer(new BackgroundObject('red'));
  scene.addObjectToNewLayer(new TextObject(
    scene.width / 2,
    scene.height / 2,
    'Game Over',
    '128px Helvetica, Arial',
    'white'
  ));
  const restartButton = new ButtonObject(
    scene.width / 2,
    scene.height / 2 + 200,
    350,
    90,
    'Try again?',
    '64px Helvetica, Arial',
    'white',
    'orange'
  );
  restartButton.setClickHandler(restartButtonClickHandler);
  scene.addObjectToTopLayer(restartButton);
  scene.addObjectToNewLayer(new CursorObject());
}

function showGameWonMenu(scene, restartButtonClickHandler) {
  scene.addObjectToTopLayer(new BackgroundObject('green'));
  scene.addObjectToNewLayer(new TextObject(
    scene.width / 2,
    scene.height / 2,
    'Winner',
    '128px Helvetica, Arial',
    'white'
  ));
  const restartButton = new ButtonObject(
    scene.width / 2,
    scene.height / 2 + 200,
    350,
    90,
    'Try again?',
    '64px Helvetica, Arial',
    'white',
    'orange'
  );
  restartButton.setClickHandler(restartButtonClickHandler);
  scene.addObjectToTopLayer(restartButton);
  scene.addObjectToNewLayer(new CursorObject());
}
