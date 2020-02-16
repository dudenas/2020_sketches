let rows;
let scl = 10;
let d;
let letters = [];
let SW;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.ymid = y;
    this.index = index * 4;
    this.sw = map(index, -10, 10, 2, scl / 4, true);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % totalFrames) / totalFrames;
    this.ymid = map(sin(percent * TWO_PI), -1, 1, this.y, this.y + d * 2);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    beginShape();
    vertex(this.x - d - 10, this.y);
    vertex(this.x, this.ymid);
    vertex(this.x + d + 10, this.y);
    endShape();
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
  scl = floor(height / scl);
  let x = width / 2;
  SW = scl / 2;
  d = width / 2;
  for (let i = -rows; i < rows; i++) {
    letters.push(new Letter(x, i * scl, i));
  }
}