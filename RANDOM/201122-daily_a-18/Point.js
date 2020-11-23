let maxDist = 0

function createRandomVector(val) {
  const x = floor(random(-val, val)) * _ratio
  const y = floor(random(-val, val)) * _ratio
  return createVector(x, y)
}

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
  }



  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    if (this.d > maxDist) maxDist = this.d
    this.randomDir = createRandomVector(1)
  }

  //————————————————————————————————————————————— Point update
  update() {
    if (frameCount == 1) {
      // this.nidx = sin((this.d / maxDist) * TWO_PI)
      this.nidx = (this.d / maxDist)
      // this.nidx = 1. - (this.d / maxDist)
    }

    this.speed = .9
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames
    percent = ease[styles[5]](percent);

    this.pos.y = map(percent, 0, 1, this.pos.y, this.opos.y + this.randomDir.y)
    this.pos.x = map(percent, 0, 1, this.pos.x, this.opos.x + this.randomDir.x)
    this.size = p5.Vector.dist(this.pos, this.opos) / _ratio
    if (fcount == 0) {
      this.randomDir = createRandomVector(1)
    }
    // this.angle = tan(this.pos.x)
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
    // rotate(this.angle)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}