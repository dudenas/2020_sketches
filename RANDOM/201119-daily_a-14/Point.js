let maxDist = 0
//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    this.speed = 0.1
    this.angle = PI/2
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    // this.nextAngle = this.opos.x / this.d
    if(this.d > maxDist) maxDist = this.d
    const x = this.d * cos(this.angle)
    const y = this.d * sin(this.angle)
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    if(frameCount == 1) {
      // this.nidx = sin((this.d / maxDist) * TWO_PI)
      // this.nidx = (this.d / maxDist)
      this.nidx = 1.-(this.d / maxDist)
    }

    this.speed = 0.03
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;

    // percent = ease[styles[5]](percent);
    let scl = 50
    this.pos.x = map(cos(percent * TWO_PI), -1, 1, this.opos.x-this.nidx * scl, this.opos.x + this.nidx * scl)
    this.pos.y = map(cos(percent * TWO_PI), -1, 1, this.opos.y-this.nidx * scl, this.opos.y + this.nidx * scl)
    this.angle = map(sin(percent * TWO_PI), -1, 1, PI/2, this.nidx * TWO_PI)
    // this.angle += 0.1
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotate(this.angle)
    // rotate(this.angle)
    // rotateY(this.angle)
    // rotateX(tan(this.angle))
    // rotateZ(this.angle)
    translate(-_grfcCenter.x,-_grfcCenter.y,0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    // translate(this.otherPos.x, this.otherPos.y, this.otherPos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}