
class Barrido extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    /*// Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});

    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    box.position.y = 0.5;*/

    var heartShape = new THREE.Shape();

    heartShape.moveTo(5/5, 5/5);
    heartShape.bezierCurveTo(5/5, 5/5, 4/5, 0, 0, 0);
    heartShape.bezierCurveTo(-6/5, 0, -6/5, 7/5,-6/5, 7/5);
    heartShape.bezierCurveTo(-6/5, 11/5, -3/5, 15.4/5, 5/5, 19/5);
    heartShape.bezierCurveTo(12/5, 15.4/5, 16/5, 11/5, 16/5, 7/5);
    heartShape.bezierCurveTo(16/5, 7/5, 16/5, 0, 10/5, 0);
    heartShape.bezierCurveTo(7/5, 0, 5/5, 5/5, 5/5, 5/5);

    var extrudeSettings = { amount: .5, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );

    this.ab = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );

    this.ab1 = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );

    this.cd = new THREE.Object3D();
    this.cd.position.x = 8;
    this.cd.add(this.ab);

    this.cd1 = new THREE.Object3D();
    this.cd1.position.x = -8;
    this.cd1.add(this.ab1);

    this.e = new THREE.Object3D();
    this.e.add(this.cd);
    this.e.add(this.cd1);

    this.add(this.e);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;

      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;

      this.animation = 1;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;

        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;

        this.animation = 1;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'animation', 0, 1, 1).name ('Animación : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    var beta = 0.01;
    var alpha = 0.05;

    if (this.guiControls.animation == 1)
      this.e.rotation.z += beta;
      this.cd.rotation.z -= beta;
      this.ab.rotation.y += alpha;
      this.cd1.rotation.z -= beta;
      this.ab1.rotation.y += alpha;
  }
}
