
class Solidos extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var material = new THREE.MeshNormalMaterial();

    //TUERCA

    //Cilindro Grande
    var cylinderGeometryG = new THREE.CylinderGeometry(5, 5, 6, 6);
    var cylinderG = new THREE.Mesh(cylinderGeometryG);

    //Cilindro Pequeño
    var cylinderGeometryP = new THREE.CylinderGeometry(3.5, 3.5, 6, 20);
    var cylinderP = new THREE.Mesh(cylinderGeometryP);

    var cylinderG_BSP = new ThreeBSP(cylinderG);
    var cylinderP_BSP = new ThreeBSP(cylinderP);

    //Resta de los cilindros
    var subtractBSP = cylinderG_BSP.subtract(cylinderP_BSP);

    //Toros
    var torus0Geometry = new THREE.TorusGeometry(3.5, .2, 16, 20);
    var torus0 = new THREE.Mesh(torus0Geometry);
    torus0.rotation.x = Math.PI/2;

    var torus0_BSP = new ThreeBSP(torus0);

    var torus1 = new THREE.Mesh(torus0Geometry);
    torus1.rotation.x = Math.PI/2;
    torus1.position.y += 1;

    var torus1_BSP = new ThreeBSP(torus1);

    var torus2 = new THREE.Mesh(torus0Geometry);
    torus2.rotation.x = Math.PI/2;
    torus2.position.y += 2;

    var torus2_BSP = new ThreeBSP(torus2);

    var torus3 = new THREE.Mesh(torus0Geometry);
    torus3.rotation.x = Math.PI/2;
    torus3.position.y -= 1;

    var torus3_BSP = new ThreeBSP(torus3);

    var torus4 = new THREE.Mesh(torus0Geometry);
    torus4.rotation.x = Math.PI/2;
    torus4.position.y -= 2;

    var torus4_BSP = new ThreeBSP(torus4);

    //Restas de los toros
    var subtractBSP1 = subtractBSP.subtract(torus0_BSP);
    var subtractBSP2 = subtractBSP1.subtract(torus1_BSP);
    var subtractBSP3 = subtractBSP2.subtract(torus2_BSP);
    var subtractBSP4 = subtractBSP3.subtract(torus3_BSP);
    var subtractBSP5 = subtractBSP4.subtract(torus4_BSP);

    this.result = subtractBSP5.toMesh(material);
    this.result.geometry.computeVertexNormals();

    this.add(this.result);

    // TAZA

    //Cilindro Grande
    var cylinderGeometryG2 = new THREE.CylinderGeometry(5, 5, 10, 20);
    var cylinderG2 = new THREE.Mesh(cylinderGeometryG2);

    cylinderG2.position.x = 10;
    cylinderG2.position.z = -10;

    //Cilindro Pequeño
    var cylinderGeometryP2 = new THREE.CylinderGeometry(4.5, 4.5, 10, 20);
    var cylinderP2 = new THREE.Mesh(cylinderGeometryP2);

    cylinderP2.position.x = 10;
    cylinderP2.position.z = -10;

    var cylinderG_BSP2 = new ThreeBSP(cylinderG2);
    var cylinderP_BSP2 = new ThreeBSP(cylinderP2);

    // Asa
    var torusGeometryAsa = new THREE.TorusGeometry(3.5, .5, 16, 20);
    var torusAsa = new THREE.Mesh(torusGeometryAsa);

    torusAsa.position.x = 10;
    torusAsa.position.z = -5;
    torusAsa.rotation.y = Math.PI/2;

    var torusAsa_BSP = new ThreeBSP(torusAsa);

    //Suelo
    var sueloGeometry = new THREE.BoxGeometry( 20, .5, 20);
    var suelo = new THREE.Mesh(sueloGeometry);
    suelo.position.y = -5;
    suelo.position.x = 10;
    suelo.position.z = -10;

    var suelo_BSP = new ThreeBSP(suelo);

    var sueloLimpio = suelo_BSP.intersect(cylinderG_BSP2);

    var tazaRellena = torusAsa_BSP.union(cylinderG_BSP2);

    //Resta de los cilindros
    var tazaVacia = tazaRellena.subtract(cylinderP_BSP2);

    var taza = sueloLimpio.union(tazaVacia);

    this.result2 = taza.toMesh(material);
    this.result2.geometry.computeVertexNormals();

    this.add(this.result2);


    //HERRAMIENTA

    //Cilindro Grande
    var cylinderGeometryGHerramienta = new THREE.CylinderGeometry(5, 5, 2, 4);
    var cylinderGHerramienta = new THREE.Mesh(cylinderGeometryGHerramienta);

    cylinderGHerramienta.position.x = -10;
    cylinderGHerramienta.position.z = 10;

    //Cilindro Pequeño
    var cylinderGeometryPHerramienta = new THREE.CylinderGeometry(3.4, 3.4, 2, 50);
    var cylinderPHerramienta = new THREE.Mesh(cylinderGeometryPHerramienta);

    cylinderPHerramienta.position.x = -10;
    cylinderPHerramienta.position.z = 10;

    var cylinderG_BSP_Herramienta = new ThreeBSP(cylinderGHerramienta);
    var cylinderP_BSP_Herramienta = new ThreeBSP(cylinderPHerramienta);


    // Restar tres cilindros para que quede un cuarto del cilindro grande
    var cylinderGHerramientaResta0 = new THREE.Mesh(cylinderGeometryGHerramienta);

    cylinderGHerramientaResta0.position.x = -15;
    cylinderGHerramientaResta0.position.z = 10;

    var cylinderGHerramientaResta1 = new THREE.Mesh(cylinderGeometryGHerramienta);

    cylinderGHerramientaResta1.position.x = -10;
    cylinderGHerramientaResta1.position.z = 15;

    var cylinderGHerramientaResta2 = new THREE.Mesh(cylinderGeometryGHerramienta);

    cylinderGHerramientaResta2.position.x = -10;
    cylinderGHerramientaResta2.position.z = 5;


    //BSP de los cilindros a restar
    var cylinderG_BSP_Herramienta0 = new ThreeBSP(cylinderGHerramientaResta0);
    var cylinderG_BSP_Herramienta1 = new ThreeBSP(cylinderGHerramientaResta1);
    var cylinderG_BSP_Herramienta2 = new ThreeBSP(cylinderGHerramientaResta2);

    //Resta de los cilindros
    var restarCilindrosHerramienta0 = cylinderG_BSP_Herramienta.subtract(cylinderP_BSP_Herramienta);

    var restarCilindrosHerramienta1 = restarCilindrosHerramienta0.subtract(cylinderG_BSP_Herramienta0);
    var restarCilindrosHerramienta2 = restarCilindrosHerramienta1.subtract(cylinderG_BSP_Herramienta1);
    var restarCilindrosHerramienta3 = restarCilindrosHerramienta2.subtract(cylinderG_BSP_Herramienta2);


    // Hoyos de la cylinderG_BSP_Herramienta
    var cylinderGeometryHoyos0 = new THREE.CylinderGeometry(.25, .25, 2, 20);
    var cylinderHoyos0 = new THREE.Mesh(cylinderGeometryHoyos0);

    cylinderHoyos0.rotation.x = 1.5;
    cylinderHoyos0.rotation.z = .9;
    cylinderHoyos0.position.x = -7.5;
    cylinderHoyos0.position.z = 8.5;

    var cylinderHoyos0_BSP = new ThreeBSP(cylinderHoyos0);


    var cylinderHoyos1 = new THREE.Mesh(cylinderGeometryHoyos0);

    cylinderHoyos1.rotation.x = 1.9;
    cylinderHoyos1.rotation.z = 2.3;
    cylinderHoyos1.position.x = -7;
    cylinderHoyos1.position.z = 12;

    var cylinderHoyos1_BSP = new ThreeBSP(cylinderHoyos1);

    //this.add(cylinderHoyos1);

    var herramientaCasi = restarCilindrosHerramienta3.subtract(cylinderHoyos0_BSP);

    var herramienta = herramientaCasi.subtract(cylinderHoyos1_BSP);

    this.result3 = herramienta.toMesh(material);
    this.result3.geometry.computeVertexNormals();

    this.add(this.result3);

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

      this.animation = 0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;

        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;

        this.animation = 0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'animation', 0, 1, 1).name ('Animación : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    if (this.guiControls.animation == 1){
      this.rotation.z += 0.01;
      this.rotation.y += 0.01;
      }
    }
}
