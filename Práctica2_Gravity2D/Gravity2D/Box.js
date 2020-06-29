
class Box {
  constructor(scene, tamX, tamY, tamZ, y, z, masa, speed) {
    var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x479E1C, opacity: 0.99, transparent: false }),
            .9, // alta friccion
            .1 // alto rebote
    );

    var geometry = new THREE.BoxGeometry(tamX, tamY, tamZ);
    var box = new Physijs.BoxMesh(geometry, material, masa);
    box.position.set(0, y , z);
    scene.add (box);

    this.box = box;

    // Aportará la velocidad de la caja
    this.speed = speed;

    // La caja debe conocer el sentido de la gravedad para poder actualizarse adecuadamente
    this.gravitySense = 1;
  }

  // Devuelve la posición de la caja
  position(){
    return this.box.position;
  }

  // Cambia la concepción de la gravedad
  changeGravity(){
    this.gravitySense *= -1;
  }

  // Devuelve la caja
  body(){
    return this.box;
  }

  // Devuelve si la caja está en el suelo o en el techo del nivel
  bodyOnGround(){
    var onGround = false;

    if (this.box.position.y <= -.3)
      onGround = true;

    if (this.box.position.y >= 4.3)
      onGround = true;

    return onGround;
  }

  // Actualiza la posición de la caja en función de la gravedad
  update() {
    this.box.setLinearVelocity(new THREE.Vector3 (0, - this.gravitySense * this.speed, 0));
  }
}
