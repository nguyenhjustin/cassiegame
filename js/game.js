window.addEventListener('load', Main, false);

var Colors = {
	Red: 0xf25346,
	White: 0xd8d0d1,
	Brown: 0x59332e,
	Pink: 0xF5986E,
	BrownDark: 0x23190f,
	Blue: 0x68c3c0,
};

var GameStatus = {
	Play: "Play", 
	Pause: "Pause", 
	Win: "Win", 
	Lose: "Lose"
}

var Game;
var MousePosition = {
	x: 0, 
	y: 0
};

var EnergyBar;
var ReplayMessage;

/**
 * @summary 
 * Constructor for the game.
 */
GameHolder = function()
{
	this.Initialize();
}

GameHolder.prototype.Initialize = function()
{
	this.status = GameStatus.Play;
	
	this.distance = 0;
	this.distanceToUpdateLevel = 1000;
	this.levelLastUpdate = 0;

	this.level = 1;
	this.energy = 100;

	this.oldTime = new Date().getTime();
	this.newTime = new Date().getTime();
	this.deltaTime = 0;

	this.speed = 0;
	this.initSpeed = 0.00035;
	this.baseSpeed = 0.00035;
	this.targetBaseSpeed = 0.00035;
	this.incrementSpeedByLevel = 0.000005;
	this.incrementSpeedByTime = 0.0000025;
	this.distanceToUpdateSpeed = 300;
	this.speedLastUpdate = 0;

	this.airplaneDefaultHeight = 100;
	this.airplaneAmpHeight = 70;

	this.distanceToSpawnEnemies = 50;
	this.enemyLastSpawn = 0;

	this.distanceToSpawnLetter = 100;
	this.letterLastSpawn = 0;

	this.scene;
	this.lights;
	this.sea;
	this.sky;
	this.airplane;

	this.enemiesPool = [];
	this.enemiesInUse = [];

	this.lettersPool = [];
	this.lettersInUse = [];

	this.numTotalLetters = 0;
	this.numLettersCollected = 0;
}

/**
 * @summary
 * Reset the game variables.
 */
GameHolder.prototype.Reset = function()
{
	this.RemoveEnemies();
	this.RemoveLetters();
	this.Initialize();
	this.CreateEnemies();
	this.CreateLetters();
}

/**
 * @summary
 * Creates the game's scene.
 */
GameHolder.prototype.CreateScene = function()
{
	this.scene = new Scene();
}

/**
 * @summary
 * Creates the game's hemisphere light, shadow light, 
 * and ambient light.
 */
GameHolder.prototype.CreateLights = function()
{
	this.lights = new Lights();

	// Activate lights by adding them to the scene.
  this.scene.AddToScene(this.lights.hemisphereLight);
	this.scene.AddToScene(this.lights.shadowLight);
	this.scene.AddToScene(this.lights.ambientLight);
}

/**
 * @summary
 * Creates the game's sea.
 */
GameHolder.prototype.CreateSea = function()
{
	this.sea = new Sea();

	// Push it a little bit at the bottom of the scene.
  this.sea.mesh.position.y = -600;

  // Add the mesh of the sea to the scene.
  this.scene.AddToScene(this.sea.mesh);
}

/**
 * @summary
 * Creates the game's sky.
 */
GameHolder.prototype.CreateSky = function()
{
	var numClouds = 20;
	this.sky = new Sky(numClouds);

	this.sky.mesh.position.y = -600;

	this.scene.AddToScene(this.sky.mesh);
}

/**
 * @summary
 * Creates the game's airplane.
 */
GameHolder.prototype.CreateAirplane = function()
{
	this.airplane = new Airplane();

	this.airplane.mesh.position.y = this.airplaneDefaultHeight;

	var scale = 0.25;
	this.airplane.mesh.scale.set(scale, scale, scale);

	this.scene.AddToScene(this.airplane.mesh);
}

/**
 * @summary
 * Creates the initial enemies for reuse.
 */
