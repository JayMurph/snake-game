class Food {
  constructor(position, dimensions) {
    this.position = position;
    this.dimensions = dimensions;
    this.alive = false;
  }
  isAlive() {
    return this.alive;
  }
  makeAlive(){
    this.alive = true;
  }
  drawNormal(x_coord, y_coord, color, stroke_color, stroke_weight, size) {
    push();
    let centered_x = x_coord + size / 2;
    let centered_y = y_coord + size / 2;
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    ellipse(centered_x, centered_y, size);
    pop();
  }
  show(color, stroke_color, stroke_weight, spacing) {
    if (this.isAlive()) {
      this.drawNormal(this.position.x, this.position.y, color, stroke_color, stroke_weight, spacing);
    }
  }
  snakeCollision(snake_position) {
    if (
      this.position.x == snake_position.x &&
      this.position.y == snake_position.y
    ) {
      this.alive = false;
    }
  }
  update(snake_position) {
    if (this.isAlive()) {
      this.snakeCollision(snake_position);
    }
  }
}

