
class Cilindro extends THREE.Object3D {
 constructor(gui,titleGui) {
   super();

   // Se crea la parte de la interfaz que corresponde a la caja
   // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

   //this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
   //var cajaBase = new THREE.Mesh (new THREE.BoxGeometry (5,0.4,1), this.material);

   // Tierra
   var tierraGeom = new THREE.SphereGeometry(2, 12, 12);

   var textureTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
   var materialTierra = new THREE.MeshPhongMaterial ({map: textureTierra});

   this.tierra = new THREE.Mesh (tierraGeom, materialTierra);

   this.add(this.tierra);


   // Luna 1
   var lunaGeom = new THREE.SphereGeometry(1, 12, 12);

   var textureLuna = new THREE.TextureLoader().load('../imgs/cara.jpg');
   var materialLuna = new THREE.MeshPhongMaterial ({map: textureLuna});

   this.luna1 = new THREE.Mesh (lunaGeom, materialLuna);

   this.luna1.position.x = 5;
   this.luna1.rotation.y = 3;
   this.tierra.add(this.luna1);


   // Luna 2
   this.luna2 = new THREE.Mesh (lunaGeom, materialLuna);

   this.luna2.position.x = 8.5;
   this.luna2.rotation.y = 5.5;
   this.tierra.add(this.luna2);

   // Luna 3
   this.luna3 = new THREE.Mesh (lunaGeom, materialLuna);

   this.luna3.position.x = 12;
   this.tierra.add(this.luna3);

 }

 update () {
   // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
   // Primero, el escalado
   // Segundo, la rotación en Z
   // Después, la rotación en Y
   // Luego, la rotación en X
   // Y por último la traslación

   this.tierra.rotation.y += 0.01;

   this.luna2.rotation.y -= 0.01;

   this.luna3.rotation.y -= 0.02;

 }
}
