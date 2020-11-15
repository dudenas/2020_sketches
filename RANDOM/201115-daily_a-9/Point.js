//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    // this.speed = pow(2,12)
    this.speed = 0.1
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    //  4 4, 8 12, 4 12 translate -width/2
    let percent = (floor(this.idx) % 4) / 12.;
    this.angle = map(percent, 0, 1, 0, TWO_PI)
    this.d = p5.Vector.dist(this.opos, createVector(width / 2, height / 2, 0))
    // this.angle = this.d
    const x = this.d * cos(this.angle)
    const y = this.d * sin(this.angle)
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    // this.speed = .00005 * this.idx
    this.speed = .1
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;
    // linear ease 2 5 10
    // percent = ease[styles[10]](percent);
    // percent = ease[styles[11]](percent,0.25, 12);
    this.pos.x = map(sin(TWO_PI/4*3 + percent * TWO_PI), -1, 1, this.opos.x, this.otherPos.x)
    this.angle += percent/10
    // this.pos.y = map(cos(PI + percent * TWO_PI), -1, 1, this.opos.y, this.otherPos.y)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    // translate(width / 2 - padd / 2, +height / 2 - padd / 2)
    rotate(this.angle)
    translate(-width / 2 + padd / 2, -height / 2 + padd / 2)
    translate(this.pos.x, this.pos.y, this.pos.z)
    // translate(this.otherPos.x, this.otherPos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}