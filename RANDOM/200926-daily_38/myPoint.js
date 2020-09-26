const _totaltrail = 12
const _maxSpeed = 6
const _maxForce = 0.2
let _idxStep = 2

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
      this.totalTrail = floor(random(1, _totaltrail))
      this.fc = 1
      this.rsize = 30
      this.angle = 0
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
  update() {
    const fcount = floor((frameCount + this.idx * 0.8) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[9]](percent);
    if (this.fc % (_totalFrames) == 0) {
      this.otherIdx = (this.otherIdx + _idxStep) % _points[_currLetter].length
    }
    // define angle
    this.angle = map(percent, 0, 1, 0, PI)

    // add forces
    let nforce_x = openSimplex.noise2D(percent * TWO_PI, 0)
    let nforce_y = openSimplex.noise2D(0, percent * TWO_PI)
    let nforce = createVector(nforce_x, nforce_y)
    this.maxForce = map(sin(percent * TWO_PI), -1, 1, nforce.mag(), map(mouseX, 0, width, 0, 0.5))
    nforce.limit(this.maxForce)
    this.addForce(nforce)
    const posOther = _points[_currLetter][this.otherIdx].opos
    const v = this.arrive(posOther)
    this.addForce(v)

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
    // noFill()
    // stroke(_clrs[1])
    fill(_clrs[1])
    stroke(_clrs[0])
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    // this.trail.forEach((elm, idx) => {

    //   rect(elm.x - this.pos.x, elm.y - this.pos.y, this.rsize, this.rsize)
    // })
    // box(this.rsize, this.rsize)
    box(this.rsize * this.pos.x * 0.002, this.rsize)

    pop()
  }
}