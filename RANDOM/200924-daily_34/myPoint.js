const _totaltrail = 24
const _maxSpeed = 3
const _maxForce = 0.1

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
    this.h = map(sin(percent * TWO_PI), -1, 1, _minY - 1, _maxY + 1) + nforce
    v1.limit(_maxForce * 0.25)
    if (this.fc % _totalFrames == 0) {
      const d = this.pos.dist(this.opos)
      if (this.back && d < 0.1) {
        this.back = false
      } else if (!this.back) {
        this.back = true
      }
    }
    if (!this.back) this.addForce(v1)
    else this.addForce(this.arrive(this.opos))

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
    this.fc++
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    noStroke()
    fill(_clrs[1])
    push()
    translate(this.pos.x, this.pos.y)
    if (this.pos.y > this.h) {
      // this.trail.forEach(elm => {
      //   ellipse(elm.x - this.pos.x, elm.y - this.pos.y, this.r, this.r)
      // })
      ellipse(0, 0, this.r, this.r)
    } else if (this.idx % 2 == 0) {
      ellipse(0, 0, this.r, this.r)
    }
    pop()
  }
}