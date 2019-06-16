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
    this.time = -1;
  }
}

function newRotationTimer() {
  return new Timer(function() {
    if (this.getTime() >= 360) {
      this.resetTime();
      game_state.mystery_flags["rotate_right"] = false;
      game_state.mystery_flags["rotate_left"] = false;
      game_state.mystery_box.makeInactive();
    }
  }, 0.5);
}

function newGridRestrictTimer() {
  return new Timer(function() {
    console.log("this.time = ", this.time);
    if(this.getTime() == 0){
      let temp = floor(random(1, 6)) * 2;
      game_state.grid_width = game_state.game_width - (temp * game_state.spacing);
      game_state.grid_height = game_state.game_height - (temp * game_state.spacing); 
    }else if(this.getTime() >= 180){
      this.resetTime();
      game_state.mystery_flags["grid_restrict"] = false;
      game_state.grid_width = game_state.game_width;
      game_state.grid_height = game_state.game_height; 
      game_state.mystery_box.makeInactive();
    }
  }, 1)
}

function newInvisibleSnakeTimer() {
  return new Timer(function() {
    if (this.getTime() >= 3 * 60) {
      this.resetTime();
      game_state.mystery_flags["invisible_snake"] = false;
      game_state.mystery_box.makeInactive();
    }
  }, 1);
}

function newGridFluctuateTimer() {
  return new Timer(function() {
    if(this.getTime() >= 180) {
      this.resetTime();
      game_state.mystery_flags["grid_fluctuate"] = false;
      game_state.mystery_box.makeInactive();
    }
  }, 1);
}

var mystery_box_timer = new Timer(function() {}, 1);
