class GameState {
  constructor(
    sketch_width,
    sketch_height,
    game_width,
    game_height,
    game_position,
    speed,
    speed_increase,
    spacing,
    current_color_scheme
  ) {
    this.sketch_width = sketch_width;
    this.sketch_height = sketch_height;
    this.game_width = game_width;
    this.game_height = game_height;
    this.game_position = game_position;
    this.speed = speed;
    this.speed_increase = speed_increase;
    this.spacing = spacing;
    this.current_color_scheme = current_color_scheme;
    this.snake;
    this.intro_snake;
    this.food;
    this.current_score = 0;
    this.intro_flag = true;
    this.intro_grid_flag = false;
    this.death_grid_flag = false;
    this.new_game_flag = false;
    this.game_flag = false;
  }
  incrementScore() {
    this.current_score++;
  }
  resetScore() {
    this.current_score = 0;
  }
  newSnake() {
    return new Snake(
      { x: _INIT_SNAKE_POSITION_X, y: _INIT_SNAKE_POSITION_Y },
      { width: _INIT_WIDTH, height: _INIT_HEIGHT },
      { x: _INIT_SNAKE_VELOCITY_X, y: _INIT_SNAKE_VELOCITY_Y },
      _INIT_BODY_LENGTH,
      _GROWTH_RATE
    );
  }
  initIntroSnake() {
    let pos_x = -5 * this.spacing;
    let pos_y = floor(this.game_height) + 2 * this.spacing;
    return new Snake(
      {
        x: pos_x,
        y: pos_y
      },
      {
        width: _INIT_WIDTH,
        height: _INIT_HEIGHT
      },
      {
        x: 0,
        y: 0
      },
      330,
      0
    );
  }
  generateUnnocupiedPosition() {
    var new_pos;
    var occupied;
    do {
      occupied = false;
      new_pos = generateRandomPosition(
        this.game_width,
        this.game_height,
        this.spacing
      );
      if (new_pos == this.snake.position) occupied = true;
      else {
        for (let i = 0; i < this.snake.body.length; i++) {
          if (
            new_pos.x == this.snake.body[i].x &&
            new_pos.y == this.snake.body[i].y
          )
            occupied = true;
        }
      }
    } while (occupied);
    return new_pos;
  }
  newFood() {
    var new_pos = this.generateUnnocupiedPosition();
    return new Food(new_pos, { width: _INIT_WIDTH, height: _INIT_HEIGHT });
  }
  initSnakeAndFood() {
    this.snake = this.newSnake();
    this.food = this.newFood();
  }
  updateGame() {
    let s = this.snake;
    let f = this.food;
    if (!floor(frameCount % this.speed)) {
      if (!s.isAlive()) {
        this.game_flag = false;
        this.death_grid_flag = true;
      } else if (!f.isAlive()) {
        this.food = this.newFood();
        this.food.makeAlive();
        this.incrementScore();
      }
      if (!(typeof s == "undefined")) {
        s.update(this.game_width, this.game_height, this.spacing, f.position);
        f.update(s.position);
      }
    }
  }
  newGame() {
    if (this.new_game_flag) {
      this.snake = this.newSnake();
      this.food = this.newFood();
      this.resetScore();
      this.new_game_flag = false;
      this.intro_grid_flag = true;
    }
  }
  drawGrid() {
    let sp = this.spacing;
    let sw = this.game_width;
    let sh = this.game_height;
    let scheme = this.current_color_scheme;
    push();
    noFill();
    stroke(scheme.getGC());
    strokeWeight(3);
    for (let i = 0; i < sw / sp; i++) {
      for (let j = 0; j < sh / sp; j++) {
        square(i * sp, j * sp, sp);
      }
    }
    pop();
  }
  showScore() {
    let scheme = this.current_color_scheme;
    push();
    textAlign(CENTER);
    fill(scheme.getTC());
    textSize(25);
    textFont("Arial");
    text("score = " + this.current_score, this.sketch_width / 2, 50);
    pop();
  }
  translateGame() {
    translate(this.game_position.x, this.game_position.y);
  }
  showGame() {
    let s = this.snake;
    let f = this.food;
    let scheme = this.current_color_scheme;
    push();
    this.translateGame();
    this.drawGrid();
    f.show(scheme.getFC(), scheme.getFSC(), scheme.getSW(), this.spacing);
    s.show(
      scheme.getSC(),
      scheme.getSTC(),
      scheme.getSSC(),
      scheme.getSW(),
      this.spacing
    );
    pop();
  }
  showBackground() {
    background(this.current_color_scheme.getBGC());
  }
  showAll() {
    this.showBackground();
    this.showScore();
    this.showGame();
  }
  game() {
    if (this.intro_flag) {
      if (typeof this.intro_snake == "undefined") {
        this.intro_snake = this.initIntroSnake();
        this.intro_snake.makeAlive();
      }
      this.intro_flag = introAnimation(this);
      if (this.intro_flag == false) {
        this.intro_snake = undefined;
        this.intro_grid_flag = true;
      }
    } else if (this.intro_grid_flag) {
      this.intro_grid_flag = introGridAnimation(this);
      if (!this.intro_grid_flag) {
        this.game_flag = true;
        this.food.makeAlive();
        this.snake.makeAlive();
      }
    } else if (this.death_grid_flag) {
      this.death_grid_flag = deathGridAnimation(this);
      if (!this.death_grid_flag) {
        this.new_game_flag = true;
      }
    } else if (this.new_game_flag) {
      this.newGame();
    } else if (this.game_flag) {
      this.updateGame();
      if (!(typeof this.snake == "undefined")) {
        this.showAll();
      }
    }
  }
}

const _SKETCH_WIDTH = 800;
const _SKETCH_HEIGHT = 750;
const _GAME_WIDTH = 600;
const _GAME_HEIGHT = 600;
const _GAME_POSITION = { x: 100, y: 100 };
const _SPACING = 20;
const _SPEED = 5;
const _SPEED_INCREASE = 0.5;
const _INIT_SNAKE_POSITION_X = (_GAME_WIDTH / 2); 
const _INIT_SNAKE_POSITION_Y = (_GAME_HEIGHT / 2); 
const _INIT_SNAKE_VELOCITY_X = _SPACING;
const _INIT_SNAKE_VELOCITY_Y = 0;
const _INIT_BODY_LENGTH = 6;
const _GROWTH_RATE = 3;
const _INIT_WIDTH = _SPACING;
const _INIT_HEIGHT = _SPACING;

function generateRandomPosition(x_max, y_max,spacing) {
  let x = floor(random(0, x_max / spacing));
  let y = floor(random(0, y_max / spacing));
  var pos = {
    x: x * spacing,
    y: y * spacing 
  };
  return pos;
}