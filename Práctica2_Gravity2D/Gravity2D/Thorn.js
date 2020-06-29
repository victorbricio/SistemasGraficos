
class Thorn {
  constructor(scene, radT, radB, h, y, z) {
    var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0xE96624, opacity: 0.99, transparent: false }),
            .9, // alta friccion
            .9 // alto rebote
    );

    var geometry = new THREE.CylinderGeometry(radT, radB, h, 32);
    var thorn = new Physijs.ConeMesh(geometry, material, 0);
    thorn.position.set(0, y, z);
    scene.add (thorn);

    this.thorn = thorn;

  }

  // Devuelve la posición de la espina
  position(){
    return this.thorn.position;
  }

  // Devuelve la espina
  body(){
    return this.thorn;
  }

  update() {

  }
}
