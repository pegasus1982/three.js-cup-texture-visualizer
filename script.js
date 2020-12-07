(function () {
  let scene = new SceneManager(document.getElementById('scene-container'), 'model/cup.obj', 600, 600)

  const buttons = [
    'select',
    'shapes',
    // 'draw',
    // 'line',
    // 'path',
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

  var myCanvas = document.getElementById('texture-canvas');
  var ctx = myCanvas.getContext('2d');
  var textureImage = document.getElementById('texture-image');
  var main = new Image;

  textureImage.onload = function () {
    console.log('texture image updated')
    scene.updateTexture(textureImage.src);
  }

  main.onload = function () {
    console.log('draw image');
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.rect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.drawImage(main, 0, 600);

    textureImage.src = myCanvas.toDataURL();
  };

  const onChange = () => {
    let dataURL = imgEditor.getCanvasDataURL();
    if (dataURL) {
      main.src = dataURL;
    }
  }

  var imgEditor = new ImageEditor(
    '#editor-container',
    buttons,
    shapes, {
      width: 900,
      height: 300
    }, {
      onChange
    }
  );
  console.log('initialize image editor');
})();