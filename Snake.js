class Snake {
  constructor(position, dimensions, velocity, init_body_length, growth_rate) {
    this.alive = false;
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = velocity;
    this.new_velocity = {
      x: 0,
      y: 0
    };
    this.direction_change_flag = 0;
    this.body_length = init_body_length;
    this.body = this.makeNewBody(this.body_length);
    this.grow_flag = 0;
    this.growth_rate = growth_rate;
    this.current_growth = 0;
    this.visible_body = true;
    this.invisibility_timer = 0;
    this.color = color(100, 100, 20);
  }
  isAlive() {
    return this.alive;
  }
  makeAlive() {
    this.alive = true;
  }
  changeDimensions(width, height) {
    this.dimensions.width = width;
    this.dimensions.height = height;
  }
  drawSegment(x_coord, y_coord, size, color, stroke_color, stroke_weight) {
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    square(x_coord, y_coord, size);
    pop();
  }
  showBody(color, stroke_color, stroke_weight) {
    for (let i = 0; i < this.body.length; i++) {
      let x_coord = this.body[i].x;
      let y_coord = this.body[i].y;
      this.drawSegment(
        x_coord,
        y_coord,
        this.dimensions.width,
        color,
        stroke_color,
        stroke_weight
      );
    }
  }
  showInvisibleBody(color, invisible_color, stroke_color, stroke_weight) {
    for (let i = 0; i < this.body.length; i++) {
      let x_coord = this.body[i].x;
      let y_coord = this.body[i].y;
      let timer = this.invisibility_timer;
      var temp_color;
      if (timer < 120) {
        temp_color = invisible_color;
      } else {
        if (sin(pow(timer - 100, 2)) > 0) {
          temp_color = color;
        } else {
          temp_color = invisible_color;
        }
      }
      this.drawSegment(
        x_coord,
        y_coord,
        this.dimensions.width,
        temp_color,
        stroke_color,
        stroke_weight
      );
    }
  }
  drawTongue(x_coord, y_coord, color, stroke_weight, size, spacing) {
    push();
    let mod_velx = this.velocity.x / spacing;
    let mod_vely = this.velocity.y / spacing;
    let center_x = x_coord + size / 2;
    let center_y = y_coord + size / 2;
    let start_x = center_x + (size / 2) * mod_velx;
    let start_y = center_y + (size / 2) * mod_vely;
    let end_x = center_x + size * mod_velx;
    let end_y = center_y + size * mod_vely;
    strokeWeight(stroke_weight);
    stroke(color);
    line(start_x, start_y, end_x, end_y);
    pop();
  }
  drawDeadEyes(x_coord, y_coord, velx, vely, size, spacing) {
    let mod_velx = velx / spacing;
    let mod_vely = vely / spacing;
    let center_x = x_coord + size / 2;
    let center_y = y_coord + size / 2;
    let eye_1_x = center_x + 5 * mod_vely;
    let eye_1_y = center_y + 5 * -mod_velx;
    let eye_2_x = center_x + 5 * -mod_vely;
    let eye_2_y = center_y + 5 * mod_velx;
    push();
    strokeWeight(1);
    stroke(0);
    line(eye_1_x + 3, eye_1_y + 3, eye_1_x - 3, eye_1_y - 3);
    line(eye_1_x + 3, eye_1_y - 3, eye_1_x - 3, eye_1_y + 3);
    line(eye_2_x + 3, eye_2_y + 3, eye_2_x - 3, eye_2_y - 3);
    line(eye_2_x + 3, eye_2_y - 3, eye_2_x - 3, eye_2_y + 3);
    pop();
  }
  drawEyes(x_coord, y_coord, stroke_color, stroke_weight, size, spacing) {
    let mod_velx = this.velocity.x / spacing;
    let mod_vely = this.velocity.y / spacing;
    let center_x = x_coord + size / 2;
    let center_y = y_coord + size / 2;
    let eye_1_x = center_x + 5 * mod_vely;
    let eye_1_y = center_y + 5 * -mod_velx;
    let eye_2_x = center_x + 5 * -mod_vely;
    let eye_2_y = center_y + 5 * mod_velx;
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    point(eye_1_x, eye_1_y);
    point(eye_2_x, eye_2_y);
    pop();
  }
  drawHeadSegment(
    x_coord,
    y_coord,
    size,
    color,
    stroke_color,
    stroke_weight,
    spacing
  ) {
    this.drawSegment(
      x_coord,
      y_coord,
      size,
      color,
      stroke_color,
      stroke_weight,
      spacing
    );
  }
  showHead(
    x_coord,
    y_coord,
    color,
    tongue_color,
    stroke_color,
    stroke_weight,
    size,
    spacing
  ) {
    this.drawHeadSegment(
      x_coord,
      y_coord,
      size,
      color,
      stroke_color,
      stroke_weight,
      size
    );
    this.drawTongue(
      x_coord,
      y_coord,
      tongue_color,
      stroke_weight,
      size,
      spacing
    );
    this.drawEyes(x_coord, y_coord, stroke_color, stroke_weight, size, spacing);
  }
  showHeadDead(
    x_coord,
    y_coord,
    color,
    tongue_color,
    stroke_color,
    stroke_weight,
    size,
    spacing
  ) {
    this.drawHeadSegment(
      x_coord,
      y_coord,
      size,
      color,
      stroke_color,
      stroke_weight,
      spacing
    );
    this.drawTongue(
      x_coord,
      y_coord,
      tongue_color,
      stroke_weight,
      size,
      spacing
    );
    this.drawDeadEyes(
      x_coord,
      y_coord,
      this.velocity.x,
      this.velocity.y,
      size,
      spacing
    );
  }
  introShow(color, tongue_color, stroke_color, stroke_weight, spacing) {
    this.showBody(color, stroke_color, stroke_weight);
    this.showHead(
      this.position.x,
      this.position.y,
      color,
      tongue_color,
      stroke_color,
      stroke_weight,
      this.dimensions.width,
      spacing
    );
  }
  show(
    color,
    invisible_color,
    tongue_color,
    stroke_color,
    stroke_weight,
    spacing
  ) {
    if (this.isAlive()) {
      if (this.visible_body) {
        this.showBody(color, stroke_color, stroke_weight);
      } else {
        this.showInvisibleBody(
          color,
          invisible_color,
          stroke_color,
          stroke_weight
        );
      }
      this.showHead(
        this.position.x,
        this.position.y,
        color,
        tongue_color,
        stroke_color,
        stroke_weight,
        this.dimensions.width,
        spacing
      );
    }
  }
  isOppositeDirection(new_velocity) {
    let v_x1 = new_velocity.x;
    let v_y1 = new_velocity.y;
    let v_x2 = this.velocity.x;
    let v_y2 = this.velocity.y;
    let result = false;
    if ((v_x1 != 0 && v_x1 == -v_x2) || (v_y1 != 0 && v_y1 == -v_y2)) {
      result = true;
    }
    return result;
  }
  makeNewBody(body_length) {
    var new_body = [];
    for (let i = 1; i <= body_length; i++) {
      let mod_x = i * this.velocity.x;
      let mod_y = i * this.velocity.y;
      new_body.push({
        x: this.position.x - mod_x,
        y: this.position.y - mod_y
      });
    }
    return new_body;
  }
  collisionBoundary(b_width, b_height, spacing) {
    var result = false;
    let spaced_x = this.position.x + this.velocity.x;
    let spaced_y = this.position.y + this.velocity.y;
    if (spaced_x >= b_width / 2) {
      result = true;
    } else if (spaced_x < -(b_width / 2)) {
      result = true;
    } else if (spaced_y >= b_height / 2) {
      result = true;
    } else if (spaced_y < -(b_height / 2)) {
      result = true;
    }
    return result;
  }
  collisionSelf() {
    let result = false;
    for (let i = 0; i < this.body.length; i++) {
      if (
        this.position.x + this.velocity.x == this.body[i].x &&
        this.position.y + this.velocity.y == this.body[i].y
      ) {
        result = true;
      }
    }
    return result;
  }
  collisionFood(food_position) {
    if (
      this.position.x == food_position.x &&
      this.position.y == food_position.y
    ) {
      this.grow_flag = 1;
    }
  }
  checkCollisions(b_width, b_height, spacing, food_position) {
    if (this.collisionBoundary(b_width, b_height, spacing)) {
      this.alive = false;
    } else if (this.collisionSelf() && this.visible_body) {
      this.alive = false;
    } else {
      this.collisionFood(food_position);
    }
  }
  setNewVelocity(new_velocity) {
    //restrict from moving in opposite direction
    if (!this.isOppositeDirection(new_velocity)) {
      this.new_velocity.x = new_velocity.x;
      this.new_velocity.y = new_velocity.y;
      this.direction_change_flag = 1;
    }
  }
  updateHeadPosition() {
    if (this.isAlive()) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
  updateBodyPosition(new_x, new_y) {
    if (this.isAlive()) {
      if (this.grow_flag) {
        if (this.current_growth >= this.growth_rate) {
          this.grow_flag = 0;
          this.current_growth = 0;
        } else {
          this.current_growth++;
        }
      } else {
        this.body.pop();
      }
      this.body.unshift({
        x: new_x,
        y: new_y
      });
    }
  }
  updateVelocity() {
    if (this.isAlive()) {
      if (this.direction_change_flag) {
        this.direction_change_flag = 0;
        this.velocity.x = this.new_velocity.x;
        this.velocity.y = this.new_velocity.y;
        this.new_velocity.x = 0;
        this.new_velocity.y = 0;
      }
    }
  }
  update(
    b_width,
    b_height,
    spacing,
    food_position,
    visible_body,
    invisibility_timer
  ) {
    if (this.isAlive()) {
      this.visible_body = visible_body;
      this.invisibility_timer = invisibility_timer;
      let new_x = this.position.x;
      let new_y = this.position.y;
      this.updateVelocity();
      this.checkCollisions(b_width, b_height, spacing, food_position);
      this.updateHeadPosition();
      this.updateBodyPosition(new_x, new_y);
    }
  }
}
