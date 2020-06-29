
class Wall {
  constructor(scene, tamX, tamY, tamZ, y, z) {
    var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x190631, opacity: 0.99, transparent: false }),
            .9, // alta friccion
            .1 // alto rebote
    );

    var geometry = new THREE.BoxGeometry(tamX, tamY, tamZ);
    var wall = new Physijs.BoxMesh(geometry, material, 0);
    wall.position.set(0, y , z);
    scene.add (wall);

    this.wall = wall;

  }

  // Devuelve la posición del muro
  position(){
    return this.wall.position;
  }

  // Devuelve el muro
  body(){
    return this.wall;
  }

  update() {
  }

}
