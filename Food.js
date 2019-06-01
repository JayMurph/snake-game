class Food {
  constructor(position, dimensions) {
    this.position = position;
    this.dimensions = dimensions;
    this.alive = 0;
  }
  isAlive() {
    return this.alive;
  }
  show(color, stroke_color, stroke_weight, spacing) {
    if (this.isAlive()) {
      push();
      let spaced_x = this.position.x * spacing;
      let spaced_y = this.position.y * spacing;
      let centered_x = spaced_x + spacing / 2;
      let centered_y = spaced_y + spacing / 2;
      strokeWeight(stroke_weight);
      stroke(stroke_color);
      fill(color);
      ellipse(centered_x, centered_y, this.dimensions.width);
      pop();
    }
  }
  showNormal(x_coord, y_coord, color, stroke_color, stroke_weight, size) {
    push();
    let centered_x = x_coord + size / 2;
    let centered_y = y_coord + size / 2;
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    ellipse(centered_x, centered_y, size);
    pop();
  }
  snakeCollision(snake_position) {
    if (
      this.position.x == snake_position.x &&
      this.position.y == snake_position.y
    ) {
      this.alive = 0;
    }
  }
  update(snake_position) {
    if (this.isAlive()) {
      this.snakeCollision(snake_position);
    }
  }
}

function generateRandomPosition(x_max, y_max, spacing) {
  var pos = {
    x: floor(random(0, x_max / spacing)),
    y: floor(random(0, y_max / spacing))
  };
  return pos;
}
