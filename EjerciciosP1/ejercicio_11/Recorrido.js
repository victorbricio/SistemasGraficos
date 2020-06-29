
class Recorrido extends THREE.Object3D {
 constructor() {
   super();

   // Creación del cilindro
   var cylinderGeom = new THREE.CylinderGeometry(.2,1,2,4);

   var materialC = new THREE.MeshNormalMaterial();

   this.cilindro = new THREE.Mesh (cylinderGeom, materialC);
   this.add (this.cilindro);


   // Creación del spline hacia arriba
   this.splineArriba = new THREE.CatmullRomCurve3([
     new THREE.Vector3 (5 * Math.sin( 1 ), 0, 5 * Math.cos( 1 )),
     new THREE.Vector3 (6 * Math.sin( 2 ), 2, 6 * Math.cos( 2 )),
     new THREE.Vector3 (7 * Math.sin( 3 ), 3, 7 * Math.cos( 3 )),
     new THREE.Vector3 (10 * Math.sin( 4 ), 4, 10 * Math.cos( 4 )),
     new THREE.Vector3 (6 * Math.sin( 5 ), 6, 6 * Math.cos( 5 )),
     new THREE.Vector3 (4 * Math.sin( 6 ), 8, 4 * Math.cos( 6 )),
     new THREE.Vector3 (3 * Math.sin( 7 ), 9.5, 3 * Math.cos( 7 ))
   ]);

   var geometryLine = new THREE.Geometry();
   geometryLine.vertices = this.splineArriba.getPoints(100);

   var material = new THREE.LineBasicMaterial({color: 0xff0000});
   var visibleSpline = new THREE.Line(geometryLine, material);

   this.add(visibleSpline);


   // Creación del spline hacia abajo
   this.splineAbajo = new THREE.CatmullRomCurve3([
     new THREE.Vector3 (3 * Math.sin( 7 ), 9.5, 3 * Math.cos( 7 )),
     new THREE.Vector3 (2 * Math.sin( 2 ), 8, 2 * Math.cos( 2 )),
     new THREE.Vector3 (2 * Math.sin( 3 ), 6, 2 * Math.cos( 3 )),
     new THREE.Vector3 (1 * Math.sin( 4 ), 4, 1 * Math.cos( 4 )),
     new THREE.Vector3 (2 * Math.sin( 5 ), 3, 2 * Math.cos( 5 )),
     new THREE.Vector3 (3 * Math.sin( 6 ), 2, 3 * Math.cos( 6 )),
     new THREE.Vector3 (5 * Math.sin( 1 ), 0, 5 * Math.cos( 1 ))
   ]);

   var geometryLine = new THREE.Geometry();
   geometryLine.vertices = this.splineAbajo.getPoints(100);

   var material = new THREE.LineBasicMaterial({color: 0xff0000});
   var visibleSpline = new THREE.Line(geometryLine, material);

   this.add(visibleSpline);

   // La animación dura 4 segundos
   this.looptime = 4000;

   this.origenArriba = {x: 0};
   var destino = {x: 1};

   var that = this;

   var movimientoArriba = new TWEEN.Tween(this.origenArriba).to(destino, this.looptime).easing(
     TWEEN.Easing.Quadratic.InOut
   ).onUpdate(
     function () {

       var posicion = that.splineArriba.getPointAt(that.origenArriba.x);

       that.cilindro.position.copy(posicion);

       var tangente = that.splineArriba.getTangentAt(that.origenArriba.x);

       posicion.add(tangente);

       that.cilindro.lookAt(posicion);
     }
   ).start();

   this.origenAbajo = {x: 0};

   var movimientoAbajo = new TWEEN.Tween(this.origenAbajo).to(destino, this.looptime * 2).easing(
     TWEEN.Easing.Quadratic.InOut
   ).onUpdate(
     function () {

       var posicion = that.splineAbajo.getPointAt(that.origenAbajo.x);

       that.cilindro.position.copy(posicion);

       var tangente = that.splineAbajo.getTangentAt(that.origenAbajo.x);

       posicion.add(tangente);

       that.cilindro.lookAt(posicion);
     }
   );

   movimientoArriba.chain(movimientoAbajo);
   movimientoAbajo.chain(movimientoArriba);


 }

 update () {
   TWEEN.update();

 }
}
