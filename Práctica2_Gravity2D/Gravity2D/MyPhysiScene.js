
// En este archivo se comenta principalmente lo relacionado con el  Coche
// Para el resto de comentarios mirar el otro ejemplo de física

class MyPhysiScene extends Physijs.Scene {
  constructor (myCanvas) {
    // El gestor de hebras
    Physijs.scripts.worker = './physijs/physijs_worker.js'
    // El motor de física de bajo nivel, en el cual se apoya Physijs
    Physijs.scripts.ammo   = './ammo.js'

    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    this.createGround ();

    // Controla el sentido de la gravedad
    this.gravityDown = 1;

    // Controla que nos podamos moder si estamos en horizontal
    this.altura = 0;

    // Personaje principal
    this.sphere = new Body(this, 0, 0, 5);

    // Enemigos a esquivar
    this.thorn1 = new Thorn(this, 0.05, 0.4, 0.75, -1.5, 10);
    this.thorn2 = new Thorn(this, 1, 0.1, 2, 4, 15);
    this.thorn3 = new Thorn(this, 0.1, 1, 2, -.5, 15);
    this.thorn4 = new Thorn(this, 0.1, .6, 2, -.5, -10);

    this.dieObjects = [];

    this.dieObjects.push(this.thorn1.body());
    this.dieObjects.push(this.thorn2.body());
    this.dieObjects.push(this.thorn3.body());
    this.dieObjects.push(this.thorn4.body());

    // Elementos que son afectados por la gravedad
    this.box1 = new Box(this, 3, 1, 3, -1.5, 5, 2, 2);
    this.box2 = new Box(this, 3, 1, 3, -1.5, -17, 4, 1.5);

    // Elementos que no son afectados por la gravedad
    this.wall1 = new Wall(this, 2, 1.75, 1.75, -1, -7.5);
    this.wall2 = new Wall(this, 3, 3, 3, 4, -3);

    this.onGroundObjects = [];

    this.onGroundObjects.push(this.box1.body());
    this.onGroundObjects.push(this.box2.body());
    this.onGroundObjects.push(this.wall1.body());
    this.onGroundObjects.push(this.wall2.body());

    this.onGroundObjects.push(this.groundAbajo);
    this.onGroundObjects.push(this.groundArriba);

    // Elementos que puntúan
    this.star1 = new Star(this, 5, 5);
    this.star2 = new Star(this, -1, 12.5);
    this.star3 = new Star(this, -1, -12.5);
    this.star4 = new Star(this, 5, -15);

    this.stars = [];

    this.stars.push(this.star1);
    this.stars.push(this.star2);
    this.stars.push(this.star3);
    this.stars.push(this.star4);

    this.collectableObjects = [];

    this.collectableObjects.push(this.star1.body());
    this.collectableObjects.push(this.star2.body());
    this.collectableObjects.push(this.star3.body());
    this.collectableObjects.push(this.star4.body());


    //https://github.com/jeromeetienne/threex.colliders

    // Colliders de reinicio del nivel
    this.colliders = [];
    this.colliderSystem = new THREEx.ColliderSystem();

    // Colliders para detectar el suelo
    this.collidersOnGround = [];
    this.colliderSystemOnGround = new THREEx.ColliderSystem();

    // Variable que controlará si el personaje principal está moviéndose sobre un elemento que no sea el suelo o el techo
    this.onGround = false;

    // Colliders de los puntuables
    this.collidersCollectable = [];
    this.colliderSystemCollectable = new THREEx.ColliderSystem();
    this.points = 0;

    // Funciones que hacen que funcionen estos colliders
    this.makeDieColliders(this.dieObjects);
    this.makeCollidersOnGround(this.onGroundObjects);
    this.makeCollidersCollectable(this.collectableObjects);

    // Se crean y añaden luces a la escena
    this.createLights ();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
  }

