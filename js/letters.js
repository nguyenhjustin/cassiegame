/********************
 * Public Functions *
 ********************/

var GridSize = 3;

Letter = function(letter, group)
{
  this.collisionDistanceTolerance = 15;
  this.speed = 0.5;
  this.group = group;
  this.letter = letter;
  this.angle;
  this.distance;
  this.finalPosition = { x: 0, y: 0 };
  this.collected = false;
}

Letter.prototype.InitializeValues = function(index)
{
  this.distance = Game.sea.radius + Game.airplaneDefaultHeight + 
    (-1 + Math.random() * 2) * (Game.airplaneAmpHeight - 20);

  this.angle = index * (-0.02);

  this.group.position.x = Math.cos(this.angle) * this.distance;
  this.group.position.y = -Game.sea.radius + 
    Math.sin(this.angle) * this.distance;
}

Letter.prototype.Update = function(index)
{
  if (this.collected)
  {
    this.group.rotation.y += Math.random() * 0.1;

    if (Game.status == GameStatus.Win)
    {
      this.group.rotation.y = 0;
    }

    if (this.group.rotation.y > 2 * Math.PI)
    {
      this.group.rotation.y -= 2 * Math.PI;
    }

    return;
  }

  this.angle += Game.speed * Game.deltaTime * this.speed;

  if (this.angle > 2 * Math.PI)
  {
    this.angle -= 2 * Math.PI;
  }

  this.group.position.x = Math.cos(this.angle) * this.distance;
  this.group.position.y = -Game.sea.radius + 
    Math.sin(this.angle) * this.distance;

  this.group.rotation.y += Math.random() * 0.1;
  this.group.rotation.z += Math.random() * 0.1;

  if (this.CheckCollision(index))
  {
    return true;
  }
  else if (this.CheckOffscreen(index))
  {
    return true;
  }

  return false;
}

Letter.A = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetRightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("A", group);
}

Letter.B = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));

  return new Letter("B", group);
}

Letter.C = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("C", group);
}

Letter.D = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetRightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));

  return new Letter("D", group);
}

Letter.E = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return  new Letter("E", group);
}

Letter.F = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotLeft(size));

  return new Letter("F", group);
}

Letter.G = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetRightCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("G", group);
}

Letter.H = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetRightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("H", group);
}

Letter.I = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetUpMiddle(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDownMiddle(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("I", group);
}

Letter.J = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetRightCenter(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("J", group);
}

Letter.K = function()
{
  var size = GridSize;
  var group = new THREE.Group();
  
  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("K", group);
}

Letter.L = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("L", group);
}

Letter.M = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.Get2LeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUp2Left(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTop2Left(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDown2Left(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBot2Left(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("M", group);
}

Letter.N = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.Get2LeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUp2Left(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTop2Left(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDown2Left(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBot2Left(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("N", group);
}

Letter.O = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("O", group);
}

Letter.P = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotLeft(size));

  return new Letter("P", group);
}

Letter.Q = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.Get2LeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUp2Left(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDown2Left(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("Q", group);
}

Letter.R = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("R", group);
}

Letter.S = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.GetRightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));

  return new Letter("S", group);
}

Letter.T = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetUpMiddle(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDownMiddle(size));
  group.add(Letter.GetBotMiddle(size));

  return new Letter("T", group);
}

Letter.U = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetLeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("U", group);
}

Letter.V = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.Get2LeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetDiagonalUp2Left(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTop2Left(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotMiddle(size));

  return new Letter("V", group);
}

Letter.W = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.Get2LeftCenter(size));
  group.add(Letter.Get2RightCenter(size));
  group.add(Letter.GetUpMiddle(size));
  group.add(Letter.GetDiagonalUp2Left(size));
  group.add(Letter.GetDiagonalUp2Right(size));
  group.add(Letter.GetTop2Left(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDownMiddle(size));
  group.add(Letter.GetDiagonalDown2Left(size));
  group.add(Letter.GetDiagonalDown2Right(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));
  group.add(Letter.GetBot2Left(size));
  group.add(Letter.GetBot2Right(size));

  return new Letter("W", group);
}

Letter.X = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetDiagonalDownRight(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("X", group);
}

Letter.Y = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetDiagonalUpLeft(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTop2Left(size));
  group.add(Letter.GetTop2Right(size));
  group.add(Letter.GetDownMiddle(size));
  group.add(Letter.GetBotMiddle(size));

  return new Letter("Y", group);
}

Letter.Z = function()
{
  var size = GridSize;
  var group = new THREE.Group();

  group.add(Letter.GetCenter(size));
  group.add(Letter.GetDiagonalUpRight(size));
  group.add(Letter.GetTopMiddle(size));
  group.add(Letter.GetTopLeft(size));
  group.add(Letter.GetTopRight(size));
  group.add(Letter.GetDiagonalDownLeft(size));
  group.add(Letter.GetBotMiddle(size));
  group.add(Letter.GetBotLeft(size));
  group.add(Letter.GetBotRight(size));

  return new Letter("Z", group);
}

/*********************
 * Private Functions *
 *********************/

