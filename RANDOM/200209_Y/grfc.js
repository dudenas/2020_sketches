let letters = [];
let SW = 12;
let padd;
let echo = 64;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.sw = SW;
    this.setPoints();
    this.c = map(this.index, 0, echo, clrs[0], clrs[1])
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter setPoints
  setPoints() {
    this.points = [];
    let p1 = createVector(0, 0);
    this.points.push(p1);
    let p2 = createVector(width, 0);
    this.points.push(p2);
    let p3 = createVector(this.x, height);
    this.points.push(p3);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter updatePoint
  updatePoint(index, percent, cx, cy, nx, ny) {
    this.points[index].x = map(percent, 0, 1, cx, nx);
    this.points[index].y = map(percent, 0, 1, cy, ny);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index / 12) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    let percentb = ease[styles[3]](percent);

    // update mid
    this.x = map(sin(percent * TWO_PI), -1, 1, 0 + padd, width - padd);
    this.y = map(sin(percentb * TWO_PI), -1, 1, 0 + padd * 3, height - padd * 3);

    // update points
    if (percent <= 0.25) {
      percent = map(percent, 0, 0.25, 0, 1);
      this.updatePoint(0, percent, 0, 0, 0, this.y);
      this.updatePoint(1, percent, width, 0, width, 0);
      this.updatePoint(2, percent, this.x, height, width, height);
    } else if (percent <= 0.5) {
      percent = map(percent, 0.25, 0.5, 0, 1);
      this.updatePoint(0, percent, 0, this.y, 0, height);
      this.updatePoint(1, percent, width, 0, this.x, 0);
      this.updatePoint(2, percent, width, height, width, height);
    } else if (percent <= 0.75) {
      percent = map(percent, 0.5, 0.75, 0, 1);
      this.updatePoint(0, percent, 0, height, 0, height);
      this.updatePoint(1, percent, this.x, 0, 0, 0);
      this.updatePoint(2, percent, width, height, width, this.y);
    } else if (percent <= 1) {
      percent = map(percent, 0.75, 1, 0, 1);
      this.updatePoint(0, percent, 0, height, this.x, height);
      this.updatePoint(1, percent, 0, 0, 0, 0);
      this.updatePoint(2, percent, width, this.y, width, 0);
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {

    stroke(this.c);
    strokeWeight(this.sw);
    noFill();
    for (let p of this.points) {
      line(p.x, p.y, this.x, this.y);
    }
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
  padd = width / 8;
  for (let i = 0; i < echo; i++) {
    letters.push(new Letter(width / 2, height / 2, i));
  }
}