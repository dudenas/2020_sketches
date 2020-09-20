const _totaltrail = 24

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y) {
    if (idx != -1) {
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.trail = []
      this.totalTrail = floor(random(1, _totaltrail))
      this.opos = []
      this.curr = 0
      this.r = _r
      this.ratio = random(1);
    }
  }


  //————————————————————————————————————————————— myPoint show
  update() {
    const fcount = floor((frameCount + (_points.length - this.idx) * 0.2) % _totalFrames)
    if (fcount % _totalFrames == 0) this.curr = (this.curr + 1) % _letters.length
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[5]](percent);

    let nforce = map(openSimplex.noise2D(percent * TWO_PI, 0), -1, 1, -24, 24)
    this.r = map(cos(percent * TWO_PI), -1, 1, _r * 2, _r)
    this.pos.x = map(percent, 0, this.ratio, this.opos[this.curr].x, this.opos[(this.curr + 1) % _letters.length].x, true)
    this.pos.y = map(percent, this.ratio, 1, this.opos[this.curr].y, this.opos[(this.curr + 1) % _letters.length].y, true)



    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  showDots() {
    for (let i = 0; i < this.trail.length - 1; i += _totaltrail / 4) {
      const elm = this.trail[i]
      const elmr = map(i, 0, this.trail.length - 1, this.r, this.r / 2)
      ellipse(elm.x, elm.y, elmr, elmr)

    }
  }

  showLine() {
    push()
    translate(this.pos.x, this.pos.y)
    if (this.pos.y > height / 2.5) line(0, 0, 0, height)
    else {
      // line(10, 0, 0, 0)
      ellipse(0, 0, this.r, this.r)
    }
    pop()
  }
}