Letter.prototype.CheckCollision = function(index)
{
  var airplanePos = Game.airplane.mesh.position.clone();
  var letterPos = this.group.position.clone();
  var diffPos = airplanePos.sub(letterPos);

  var distance = diffPos.length();

  if (distance < this.collisionDistanceTolerance)
  {
    // spawn particles
    this.collected = true;
    this.group.position.x = this.finalPosition.x;
    this.group.position.y = this.finalPosition.y;
    this.group.rotation.y = 0;
    this.group.rotation.z = 0;
    var scale = 0.5;
    this.group.scale.set(scale, scale, scale);
    
    for (var i = 0; i < this.group.children.length; i++)
    {
      this.group.children[i].castShadow = false;
    }

    //var removedLetter = Game.lettersInUse.splice(index, 1)[0];
    Game.numLettersCollected++;

    //Game.scene.RemoveFromScene(removedLetter.group);
    return true;
  }

  return false;
}

Letter.prototype.CheckOffscreen = function(index)
{
  if (this.angle > Math.PI)
  {
    var removedLetter = Game.lettersInUse.splice(index, 1)[0];
    Game.lettersPool.push(removedLetter);
    Game.scene.RemoveFromScene(removedLetter.group);

    return true;
  }

  return false;
}

function GetLetterCubeMesh(x, y)
{
  var size = GridSize;
  var geom = new THREE.BoxBufferGeometry(size, size, size);
  var mat = new THREE.MeshPhongMaterial(
    {
      color: 0x009999,
      shininess: 0, 
      specular: 0xffffff,
      flatShading: true
    }
  );

  var mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;

  mesh.position.x = x;
  mesh.position.y = y;

  return mesh;
}

// Center
Letter.GetCenter = function(size)
{
  return GetLetterCubeMesh(0, 0);
}

// Left Center
Letter.GetLeftCenter = function(size)
{
  return GetLetterCubeMesh(-size, 0);
}

// 2 Left Center
Letter.Get2LeftCenter = function(size)
{
  return GetLetterCubeMesh(-2 * size, 0);
}

// Right Center
Letter.GetRightCenter = function(size)
{
  return GetLetterCubeMesh(size, 0);
}

// 2 Right Center
Letter.Get2RightCenter = function(size)
{
  return GetLetterCubeMesh(2 * size, 0);
}

// Up Middle
Letter.GetUpMiddle = function(size)
{
  return GetLetterCubeMesh(0, size);
}

// Diagonal Up Left
Letter.GetDiagonalUpLeft = function(size)
{
  return GetLetterCubeMesh(-size, size);
}

// Diagonal Up 2 Left
Letter.GetDiagonalUp2Left = function(size)
{
  return GetLetterCubeMesh(-2 * size, size);
}

// Diagonal Up Right
Letter.GetDiagonalUpRight = function(size)
{
  return GetLetterCubeMesh(size, size);
}

// Diagonal Up 2 Right
Letter.GetDiagonalUp2Right = function(size)
{
  return GetLetterCubeMesh(2 * size, size);
}

// Top Middle
Letter.GetTopMiddle = function(size)
{
  return GetLetterCubeMesh(0, 2 * size);
}

// Top Left
Letter.GetTopLeft = function(size)
{
  return GetLetterCubeMesh(-size, 2 * size);
}

// Top 2 Left
Letter.GetTop2Left = function(size)
{
  return GetLetterCubeMesh(-2 * size, 2 * size);
}

// Top Right
Letter.GetTopRight = function(size)
{
  return GetLetterCubeMesh(size, 2 * size);
}

// Top 2 Right
Letter.GetTop2Right = function(size)
{
  return GetLetterCubeMesh(2 * size, 2 * size);
}

// Down Middle
Letter.GetDownMiddle = function(size)
{
  return GetLetterCubeMesh(0, -size);
}

// Diagonal Down Left
Letter.GetDiagonalDownLeft = function(size)
{
  return GetLetterCubeMesh(-size, -size);
}

// Diagonal Down 2 Left
Letter.GetDiagonalDown2Left = function(size)
{
  return GetLetterCubeMesh(-2 * size, -size);
}

// Diagonal Down Right
Letter.GetDiagonalDownRight = function(size)
{
  return GetLetterCubeMesh(size, -size);
}

// Diagonal Down 2 Right
Letter.GetDiagonalDown2Right = function(size)
{
  return GetLetterCubeMesh(2 * size, -size);
}

// Bot Middle
Letter.GetBotMiddle = function(size)
{
  return GetLetterCubeMesh(0, -2 * size);
}

// Bot Left
Letter.GetBotLeft = function(size)
{
  return GetLetterCubeMesh(-size, -2 * size);
}

// Bot 2 Left
Letter.GetBot2Left = function(size)
{
  return GetLetterCubeMesh(-2 * size, -2 * size);
}
  
// Bot Right
Letter.GetBotRight = function(size)
{
  return GetLetterCubeMesh(size, -2 * size);
}

// Bot 2 Right
Letter.GetBot2Right = function(size)
{
  return GetLetterCubeMesh(2 * size, -2 * size);
}