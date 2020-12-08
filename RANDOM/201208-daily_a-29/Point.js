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
      // a
      this.nidx = 1. - (this.d / maxDist)
      // b
      this.nidx = (this.d / maxDist)
    }
    const fcount = floor(frameCount + this.nidx * 100) % (_totalFrames)
    let percent = (fcount) / (_totalFrames)
    this.prevSize = this.size
    this.size = map(sin(percent * TWO_PI), -1, 1, 1, _ratio / 2.5)
    //a
    // const str = map(this.size - this.prevSize, -0.1, 0.1, 0, 20)
    // this.dir.setMag(str)
    // this.dir.limit(5)
    // const temp = this.opos.copy()
    // this.pos = temp.add(this.dir)
    // const back = p5.Vector.sub(this.opos, this.pos).setMag(2)
    // this.pos.add(back)
    //b
    const str = map(this.size - this.prevSize, -0.1, 0.1, 0, 100)
    this.dir.setMag(str)
    // this.dir.limit(5)
    const temp = this.opos.copy()
    this.pos = temp.add(this.dir)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    // rotateX(this.angle)
    translate(this.pos.x, this.pos.y, this.pos.z)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    noStroke()
    fill(_clrs[1])
    sphere(this.size, 24)
    pop()
  }
}