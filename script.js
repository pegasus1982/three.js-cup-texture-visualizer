(function () {
  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  // let scene = new SceneManager(document.getElementById('scene-container'), 'model/cup.obj', 600, 600)
  let scene = new SceneManager(document.getElementById('canvas-container'), 'model/teamugobj.obj', 600, 600)

  var myCanvas = document.getElementById('texture-canvas');
  var ctx = myCanvas.getContext('2d');
  var textureImage = document.getElementById('texture-image');
  var main = new Image;

  textureImage.onload = function () {
    console.log('texture image updated')
    scene.updateTexture(textureImage.src);
  }

  main.onload = function () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.beginPath();
    ctx.rect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.drawImage(main, 0, 550, 1000, 450);
    let color = ctx.getImageData(1, 551, 1, 1).data;
    color = rgbToHex(color[0], color[1], color[2]);
    console.log(color);

    ctx.beginPath();
    ctx.rect(0, 0, 1000, 550);
    ctx.fillStyle = '#' + color;
    ctx.fill();

    textureImage.src = myCanvas.toDataURL();
  };

  document.getElementById('btn-test-with-predefined-image').addEventListener('click', () => {
    console.log('test with predefined image');
    main.src = 'texture/test.jpg'
  })

  const onChange = () => {
    let dataURL = imgEditor.getCanvasDataURL();
    if (dataURL) {
      main.src = dataURL;
    }
  }

  const buttons = [
    'select',
    'shapes',
    'textbox',
    'upload',
    'background',
    'clear'
  ];
  const shapes = [];

  var imgEditor = new ImageEditor(
    '#editor-container',
    buttons,
    shapes, {
      width: 1000,
      height: 450
    }, {
      onChange
    }
  );
  console.log('initialize image editor');
})();