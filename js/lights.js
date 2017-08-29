/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Creates the lights.
 */
Lights = function() 
{
  this.hemisphereLight = this.CreateHemisphereLight();
  this.shadowLight = this.CreateShadowLight();
  this.ambientLight = this.CreateAmbientLight();

  console.log("Hello Lights!");
}

/**
 * @summary
 * Update the ambient light's intensity.
 */
Lights.prototype.UpdateAmbientLight = function()
{
  this.ambientLight.intensity += 
    (0.5 - this.ambientLight.intensity) * Game.deltaTime * 0.005;
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary
 * Creates a hemisphere light.
 * @returns
 * A hemisphere light.
 */
Lights.prototype.CreateHemisphereLight = function()
{
  // A hemisphere light is a gradient colored light;
  // The first parameter is the sky color.
  // The second parameter is the ground color.
  // The third parameter is the intensity of the light.
  var skyColor = 0xaaaaaa;
  var groundColor = 0x000000;
  var intensity = 0.9;

  var hemisphereLight = 
    new THREE.HemisphereLight(skyColor, groundColor, intensity);

  return hemisphereLight;
}

/**
 * @summary
 * Creates a shadow light.
 * @returns
 * A shadow light.
 */
Lights.prototype.CreateShadowLight = function()
{
  // A directional light shines from a specific direction.
  // It acts like the sun, that means that all the rays produced are parallel.
  var shadowLight = new THREE.DirectionalLight(0xffffff, .9);

  // Set the direction of the light.
  shadowLight.position.set(150, 350, 350);

  // Allow shadow casting.
  shadowLight.castShadow = true;

  // Define the visible area of the projected shadow.
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // Define the resolution of the shadow; the higher the better, 
  // but also the more expensive and less performant.
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  return shadowLight;
}

/**
 * @summary
 * Creates an ambient light.
 * @returns
 * An ambient light.
 */
Lights.prototype.CreateAmbientLight = function()
{
  var ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  return ambientLight;
}