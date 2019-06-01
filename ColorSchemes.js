class ColorScheme {
  constructor(bg, s, st, ss, f, fs, g, t, sw) {
    this.background_color = bg;
    this.snake_color = s;
    this.snake_tongue_color = st;
    this.snake_stroke_color = ss;
    this.food_color = f;
    this.food_stroke_color = fs;
    this.grid_color = g;
    this.text_color = t;
    this.stroke_weight = sw;
  }
  getBGC() {
    return this.background_color;
  }
  getSC() {
    return this.snake_color;
  }
  getSTC() {
    return this.snake_tongue_color;
  }
  getSSC() {
    return this.snake_stroke_color;
  }
  getFC() {
    return this.food_color;
  }
  getFSC() {
    return this.food_stroke_color;
  }
  getGC() {
    return this.grid_color;
  }
  getTC() {
    return this.text_color;
  }
  getSW() {
    return this.stroke_weight;
  }
}

function setupColorSchemes(arr) {
  arr[0] = new ColorScheme(
    color(0),
    color(0, 255, 0),
    color(203, 0, 0),
    color(0, 153, 51),
    color(255, 102, 0),
    color(153, 51, 51),
    color(100),
    color(255),
    4
  );
}
