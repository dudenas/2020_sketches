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
    this.angle = 0
    this.endCycle = false
    this.back = false
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    if (this.d > maxDist) maxDist = this.d
  }

  //————————————————————————————————————————————— Point update
  update() {
    if (frameCount == 1) {
      // this.nidx = sin((this.d / maxDist) * TWO_PI)
      // this.nidx = (this.d / maxDist)
      this.nidx = 1. - (this.d / maxDist)
    }
    
    this.speed = 0.05
    // console.log(this.speed)
    // console.log(this.speed)
    const fcount = floor(frameCount + this.idx * this.speed * this.nidx) % _totalFrames
    let percent = (fcount) / _totalFrames
    // percent = ease[styles[3]](percent);

    if (this.back) {
      this.pos.x = map(percent, 0, 1, this.pos.x, this.opos.x)
      this.pos.y = map(percent, 0, 1, this.pos.y, this.opos.y)
    } else {
      this.pos.x = map(percent, 0, 1, this.pos.x, other.x)
      this.pos.y = map(percent, 0, 1, this.pos.y, other.y)
    }

    // some logic that should be rewritten
    if (this.back && fcount == 0) {
      this.endCycle = true
      this.back = false
    }

    if (fcount == 0 && !this.endCycle) {
      this.back = true
    }

    randomSeed(other.x)
    this.angle = tan(this.pos.x)
    // this.pos.z = sin(this.angle) * 100


    // percent = ease[styles[5]](percent);
    // let other = null
    // const d = p5.Vector.dist(_grfcCenter,this.opos)
    // other = p5.Vector.sub(_grfcCenter,this.opos)
    // this.pos.add(other.setMag(200./d))
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotateY(this.angle)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}