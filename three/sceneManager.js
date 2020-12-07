(function () {
  'use strict';

  /**
   * 
   * @param {HTMLElement} container canvas container
   * @param {String} modelPath model path
   * @param {Number} width canvas width
   * @param {Number} height canvas height
   */
  var SceneManager = function (
    container,
    modelPath,
    width,
    height
  ) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.mixer;
    this.slightAlpha = Math.random() * 5;
    this.slightBeta = Math.random() * 3;

    this.init = () => {
      const _self = this;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xbbbbbb);

      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      this.camera.position.set(-200, 50, 250);
      this.camera.lookAt(0, 0, 0);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 200, 0);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(0, 200, 100);
      dirLight.castShadow = true;
      dirLight.shadow.radius = 8;
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      dirLight.shadow.camera.top = 180;
      dirLight.shadow.camera.bottom = -100;
      dirLight.shadow.camera.left = -120;
      dirLight.shadow.camera.right = 120;
      this.scene.add(dirLight);

      // model
      const loader = new THREE.OBJLoader();
      loader.load(modelPath, function (object) {
        object.position.set(0, 0, 0);
        _self.object = object;
        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        _self.scene.add(object);
      });

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      this.renderer.shadowMap.enabled = true;
      // this.renderer.setClearColor(0xff0000, 1);
      // this.renderer.setClearColor(0x000000, 0);

      this.container.appendChild(this.renderer.domElement);

      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.update();

      console.log('initialize scene')
    }

    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }

    this.init();
    this.animate();
  }

  window.SceneManager = SceneManager;
})();