GameHolder.prototype.CreateEnemies = function()
{
	for (var i = 0; i < 10; i++)
	{
		this.enemiesPool.push(new Enemy());
	}
}

/**
 * @summary
 * Spawns enemies.
 * @param {int} level
 * The number of enemies to spawn is equal to the game level.
 */
GameHolder.prototype.SpawnEnemies = function(level)
{
	var numEnemies = level;
	
	for (var i = 0; i < numEnemies; i++)
	{
		var enemy;
		
		if (this.enemiesPool.length > 0)
		{
			enemy = this.enemiesPool.pop();
		}
		else
		{
			enemy = new Enemy();	
		}

		enemy.InitializeValues(i);

		this.enemiesInUse.push(enemy);
		this.scene.AddToScene(enemy.mesh);
	}
}

GameHolder.prototype.RemoveEnemies = function()
{
	for (var i = 0; i < this.enemiesInUse.length; i++)
	{
		this.scene.RemoveFromScene(this.enemiesInUse[i].mesh);
	}
}

GameHolder.prototype.CreateLetters = function()
{
	//var scale = window.innerWidth / window.innerHeight;
	//var str = "CASSIE WILL YOU BE MY GIRLFRIEND";
	var str = "HAPPY ONE YEAR ANNIVERSARY CASSIE";
	var midPoint = Math.floor(str.length / 2);
	var offset = 10;

	var startX = -midPoint * offset;
	var startY = 200;
	
	for (var i = 0; i < str.length; i++)
	{
		var letter = str.charAt(i);

		if (letter == " ")
		{
			continue;
		}

		var letterObj = Letter[letter](i);
		letterObj.finalPosition.x = startX + (offset * i);
		letterObj.finalPosition.y = startY;

		//letterObj.group.scale.set(scale, scale, scale);

		this.lettersPool.push(letterObj);
		this.numTotalLetters++;
	}
}

GameHolder.prototype.SpawnLetter = function()
{
	if (this.lettersPool.length > 0)
	{
		console.log("Spawning a letter.");

		var randInt = Math.floor(Math.random() * this.lettersPool.length);

		var letter = this.lettersPool.splice(randInt, 1)[0];
		letter.InitializeValues(randInt);

		this.lettersInUse.push(letter);
		this.scene.AddToScene(letter.group);
	}
}

GameHolder.prototype.RemoveLetters = function()
{
	for (var i = 0; i < this.lettersInUse.length; i++)
	{
		this.scene.RemoveFromScene(this.lettersInUse[i].group);
	}
}

/**
 * @summary
 * Update delta time.
 */
GameHolder.prototype.UpdateTime = function()
{
	this.newTime = new Date().getTime();
	this.deltaTime = this.newTime - this.oldTime;
	this.oldTime = this.newTime;
}

/**
 * @summary
 * Updates the distance the airplane has traveled so far.
 */
GameHolder.prototype.UpdateDistance = function()
{
	var ratioSpeedDistance = 50;
	this.distance += this.speed * this.deltaTime * ratioSpeedDistance;
}

/**
 * @summary
 * Updates the speed of the game.
 */
GameHolder.prototype.UpdateSpeed = function(gameDistanceInt)
{
	if (gameDistanceInt % this.distanceToUpdateSpeed == 0 &&
			gameDistanceInt > this.speedLastUpdate)
	{
		this.speedLastUpdate = gameDistanceInt;
		this.targetBaseSpeed += this.incrementSpeedByTime * this.deltaTime;
	}

	this.baseSpeed += 
		(this.targetBaseSpeed - this.baseSpeed) * this.deltaTime * 0.02;
	this.speed = this.baseSpeed * this.airplane.speed;
}

