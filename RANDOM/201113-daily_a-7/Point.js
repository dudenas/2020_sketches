//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    this.speed = pow(7, 12)
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    let percent = (floor(5 + this.idx * this.speed) % _totalFrames) / _totalFrames;
    this.angle = map(percent, 0, 1, 0, TWO_PI)
    this.d = p5.Vector.dist(this.pos, createVector(width / 2, height / 2, 0))
    const x = this.d * cos(this.angle) + width/2 - padd/2
    const y = this.d * sin(this.angle) + height/2 - padd/2
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    // this.speed = 0.2
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;
    // linear ease 2 5 10
    // percent = ease[styles[10]](percent);
    // percent = ease[styles[11]](percent,0.25, 12);
    this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.opos.x, this.otherPos.x)
    this.pos.y = map(sin(percent * TWO_PI), -1, 1, this.opos.y, this.otherPos.y)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}