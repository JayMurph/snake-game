class MysteryBox {
  constructor(position, dimensions, mystery) {
    this.position = position;
    this.dimensions = dimensions;
    this.mystery = mystery;
    this.timer = new Timer(function(){}, 1);
    this.spawn_time = random(60, 180);
    this.active = true;
    this.waiting = true;
    this.collected = false;
    this.visible = false;
  }
  isActive() {
    return this.active;
  }
  isCollected() {
    return this.collected;
  }
  isVisible(){
    return this.visible;
  }
  isWaiting(){
    return this.waiting;
  }
  makeActive() {
    this.active = true;
  }
  makeInactive() {
    this.active = false;
  }
  makeCollected() {
    this.collected = true;
  }
  makeVisible(){
    this.visible = true;
  }
  makeNotWaiting(){
    this.waiting = false;
  }
  drawNormal(x_coord, y_coord, color, stroke_color, stroke_weight, size) {
    push();
    strokeWeight(stroke_weight);
    stroke(stroke_color);
    fill(color);
    square(x_coord, y_coord, size);
    pop();
  }
  show(color, stroke_color, stroke_weight, spacing) {
    if (this.isVisible()) {
      this.drawNormal(
        this.position.x,
        this.position.y,
        color,
        stroke_color,
        stroke_weight,
        spacing
      );
      push();
      textSize(spacing);
      fill(0);
      textAlign(CENTER, CENTER);
      text(
        "?",
        this.position.x + spacing / 2,
        this.position.y + spacing / 2 + 1
      );
      pop();
    }
  }
  snakeCollision(snake_position) {
    if (
      this.position.x == snake_position.x &&
      this.position.y == snake_position.y
    ) {
      this.collected = true;
      this.visible = false;
    }
  }
  update(snake_position) {
    if (this.isVisible()) {
      this.snakeCollision(snake_position);
    }
    if(this.isWaiting()){
      this.timer.timer();
    }
    if(this.timer.getTime() >= this.spawn_time){
      this.makeVisible();
      this.makeNotWaiting();
      this.timer.resetTime();
    }
  }
}
