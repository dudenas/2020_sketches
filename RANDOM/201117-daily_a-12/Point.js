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
    this.nextAngle = this.d * 0.05
    const x = this.d * cos(this.angle)
    const y = this.d * sin(this.angle)
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    // this.speed = .00005 * this.idx
    // this.speed = .1
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;
    // this.angle+=0.1;
    // percent = ease[styles[5]](percent);
    // this.angle = map(sin(percent * TWO_PI), -1, 1, PI/2, this.nextAngle + PI/2)
    // this.pos.x = map(sin(TWO_PI/4*3 + percent * TWO_PI), -1, 1, this.opos.x, this.otherPos.x)
    // this.pos.y = map(cos(PI + percent * TWO_PI), -1, 1, this.opos.y, this.otherPos.y)
    // 1
    // this.angle += percent * 0.05
    // this.nextAngle += percent * 0.05
    // 2
    this.nextAngle += percent * 0.1
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotate(cos(this.nextAngle) + this.nextAngle)
    // rotateY(this.angle)
    // 1
    // rotateX(this.angle)
    // rotateZ(this.angle)
    translate(-_grfcCenter.x,-_grfcCenter.y,0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    // translate(0, -height/2+padd/2,0)
    // translate(this.otherPos.x, this.otherPos.y, this.otherPos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}