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
    this.mystery_box;
    this.current_score = 0;
    this.state_flags;
    this.mystery_flags;
    this.mystery_timers;
  }
  incrementScore() {
    this.current_score++;
  }
  resetScore() {
    this.current_score = 0;
  }
  initFlags() {
    this.state_flags = {
      intro: false,
      intro_grid: true,
      death_grid: false,
      new_game: false,
      game: false,
    };
    this.mystery_flags = {
      rotate: false,
      invisible_snake: false 
    }
  }
  resetMysteryFlags(){
    this.mystery_flags = {
      rotate: false,
      invisible_snake: false
    }
  }
  initMysteryTimers(){
    this.mystery_timers = {
      rotation : newRotationTimer(),
      invisible_snake : newInvisibleSnakeTimer() 
    };
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
      if (new_pos == this.snake.position) {
        occupied = true;
      }
      if (!(typeof this.mystery_box == "undefined")) {
        if (this.mystery_box.isActive()) {
          if (new_pos == this.mystery_box.position) {
            occupied = true;
          }
        }
      } 
      if (!(typeof this.food == "undefined")) {
        if (this.food.isAlive()) {
          if (new_pos == this.food.pos) {
            occupied = true;
          }
        }
      } 
      for (let i = 0; i < this.snake.body.length; i++) {
        if (
          new_pos.x == this.snake.body[i].x &&
          new_pos.y == this.snake.body[i].y
        )
          occupied = true;
      }
      
    } while (occupied);
    return new_pos;
  }
  newFood() {
    var new_pos = this.generateUnnocupiedPosition();
    return new Food(new_pos, { width: _INIT_WIDTH, height: _INIT_HEIGHT });
  }
  randomMystery(){
    let min = 1;
    let max = 3;
    let rand = Math.floor(Math.random() * (max - min)) + min; 
    switch(rand){
        case 1:
            return "rotate";
        case 2:
            return "invisible_snake";
    }
  }
  newMysteryBox() {
    var new_pos = this.generateUnnocupiedPosition();
    return new MysteryBox(
      new_pos,
      {
        width: _INIT_WIDTH,
        height: _INIT_HEIGHT
      },
      this.randomMystery()
    );
  }
  initSnakeAndFood() {
    this.snake = this.newSnake();
    this.food = this.newFood();
    this.mystery_box = this.newMysteryBox();
  }
  updateGame() {
    let s = this.snake;
    let f = this.food;
    let m = this.mystery_box;
    if (!floor(frameCount % this.speed)) {
      if (!s.isAlive()) {
        this.state_flags.game = false;
        this.state_flags.death_grid = true;
      } else if (!f.isAlive()) {
        this.food = this.newFood();
        this.food.makeAlive();
        this.incrementScore();
      } else if (m.isCollected()) {
        //console.log(m.mystery);
        this.mystery_flags[m.mystery] = true;
        m.collected = false;
      } else if (!m.isActive()){
        this.mystery_box = this.newMysteryBox();
      }
      if (!(typeof s == "undefined")) {
        s.update(
          this.game_width,
          this.game_height,
          this.spacing,
          f.position,
          !this.mystery_flags.invisible_snake,
          this.mystery_timers.invisible_snake.getTime()
        );
        f.update(s.position);
        m.update(s.position);
      }
      if (m.isWaiting()) {
        mystery_box_timer.timer();
      }
      if(this.mystery_flags.invisible_snake){
        this.mystery_timers.invisible_snake.timer();
      }
    }
  }
  newGame() {
    if (this.state_flags.new_game) {
      this.snake = this.newSnake();
      this.food = this.newFood();
      this.mystery_box = this.newMysteryBox();
      this.resetScore();
      this.state_flags.new_game = false;
      this.resetMysteryFlags();
      this.initMysteryTimers();
      this.state_flags.intro_grid = true;
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
    for (let i = -(sw / 2) / sp; i < sw / sp / 2; i++) {
      for (let j = -(sh / 2) / sp; j < sh / sp / 2; j++) {
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
    translate(
      this.game_width / 2 + this.game_position.x,
      this.game_height / 2 + this.game_position.y
    );
    if (this.mystery_flags.rotate) {
      this.mystery_timers.rotation.timer();
      rotate(this.mystery_timers.rotation.getTime());
    }
  }
  showGame() {
    let s = this.snake;
    let f = this.food;
    let m = this.mystery_box;
    let scheme = this.current_color_scheme;
    push();
    this.translateGame();
    this.drawGrid();
    f.show(scheme.getFC(), scheme.getFSC(), scheme.getSW(), this.spacing);
    s.show(
      scheme.getSC(),
      scheme.getSIC(),
      scheme.getSTC(),
      scheme.getSSC(),
      scheme.getSW(),
      this.spacing
    );
    m.show(scheme.getMBC(), scheme.getMBSC(), scheme.getSW(), this.spacing);
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
    if (this.state_flags.intro) {
      if (typeof this.intro_snake == "undefined") {
        this.intro_snake = this.initIntroSnake();
        this.intro_snake.makeAlive();
      }
      this.state_flags.intro = introAnimation(this);
      if (this.state_flags.intro == false) {
        this.intro_snake = undefined;
        this.state_flags.intro_grid = true;
      }
    } else if (this.state_flags.intro_grid) {
      this.state_flags.intro_grid = introGridAnimation(this);
      if (!this.state_flags.intro_grid) {
        this.state_flags.game = true;
        this.food.makeAlive();
        this.snake.makeAlive();
      }
    } else if (this.state_flags.death_grid) {
      this.state_flags.death_grid = deathGridAnimation(this);
      if (!this.state_flags.death_grid) {
        this.state_flags.new_game = true;
      }
    } else if (this.state_flags.new_game) {
      this.newGame();
    } else if (this.state_flags.game) {
      this.updateGame();
      if (!(typeof this.snake == "undefined")) {
        this.showAll();
      }
    }
  }
}

function generateRandomPosition(x_max, y_max, spacing) {
  let up_lim_x = x_max / 2 / spacing;
  let bot_lim_x = -(x_max / 2) / spacing;
  let up_lim_y = y_max / 2 / spacing;
  let bot_lim_y = -(y_max / 2) / spacing;
  let x = floor(random(bot_lim_x, up_lim_x));
  let y = floor(random(bot_lim_y, up_lim_y));
  var pos = {
    x: x * spacing,
    y: y * spacing
  };
  return pos;
}

const _SKETCH_WIDTH = 800;
const _SKETCH_HEIGHT = 750;
const _GAME_WIDTH = 600;
const _GAME_HEIGHT = 600;
const _GAME_POSITION = { x: 100, y: 100 };
const _SPACING = 20;
const _SPEED = 5;
const _SPEED_INCREASE = 0.5;
const _INIT_SNAKE_POSITION_X = 0;
const _INIT_SNAKE_POSITION_Y = 0;
const _INIT_SNAKE_VELOCITY_X = _SPACING;
const _INIT_SNAKE_VELOCITY_Y = 0;
const _INIT_BODY_LENGTH = 6;
const _GROWTH_RATE = 3;
const _INIT_WIDTH = _SPACING;
const _INIT_HEIGHT = _SPACING;
