/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for the sea.
 */
Sea = function() 
{
  // Member variables.
  this.radius = 600;
  this.mesh = this.CreateSeaMesh();
  this.waves;

  console.log("Hello Sea!");
}

/**
 * @summary
 * Update sea's position.
 */
Sea.prototype.UpdatePosition = function() 
{
  // Move waves.
  this.MoveWaves();
  
  // Rotate sea.
  this.mesh.rotation.z += Game.speed * Game.deltaTime;//0.005;

  if (this.mesh.rotation.z > 2 * Math.PI)
  {
    this.mesh.rotation.z -= 2 * Math.PI;
  }
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary
 * Creates the sea mesh.
 */
Sea.prototype.CreateSeaMesh = function()
{
  // Create the geometry (shape) of the cylinder.
  var radiusTop = this.radius;
  var radiusBottom = this.radius;
  var height = 800;
  var numOfSegmentsOnRadius = 40;
  var numOfSegmentsVertically = 10;

  var geom = new THREE.CylinderGeometry(
    radiusTop, radiusBottom, height, 
    numOfSegmentsOnRadius, numOfSegmentsVertically);

  // Rotate the geometry on the x-axis.
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

  // Important: by merging vertices, we ensure the continuity 
  // of the waves.
  geom.mergeVertices();

  // Create an array to store the new data associated to each
  // vertex.
  this.waves = [];
  var length = geom.vertices.length;

  for (var i = 0; i < length; i++)
  {
    var v = geom.vertices[i];

    // Store some data associated to it.
    var data = {
      x: v.x, 
      y: v.y, 
      z: v.z, 
      // random angle
      angle: Math.random() * Math.PI * 2, 
      // random distance
      amplitude: 5 + Math.random() * 15, 
      // random speed between 0.016 and 0.048 radians / frame
      speed: 0.016 + Math.random() * 0.032
    };

    this.waves.push(data);
  }

  // Create the material.
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Blue, 
      transparent: true, 
      opacity: 0.8, 
      flatShading: true
    }
  );

  // To create an object in Three.js, we have to create a mesh
  // which is a combination of a geometry and some material.
  var mesh = new THREE.Mesh(geom, mat);

  // Allow the sea to receive shadows.
  mesh.receiveShadow = true;

  return mesh;
}

Sea.prototype.MoveWaves = function()
{
  // Get the vertices.
  var vertices = this.mesh.geometry.vertices;
  var length = vertices.length;

  for (var i = 0; i < length; i++)
  {
    var v = vertices[i];

    // Get the data associated to it.
    var vProperties = this.waves[i];

    // Update the position of the vertex.
    v.x = vProperties.x + 
      Math.cos(vProperties.angle) * vProperties.amplitude;
    v.y = vProperties.y + 
      Math.sin(vProperties.angle) * vProperties.amplitude;

    // Increment the angle for the next frame.
    vProperties.angle += vProperties.speed;// * Game.deltaTime;
  }

  // Tell the renderer that the geometry of the sea has changed.
  // In fact, in order to maintain the best level of performance, 
  // three.js caches the geometries and ignores any changes
  // unless we add this line.
  this.mesh.geometry.verticesNeedUpdate = true;
}