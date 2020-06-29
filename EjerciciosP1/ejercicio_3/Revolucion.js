
class Revolucion extends THREE.Object3D {
 constructor(gui,titleGui) {
   super();

   // Se crea la parte de la interfaz que corresponde a la caja
   // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
   this.createGUI(gui,titleGui);

   this.points = [];

   /*for ( var i = 0; i < 10; i++ ){
	    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ));
    }*/

   this.points.push(new THREE.Vector3 (0, 1, 0));
   this.points.push(new THREE.Vector3 (1, 1, 0));
   this.points.push(new THREE.Vector3 (1, -1, 0));
   this.points.push(new THREE.Vector3 (0, -1, 0));

   var geometry = new THREE.LatheGeometry( this.points );
   var material = new THREE.MeshPhongMaterial({color: 0xCF0000});
   this.latheObject = new THREE.Mesh(geometry, material);

   this.latheObject2 = new THREE.Mesh(geometry, material);

   var lineGeometry = new THREE.Geometry();
   lineGeometry.vertices = this.points;
   var line = new THREE.Line(lineGeometry, material);

   this.axis2 = new THREE.AxesHelper (5);
   this.add (this.axis2);

   this.axis2.add(line);

   this.axis2.position.x -= 6;

   this.add(this.latheObject);

   this.axis3 = new THREE.AxesHelper (5);
   this.add (this.axis3);

   this.axis3.position.x += 6;

   this.axis3.add(this.latheObject2);

   // Las geometrías se crean centradas en el origen.
   // Como queremos que el sistema de referencia esté en la base,
   // subimos el Mesh de la caja la mitad de su altura
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

     this.phiStart = 0.0;
     this.phiLenght = 0.1;
     this.segments = 3;

     // Un botón para dejarlo todo en su posición inicial
     // Cuando se pulse se ejecutará esta función.
     this.reset = function () {
       this.phiStart = 0.0;
       this.phiLenght = .1;
       this.segments = 3;
     }
   }

   // Se crea una sección para los controles de la caja
   var folder = gui.addFolder (titleGui);
   // Estas lineas son las que añaden los componentes de la interfaz
   // Las tres cifras indican un valor mínimo, un máximo y el incremento
   // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   folder.add (this.guiControls, 'phiLenght', .1, 2 * Math.PI, 0.1).name ('Ángulo : ').listen();
   folder.add (this.guiControls, 'segments', 3, 12, 1).name ('Resolución : ').listen();

   folder.add (this.guiControls, 'reset').name ('[ Reset ]');
 }

 update () {
   // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
   // Primero, el escalado
   // Segundo, la rotación en Z
   // Después, la rotación en Y
   // Luego, la rotación en X
   // Y por último la traslación

   this.latheObject.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, 0.0, this.guiControls.phiLenght);
   this.latheObject2.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, 0.0, 2 * Math.PI);
 }
}