  createRenderer (myCanvas) {
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  /// Método que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  onKeyDown (event) {
    var key = event.which || event.keyCode;
    switch (key) {
      case 81 : // La tecla de la  Q
        window.alert("Te puedes mover con los cursores de izquierda y derecha para el movimiento lateral y el cursor de arriba para el salto.\n" +
        "Con el espacio cambias la gravedad.\n" +
        "Cuidado: solo te podrás mover si tu movimiento es horizontal.");
        break;
      case 32 : // La tecla espacio
        // Cuando pulsamos espacio cambia la gravedad
        this.gravityDown *= -1;
        var gravity = new THREE.Vector3(0, -10 * this.gravityDown, 0)
        this.setGravity (gravity);
        this.changeGravity();
        break;
      case 37 : // Cursor a la izquierda
        // Si está en contacto con un "suelo" se podrá mover
        if(this.onGround || this.sphere.bodyOnGround())
          this.sphere.left = true;
        break;
        case 39 : // Cursor a la derecha
          // Si está en contacto con un "suelo" se podrá mover
          if(this.onGround || this.sphere.bodyOnGround())
            this.sphere.right = true;
          break;
        case 38 : // Cursor de arriba
          // Si está en contacto con un "suelo" se podrá mover
          if(this.onGround || this.sphere.bodyOnGround())
            this.sphere.jump = true;
          break;
    }
  }

  // Aplica el cambio de gravedad a los elementos que lo necesitan
  changeGravity(){
    this.sphere.changeGravity();
    this.box1.changeGravity();
    this.box2.changeGravity();
  }

  onKeyUp (event) {
    var key = event.which || event.keyCode;
    switch (key) {
      case 37 : // Cursor a la izquierda
        this.sphere.left = false;
        break;
      case 39 : // Cursor a la derecha
        this.sphere.right = false;
        break;
      case 38 : // Cursor de arriba
        this.sphere.jump = false;
        break;
    }
  }

  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (10, 2, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
  }

