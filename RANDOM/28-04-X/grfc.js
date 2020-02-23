let rows, cols;
let scl = 36;
let letters = [];
let SW = 2;
let padd;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x = x;
    this.xo = x;
    this.x1 = -scl / 2 + padd;
    this.x2 = scl / 2 - padd;
    this.y = y;
    this.yo = y;
    this.y1 = -scl / 2 + padd;
    this.y2 = scl / 2 - padd;
    this.index = index;
    this.sw = SW;
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    let percentb = ((frameCount) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    this.x = map(cos(percent * TWO_PI), -1, 1, this.xo - scl, this.xo + scl);
    this.y = map(sin(percentb * TWO_PI), -1, 1, this.yo, this.yo + 1);
    this.getVideoValue();
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter getPixel
  getVideoValue() {
    const i = floor(this.x + this.y * (width));
    const darkness = video.pixels[i * 4];
    if (darkness > 1) this.sw = 4;
    else this.sw = 1;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    // rectMode(CENTER);
    //rect(0, 0, scl, scl);
    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x1, this.y2, this.x2, this.y1);
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
  for (let i = -2; i < cols + 2; i++) {
    for (let j = -2; j < rows + 2; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl + scl / 2, i + j * rows));
    }
  }
}