/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for a cloud.
 */
Cloud = function() 
{
  // Member variables.
  this.mesh = this.CreateCloud();
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary
 * Creates a cloud by putting multiple cubes together.
 */
Cloud.prototype.CreateCloud = function()
{
  // Create an empty container that will hold the different 
  // parts of the cloud.
  var cloud = new THREE.Object3D();

  // Create a cube geometry.
  // This shape will be duplicated to create the cloud.
  var geom = new THREE.BoxBufferGeometry(20, 20, 20);

  // Create a material; a simple white material will do the trick.
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.White
    }
  );

  // Duplicate the geometry a random number of times.
  var numBlocks = 3 + Math.floor(Math.random() * 3);

  for (var i = 0; i < numBlocks; i++)
  {
    // Create the mesh by cloning the geometry.
    var m = new THREE.Mesh(geom, mat);

    // Set the position and the rotation of each cube randomly.
    m.position.x = i*15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    
    m.rotation.y = Math.random() * Math.PI * 2;
    m.rotation.z = Math.random() * Math.PI * 2;

    // Set the size of the cube randomly.
    var scale = 0.1 + Math.random() * 0.9;
    m.scale.set(scale, scale, scale);

    // Allow each cube to cast and to receive shadows.
    m.castShadow = true;
    m.receiveShadow = true;

    // Add the cube to the container we first created.
    cloud.add(m);
  }

  return cloud;
}