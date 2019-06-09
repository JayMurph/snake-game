class Timer {
  constructor(func, inc) {
    this.time = 0;
    this.inc = inc;
    this.func = func;
  }
  timer() {
    this.func();
    this.time += this.inc;
  }
  getTime() {
    return this.time;
  }
  resetTime() {
    this.time = 0;
  }
}

function newRotationTimer() {
  return new Timer(function() {
    if (this.getTime() >= 360) {
      this.resetTime();
      game_state.mystery_flags.rotate = false;
      game_state.mystery_box.makeInactive();
    }
  }, 0.5);
}

function newInvisibleSnakeTimer() {
  return new Timer(function() {
    if (this.getTime() >= 3 * 60) {
      this.resetTime();
      game_state.mystery_flags.invisible_snake = false;
      game_state.mystery_box.makeInactive();
    }
  }, 1);
}

var mystery_box_timer = new Timer(function() {
  if (this.getTime() <= 1) {
    this.rand_count = random(0, 120);
  }
  if (this.getTime() >= this.rand_count) {
    game_state.mystery_box.makeVisible();
    game_state.mystery_box.makeNotWaiting();
    this.resetTime();
  }
}, 1);
