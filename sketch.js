var game_state;
var color_schemes_arr = [];

function setup() {
  setupColorSchemes(color_schemes_arr);
  game_state = new GameState(
    _SKETCH_WIDTH,
    _SKETCH_HEIGHT,
    _GAME_WIDTH,
    _GAME_HEIGHT,
    _GAME_POSITION,
    _SPEED,
    _SPEED_INCREASE,
    _SPACING,
    color_schemes_arr[0]
  );
  game_state.initSnakeAndFood();
  var canvas = createCanvas(_SKETCH_WIDTH, _SKETCH_HEIGHT);
  canvas.parent("sketch_holder");
  frameRate(60);
}

function draw() {
  game_state.game();
}

function keyPressed() {
  let s = game_state.snake;
  let sp = game_state.spacing;
  if (keyCode === UP_ARROW) {
    s.setNewVelocity({
      x: 0,
      y: -sp
    });
  } else if (keyCode === DOWN_ARROW) {
    s.setNewVelocity({
      x: 0,
      y: sp
    });
  } else if (keyCode === LEFT_ARROW) {
    s.setNewVelocity({
      x: -sp,
      y: 0
    });
  } else if (keyCode === RIGHT_ARROW) {
    s.setNewVelocity({
      x: sp,
      y: 0
    });
  }
}