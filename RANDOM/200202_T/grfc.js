let cols, rows;
let w, h;
let scl = 48;
let letters = [];

//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index * 2) % totalFrames) / totalFrames;
    percent = ease[styles[2]](percent);
    this.angle = map(percent, 0, 1, -PI, 0);
    this.w_a = map(percent, 0, 1, 0, scl / 5 * 3);
    this.w_b = map(percent, 0, 0.8, scl / 5 * 3, 0, true);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    stroke(clrs[1]);
    noFill();
    rectMode(CENTER);
    // rect(this.x, this.y, scl, scl);

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(clrs[1]);
    rect(0, 0, w, h);
    rect(0, -h / 2 + w / 2, this.w_a, w);
    rect(0, h / 2 - w / 2, this.w_b, w);
    pop();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  scl = floor(width / scl);

  cols = float(width / scl);
  rows = float(height / scl);

  w = scl / 8;
  h = scl / 3 * 2;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl + scl / 2, (cols - i)));
    }
  }
}
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let l of letters) {
    l.update();
    l.show();
  }
}