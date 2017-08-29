/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for an airplane.
 */
Airplane = function()
{
  // Member variables.
  this.speed = 0;
  this.minSpeed = 1.2;
  this.maxSpeed = 1.6;

  this.xMin = -100
  this.xMax = 100
  this.yMin = Game.airplaneDefaultHeight - Game.airplaneAmpHeight;
  this.yMax = Game.airplaneDefaultHeight + Game.airplaneAmpHeight;

  this.mesh = this.CreateAirplane();
  this.propeller;

  console.log("Hello Airplane!");
}

/**
 * @summary
 * Update airplane position. This is without user input.
 */
Airplane.prototype.UpdatePosition = function()
{
  // Update plane speed.
  this.speed = 
    this.Normalize(MousePosition.x, -0.5, 0.5, this.minSpeed, this.maxSpeed);

  // Rotate propeller.
  this.propeller.rotation.x += 
    0.2 + this.speed * Game.deltaTime * 0.005;//0.3;
}

/**
 * @summary
 * Update airplane position from user control.
 */
Airplane.prototype.UpdateFromControls = function()
{
  var targetX = 
    this.Normalize(MousePosition.x, -0.75, 0.75, this.xMin, this.xMax);
  var targetY = 
    this.Normalize(MousePosition.y, -0.75, 0.75, this.yMin, this.yMax);

  // Move the plane at each frame by adding a fraction of 
  // the remaining distance.
  this.mesh.position.x += (targetX - this.mesh.position.x) * 0.1;
  this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;

  // Rotate the plane proportionally to the remaining distance.
  this.mesh.rotation.x = (this.mesh.position.y - targetY) * 0.0064;
  this.mesh.rotation.z = (targetY - this.mesh.position.y) * 0.0128;
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary 
 * Creates an airplane mesh.
 * @returns
 * Airplane mesh.
 */
Airplane.prototype.CreateAirplane = function()
{
  var airplane = new THREE.Object3D();

  // Add cockpit.
  airplane.add(this.CreateCockpit());
  
  // Add engine.
  airplane.add(this.CreateEngine());

  // Create tail.
  airplane.add(this.CreateTail());

  // Create the wing.
  airplane.add(this.CreateWing());

  // Create the propeller.
  airplane.add(this.CreatePropeller());

  return airplane;
}

/**
 * @summary
 * Creates a cockpit.
 * @returns
 * A cockpit.
 */
Airplane.prototype.CreateCockpit = function()
{
  var geom = new THREE.BoxBufferGeometry(60, 50, 50, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Red, 
      flatShading: true
    }
  );

  var cockpit = new THREE.Mesh(geom, mat);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;

  return cockpit;
}

/**
 * @summary
 * Creates an engine.
 * @returns
 * An engine.
 */
Airplane.prototype.CreateEngine = function()
{
  var geom = new THREE.BoxBufferGeometry(20, 50, 50, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.White, 
      flatShading: true
    }
  );

  var engine = new THREE.Mesh(geom, mat);

  engine.position.x = 40;

  engine.castShadow = true;
  engine.receiveShadow = true;

  return engine;
}

/**
 * @summary
 * Creates a tail.
 * @returns
 * A tail.
 */
Airplane.prototype.CreateTail = function()
{
  var geom = new THREE.BoxBufferGeometry(15, 20, 5, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Red,
      flatShading: true
    }
  );

  var tail = new THREE.Mesh(geom, mat);

  tail.position.set(-35, 25, 0);

  tail.castShadow = true;
  tail.receiveShadow = true;

  return tail;
}

/**
 * @summary
 * Creates the wings.
 * @returns
 * The wings.
 */
Airplane.prototype.CreateWing = function()
{
  var geom = new THREE.BoxBufferGeometry(40, 8, 150, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Red, 
      flatShading: true
    }
  );

  var wing = new THREE.Mesh(geom, mat);

  wing.castShadow = true;
  wing.receiveShadow = true;

  return wing;
}

/**
 * @summary
 * Creates a propeller.
 * @returns
 * A propeller.
 */
Airplane.prototype.CreatePropeller = function()
{
  var geom = new THREE.BoxBufferGeometry(20, 10, 10, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Brown, 
      flatShading: true
    }
  );

  this.propeller = new THREE.Mesh(geom, mat);

  this.propeller.position.set(50, 0, 0);

  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  this.propeller.add(this.CreateBlades());

  return this.propeller;
}

/**
 * @summary
 * Creates the blades.
 * @returns
 * The blades.
 */
Airplane.prototype.CreateBlades = function()
{
  var geom = new THREE.BoxBufferGeometry(1, 100, 20, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Brown, 
      flatShading: true
    }
  );

  var blade = new THREE.Mesh(geom, mat);

  blade.position.set(8, 0, 0);

  blade.castShadow = true;
  blade.receiveShadow = true;

  return blade;
}

/**
 * Normalize mouse position to 3D world.
 * @param {int} v
 * Mouse position. Range: [vMin, vMax]
 * @param {int} vMin
 * @param {int} vMax
 * @param {int} tMin
 * Minimum 3D position.
 * @param {int} tMax
 * Maximum 3D position.
 */
Airplane.prototype.Normalize = function(v, vMin, vMax, tMin, tMax)
{
  var nv = Math.max( Math.min(v, vMax), vMin );
  var dv = vMax - vMin;
  var pc = (nv - vMin) / dv;
  var dt = tMax - tMin;
  var tv = tMin + (pc * dt);

  return tv;
}