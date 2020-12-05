let maxDist = 0
const _maxspeed = 6; // Maximum speed
const _maxforce = 0.05; // Maximum steering force

//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.vel = createVector(0, 0, 0)
    this.acc = createVector(0, 0, 0)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    this.angle = 0
    this.goForward = true
    this.counter = 0
  }

  //————————————————————————————————————————————— Point apply force
  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acc.add(force);
  }

  //————————————————————————————————————————————— Point seek
  seek(target) {
    let desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
    desired.normalize();
    desired.mult(_maxspeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(_maxforce); // Limit to maximum steering force
    return steer;
  }

  // Method to update location
  update() {
    // Update velocity
    this.vel.add(this.acc);
    // Limit speed
    this.vel.limit(_maxspeed);
    this.pos.add(this.vel);
    // Reset accelertion to 0 each cycle
    this.acc.mult(0);
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    // this.d = abs(this.opos.x - _grfcCenter.y) * abs(this.opos.y - _grfcCenter.x)
    if (this.d > maxDist) maxDist = this.d
  }

  //————————————————————————————————————————————— Point update
  updateOther() {
    if (frameCount == 1) {
      this.nidx = 1. - (this.d / maxDist)
      // this.nidx = (this.d / maxDist)
    }
    // const fcount = floor(frameCount - (this.opos.x + this.opos.y * _total * _ratio) / this.d * 1.2) % (_totalFrames)
    const fcount = floor(frameCount / (0.05 + this.nidx) - this.d + cos(this.idx / (pow(_total, 2)) * PI) * this.pos.x) % (_totalFrames)
    // const fcount = floor(frameCount + this.nidx * 100) % (_totalFrames)
    let percent = (fcount) / (_totalFrames)
    this.size = map(sin(percent * TWO_PI), -1, 1, 1, _ratio / 2.5)
    // this.pos.y = map(sin(percent * TWO_PI)s, -1, 1, this.opos.y, this.opos.y * 1.01)
    // this.pos.z = pow(this.size, this.nidx)
    // this.pos.z = pow(this.size, ((this.idx) % _total) * 0.05)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    translate(this.pos.x, this.pos.y, this.pos.z)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    noStroke()
    fill(_clrs[1])
    sphere(this.size, 24)
    pop()
  }
}