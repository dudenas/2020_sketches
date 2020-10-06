const _maxSpeed = 6
const _maxForce = 0.2
const _offDist = 40
const _separateDist = 10

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.opos = createVector(x, y, 0)
      this.vel = createVector(0, 0, 0)
      this.acc = createVector(0, 0, 0)

      this.fc = 1
      this.leftOff = 1
      this.rightOff = 1
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
    let thisIdx = floor(_currentIdx + _points[_currLetter].length / 2 + this.idx) % _points[_currLetter].length
    this.other = _points[_currLetter][thisIdx]
    // if (this.other == this) {
    //   this.other = _points[_currLetter][floor(_currentIdx + _points[_currLetter].length / 2 + this.idx + 1) % _points[_currLetter].length]
    // }
    // const fcount = floor((frameCount + this.idx * 0.7) % _totalFrames)
    // let percent = (fcount) / _totalFrames;
    // const fcount_b = floor((frameCount + this.idx * 0.6) % _totalFrames)
    // let percent_b = (fcount_b) / _totalFrames;
    // // percent = ease[styles[6]](percent)
    // if (this.fc % (_totalFrames) == 0) {
    //   this.other = this
    // }
    // this.leftOff = map(sin(percent * TWO_PI), -1, 1, 1, _offDist)
    // this.rightOff = map(sin(percent_b * TWO_PI), -1, 1, 1, _offDist)
    // add forces
    // let nforce_x = openSimplex.noise2D(percent * TWO_PI, 0)
    // let nforce_y = openSimplex.noise2D(0, percent * TWO_PI)
    // let nforce = createVector(nforce_x, nforce_y, nforce_x)
    // this.maxForce = map(sin(percent * TWO_PI), -1, 1, nforce.mag() * 0.5, 0)
    // nforce.limit(this.maxForce)
    // this.addForce(nforce)
    // const v = this.arrive(this.opos)
    // v.limit(_maxForce)
    // this.addForce(v)

    // const v_2 = this.separate()
    // v_2.limit(_maxForce)
    // this.addForce(v_2)
    // this.fc++
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    // push()
    // translate(this.pos.x, this.pos.y, 0)
    // box(this.rsize, this.rsize)
    // pop()
    // vertex(this.pos.x - this.leftOff, this.pos.y)
    vertex(this.pos.x, this.pos.y)
    vertex(this.other.pos.x, this.other.opos.y)
  }
}