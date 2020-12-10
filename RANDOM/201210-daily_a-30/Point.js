let maxDist = 0
const _maxspeed = 6; // Maximum speed
const _maxforce = 0.05; // Maximum steering force
const _version = 1

//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.vel = createVector(0, 0, 0)
    this.acc = createVector(0, 0, 0)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.prevSize = this.size
    this.idx = idx
    this.nidx = idx
    this.angle = 0
    this.dir = p5.Vector.sub(this.opos, _grfcCenter)
    this.dir.normalize()
    this.driver = 0
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
    // steer.limit(_maxforce); // Limit to maximum steering force
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
    const fcount = floor(frameCount + this.nidx * 200) % (_totalFrames)
    // const fcount = floor(frameCount + this.idx * 0.02 * sin(this.nidx * TWO_PI)) % (_totalFrames)
    let percent = (fcount) / (_totalFrames)
    this.driver_b = map(sin(percent * TWO_PI + PI), -1, 1, 0, 1)
    // this.size = map(this.driver_b, 0, 1, 0, _ratio / 3.5)
    
    this.prevDriver = this.driver
    this.driver = map(sin(percent * TWO_PI + PI), -1, 1, 0, 1)
    const str = map(abs(this.driver - this.prevDriver), 0.0, 0.1, 0, 4, true)
    // const str = 1
    if (this.driver - this.prevDriver >= 0.0) {
      this.dir = p5.Vector.sub(this.opos, _grfcCenter)
    } else {
      this.dir = this.seek(this.opos)
    }
    this.dir.setMag(str)
    const temp = this.opos.copy()
    this.pos = this.pos.add(this.dir)
    // this.pos.add(this.dir)
    // const back = p5.Vector.sub(this.opos, this.pos).setMag(25)
    // this.pos.add(this.seek(this.opos))
    this.angle = ((this.driver - this.prevDriver) * this.nidx * 10)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotateZ(this.angle)
    translate(this.pos.x, this.pos.y, this.pos.z)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    noStroke()
    fill(_clrs[1])
    sphere(this.size, 24)
    pop()
  }
}