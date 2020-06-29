
class Star {
  constructor(scene, y, z) {
    var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0xD5F318, opacity: 0.9, transparent: false }),
            .9, // alta friccion
            .1 // alto rebote
    );

    var geometry = new THREE.SphereGeometry(.15, 32, 32);
    var star = new Physijs.SphereMesh(geometry, material, 0);
    star.position.set(0, y, z);
    scene.add (star);

    this.star = star;
    this.scene = scene;

  }

  // Devuelve la posición de la estrella
  position(){
    return this.star.position;
  }

  // Devuelve la estrella
  body(){
    return this.star;
  }

  // Elimina la estrella
  die(){
    this.scene.remove(this.star);
  }

  update() {

  }
}
