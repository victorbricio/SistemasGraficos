
class Poliedros extends THREE.Object3D {
 constructor(gui,titleGui, titleGui2, titleGui3, titleGui4) {
   super();

   this.createGUIC(gui,titleGui);
   this.createGUIS(gui,titleGui2);
   this.createGUIB(gui,titleGui3);
   this.createGUIT(gui,titleGui4);

   // Material
   var material = new THREE.MeshNormalMaterial();


   // Cilindro
   var cylinderGeom = new THREE.CylinderGeometry(1,1,4,3);
   this.cilindro = new THREE.Mesh (cylinderGeom, material);
   this.add (this.cilindro);

   // Esfera
   var sphereGeom = new THREE.SphereGeometry(1, 6, 6);
   this.esfera = new THREE.Mesh (sphereGeom, material);
   this.add (this.esfera);

   this.axis2 = new THREE.AxesHelper (5);
   this.add (this.axis2);

   this.axis2.position.x += 6;
   this.axis2.position.y += 6;

   this.axis2.add(this.esfera);


   // Cubo
   var geometryBox = new THREE.BoxGeometry( 1, 1, 1 );
   this.cubo = new THREE.Mesh (geometryBox, material);
   this.add (this.cubo);

   this.axis3 = new THREE.AxesHelper (5);
   this.add (this.axis3);

   this.axis3.position.x -= 6;
   this.axis3.position.y -= 6;

   this.axis3.add(this.cubo);

   // Toro
   var geometryToro = new THREE.TorusGeometry(2, 1, 3, 4);
   this.toro = new THREE.Mesh (geometryToro, material);
   this.add (this.toro);

   this.axis4 = new THREE.AxesHelper (5);
   this.add (this.axis4);

   this.axis4.position.x -= 6;
   this.axis4.position.y += 6;

   this.axis4.add(this.toro);
 }

 createGUIC (gui,titleGui) {
   // Controles para el tamaño, la orientación y la posición de la caja
   this.guiControlsC = new function () {
     this.sizeX = 1.0;
     this.sizeY = 1.0;
     this.sizeZ = 1.0;

     this.rotX = 0.0;
     this.rotY = 0.0;
     this.rotZ = 0.0;

     this.posX = 0.0;
     this.posY = 0.0;
     this.posZ = 0.0;

     this.radiusTop = 1.0;
     this.radiusBottom = 1.0;
     this.height = 4.0;
     this.resolution = 3;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.radiusTop = 1.0;
       this.radiusBottom = 1.0;
       this.height = 4.0;
       this.resolution = 3;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControlsC, 'radiusTop', 1.0, 5.0, 0.2).name ('Radio Superior : ').listen();
   folder.add (this.guiControlsC, 'radiusBottom', 1.0, 5.0, 0.2).name ('Radio Inferior : ').listen();
   folder.add (this.guiControlsC, 'height', 2.0, 12.0, 0.2).name ('Altura : ').listen();
   folder.add (this.guiControlsC, 'resolution', 3, 15, 1).name ('Resolución : ').listen();

   folder.add (this.guiControlsC, 'reset').name ('[ Reset ]');
 }

   createGUIS (gui,titleGui) {
     // Controles para el tamaño, la orientación y la posición de la caja
     this.guiControlsS = new function () {
       this.sizeX = 1.0;
       this.sizeY = 1.0;
       this.sizeZ = 1.0;

       this.rotX = 0.0;
       this.rotY = 0.0;
       this.rotZ = 0.0;

       this.posX = 0.0;
       this.posY = 0.0;
       this.posZ = 0.0;

       this.radius = 1;
       this.widthSegments = 6;
       this.heightSegments = 6;

       // Un botón para dejarlo todo en su posición inicial
       // Cuando se pulse se ejecutará esta función.
       this.reset = function () {
         this.radius = 1;
         this.widthSegments = 6;
         this.heightSegments = 6;
       }
     }

     // Se crea una sección para los controles de la caja
     var folder = gui.addFolder (titleGui);
     // Estas lineas son las que añaden los componentes de la interfaz
     // Las tres cifras indican un valor mínimo, un máximo y el incremento
     // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
     folder.add (this.guiControlsS, 'radius', 0.4, 4.0, 0.2).name ('Radio Superior : ').listen();
     folder.add (this.guiControlsS, 'widthSegments', 3.0, 19.0, 1).name ('Res ecuador : ').listen();
     folder.add (this.guiControlsS, 'heightSegments', 3.0, 19.0, 1).name ('Res meridiano: ').listen();

     folder.add (this.guiControlsS, 'reset').name ('[ Reset ]');
   }

