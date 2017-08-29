/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for a sky.
 * @param {int} numClouds
 * Number of clouds in the sky.
 */
Sky = function(numClouds) 
{
  // Member variables.
  this.numClouds = numClouds;
  this.mesh = this.CreateSky(this.numClouds);

  console.log("Hello Sky!");
}

/**
 * @summary
 * Updates the sky's position.
 */
Sky.prototype.UpdatePosition = function() 
{
  this.mesh.rotation.z += Game.speed * Game.deltaTime;//0.01;
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary
 * Creates a sky.
 * @param {int} numClouds
 * Number of clouds in the sky. 
 */
Sky.prototype.CreateSky = function(numClouds) 
{
  // Create an empty container.
  var sky = new THREE.Object3D();

  // Add clouds to sky.
  for (var i = 0; i < numClouds; i++)
  {
    var cloud = this.MakeCloudForSky(i);
    sky.add(cloud.mesh);
  }

  return sky;
}

/**
 * @summary
 * Makes a cloud for the sky.
 * @param {int} i
 * The index of the cloud.
 */
Sky.prototype.MakeCloudForSky = function(i)
{
  var cloud = new Cloud();

  // To distribute the clouds consistently, we need to place 
  // them according to a uniform angle.
  var stepAngle = Math.PI * 2 / this.numClouds;

  // Set the rotation and the position of each cloud;
  // for that we use a bit of trigonometry.

  // Final angle of the cloud.
  var angle = stepAngle * i;  

  // Distance between the center of the axis and the cloud itself.
  var h = 750 + Math.random() * 200;

  // Convert polar coordinates (angle, distance) 
  // into Cartesian coordinates (x, y).
  cloud.mesh.position.x = Math.cos(angle) * h;
  cloud.mesh.position.y = Math.sin(angle) * h;

  // Rotate the cloud according to its position.
  cloud.mesh.rotation.z = angle + Math.PI / 2;

  // For a better result, we position the clouds at random
  // depths inside of the scene.
  cloud.mesh.position.z = -400 - Math.random() * 400;

  // We also set a random scale for each cloud.
  var scale = 1 + Math.random() * 2;
  cloud.mesh.scale.set(scale, scale, scale);

  return cloud;
}