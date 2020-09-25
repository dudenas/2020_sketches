const _totaltrail = 32
const _maxSpeed = 6
const _maxForce = 0.2
let _idxStep = 10

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.ns = idx
      this.pos = createVector(x, y, 0)
      this.opos = createVector(x, y, 0)
      this.vel = createVector(0, 0, 0)
      this.acc = createVector(0, 0, 0)
      this.trail = []
      this.totalTrail = floor(random(1, _totaltrail))
      this.r = _r
      this.h = 0
      this.back = false
      this.fc = 1
    }
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


  //————————————————————————————————————————————— myPoint show
  update(v1) {
    const fcount = floor((frameCount + this.idx * 0.8) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    // percent = ease[styles[9]](percent);
    let nforce = map(openSimplex.noise2D(percent * TWO_PI, 0), -1, 1, -24, 24)
    let nforceX = openSimplex.noise2D(percent * TWO_PI, this.ns * 0.05)
    let nforceY = openSimplex.noise2D(this.ns * 0.05, percent * TWO_PI)
    v1 = createVector(nforceX, nforceY)
    this.h = map(sin(percent * TWO_PI), -1, 1, _minY - 1, _maxY + 1) + nforce
    v1.limit(_maxForce)
    if (this.fc % _totalFrames == 0) {
      this.otherIdx = (this.otherIdx + _idxStep) % _points[_currLetter].length
      // this.otherIdx = floor(random(_points[_currLetter].length))
      // const d = this.pos.dist(this.opos)
      // if (this.back && d < 0.1) {
      // if (this.back) {
      //   this.back = false
      //   // this.otherIdx = floor(random(_points[_currLetter].length))
      // } else if (!this.back) {
      //   this.back = true
      // }
    }

    // add forces
    // if (!this.back) {
    const posOther = _points[_currLetter][this.otherIdx].opos
    const v = this.arrive(posOther)
    this.addForce(v)
    // } else this.addForce(this.arrive(this.opos))

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
    this.fc++
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    noStroke()
    push()
    noFill()
    stroke(_clrs[1])
    translate(this.pos.x, this.pos.y)
    beginShape()
    this.trail.forEach((elm, idx) => {
      // ellipse(elm.x - this.pos.x, elm.y - this.pos.y, this.r, this.r)
      vertex(elm.x - this.pos.x, elm.y - this.pos.y)
    })
    endShape()
    noStroke()
    fill(_clrs[1])
    ellipse(0, 0, this.r, this.r)

    pop()
  }
}