   createGUIB (gui,titleGui) {
     // Controles para el tamaño, la orientación y la posición de la caja
     this.guiControlsB = new function () {
       this.sizeX = 1.0;
       this.sizeY = 1.0;
       this.sizeZ = 1.0;

       this.rotX = 0.0;
       this.rotY = 0.0;
       this.rotZ = 0.0;

       this.posX = 0.0;
       this.posY = 0.0;
       this.posZ = 0.0;

       // Un botón para dejarlo todo en su posición inicial
       // Cuando se pulse se ejecutará esta función.
       this.reset = function () {
         this.sizeX = 1.0;
         this.sizeY = 1.0;
         this.sizeZ = 1.0;
       }
     }

     // Se crea una sección para los controles de la caja
     var folder = gui.addFolder (titleGui);
     // Estas lineas son las que añaden los componentes de la interfaz
     // Las tres cifras indican un valor mínimo, un máximo y el incremento
     // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
     folder.add (this.guiControlsB, 'sizeX', .5, 5, .1).name ('Tamaño en X: ').listen();
     folder.add (this.guiControlsB, 'sizeY', .5, 5, .1).name ('Tamaño en Y: ').listen();
     folder.add (this.guiControlsB, 'sizeZ', .5, 5, .1).name ('Tamaño en Z: ').listen();

     folder.add (this.guiControlsB, 'reset').name ('[ Reset ]');
   }

   createGUIT (gui,titleGui) {
     // Controles para el tamaño, la orientación y la posición de la caja
     this.guiControlsT = new function () {
       this.sizeX = 1.0;
       this.sizeY = 1.0;
       this.sizeZ = 1.0;

       this.rotX = 0.0;
       this.rotY = 0.0;
       this.rotZ = 0.0;

       this.posX = 0.0;
       this.posY = 0.0;
       this.posZ = 0.0;

       this.radius = 2.0;
       this.tube = 1.0;
       this.radialSegments = 3.0;
       this.tubeSegments = 4;

       // Un botón para dejarlo todo en su posición inicial
       // Cuando se pulse se ejecutará esta función.
       this.reset = function () {
         this.radius = 2.0;
         this.tube = 1.0;
         this.radialSegments = 3.0;
         this.tubeSegments = 4;
       }
     }

     // Se crea una sección para los controles de la caja
     var folder = gui.addFolder (titleGui);
     // Estas lineas son las que añaden los componentes de la interfaz
     // Las tres cifras indican un valor mínimo, un máximo y el incremento
     // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
     folder.add (this.guiControlsT, 'radius', 1.0, 5.0, 0.2).name ('Radio Principal : ').listen();
     folder.add (this.guiControlsT, 'tube', 1.0, 4.0, 0.2).name ('Radio Tubo : ').listen();
     folder.add (this.guiControlsT, 'radialSegments', 3, 12.0, 1).name ('Resolución Toro : ').listen();
     folder.add (this.guiControlsT, 'tubeSegments', 3, 12, 1).name ('Resolución Tubo : ').listen();

     folder.add (this.guiControlsT, 'reset').name ('[ Reset ]');
   }

 update () {
   // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
   // Primero, el escalado
   // Segundo, la rotación en Z
   // Después, la rotación en Y
   // Luego, la rotación en X
   // Y por último la traslación

    this.cilindro.geometry = new THREE.CylinderGeometry(
        this.guiControlsC.radiusTop,
        this.guiControlsC.radiusBottom,
        this.guiControlsC.height,
        this.guiControlsC.resolution);

    this.esfera.geometry = new THREE.SphereGeometry(
       this.guiControlsS.radius,
       this.guiControlsS.widthSegments,
       this.guiControlsS.heightSegments);

    this.cubo.geometry = new THREE.BoxGeometry(
      this.guiControlsB.sizeX,
      this.guiControlsB.sizeY,
      this.guiControlsB.sizeZ);

    this.toro.geometry = new THREE.TorusGeometry(
      this.guiControlsT.radius,
      this.guiControlsT.tube,
      this.guiControlsT.radialSegments,
      this.guiControlsT.tubeSegments);


   this.cilindro.rotation.y += .01;
   this.cilindro.rotation.z += .01;

   this.esfera.rotation.y += .01;
   this.esfera.rotation.z += .01;

   this.cubo.rotation.y += .01;
   this.cubo.rotation.z += .01;

   this.toro.rotation.y += .01;
   this.toro.rotation.z += .01;
 }
}
