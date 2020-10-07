const _maxSpeed = 6
const _maxForce = 0.2
const _offDist = 10
const _separateDist = 5
const _taken = []
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

      this.leftOff = 1
      this.rightOff = 1
      this.index
      this.angle = 0
      this.finnished = false
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
    let d
    let force
    if (this.index < 0) {
      force = this.arrive(this.other)
      d = this.other.dist(this.pos)
    } else {
      force = this.arrive(this.other.opos)
      d = this.other.opos.dist(this.pos)
    }
    force.limit(_maxForce)
    this.addForce(force)
    if (d < 1) {
      this.finnished = true
      if (_choseNext) {
        for (let i = 0; i < _taken.length; i++) {
          if (this.index == _taken[i]) {
            _taken.splice(i, 1)
            break
          }
        }
        let found = false
        let count = 0
        let randomPos = createVector(random(width), random(-height / 2.5, height - height / 2.5))
        while (!found) {
          this.index = floor(random(_points[_currLetter].length))
          found = true
          for (let i = 0; i < _taken.length; i++) {
            if (this.index == _taken[i]) {
              found = false
              break
            }
          }
          if (++count > 2) {
            this.index = random(-5000, -1)
          }
        }
        _taken.push(this.index)
        if (this.index < 0) {
          this.other = randomPos
        } else {
          this.other = _points[_currLetter][this.index]
        }
      }
    } else {
      this.finnished = false
    }

    if (d > 10) {
      this.angle = lerp(this.angle, this.vel.heading(), 0.1)

    } else {
      this.angle = lerp(this.angle, 0, 0.1)
    }

    this.leftOff = lerp(this.leftOff, map(d, 1, 50, 1, _offDist, true), 0.1)
    this.rightOff = lerp(this.leftOff, map(d, 1, 50, 1, _offDist, true), 0.1)
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    push()
    translate(this.pos.x, this.pos.y)
    beginShape()
    // strokeWeight(this.idx % 20 * 0.1)
    strokeWeight(1.618)
    rotate(this.angle)
    vertex(-this.leftOff, 0)
    vertex(this.rightOff, 0)
    endShape()
    pop()
  }
}