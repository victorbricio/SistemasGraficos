
class Cilindro extends THREE.Object3D {
 constructor(gui,titleGui) {
   super();

   // Se crea la parte de la interfaz que corresponde a la caja
   // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
   this.createGUI(gui,titleGui);

   //this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
   //var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (5,0.4,1), this.material);


   var verde = new THREE.MeshPhongMaterial({color: 0x00CF00});
   var azul = new THREE.MeshPhongMaterial({color: 0x0000CF});
   this.radio = 10;

   this.sphereGeom = new THREE.SphereGeometry(1, 12, 12);

   for (var i = 0; i < 12; i++){
     this.nuevaEsfera(verde, i);
   }

   this.esferaMovil = this.nuevaEsfera(azul, 0);
   this.esferaMovil.position.set(1 / 3 * this.radio, 0, 1 / 3 * this.radio);

   this.pivote = new THREE.Object3D();

   this.pivote.add(this.esferaMovil);

   this.add(this.pivote);
 }

 nuevaEsfera(color, n){
   var esfera = new THREE.Mesh (this.sphereGeom, color);
   esfera.position.set(this.radio * Math.cos(2 * 3.14159 / 12 * n), 0, this.radio * Math.sin(2 * 3.14159 / 12 * n));

   this.add(esfera);

   return esfera;
 }

 createGUI (gui,titleGui) {
   // Controles para el tamaño, la orientación y la posición de la caja
   this.guiControls = new function () {
     this.velocidad = 1.0;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.velocidad = 1.0;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name ('Velocidad: ').listen();

   folder.add (this.guiControls, 'reset').name ('[ Reset ]');
 }

 update () {
   // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
   // Primero, el escalado
   // Segundo, la rotación en Z
   // Después, la rotación en Y
   // Luego, la rotación en X
   // Y por último la traslación

   this.unidadVelocidad = 0.02;

   this.pivote.rotation.y += this.guiControls.velocidad * this.unidadVelocidad;

 }
}
