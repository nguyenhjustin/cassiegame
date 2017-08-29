/**
 * Global variables
 */

var Width;
var Height;
var Renderer;
var Camera;

/********************
 * Public Functions *
 ********************/

/**
 * @summary
 * Constructor for the scene.
 */
Scene = function()
{
  this.scene;
  this.fieldOfView;
  this.aspectRatio; 
  this.nearPlane; 
  this.farPlane; 
  this.container;

  this.Create();

  console.log("Hello Scene!");
}

/**
 * @summary
 * Adds an object to the scene.
 * @param {Object3D} object
 * The object to add to the scene.
 */
Scene.prototype.AddToScene = function(object) 
{
  this.scene.add(object);
}

/**
 * @summary
 * Removes an object from the scene.
 * @param {Object3D} object
 * The object to remove from the scene.
 */
Scene.prototype.RemoveFromScene = function(object) 
{
  this.scene.remove(object);
}

/**
 * @summary 
 * Renders the scene.
 */
Scene.prototype.Render = function() 
{
  Renderer.render(this.scene, Camera);
}

/*********************
 * Private Functions *
 *********************/

/**
 * @summary 
 * Creates the scene.
 */
Scene.prototype.Create = function() 
{
  // Get the width and the height of the screen.
  // Use them to set up the aspect ratio of the camera 
  // and the size of the renderer.
  Width = window.innerWidth;  
  Height = window.innerHeight;

  // Create the camera.
  this.aspectRatio = Width / Height;
  this.fieldOfView = 60;
  this.nearPlane = 1;
  this.farPlane = 10000;

  Camera = new THREE.PerspectiveCamera(
    this.fieldOfView, 
    this.aspectRatio, 
    this.nearPlane, 
    this.farPlane
  );

  // Set the position of the camera.
  Camera.position.x = 0;
  Camera.position.y = Game.airplaneDefaultHeight;
  Camera.position.z = 200;

  // Create the renderer
  Renderer = new THREE.WebGLRenderer({
    // Allow transparency to show the gradient background 
    // we defined in the CSS.
    alpha: true, 

    // Activate the anti-aliasing; this is less performant, but, 
    // as our project is low-poly based, it should be fine.
    antialias: true
  });

  // Define the size of the renderer; in this case, 
  // it will fill the entire screen.
  Renderer.setSize(Width, Height);

  // Enable shadow rendering.
  Renderer.shadowMap.enabled = true;

  // Add the DOM element of the renderer to the container 
  // we created in the HTML.
  this.container = document.getElementById('world');
  this.container.appendChild(Renderer.domElement);

  // Listen to the screen: if the user resizes it, 
  // we have to update the camera and the renderer size.
  window.addEventListener('resize', HandleWindowResize, false);

  // Create the scene
  this.scene = new THREE.Scene();

  // Add a fog effect to the scene; same color as the 
  // background color used in the style sheet.
  this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
}

/**
 * @summary 
 * Update as the window resizes.
 */
function HandleWindowResize()
{
  // Update width and height of the renderer and the camera.
  Width = window.innerWidth;
  Height = window.innerHeight;
  
  Renderer.setSize(Width, Height);

  Camera.aspect = Width / Height;
  Camera.updateProjectionMatrix();
}