GameHolder.prototype.UpdateEnergyBar = function()
{
	//this.energy -= this.speed * this.deltaTime * this.ratioSpeedEnergy;
	this.energy = Math.max(0, this.energy);

	EnergyBar.style.right = (100 - this.energy) + "%";
	EnergyBar.style.backgroundColor = 
		(this.energy < 50) ? "#f25346" : "#68c3c0";

	if (this.energy < 30)
	{
		EnergyBar.style.animationName = "blinking";
	}
	else
	{
		EnergyBar.style.animationName = "none";
	}

	if (this.energy == 0)
	{
		this.RemoveLetters();
		this.status = GameStatus.Lose;
		console.log("You lose!");
	}
}

/**
 * @summary
 * Removes energy.
 * @param {int} value
 * The amount to remove from the energy.
 */
GameHolder.prototype.RemoveEnergy = function(value)
{
	this.energy -= value;
	this.energy = Math.max(0, this.energy);
}

GameHolder.prototype.LockMouse = function()
{
	this.lockControls = true;

	// this.scene.container.requestPointerLock = 
	// 	this.scene.container.requestPointerLock || 
	// 	this.scene.container.mozRequestPointerLock || 
	// 	this.scene.container.webkitRequestPointerLock;

	// this.scene.container.requestPointerLock();
	
	// this.scene.container.addEventListener('onclick', function() {
	// 	this.scene.container.requestPointerLock();
	// });

	// document.exitPointerLock = 
	// 	document.exitPointerLock || 
	// 	document.mozExitPointerLock || 
	// 	document.webkitExitPointerLock;

	// document.addEventListener('pointerlockchange', LockChangeAlert, false);
	// document.addEventListener('mozpointerlockchange', LockChangeAlert, false);
	// document.addEventListener('webkitpointerlockchange', LockChangeAlert, false);
}

/**
 * @summary 
 * Initializes the game.
 */
function Main()
{
	console.log("Hello World!");

	GetDocumentVariables();
	AddEventListeners();
	
	Game = new GameHolder();

	// Set up the scene, the camera, and the renderer.
	Game.CreateScene();
	
	// Add the lights.
	Game.CreateLights();

	// Add the objects.
	Game.CreateSea();
	Game.CreateSky();
	Game.CreateAirplane();

	Game.CreateEnemies();
	Game.CreateLetters();

	// Lock the mouse.
	Game.LockMouse();

	// Game loop.
	Loop();
}

/**
 * Gets the document elements.
 */
function GetDocumentVariables()
{
	ReplayMessage = document.getElementById("replayMessage");
	EnergyBar = document.getElementById("energyBar");
}

function AddEventListeners()
{
	// Add mouse position listener.
	document.addEventListener('mousemove', HandleMouseMove, false);
	document.addEventListener('mouseup', HandleMouseUp, false);

	document.addEventListener('touchmove', HandleTouchMove, false);
	document.addEventListener('touchend', HandleTouchEnd, false);
}

/**
 * @summary 
 * Game loop function. Will update the objects' positions 
 * and render the scene on each frame.
 */
function Loop()
{
	Game.UpdateTime();

	if (Game.status == GameStatus.Play)
	{
		Game.UpdateDistance();
		
		var gameDistanceInt = Math.floor(Game.distance);

		Game.UpdateSpeed(gameDistanceInt);

		// Check if enemies should be spawned.
		if (gameDistanceInt % Game.distanceToSpawnEnemies == 0 &&
				gameDistanceInt > Game.enemyLastSpawn)
		{
			Game.enemyLastSpawn = gameDistanceInt;
			console.log("Spawning " + Game.level + " enemies.");
			Game.SpawnEnemies(Game.level);
		}

		// Check if a letter should be spawned.
		if (gameDistanceInt % Game.distanceToSpawnLetter == 0 &&
				gameDistanceInt > Game.letterLastSpawn)
		{
			Game.letterLastSpawn = gameDistanceInt;
			Game.SpawnLetter();
		}

		// Check if next game level.
		if (gameDistanceInt % Game.distanceToUpdateLevel == 0 && 
				gameDistanceInt > Game.levelLastUpdate)
		{
			Game.levelLastUpdate = gameDistanceInt;
			Game.level++;
			console.log("Reached level " + Game.level + "!");

			//Game.targetBaseSpeed = 
			//	Game.initSpeed + Game.incrementSpeedByLevel * Game.level;
		}

		// Update object positions.
		UpdateObjectPositions();

		// Update objects from user input.
		UpdateObjectsFromControls();

		Game.UpdateEnergyBar();
	}
	else if (Game.status == GameStatus.Win)
	{
		Game.RemoveEnemies();
		UpdateObjectPositions();
		UpdateObjectsFromControls();
	}
	else if (Game.status == GameStatus.Lose)
	{
		ShowReplay();
	}

	// Render the scene.
	Game.scene.Render();

	// Call the loop function again.
	requestAnimationFrame(Loop);
}

