let rows, cols;
let scl = 7;
let letters = [];
let SW = 5;
let padd;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x1 = -scl / 2 + padd;
    this.x2 = -scl / 4 + padd;
    this.x3 = 0;
    this.x4 = scl / 4 - padd;
    this.x5 = scl / 2 - padd;
    this.xo = x;
    this.y1 = -scl / 2 + padd;
    this.y2 = scl / 2 - padd;
    this.yo = y;
    this.y = y;
    this.index = index;
    this.agnle = 0;
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    // first part
    this.y1 = map(percent, 0, 0.5, -scl / 2 + padd, 0, true);
    this.y2 = map(percent, 0, 0.5, scl / 2 - padd, 0, true);
    this.angle = map(percent, 0, 0.5, 0, PI / 2, true);
    // second part
    if (percent > 0.5) {
      this.angle = 0;
      this.y1 = -scl / 2 + padd;
      this.y2 = scl / 2 - padd;
      this.x1 = map(percent, 0.5, 1, 0, -scl / 2 + padd, true);
      this.x2 = map(percent, 0.5, 1, 0, -scl / 4 + padd, true);
      this.x4 = map(percent, 0.5, 1, 0, scl / 4 - padd, true);
      this.x5 = map(percent, 0.5, 1, 0, scl / 2 - padd, true);
    }
    this.yo = map(percent, 0, 1, this.y, this.y + scl);
    this.sw = map(this.yo, 0, height, 1, 5);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.xo, this.yo);
    rotate(this.angle);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    // rect(this.x1, this.y1, scl, scl);
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y2);
    vertex(this.x3, this.y1);
    vertex(this.x4, this.y2);
    vertex(this.x5, this.y1);
    endShape();
    pop();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let l of letters) {
    l.update();
    l.show();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  rows = scl;
  cols = scl;
  scl = floor(height / scl);
  padd = scl / 10;
  console.log(SW);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows + 2; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl - scl / 2, i + j * rows));
    }
  }
}