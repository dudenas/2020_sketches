const _maxSpeed = 20
const _maxForce = 2
const _offDist = 10
const _separateDist = 5
let _choseNext = false

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.opos = createVector(x, y, 0)
      this.vel = createVector(0, 0, 0)
      this.acc = createVector(0, 0, 0)
      this.index
    }
  }
  updateAfterInit(opoint) {
    this.other = opoint
  }

  //————————————————————————————————————————————— myPoint forces
  updateForce() {
    this.vel.add(this.acc)
    this.vel.limit(_maxSpeed);
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  addForce(f) {
    this.acc.add(f)
  }

  // Arrive at some location
  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = _maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, _maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(_maxForce);
    return steer;
  }

  // Method checks for nearby boids and steers away
  separate() {
    let desiredseparation = _separateDist;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < _points[_currLetter].length; i++) {
      let d = p5.Vector.dist(this.pos, _points[_currLetter][i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.pos, _points[_currLetter][i].pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    return steer
  }

  //————————————————————————————————————————————— myPoint show
  update() {
    // find the other value
    let force = this.arrive(this.other.pos)
    force.limit(_maxForce)
    this.addForce(force)
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    beginShape()
    vertex(this.pos.x, this.pos.y)
    vertex(this.opos.x, this.opos.y)
    endShape()
  }
}