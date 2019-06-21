function growingSquare(input, min1, max1, min2, max2) {
  var size;
  size = map(input, min1, max1, min2, max2) - max2 / 2;
  if (size >= max2) {
    size = max2;
  } else if (size < 1) {
    size = 0;
  }
  return size;
}

function checkCollisions() {
  let pos = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (let j = 0; j < arguments[i].length; j++) {
        if (pos.x == arguments[i][j].x && pos.y == arguments[i][j].y) {
          return true;
        }
      }
    } else {
      if (pos.x == arguments[i].x && pos.y == arguments[i].y) {
        return true;
      }
    }
  }
  return false;
}

function drawAssets(
  GS,
  snake_head_size,
  snake_body_surrogate,
  food_size,
  mystery_box_size
) {
  let snake = GS.snake;
  let food = GS.food;
  let mystery_box = GS.mystery_box; 
  let scheme = GS.current_color_scheme;
  push();
  mystery_box.show(
    scheme.getMBC(),
    scheme.getMBSC(),
    scheme.getSW(),
    mystery_box_size
  );
  square(food.position.x, food.position.y, food_size);
  food.drawNormal(
    food.position.x,
    food.position.y,
    scheme.getFC(),
    scheme.getFSC(),
    scheme.getSW(),
    food_size
  );
  for (let l = 0; l < snake_body_surrogate.length; l++) {
    snake.drawSegment(
      snake_body_surrogate[l].x,
      snake_body_surrogate[l].y,
      snake_body_surrogate[l].size,
      scheme.getSC(),
      scheme.getSSC(),
      scheme.getSW()
    );
  }
  snake.showHead(
    snake.position.x,
    snake.position.y,
    scheme.getSC(),
    scheme.getSTC(),
    scheme.getSSC(),
    scheme.getSW(),
    snake_head_size,
    GS.spacing
  );
  pop();
}

function deathGridAnimation(GS) {
  let gw = GS.game_width;
  let gh = GS.game_height;
  let gridw = GS.grid_width;
  let gridh = GS.grid_height;
  let sp = GS.spacing;
  let scheme = GS.current_color_scheme;
  let snake = GS.snake;
  let food = GS.food;
  let mystery_box = GS.mystery_box;
  var snake_head_size;
  var snake_body_surrogate = new Array();
  var food_size;
  var mystery_box_size;
  if (typeof this.running == "undefined") {
    this.max_x = gw / 2 / sp;
    this.max_y = gh / 2 / sp;
    this.min_x = -this.max_x;
    this.min_y = -this.max_y;
    this.x_counter = this.max_x;
    this.y_counter = this.max_y * 4;
    this.running = 1;
  }
  push();
  GS.translateGame();
  GS.showBackground();
  for (let i = this.y_counter; i >= this.min_y; i--) {
    for (let j = this.min_x, k = i; k >= this.min_y; ) {
      let curr_x = j * sp;
      let curr_y = k * sp;
      let current_pos = { x: curr_x, y: curr_y };
      let collision;
      if (mystery_box.isVisible()) {
        collision = checkCollisions(
          current_pos,
          snake.position,
          food.position,
          mystery_box.position,
          snake.body
        );
      } else {
        collision = checkCollisions(
          current_pos,
          snake.position,
          food.position,
          snake.body
        );
      }
      if (curr_x < gw / 2 && curr_y < gh / 2) {
        var size;
        size = growingSquare(this.y_counter - i, this.min_y, this.max_y, 0, sp);
        if (!collision) {
          if (
            curr_x >= gridw / 2 ||
            curr_y >= gridh / 2 ||
            curr_x < -(gridw / 2) ||
            curr_y < -(gridh / 2)
          ) {
            noFill();
            stroke(scheme.getGBC());
            strokeWeight(3);
            square(curr_x, curr_y, size);
          } else {
            noFill();
            stroke(scheme.getGC());
            strokeWeight(3);
            square(curr_x, curr_y, size);
          }
        }
        for (let l = 0; l < snake.body.length; l++) {
          if (snake.body[l].x == curr_x && snake.body[l].y == curr_y) {
            snake_body_surrogate.push({ x: curr_x, y: curr_y, size: size });
            break;
          }
        }
        if (curr_x == snake.position.x && curr_y == snake.position.y) {
          snake_head_size = size;
        } else if (curr_x == food.position.x && curr_y == food.position.y) {
          food_size = size;
        } else if (
          curr_x == mystery_box.position.x &&
          curr_y == mystery_box.position.y
        ) {
          mystery_box_size = size;
        }
      }
      k--;
      j++;
    }
  }
  drawAssets(GS, snake_head_size, snake_body_surrogate, food_size, mystery_box_size);
  pop();
  if (this.y_counter <= this.min_y) {
    this.running = undefined;
    return false;
  } else {
    this.y_counter -= 1;
    return true;
  }
}

