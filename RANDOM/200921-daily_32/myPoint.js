const _totaltrail = 24

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.trail = []
      this.totalTrail = floor(random(1, _totaltrail))
      this.r = _r
      this.h = 0
    }
  }


  //————————————————————————————————————————————— myPoint show
  update() {
    const fcount = floor((frameCount + this.idx * 0.8) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[5]](percent);
    let nforce = map(openSimplex.noise2D(percent * TWO_PI, 0), -1, 1, -24, 24)
    this.h = map(sin(percent * TWO_PI + TWO_PI * this.idx * 0.0), -1, 1, _minY - 1, _maxY + 1) + nforce


    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  showGrfc() {
    push()
    translate(this.pos.x, this.pos.y)
    if (this.pos.y > this.h) {
      noFill()
      stroke(_clrs[1])
      strokeWeight(_sw)
      line(0, 0, 0, height)
    } else {
      noStroke()
      fill(_clrs[1])
      // ellipse(0, 0, this.r, this.r)
    }
    pop()
  }
}