  createGround () {
    // https://pixabay.com/es/illustrations/de-fondo-verde-puntos-manchado-348345/

    var geometry0 = new THREE.BoxGeometry (20,0.2,100);
    var texture0 = new THREE.TextureLoader().load('../imgs/verde.jpg');
    var material0 = new THREE.MeshPhongMaterial ({map: texture0});
    var physiMaterial0 = Physijs.createMaterial (material0, 1, 0.1);

    // https://www.pxfuel.com/es/free-photo-euszz

    var geometry1 = new THREE.BoxGeometry (20,0.2,100);
    var texture1 = new THREE.TextureLoader().load('../imgs/azulclaro.jpg');
    var material1 = new THREE.MeshPhongMaterial ({map: texture1});
    var physiMaterial1 = Physijs.createMaterial (material1, 1, 0.1);

    // https://pixabay.com/es/illustrations/azul-de-fondo-degradado-colores-1142743/

    var geometry2 = new THREE.BoxGeometry (0.2,50,100);
    var texture2 = new THREE.TextureLoader().load('../imgs/blue.jpg');
    var material2 = new THREE.MeshPhongMaterial ({map: texture2});
    var physiMaterial2 = Physijs.createMaterial (material2, 1, 0.1);

    var geometry3 = new THREE.BoxGeometry (0.2,10,100);
    var material3 = new THREE.MeshNormalMaterial({opacity:0.05,transparent:true})
    var physiMaterial3 = Physijs.createMaterial (material3, 1, 0.1);

    this.groundAbajo = new Physijs.BoxMesh (geometry0, physiMaterial0, 0);
    this.groundArriba = new Physijs.BoxMesh (geometry1, physiMaterial1, 0);
    this.wallAtras = new Physijs.BoxMesh (geometry2, physiMaterial2, 0);
    this.wallDelante = new Physijs.BoxMesh (geometry3, physiMaterial3, 0);

    this.groundAbajo.position.y = -2;
    this.groundArriba.position.y = 8;
    this.wallAtras.position.x = -1.75;
    this.wallDelante.position.x = 1.75;

    this.groundAbajo.add (this.groundArriba);
    this.add (this.groundAbajo);
    this.add(this.wallAtras);
    this.add(this.wallDelante);
  }

  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }


  // Elabora los colliders que supondrán el reinicio del nivel
  makeDieColliders(dieObjects){
    var that = this;

    for (let i = 0; i < dieObjects.length; i++){
      var collider = new THREEx.Collider.createFromObject3d(dieObjects[i]);
      this.colliders.push(collider);
    }

    var colliderBody = new THREEx.Collider.createFromObject3d(this.sphere.body());

    colliderBody.addEventListener('contactEnter', function (otherCollider) {
      that.sphere.die();
    });

    this.colliders.push(colliderBody);
  }

  // Elabora los colliders que hacen que el personaje esté en un "suelo" por el que moverse, otro del suelo y el techo
  makeCollidersOnGround(onGroundObjects){
    var that = this;
    var ground = false;

    for (let i = 0; i < onGroundObjects.length; i++){
      onGroundObjects[i].geometry.computeBoundingBox();
      var box3 = onGroundObjects[i].geometry.boundingBox.clone();
      var collider = new THREEx.ColliderBox3(onGroundObjects[i], box3);
      this.collidersOnGround.push(collider);
    }

    var colliderBody = new THREEx.Collider.createFromObject3d(this.sphere.body());

    colliderBody.addEventListener('contactEnter', function (otherCollider) {
      if (otherCollider.id > 4 && otherCollider.id < 9)
        that.altura = that.sphere.position().y;
        //console.log("Enter " + otherCollider.id);
    });

    this.collidersOnGround.push(colliderBody);
  }

  // Elabora los colliders para que el personaje pueda recoger puntuables
  makeCollidersCollectable(collectableObjects){
    var that = this;

    for (let i = 0; i < collectableObjects.length; i++){
      var collider = new THREEx.Collider.createFromObject3d(collectableObjects[i]);
      this.collidersCollectable.push(collider);
    }

    var colliderBody = new THREEx.Collider.createFromObject3d(this.sphere.body());

    colliderBody.addEventListener('contactEnter', function (otherCollider) {
      if(otherCollider.id > 11 && otherCollider.id < 16){
        that.stars[otherCollider.id - 12].die();
        that.collidersCollectable.splice(that.collidersCollectable.indexOf(otherCollider), 1);
        that.points += 100;
      }
    });

    this.collidersCollectable.push(colliderBody);
  }

  update () {
    // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
    // La propia función render es la que indica que quiere ejecutarse la proxima vez
    // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
    requestAnimationFrame(() => this.update());


    // Update de los elementos que lo necesitan
    this.sphere.update();
    this.box1.update();
    this.box2.update();

    // Se le pide al motor de física que actualice las figuras según sus leyes
    this.simulate ();

    // Movimiento lateral de la cámara
    var move = this.sphere.position().z;

    this.camera.position.set(10, 2, move);

    /// Colliders
    for (let i = 0; i < this.colliders.length; i++)
      this.colliders[i].update();

    this.colliderSystem.computeAndNotify(this.colliders);

    for (let i = 0; i < this.collidersOnGround.length; i++)
      this.collidersOnGround[i].update();

    this.colliderSystemOnGround.computeAndNotify(this.collidersOnGround);

    // Comprobación de un movimiento horizontal
    if (this.sphere.position().y >= this.altura - 0.03 && this.sphere.position().y <= this.altura + 0.03){
      this.onGround = true;
    }

    else
      this.onGround = false;

    for (let i = 0; i < this.collidersCollectable.length; i++)
      this.collidersCollectable[i].update();

    this.colliderSystemCollectable.computeAndNotify(this.collidersCollectable);

    // Actualización de los puntos del personaje
    document.getElementById("points").innerHTML = this.points;

    if (this.points == 400){
      alert("¡¡Has ganado!!");
      window.location.reload(true);
    }

    // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
    this.renderer.render(this, this.getCamera());
  }
}

MyPhysiScene.PROBBOX=0.5;
MyPhysiScene.BRAKE=0.95; // En cada frame se reduce la velocidad angular de las esferas un 5%

/// La función principal
$(function () {

  // Se crea la escena
  var scene = new MyPhysiScene ("#WebGL-output");

  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Se añaden listeners para el teclado para el control del coche
  window.addEventListener ("keydown", () => scene.onKeyDown(event));
  window.addEventListener ("keyup",   () => scene.onKeyUp(event));

  // Finalmente, realizamos el primer renderizado.
  scene.update();
});
