
class Body {
  constructor(scene, y, z, masa) {
    var body_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x781614, opacity: 0.99, transparent: false }),
            .9, // alta friccion
            .9 // alto rebote
    );

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var sphere = new Physijs.SphereMesh(geometry, body_material, masa);
    sphere.position.set(0, y , z);
    scene.add (sphere);

    this.zeroSpeed = new THREE.Vector3();

    // Aportará la velocidad del personaje
    this.speed = 5;

    this.sphere = sphere;

    // Son los booleanos que permirirán moverse al personaje
    this.left = false;
    this.right = false;
    this.jump = false;

    // El personaje debe conocer el sentido de la gravedad para poder actualizarse adecuadamente
    this.gravitySense = 1;

    // Númereo de frames que tiene el personaje para poder seguir saltando
    this.timeJump = 35;
    this.timeJumpCounter = 0;
  }

  // Devuelve la posición del personaje
  position(){
    return this.sphere.position;
  }

  // Cambia la concepción de la gravedad
  changeGravity(){
    this.gravitySense *= -1;
  }

  // Devuelve si el personaje está en el suelo o en el techo del nivel
  bodyOnGround(){
    var onGround = false;

    if (this.sphere.position.y <= -.3 && this.gravitySense == 1)
      onGround = true;

    if (this.sphere.position.y >= 4.3 && this.gravitySense == -1)
      onGround = true;

    return onGround;
  }

  // Devuelve el personaje
  body(){
    return this.sphere;
  }

  // Reinicia el nivel
  die(){
    alert("¡¡Has perdido!!");
    window.location.reload(true);
  }

  // Actualiza la posición del personaje en función del movimiento que se recibe y de la gravedad actual
  update() {
    var velocidad = this.sphere.getLinearVelocity();
    var atenuacion = 0.95;

    this.sphere.setLinearVelocity(velocidad.multiplyScalar(atenuacion));

    if (this.left){
      this.sphere.setLinearVelocity(new THREE.Vector3 (0, - this.gravitySense, this.speed));
    }

    if (this.right) {
      this.sphere.setLinearVelocity(new THREE.Vector3 (0, - this.gravitySense, - this.speed));
    }

    if (this.right && this.left) {
      this.sphere.setLinearVelocity(this.zeroSpeed);
    }

    // El primero es para saber si debe seguir activo o no.
    if (this.jump){
      this.timeJumpCounter++;

      if (this.timeJumpCounter == this.timeJump){
        this.jump = false;
        this.right = false;
        this.left = false;
      }
    }

    // El segundo es para que, en caso de que siga activo, salte.
    if(this.jump && !this.left && !this.right){
      this.sphere.setLinearVelocity(new THREE.Vector3 (0, this.gravitySense * this.speed, 0));
    }

    if (this.jump && this.left){
      this.sphere.setLinearVelocity(new THREE.Vector3 (0, this.gravitySense * this.speed, this.speed));
    }

    if (this.jump && this.right){
      this.sphere.setLinearVelocity(new THREE.Vector3 (0, this.gravitySense * this.speed, -this.speed));
    }

    if(!this.jump)
      this.timeJumpCounter = 0;
  }
}
