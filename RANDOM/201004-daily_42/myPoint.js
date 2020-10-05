const _maxSpeed = 6
const _maxForce = 0.2

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.opos = createVector(x, y, 0)
      this.vel = createVector(0, 0, 0)
      this.acc = createVector(0, 0, 0)

      this.trail = []
      this.fc = 1
      this.rsize = _rsize
    }
  }
  updateAfterInit() {

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
    let desiredseparation = this.rsize * 2;
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
    const fcount = floor((frameCount + this.idx * 0.8) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[10]](percent)
    if (this.fc % (_totalFrames) == 0) {

    }

    // add forces
    // let nforce_x = openSimplex.noise2D(percent * TWO_PI, 0)
    // let nforce_y = openSimplex.noise2D(0, percent * TWO_PI)
    // let nforce = createVector(nforce_x, nforce_y, nforce_x)
    // this.maxForce = map(sin(percent * TWO_PI), -1, 1, nforce.mag(), 0)
    // nforce.limit(this.maxForce)
    // this.addForce(nforce)
    // const v = this.arrive(this.opos)
    // this.addForce(v)
    // this.addForce(this.separate())

    this.fc++
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    // push()
    // translate(this.pos.x, this.pos.y, 0)
    // box(this.rsize, this.rsize)
    // pop()
    vertex(this.pos.x, this.pos.y)
  }
}