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
    this.angle = PI / 2
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
      this.nidx = (this.d / maxDist)
      // this.nidx = 1.-(this.d / maxDist)
    }

    this.speed = 0.
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;

    // percent = ease[styles[5]](percent);
    let other = null
    const d = p5.Vector.dist(_grfcCenter,this.opos)
    other = p5.Vector.sub(_grfcCenter,this.opos)
    this.pos.add(other.setMag(200./d))
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotate(this.angle)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}