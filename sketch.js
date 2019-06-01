var game_state;
var color_schemes_arr = [];
var intro_flag = true;
var intro_grid_flag = false;
var death_grid_flag = false;
var new_game_flag = false;
var game_flag = false;
var intro_snake;


function initIntroSnake() {
  let pos_x = -5;
  let pos_y = floor(game_state.game_height / game_state.spacing) + 2;
  return new Snake({
      x: pos_x,
      y: pos_y
    }, {
      width: _INIT_WIDTH,
      height: _INIT_HEIGHT
    }, {
      x: 0,
      y: 0
    },
    330, 0
  )
}

function animateDeathGrid() {
  let sp = game_state.spacing;
  let sw = game_state.game_width;
  let sh = game_state.game_height;
  let mod_sw = game_state.game_width / sp;
  let mod_sh = game_state.game_height / sp;
  let scheme = game_state.current_color_scheme;
  if (typeof this.part1 == 'undefined') {
    this.limit_x = (sw / sp) - 1;
    this.limit_y = (sh / sp) - 1;
    this.x_counter = this.limit_x;
    this.y_counter = this.limit_y;
    this.part1 = 0;
    this.incr = 29;
  }
  push();
  game_state.translateGame();
  game_state.showBackground();
  noFill();
  stroke(scheme.getGC());
  strokeWeight(3);
  var draw_snake_head;
  var draw_snake_body = new Array;
  var draw_food;
  for (let i = this.y_counter; i >= 0; i--) {
    for (let j = 0, k = i; k >= 0;) {
      if (j < mod_sw && k < mod_sh) {
        var size;
        size = map((this.y_counter - i), 0, this.limit_y, 0, sp);
        if (size >= sp) {
          size = sp;
        } else if (size < 1){
          size = 0;
        }
        for (let l = 0; l < game_state.snake.body.length; l++) {
          if (game_state.snake.body[l].x == j &&
            game_state.snake.body[l].y == k ) {
            let x_coord = j * sp;
            let y_coord = k * sp;
            draw_snake_body.push({
              x: x_coord,
              y: y_coord,
              size: size
            });
            break;
          }
        }
        if (j == game_state.snake.position.x && k == game_state.snake.position.y) {
          let x_coord = j * sp;
          let y_coord = k * sp;
          draw_snake_head = {
            x: x_coord,
            y: y_coord,
            velx: game_state.snake.velocity.x,
            vely: game_state.snake.velocity.y,
            size: size
          };
        } else if (j == game_state.food.position.x && k == game_state.food.position.y) {
          let x_coord = j * sp;
          let y_coord = k * sp;
          draw_food = {
            x: x_coord,
            y: y_coord,
            size: size
          };
        } else {
          square(j * sp, k * sp, size);
        }
      }
      k--;
      j++;
    }
  }
  let color = scheme.getSC();
  let stroke_color = scheme.getSSC();
  let stroke_weight = scheme.getSW();
  let tongue_color = scheme.getSTC();
  if (!(typeof draw_food == 'undefined')) {
    game_state.food.showNormal(draw_food.x, draw_food.y,
      scheme.getFC(),
      scheme.getFSC(),
      scheme.getSW(),
      draw_food.size
    );
  }
  if (!(typeof draw_snake_body[0] == 'undefined')) {
    if (!(draw_snake_body.length == 0)) {
      for (let i = 0; i < draw_snake_body.length; i++) {
        game_state.snake.drawSegmentNormal(
          draw_snake_body[i].x, draw_snake_body[i].y, draw_snake_body[i].size, color, stroke_color, stroke_weight
        );
      }
    }
  }
  if (!(typeof draw_snake_head == 'undefined')) {
    game_state.snake.showHeadNormal(draw_snake_head.x, draw_snake_head.y, draw_snake_head.size, color, stroke_color, stroke_weight, draw_snake_head.size);
    game_state.snake.drawTongueNormal(draw_snake_head.x, draw_snake_head.y, tongue_color, stroke_weight, draw_snake_head.size);
    game_state.snake.drawDeadEyesNormal(draw_snake_head.x, 
      draw_snake_head.y, draw_snake_head.velx, draw_snake_head.vely,
      stroke_color, stroke_weight, draw_snake_head.size);
  }
  if (this.incr <= 0) {
    pop();
    return false;
  }
  if (this.y_counter <= 0) {
    this.incr -= 1;
    pop();
    return true;
  } else {
    this.y_counter -= 1;
    pop();
    return true;
  }
}

