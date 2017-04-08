'use strict';

window.onload = () => {
  const scene = new CanvasScene(document.getElementById('canvas'));
  for (let i = 0; i < levels.length - 1; i++) {
    let level = levels[i];
    let nextLevel = levels[i + 1];
    level.addCompletionHandler(() => {
      nextLevel.run(scene);
    });
  }
  levels[0].run(scene);
};

const levels = [
  new Level1(),
  new Level2(),
];
