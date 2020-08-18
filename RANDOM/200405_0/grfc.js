let letters = [];
let SW = 6;
let padd, rows, cols;
let scl = 14;
let totalPoints = 200

/////////////5////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, i, j) {
    this.x = x;
    if (j % 2 == 0) {
      this.x += scl / 2
      console.log('test')
    }
    this.xo = x
    this.y = y;
    this.x1 = -scl / 2 + padd;
    this.x2 = scl / 2 - padd;
    this.y1 = -scl / 2 + padd;
    this.y2 = scl / 2 - padd;
    this.i = i;
    this.j = j;
    this.sw = SW;

    this.indexa = 0
    this.indexb = 0

    this.tl = 0
    this.tr = 0
    this.bl = 0
    this.br = 0
    this.diff = PI / 2

    this.setPoints()
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter setPoints
  setPoints() {
    this.points = []
    for (let i = 0; i <= totalPoints; i++) {
      let angle = map(i, 0, totalPoints, 0, PI)
      let x = this.x1 * cos(angle)
      let y = this.y1 + this.y1 * sin(angle)
      this.points.push(createVector(x, y))
    }
    this.tr = this.points.length - 1
    this.points.push(createVector(this.x2, this.y2))
    this.br = this.points.length - 1
    for (let i = 0; i <= totalPoints; i++) {
      let angle = map(i, 0, totalPoints, 0, PI)
      let x = this.x2 * cos(angle)
      let y = this.y2 + this.y2 * sin(angle)
      this.points.push(createVector(x, y))
    }
    this.bl = this.points.length - 1
    this.points.push(createVector(this.x1, this.y1))

    this.indexb = floor(this.points.length / 2)
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.i * 2 + this.j * 2) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    this.diff = map(sin(percent * TWO_PI), -1, 1, PI / 2 - PI / 4, PI / 2 + PI / 4);
    this.indexa = floor(map(sin(percent * TWO_PI), -1, 1, this.tl, this.tr));

    if (this.j % 2 == 0) {
      this.indexb = floor(map(cos(percent * TWO_PI - this.diff), -1, 1, this.bl, this.br));
      this.x = map(percent, 0, 1, this.xo + scl / 2, this.xo + scl + scl / 2)
    } else {
      this.indexb = floor(map(cos(percent * TWO_PI + this.diff), -1, 1, this.bl, this.br));
      this.x = map(sin(percent * TWO_PI), -1, 1, this.xo + scl / 12, this.xo - scl / 12)
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push()
    translate(this.x, this.y)
    stroke(clrs[1])
    strokeWeight(1)
    noFill()
    // ellipse(0, 0, scl, scl)
    strokeWeight(this.sw)

    beginShape()
    for (let i = 0; i < this.points.length; i++) {
      let pt = this.points[i]
      vertex(pt.x, pt.y)
    }
    endShape()

    let pta = this.points[this.indexa]
    let ptb = this.points[this.indexb]

    line(pta.x, pta.y, ptb.x, ptb.y)
    pop()
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
  rows = scl
  cols = scl
  padd = width / (scl * 3.5);
  scl = floor(width / scl)
  for (let i = -2; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl + scl / 2, i, j));
    }
  }
}

function keyPressed() {
  if (key == ' ') noLoop()
}