function introGridAnimation(GS) {
  let gw = GS.game_width;
  let gh = GS.game_height;
  let sp = GS.spacing;
  let scheme = GS.current_color_scheme;
  let snake = GS.snake;
  let food = GS.food;
  let mod_gw = gw / 2 / sp;
  let mod_gh = gh / 2 / sp;
  var snake_head_size;
  var snake_body_surrogate = new Array();
  var food_size;
  if (typeof this.running == "undefined") {
    this.max_x = gw / 2 / sp;
    this.max_y = gh / 2 / sp;
    this.min_x = -this.max_x;
    this.min_y = -this.max_y;
    this.x_counter = this.min_x;
    this.y_counter = this.min_y;
    this.running = 1;
  }
  push();
  GS.translateGame();
  GS.showBackground();
  for (let i = this.y_counter; i >= this.min_y; i--) {
    for (let j = this.min_x, k = i; k >= this.min_y; ) {
      let curr_x = j * sp;
      let curr_y = k * sp;
      let current_pos = { x: curr_x, y: curr_y };
      let collision = checkCollisions(
        current_pos,
        snake.position,
        food.position,
        snake.body
      );
      if (curr_x < gw / 2 && curr_y < gh / 2) {
        var size;
        size = growingSquare(this.y_counter - i, this.min_y, this.max_y, 0, sp);
        if (!collision) {
          noFill();
          stroke(scheme.getGC());
          strokeWeight(3);
          square(curr_x, curr_y, size);
        }
        for (let l = 0; l < snake.body.length; l++) {
          if (curr_x == snake.body[l].x && curr_y == snake.body[l].y) {
            snake_body_surrogate.push({ x: curr_x, y: curr_y, size: size });
            break;
          }
        }
        if (curr_x == snake.position.x && curr_y == snake.position.y) {
          snake_head_size = size;
        } else if (curr_x == food.position.x && curr_y == food.position.y) {
          food_size = size;
        }
      }
      k--;
      j++;
    }
  }
  drawAssets(GS, snake_head_size, snake_body_surrogate, food_size, 0);
  pop();
  if (this.y_counter >= Math.sqrt(mod_gw * mod_gw + mod_gh * mod_gh) * 3) {
    this.running = undefined;
    return false;
  } else {
    this.y_counter += 1;
    return true;
  }
}


function introSnakeAnimation(GS) {
  let sp = GS.spacing;
  let sh = GS.sketch_height;
  let scheme = GS.current_color_scheme;
  let intro_snake = GS.intro_snake;
  if (typeof this.time == "undefined") {
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
  } else if (intro_snake.position.y >= sh + intro_snake.body.length * sp) {
    //exit condition
    return false;
  } else {
    if (typeof this.remove_duplicates == "undefined") {
      for (let i = 0; i < intro_snake.body.length; ) {
        for (let j = 0; j < i; ) {
          if (
            intro_snake.body[i].x == intro_snake.body[j].x &&
            intro_snake.body[i].y == intro_snake.body[j].y
          ) {
            intro_snake.body.splice(j, 1);
          } else {
            break;
          }
        }
        i++;
      }
      this.remove_duplicates = true;
    }
    //just travel down
    intro_snake.position.y += sp;
  }
  intro_snake.updateBodyPosition(old_x, old_y);
  push();
  translate(GS.game_position.x, GS.game_position.y);
  intro_snake.show(
    scheme.getSC(),
    scheme.getSTC(),
    scheme.getSSC(),
    scheme.getSW(),
    sp
  );
  pop();
  this.time++;
  return true;
}

function introAnimation(GS) {
  push();
  GS.translateGame();
  GS.showBackground();
  pop();
  return introSnakeAnimation(GS);
}
