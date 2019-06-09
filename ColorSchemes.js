class ColorScheme {
  constructor(bg, s, st, si, ss, f, fs, mbc, mbsc, g, t, sw) {
    this.background_color = bg;
    this.snake_color = s;
    this.snake_tongue_color = st;
    this.snake_invisible_color = si;
    this.snake_stroke_color = ss;
    this.food_color = f;
    this.food_stroke_color = fs;
    this.mystery_box_color = mbc;
    this.mystery_box_stroke_color = mbsc;
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
  getSIC() {
    return this.snake_invisible_color;
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
  getMBC() {
    return this.mystery_box_color;
  }
  getMBSC() {
    return this.mystery_box_stroke_color;
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
    color(0),                         //bg
    color(0, 255, 0),                 //snake
    color(203, 0, 0),                 //snake tongue
    color(0, 255, 0, 100),            //snake invisible
    color(0, 153, 51),                //snake stroke
    color(255, 102, 0),               //food 
    color(153, 51, 51),               //food stroke
    color(255, 255, 0),               //mystery box
    color(204, 204, 0),               //mystery box stroke
    color(100),                       //grid
    color(255),                       //text
    4                                 //stroke weight
  );
}
