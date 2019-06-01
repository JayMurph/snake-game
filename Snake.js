class Snake {
  constructor(position, dimensions, velocity, init_body_length, growth_rate) {
    this.alive = 0;
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
  }
  isAlive() {
    return this.alive;
  }
  drawSegment(x_coord, y_coord, color, stroke_color, stroke_weight, spacing) {
    push();
    let spaced_x = x_coord * spacing;
    let spaced_y = y_coord * spacing;
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    rect(spaced_x, spaced_y, this.dimensions.width, this.dimensions.height);
    pop();
  }
  drawSegmentNormal(x_coord, y_coord, size, color, stroke_color, stroke_weight) {
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    square(x_coord, y_coord, size);
    pop();
  }
  showBody(color, stroke_color, stroke_weight, spacing) {
    for (let i = 0; i < this.body.length; i++) {
      let x_coord = this.body[i].x;
      let y_coord = this.body[i].y;
      this.drawSegment(
        x_coord,
        y_coord,
        color,
        stroke_color,
        stroke_weight,
        spacing
      );
    }
  }
  showBodyNormal(size, normal, color, stroke_color, stroke_weight) {
    for (let i = 0; i < this.body.length; i++) {
      let x_coord = this.body[i].x;
      let y_coord = this.body[i].y;
      this.drawSegmentNormal(
        x_coord * normal,
        y_coord * normal,
        size,
        color,
        stroke_color,
        stroke_weight,
      );
    }
  }
  drawTongue(color, stroke_weight, spacing) {
    push();
    let center_x = (this.position.x * spacing) + spacing / 2;
    let center_y = (this.position.y * spacing) + spacing / 2;
    let start_x = center_x + ((spacing / 2) * this.velocity.x);
    let start_y = center_y + ((spacing / 2) * this.velocity.y);
    let end_x = center_x + (spacing * this.velocity.x);
    let end_y = center_y + (spacing * this.velocity.y);
    strokeWeight(stroke_weight);
    stroke(color);
    line(start_x, start_y, end_x, end_y);
    pop();
  }
  drawTongueNormal(x_coord, y_coord, color, stroke_weight, spacing) {
    push();
    let center_x = x_coord + (spacing / 2);
    let center_y = y_coord + (spacing / 2);
    let start_x = center_x + ((spacing / 2) * this.velocity.x);
    let start_y = center_y + ((spacing / 2) * this.velocity.y);
    let end_x = center_x + (spacing * this.velocity.x);
    let end_y = center_y + (spacing * this.velocity.y);
    strokeWeight(stroke_weight);
    stroke(color);
    line(start_x, start_y, end_x, end_y);
    pop();
  }
  drawEyes(stroke_color, stroke_weight, spacing) {
    let center_x = (this.position.x * spacing) + (spacing / 2);
    let center_y = (this.position.y * spacing) + (spacing / 2);
    let eye_1_x = (center_x + (5 * (this.velocity.y)));
    let eye_1_y = (center_y + (5 * (-this.velocity.x)));
    let eye_2_x = (center_x + (5 * (-this.velocity.y)));
    let eye_2_y = (center_y + (5 * (this.velocity.x)));
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    point(eye_1_x, eye_1_y);
    point(eye_2_x, eye_2_y);
    pop();
  }
  drawDeadEyesNormal(x_coord, y_coord, velx, vely, stroke_color, stroke_weight, spacing) {
    let center_x = x_coord + (spacing / 2);
    let center_y = y_coord + (spacing / 2);
    let eye_1_x = (center_x + (5 * (vely)));
    let eye_1_y = (center_y + (5 * (-velx)));
    let eye_2_x = (center_x + (5 * (-vely)));
    let eye_2_y = (center_y + (5 * (velx)));
    push();
    strokeWeight(1);
    stroke(0);
    line(eye_1_x +3, eye_1_y +3, eye_1_x -3, eye_1_y -3)
    line(eye_1_x +3, eye_1_y -3, eye_1_x -3, eye_1_y +3)
    line(eye_2_x +3, eye_2_y +3, eye_2_x -3, eye_2_y -3)
    line(eye_2_x +3, eye_2_y -3, eye_2_x -3, eye_2_y +3)
    pop();
  }
  drawEyesNormal(x_coord, y_coord, stroke_color, stroke_weight, spacing) {
    let center_x = x_coord + (spacing / 2);
    let center_y = y_coord + (spacing / 2);
    let eye_1_x = (center_x + (5 * (this.velocity.y)));
    let eye_1_y = (center_y + (5 * (-this.velocity.x)));
    let eye_2_x = (center_x + (5 * (-this.velocity.y)));
    let eye_2_y = (center_y + (5 * (this.velocity.x)));
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    point(eye_1_x, eye_1_y);
    point(eye_2_x, eye_2_y);
    pop();
  }
  showHead(color, stroke_color, stroke_weight, spacing) {
    this.drawSegment(
      this.position.x,
      this.position.y,
      color,
      stroke_color,
      stroke_weight,
      spacing
    );
  }
  showHeadNormal(x_coord, y_coord, size, color, stroke_color, stroke_weight, spacing) {
    this.drawSegmentNormal(
      x_coord,
      y_coord,
      size,
      color,
      stroke_color,
      stroke_weight,
      spacing
    );
  }
  show(color, tongue_color, stroke_color, stroke_weight, spacing) {
    if (this.isAlive()) {
      this.showHead(color, stroke_color, stroke_weight, spacing);
      this.showBody(color, stroke_color, stroke_weight, spacing);
      this.drawTongue(tongue_color, stroke_weight, spacing);
      this.drawEyes(stroke_color, stroke_weight, spacing)
    }
  }
  showNormal(x_coord, y_coord, color, tongue_color, stroke_color, stroke_weight, size, normal) {
    this.showHeadNormal(x_coord, y_coord, size, color, stroke_color, stroke_weight, size);
    this.showBodyNormal(size, normal, color, stroke_color, stroke_weight);
    this.drawTongueNormal(x_coord, y_coord, tongue_color, stroke_weight, size);
    this.drawEyesNormal(x_coord, y_coord, stroke_color, stroke_weight, size)
  }
  introShow(color, tongue_color, stroke_color, stroke_weight, spacing) {
    this.showHead(color, stroke_color, stroke_weight, spacing);
    this.showBody(color, stroke_color, stroke_weight, spacing);
    this.drawTongue(tongue_color, stroke_weight, spacing);
    this.drawEyes(stroke_color, stroke_weight, spacing)
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
      let mod_x = i * (this.velocity.x);
      let mod_y = i * (this.velocity.y);
      new_body.push({
        x: this.position.x - mod_x,
        y: this.position.y - mod_y
      });
    }
    return new_body;
  }
  collisionBoundary(b_width, b_height, spacing) {
    var result = false;
    let spaced_x = (this.position.x + this.velocity.x) * spacing;
    let spaced_y = (this.position.y + this.velocity.y) * spacing;
    if (spaced_x >= b_width) {
      result = true;
    } else if (spaced_x < 0) {
      result = true;
    } else if (spaced_y >= b_height) {
      result = true;
    } else if (spaced_y < 0) {
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
    if (
      this.collisionBoundary(b_width, b_height, spacing) ||
      this.collisionSelf()
    ) {
      this.alive = 0;
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
  update(b_width, b_height, spacing, food_position) {
    if (this.isAlive()) {
      let new_x = this.position.x;
      let new_y = this.position.y;
      this.updateVelocity();
      this.checkCollisions(b_width, b_height, spacing, food_position);
      this.updateHeadPosition();
      this.updateBodyPosition(new_x, new_y);
    }
  }
}