function animateIntroGrid() {
  let sp = game_state.spacing;
  let sw = game_state.game_width;
  let sh = game_state.game_height;
  let mod_sw = game_state.game_width / sp;
  let mod_sh = game_state.game_height / sp;
  let scheme = game_state.current_color_scheme;
  if (typeof this.part1 == 'undefined') {
    this.limit_x = (sw / sp) - 1;
    this.limit_y = (sh / sp) - 1;
    this.x_counter = 0;
    this.y_counter = 0;
    this.part1 = 0;
    this.incr = 0;
  }
  var draw_snake_head;
  var draw_snake_body = new Array;
  var draw_food;
  push();
  game_state.translateGame();
  game_state.showBackground();
  noFill();
  stroke(scheme.getGC());
  strokeWeight(3);
  for (let i = this.y_counter; i >= 0; i--) {
    for (let j = 0, k = i; k >= 0;) {
      if (j < mod_sw && k < mod_sh) {
        var size;
        size = map((this.y_counter - i), 0, this.limit_y, 0, sp);
        if (size >= sp) {
          size = sp;
        } else if (size < 1){
          size = 0;
        }
        for (let l = 0; l < game_state.snake.body.length; l++) {
          if (game_state.snake.body[l].x == j &&
            game_state.snake.body[l].y == k) {
            let x_coord = j * sp;
            let y_coord = k * sp;
            draw_snake_body.push({
              x: x_coord,
              y: y_coord,
              size: size
            });
            break;
          }
        }
        if (j == game_state.snake.position.x && k == game_state.snake.position.y) {
          let x_coord = j * sp;
          let y_coord = k * sp;
          draw_snake_head = {
            x: x_coord,
            y: y_coord,
            size: size
          };
        } else if (j == game_state.food.position.x && k == game_state.food.position.y) {
          let x_coord = j * sp;
          let y_coord = k * sp;
          draw_food = {
            x: x_coord,
            y: y_coord,
            size: size
          };
        } else {
          square(j * sp, k * sp, size);
        }
      }
      k--;
      j++;
    }
  }
  let color = scheme.getSC();
  let stroke_color = scheme.getSSC();
  let stroke_weight = scheme.getSW();
  let tongue_color = scheme.getSTC();
  if (!(typeof draw_snake_head == 'undefined')) {
    game_state.snake.showHeadNormal(draw_snake_head.x, draw_snake_head.y, draw_snake_head.size, color, stroke_color, stroke_weight, draw_snake_head.size);
    game_state.snake.drawTongueNormal(draw_snake_head.x, draw_snake_head.y, tongue_color, stroke_weight, draw_snake_head.size);
    game_state.snake.drawEyesNormal(draw_snake_head.x, draw_snake_head.y, stroke_color, stroke_weight, draw_snake_head.size);
  }
  if (!(typeof draw_snake_body[0] == 'undefined')) {
    if (!(draw_snake_body.length == 0)) {
      for (let i = 0; i < draw_snake_body.length; i++) {
        game_state.snake.drawSegmentNormal(
          draw_snake_body[i].x, draw_snake_body[i].y, draw_snake_body[i].size, color, stroke_color, stroke_weight
        );
      }
    }
  }
  if (!(typeof draw_food == 'undefined')) {
    game_state.food.showNormal(draw_food.x, draw_food.y,
      scheme.getFC(),
      scheme.getFSC(),
      scheme.getSW(),
      draw_food.size
    );
  }
  if (this.incr >= 30) {
    pop();
    return false;
  }
  if (this.y_counter >= Math.sqrt(((mod_sw * mod_sw) + (mod_sh * mod_sh))) * 2) {
    this.incr += 1;
    pop();
    return true;
  } else {
    this.y_counter += 1;
    pop();
    return true;
  }
}

function animateIntroSnake() {
  if (typeof this.time == 'undefined') {
    this.time = 0;
  }
  var old_x = intro_snake.position.x;
  var old_y = intro_snake.position.y;
  if (this.time < intro_snake_moves.length) {
    let pos_x = intro_snake_moves[time].x;
    let pos_y = intro_snake_moves[time].y;
    intro_snake.position.x += pos_x;
    intro_snake.position.y += pos_y;
    intro_snake.velocity.x = pos_x;
    intro_snake.velocity.y = pos_y;
  } else if (intro_snake.position.y >= game_state.sketch_height / game_state.spacing + intro_snake.body.length) {
    //exit condition
    return false;
  } else {
    if (typeof this.remove_dup == 'undefined') {
      for (let i = 0; i < intro_snake.body.length;) {
        for (let j = 0; j < i;) {
          if (intro_snake.body[i].x == intro_snake.body[j].x &&
            intro_snake.body[i].y == intro_snake.body[j].y) {
            intro_snake.body.splice(j, 1);
          } else {
            break;
          }
        }
        i++;
      }
      this.remove_dup = true;
    }
    //just travel down
    intro_snake.position.y += 1;
  }
  let scheme = game_state.current_color_scheme;
  intro_snake.updateBodyPosition(old_x, old_y);
  push();
  translate(game_state.game_position.x, game_state.game_position.y);
  intro_snake.show(
    scheme.getSC(),
    scheme.getSTC(),
    scheme.getSSC(),
    scheme.getSW(),
    game_state.spacing
  )
  pop();
  this.time++;
  return true;
}

function intro() {
  push();
  game_state.translateGame();
  game_state.showBackground();
  pop();
  return animateIntroSnake();
}

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

function game() {
  if (intro_flag) {
    if (typeof intro_snake == 'undefined') {
      intro_snake = initIntroSnake();
      intro_snake.alive = 1;
    }
    intro_flag = intro();
    if (intro_flag == false) {
      intro_snake = undefined;
      intro_grid_flag = true;
    }
  } else if (intro_grid_flag) {
    intro_grid_flag = animateIntroGrid();
    if (!intro_grid_flag) {
      game_flag = true;
      game_state.food.alive = 1;
      game_state.snake.alive = 1;
    }
  } else if (death_grid_flag) {
    death_grid_flag = animateDeathGrid();
    if (!death_grid_flag) {
      new_game_flag = true;
    }
  } else if (new_game_flag) {
    game_state.newGame();
  } else if (game_flag) {
    game_state.updateGame();
    if (!(typeof game_state.snake == 'undefined')) {
      game_state.showAll();
    }
  }
}

function draw() {
  game();
}

function keyPressed() {
  let s = game_state.snake;
  if (keyCode === UP_ARROW) {
    s.setNewVelocity({
      x: 0,
      y: -1
    });
  } else if (keyCode === DOWN_ARROW) {
    s.setNewVelocity({
      x: 0,
      y: 1
    });
  } else if (keyCode === LEFT_ARROW) {
    s.setNewVelocity({
      x: -1,
      y: 0
    });
  } else if (keyCode === RIGHT_ARROW) {
    s.setNewVelocity({
      x: 1,
      y: 0
    });
  }
}