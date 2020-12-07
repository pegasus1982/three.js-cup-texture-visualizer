(function () {
  let scene = new SceneManager(document.getElementById('scene-container'), 'model/cup.obj', 600, 600)

  const buttons = [
    'select',
    'shapes',
    'draw',
    'line',
    'path',
    'textbox',
    'upload',
    'background',
    // 'undo',
    // 'redo',
    // 'save',
    // 'download',
    'clear'
  ];

  // define custom shapes
  // if this value is undefined or its length is 0, default shapes will be used
  const shapes = [];

  var imgEditor = new ImageEditor('#editor-container', buttons, shapes);
  console.log('initialize image editor');
})();