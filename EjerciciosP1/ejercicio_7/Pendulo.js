
class Cilindro extends THREE.Object3D {
 constructor(gui,titleGui, gui2,titleGui2) {
   super();

   // Se crea la parte de la interfaz que corresponde a la caja
   // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
   this.createGUIG(gui,titleGui);
   this.createGUIP(gui2,titleGui2);

   //this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
   //var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (5,0.4,1), this.material);


   var verde = new THREE.MeshPhongMaterial({color: 0x00CF00});
   var rojo = new THREE.MeshPhongMaterial({color: 0xCF0000});
   var gris = new THREE.MeshPhongMaterial({color: 0x888888});
   var azul = new THREE.MeshPhongMaterial({color: 0x0000CF});
   var grisOscuro = new THREE.MeshPhongMaterial({color: 0x444444});

   ///
   ////
   ///// Crear el Péndulo grnde
   ////
   ///

   this.x = 2;
   this.hSolapa = 4;
   this.hPenduloGrande = 5;
   this.hPenduloPequenyo = 10;
   this.z = .4;

   var cylinderGeom = new THREE.CylinderGeometry(.5,.5,1,10);
   this.cilindroG = new THREE.Mesh (cylinderGeom, gris);
   this.cilindroG.rotation.x = 1.5;
   this.cilindroG.position.set(0,2,0);


   var solapaUpGeometry = new THREE.BoxGeometry (this.x,this.hSolapa,this.z);
   var solapaDownGeometry = new THREE.BoxGeometry (this.x,this.hSolapa,this.z);
   var penduloGrandeGeometry = new THREE.BoxGeometry (this.x,this.hPenduloGrande,this.z);

   this.pivoteG = new THREE.Object3D();

   this.solapaUp = new THREE.Mesh (solapaUpGeometry, verde);

   this.solapaUp.position.set(0, this.hSolapa / 2 + this.hPenduloGrande / 2 - 4.5, 0);

   this.penduloGrande = new THREE.Mesh (penduloGrandeGeometry, rojo);
   this.penduloGrande.position.set(0, - this.hPenduloGrande * this.guiControlsG.heightG / 10 - 2, 0);
   this.penduloGrande.scale.y = this.guiControlsG.heightG / 5;

   this.solapaDown = new THREE.Mesh (solapaDownGeometry, verde);

   this.solapaDown.position.set(0, - this.hPenduloGrande * this.guiControlsG.heightG / 5 - 4, 0);

   this.pivoteG.rotation.z = this.guiControlsG.giroG;

   this.pivoteG.position.set(0, 2, 0);

   this.pivoteG.add(this.solapaUp);
   this.pivoteG.add(this.penduloGrande);
   this.pivoteG.add(this.solapaDown);

   this.add(this.pivoteG);
   this.add(this.cilindroG);

   ///
   ////
   ///// Creado el Péndulo grande, creamos el pequeño
   ////
   ///

   this.yPivoteP = 3;

   var cylinderGeomP = new THREE.CylinderGeometry(.25,.25,1,10);
   this.cilindroP = new THREE.Mesh (cylinderGeomP, grisOscuro);
   this.cilindroP.rotation.x = 1.5;

   this.pivoteP = new THREE.Object3D();

   var penduloPequenyoGeometry = new THREE.BoxGeometry (this.x * 2 / 3,this.hPenduloPequenyo,this.z * 2 / 3);
   this.penduloPequenyo = new THREE.Mesh (penduloPequenyoGeometry, azul);
   this.penduloPequenyo.position.set(0, -this.hPenduloPequenyo * this.guiControlsP.heightP / 20 - 2 + this.yPivoteP, 0.3);
   this.penduloPequenyo.scale.y = this.guiControlsP.heightP / 10;

   this.pivoteP.rotation.z = this.guiControlsP.giroP;

   this.pivoteP.position.set(0, - this.yPivoteP - this.guiControlsP.pos / 100 * this.hPenduloGrande * this.guiControlsG.heightG / 5 + 1, 0);

   this.pivoteP.add(this.cilindroP);
   this.pivoteP.add(this.penduloPequenyo);
   this.pivoteG.add(this.pivoteP);

 }

 createGUIG (gui,titleGui) {
   // Controles para el tamaño, la orientación y la posición de la caja
   this.guiControlsG = new function () {
     this.heightG = 5.0;
     this.giroG = 0.0;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.heightG = 5.0;
       this.giroG = 0.0;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControlsG, 'heightG', 5.0, 10.0, 0.1).name ('Longitud Grande: ').listen();
   folder.add (this.guiControlsG, 'giroG', -0.75, 0.75, 0.1).name ('Giro Grande: ').listen();

   folder.add (this.guiControlsG, 'reset').name ('[ Reset ]');
 }

 createGUIP (gui,titleGui) {
   // Controles para el tamaño, la orientación y la posición de la caja
   this.guiControlsP = new function () {
     this.heightP = 10.0;
     this.giroP = 0.0;
     this.pos = 10.0;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.heightP = 10.0;
       this.giroP = 0.0;
       this.pos = 10.0;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControlsP, 'heightP', 10.0, 20.0, 0.1).name ('Longitud Pequeña: ').listen();
   folder.add (this.guiControlsP, 'giroP', -0.75, 0.75, 0.1).name ('Giro Pequeño: ').listen();
   folder.add (this.guiControlsP, 'pos', 10.0, 90.0, 1.0).name ('Posición (%): ').listen();

   folder.add (this.guiControlsP, 'reset').name ('[ Reset ]');
 }

 update () {
   // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
   // Primero, el escalado
   // Segundo, la rotación en Z
   // Después, la rotación en Y
   // Luego, la rotación en X
   // Y por último la traslación

   //
   /// Cilindro Grande
   //

   this.solapaUp.position.set(0, this.hSolapa / 2 + this.hPenduloGrande / 2 - 4.5, 0);

   this.penduloGrande.position.set(0, - this.hPenduloGrande * this.guiControlsG.heightG / 10 - 2, 0);
   this.penduloGrande.scale.y = this.guiControlsG.heightG / 5;

   this.solapaDown.position.set(0, - this.hPenduloGrande * this.guiControlsG.heightG / 5 - 4, 0);

   this.pivoteG.rotation.z = this.guiControlsG.giroG;

   //
   ///Cilindro Pequeño
   //

   this.penduloPequenyo.position.set(0, -this.hPenduloPequenyo * this.guiControlsP.heightP / 20 - 2 + this.yPivoteP, 0.3);
   this.penduloPequenyo.scale.y = this.guiControlsP.heightP /10;

   this.pivoteP.rotation.z = this.guiControlsP.giroP;

   this.pivoteP.position.set(0, - this.yPivoteP - this.guiControlsP.pos / 100 * this.hPenduloGrande * this.guiControlsG.heightG / 5 + 1, 0);
 }
}
