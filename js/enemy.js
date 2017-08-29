/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for an enemy.
 */
Enemy = function()
{
  this.energy = 10;
  this.collisionDistanceTolerance = 10;
  this.speed = 0.6;
  this.mesh = this.CreateEnemyMesh();
  this.angle;
  this.distance;
}

/**
 * @summary
 * Update the enemy's position.
 * @returns
 * True if the enemy should be removed; false if not;
 */
Enemy.prototype.UpdatePosition = function()
{
  this.angle += Game.speed * Game.deltaTime * this.speed;

  if (this.angle > 2 * Math.PI)
  {
    this.angle -= 2 * Math.PI;
  }

  this.mesh.position.x = Math.cos(this.angle) * this.distance;
  this.mesh.position.y = -Game.sea.radius + 
    Math.sin(this.angle) * this.distance;
    
  this.mesh.rotation.y += Math.random() * 0.1;
  this.mesh.rotation.z += Math.random() * 0.1;

  var isHit = this.CheckCollision();
  var isOffscreen = this.CheckOffscreen();

  return isHit || isOffscreen;
}


/*********************
 * Private Functions *
 *********************/

/**
 * @summary
 * Initializes the enemy's angle, distance, and position.
 * @param {int} index
 * The index of the enemy in the group of enemies to spawn.
 */
Enemy.prototype.InitializeValues = function(index)
{
  this.angle = index * (-0.1);
  this.distance = Game.sea.radius + Game.airplaneDefaultHeight + 
    (-1 + Math.random() * 2) * (Game.airplaneAmpHeight - 20);

  this.mesh.position.x = Math.cos(this.angle) * this.distance;
  this.mesh.position.y = -Game.sea.radius + 
    Math.sin(this.angle) * this.distance; 
}

/**
 * @summary
 * Creates an enemy mesh.
 * @returns
 * An enemy mesh.
 */
Enemy.prototype.CreateEnemyMesh = function()
{
  var geom = new THREE.TetrahedronBufferGeometry(8, 2);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: Colors.Red, 
      shininess: 0, 
      specular: 0xffffff,
      flatShading: true
    }
  );

  var mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;

  return mesh;
}

/**
 * @summary
 * Checks if the enemy hit the airplane.
 * @returns
 * True if the enemy hit the airplane; false if not.
 */
Enemy.prototype.CheckCollision = function()
{
  var airplanePos = Game.airplane.mesh.position.clone();
  var enemyPos = this.mesh.position.clone();
  var diffPos = airplanePos.sub(enemyPos);

  var distance = diffPos.length();

  if (distance < this.collisionDistanceTolerance)
  {
    // spawn particles
    Game.lights.ambientLight.intensity = 2;
    Game.RemoveEnergy(this.energy);
    return true;
  }

  return false;
}

/**
 * @summary
 * Check if the enemy is offscreen.
 * @returns
 * True if the enemy is offscreen; false if not.
 */
Enemy.prototype.CheckOffscreen = function()
{
  return (this.angle > Math.PI);
}