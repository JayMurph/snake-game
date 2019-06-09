function deathGridAnimation(GS) {
  let gw = GS.game_width;
  let gh = GS.game_height;
  let sp = GS.spacing;
  let scheme = GS.current_color_scheme;
  let snake = GS.snake;
  let food = GS.food;
  if (typeof this.running == "undefined") {
    this.max_x = ((gw / 2) / sp);
    this.max_y = ((gh / 2) / sp);
    this.min_x = -this.max_x;
    this.min_y = -this.max_y;
    this.x_counter = this.max_x;
    this.y_counter = this.max_y * 4;
    this.running = 1;
  }
  push();
  GS.translateGame();
  GS.showBackground();
  noFill();
  stroke(scheme.getGC());
  strokeWeight(3);
  var draw_snake_head;
  var draw_snake_body = new Array();
  var draw_food;
  for (let i = this.y_counter; i >= this.min_y; i--) {
    for (let j = this.min_x, k = i; k >= this.min_y; ) {
      let curr_x = j * sp;
      let curr_y = k * sp;
      if (curr_x < gw / 2 && curr_y < gh / 2) {
        var size;
        size = map(this.y_counter - i, this.min_y, this.max_y, 0, sp) - 10;
        if (size >= sp) {
          size = sp;
        } else if (size < 1) {
          size = 0;
        }
        for (let l = 0; l < snake.body.length; l++) {
          if (snake.body[l].x == curr_x && snake.body[l].y == curr_y) {
            draw_snake_body.push({
              x: curr_x,
              y: curr_y,
              size: size
            });
            break;
          }
        }
        if (curr_x == snake.position.x && curr_y == snake.position.y) {
          draw_snake_head = {
            x: curr_x,
            y: curr_y,
            velx: snake.velocity.x,
            vely: snake.velocity.y,
            size: size
          };
        } else if (curr_x == food.position.x && curr_y == food.position.y) {
          draw_food = {
            x: curr_x,
            y: curr_y,
            size: size
          };
        } else {
          square(curr_x, curr_y, size);
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
  if (!(typeof draw_food == "undefined")) {
    square(draw_food.x, draw_food.y, draw_food.size);
    food.drawNormal(
      draw_food.x,
      draw_food.y,
      scheme.getFC(),
      scheme.getFSC(),
      scheme.getSW(),
      draw_food.size
    );
  }
  if (!(typeof draw_snake_body[0] == "undefined")) {
    if (!(draw_snake_body.length == 0)) {
      for (let i = 0; i < draw_snake_body.length; i++) {
        snake.drawSegment(
          draw_snake_body[i].x,
          draw_snake_body[i].y,
          draw_snake_body[i].size,
          color,
          stroke_color,
          stroke_weight
        );
      }
    }
  }
  if (!(typeof draw_snake_head == "undefined")) {
      snake.showHeadDead(
      draw_snake_head.x,
      draw_snake_head.y,
      color,
      tongue_color,
      stroke_color,
      stroke_weight,
      draw_snake_head.size,
      sp
      );
  }
  if (this.y_counter <= this.min_y) {
    pop();
    this.running = undefined;
    return false;
  } else {
    this.y_counter -= 1;
    pop();
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
  let mod_gw = (gw / 2) / sp;
  let mod_gh = (gh / 2) / sp;
  if (typeof this.running == "undefined") {
    this.max_x = ((gw / 2) / sp);
    this.max_y = ((gh / 2) / sp);
    this.min_x = -this.max_x;
    this.min_y = -this.max_y;
    this.x_counter = this.min_x;
    this.y_counter = this.min_y;
    this.running = 1;
  }
  push();
  GS.translateGame();
  GS.showBackground();
  noFill();
  stroke(scheme.getGC());
  strokeWeight(3);
  var draw_snake_head;
  var draw_snake_body = new Array();
  var draw_food;
  for (let i = this.y_counter; i >= this.min_y; i--) {
    for (let j = this.min_x, k = i; k >= this.min_y; ) {
      let curr_x = j * sp;
      let curr_y = k * sp;
      if (curr_x < gw / 2 && curr_y < gh / 2) {
        var size;
        size = map(this.y_counter - i, this.min_y, this.max_y, 0, sp) - 10;
        if (size >= sp) {
          size = sp;
        } else if (size < 1) {
          size = 0;
        }
        for (let l = 0; l < snake.body.length; l++) {
          if (curr_x == snake.body[l].x && curr_y == snake.body[l].y) {
            draw_snake_body.push({
              x: curr_x,
              y: curr_y,
              size: size
            });
            break;
          }
        }
        if (curr_x == snake.position.x && curr_y == snake.position.y) {
          draw_snake_head = {
            x: curr_x,
            y: curr_y,
            size: size
          };
        } else if (curr_x == food.position.x && curr_y == food.position.y) {
          draw_food = {
            x: curr_x,
            y: curr_y,
            size: size
          };
        } else {
          square(curr_x, curr_y, size);
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
  if (!(typeof draw_snake_head == "undefined")) {
      snake.showHead(
      draw_snake_head.x,
      draw_snake_head.y,
      color,
      tongue_color,
      stroke_color,
      stroke_weight,
      draw_snake_head.size,
      sp
      );
  }
  if (!(typeof draw_snake_body[0] == "undefined")) {
    if (!(draw_snake_body.length == 0)) {
      for (let i = 0; i < draw_snake_body.length; i++) {
        snake.drawSegment(
          draw_snake_body[i].x,
          draw_snake_body[i].y,
          draw_snake_body[i].size,
          color,
          stroke_color,
          stroke_weight
        );
      }
    }
  }
  if (!(typeof draw_food == "undefined")) {
    square(draw_food.x, draw_food.y, draw_food.size);
    food.drawNormal(
      draw_food.x,
      draw_food.y,
      scheme.getFC(),
      scheme.getFSC(),
      scheme.getSW(),
      draw_food.size
    );
  }
  if (this.y_counter >= Math.sqrt(mod_gw * mod_gw + mod_gh * mod_gh) * 3) {
    pop();
    this.running = undefined;
    return false;
  } else {
    this.y_counter += 1;
    pop();
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
