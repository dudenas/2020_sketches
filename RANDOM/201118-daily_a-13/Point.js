let maxDist = 0
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
    // if(this.idx == 465) {
    //   this.size = 4
    // }
    this.angle = PI/2
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    // this.nextAngle = this.opos.x / this.d
    this.nextAngle = this.d*0.001
    if(this.d > maxDist) maxDist = this.d
    const x = this.d * cos(this.angle)
    const y = this.d * sin(this.angle)
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    if(frameCount == 1) {
      this.nidx = (this.d / maxDist)
      // this.nidx = 1.-(this.d / maxDist)
    }

    this.speed = 2.7
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;

    // percent = ease[styles[5]](percent);
    // this.angle = map(sin(percent * TWO_PI), -1, 1, PI/2, this.nextAngle * TWO_PI + PI/2)
    // this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.opos.x, this.otherPos.x)
    // this.pos.y = map(cos(percent * TWO_PI), -1, 1, this.opos.y, this.otherPos.y)
    // this.nextAngle += 0.1 * cos((this.nidx * TWO_PI))
    this.nextAngle += 0.1 * this.nidx
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotate(this.nextAngle+PI/2.5)
    // rotate(this.angle)
    // rotateY(this.angle)
    // rotateX(this.angle)
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