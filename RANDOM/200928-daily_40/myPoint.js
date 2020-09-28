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
      this.angle = 0
      this.rsize = _rsize
      this.otherY = -height / 4 // height / 1.5
    }
  }
  updateAfterInit(letterIdx) {
    // this.rsize = _rsize
    // this.other = _points[_currLetter + 1 % _letters.length][(this.idx + _points[0].length / 2) % _points[0].length]
    this.other = _points[letterIdx][0]
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
    this.otherY = map(_mouse.y, 0, height, -height / 4, height / 1.5, true)
    const fcount = floor((frameCount + this.idx * 0.8) % _totalFrames)

    let percent = (fcount) / _totalFrames;
    percent = ease[styles[10]](percent)
    if (this.fc % (_totalFrames) == 0) {

    }

    // this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.opos.x, this.other.opos.x)
    this.pos.y = map(cos(percent * TWO_PI + PI), -1, 1, this.opos.y, this.otherY)
    // define angle
    // this.angle = map(percent, 0, 1, 0, PI)

    // add forces
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
    noStroke()
    push()
    // noFill()
    // stroke(_clrs[1])
    fill(_clrs[1])
    stroke(_clrs[0])
    translate(this.pos.x, this.pos.y, 0)
    box(this.rsize, this.rsize)

    pop()
  }
}