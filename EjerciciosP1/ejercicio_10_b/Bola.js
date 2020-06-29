
class Bola extends THREE.Object3D {
 constructor(gui,titleGui) {
   super();

   this.createGUIC(gui,titleGui);

   // Material
   var material = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
   var azul = new THREE.MeshPhongMaterial({color: 0x0000CF});

   this.altura = 8;
   this.resolucion = 20;

   this.arriba = true;
   this.paso = 0.2;

   // Cilindro
   var cylinderGeom = new THREE.CylinderGeometry(1, 1, this.altura, this.resolucion);
   this.cilindro = new THREE.Mesh (cylinderGeom, material);
   this.add (this.cilindro);

   // Esfera
   var sphereGeom = new THREE.SphereGeometry(1, 12, 12);
   this.esfera = new THREE.Mesh (sphereGeom, azul);

   this.pivote = new THREE.Object3D();
   this.pivote.add (this.esfera);
   this.add(this.pivote);


   this.looptime = 4000;

   this.origen = {x: 0};
   var destino = {x: Math.PI * 2};

   var that = this;

   var movimiento = new TWEEN.Tween(this.origen).to(destino, this.looptime).onUpdate(
     function () {
       that.pivote.rotation.y = that.origen.x;
       that.esfera.position.x = .5 + that.guiControlsC.radio;
     }
   ).repeat(Infinity).start();
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

     this.radio = 1.0;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.radio = 1.0;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControlsC, 'radio', 1.0, 10.0, 0.2).name ('Radio: ').listen();

   folder.add (this.guiControlsC, 'reset').name ('[ Reset ]');
 }

 update () {
   TWEEN.update();

    this.cilindro.geometry = new THREE.CylinderGeometry(
        this.guiControlsC.radio,
        this.guiControlsC.radio,
        this.altura,
        this.resolucion);

        if (this.arriba){
          this.pivote.position.y += this.paso;
        }
        else {
          this.pivote.position.y -= this.paso;
        }

        if (this.pivote.position.y >= 4)
          this.arriba = false;

        if (this.pivote.position.y <= -4)
          this.arriba = true;
 }
}