/**
 * @summary
 * Update object positions. This is without user input.
 */
function UpdateObjectPositions()
{
	Game.sea.UpdatePosition();
	Game.sky.UpdatePosition();
	Game.airplane.UpdatePosition();
	Game.lights.UpdateAmbientLight();

	for (var i = 0; i < Game.enemiesInUse.length; i++)
	{
		var remove = Game.enemiesInUse[i].UpdatePosition();

		if (remove)
		{
			var removedEnemy = Game.enemiesInUse.splice(i, 1)[0];
			Game.enemiesPool.unshift(removedEnemy);
			Game.scene.RemoveFromScene(removedEnemy.mesh);
			i--;
		}
	}

	UpdateLetters();
}

/**
 * @summary
 * Update objects based on user inputs.
 */
function UpdateObjectsFromControls()
{
	if (Game.lockControls)
	{
		Game.airplane.UpdateFromControls();
	}
}

function UpdateLetters()
{
	for (var i = 0; i < Game.lettersInUse.length; i++)
	{
		if (Game.lettersInUse[i].Update(i))
		{
			i--;

			if (Game.numLettersCollected == Game.numTotalLetters)
			{
				Game.status = GameStatus.Win;
				console.log("You win!");
				return;
			}
		}
	}
}

/**
 * @summary
 * Get the 2D mouse position from the screen and convert it 
 * such that x and y both range from -1 to 1.
 * @param {} event 
 */
function HandleMouseMove(event)
{
	// Note: The 2D mouse position of (0, 0) is the top left corner.

	// Here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	var tx = -1 + (event.clientX / Width) * 2;
	
	// For the vertical axis, we need to inverse the formula
	// because the 2D y-axis goes the opposite direction of the 3D.
	var ty = 1 - (event.clientY / Height) * 2;

	MousePosition.x = tx;
	MousePosition.y = ty;

	//console.log(MousePosition);
}

function HandleTouchMove(event)
{
	event.preventDefault();
	var tx = -1 + (event.touches[0].pageX / Width) * 2;
	var ty = 1 - (event.touches[0].pageY / Height) * 2;
	
	MousePosition.x = tx;
	MousePosition.y = ty;
}

/**
 * @summary
 * Event handler for mouse up event.
 * @param {} event 
 */
function HandleMouseUp(event)
{
	if (Game.status == GameStatus.Lose)
	{
		console.log("Restarting game.");
		Game.Reset();
		HideReplay();
	}
}

function HandleTouchEnd(event)
{
	if (Game.status == GameStatus.Lose)
	{
		console.log("Restarting game.");
		Game.Reset();
		HideReplay();
	}
}

/**
 * @summary
 * Display the replay text.
 */
function ShowReplay()
{
	ReplayMessage.style.display = "block";
}

/**
 * @summary
 * Hide the replay text.
 */
function HideReplay()
{
	ReplayMessage.style.display = "none";
}

// function LockChangeAlert()
// {
// 	if (document.pointerLockElement === game.scene.container || 
// 			document.mozPointerLockElement === game.scene.container || 
// 			document.webkitPointerLockElement === game.scene.container)
// 	{
// 		game.lockControls = true;
// 	}
// 	else
// 	{
// 		game.lockControls = false;
// 	}
// }