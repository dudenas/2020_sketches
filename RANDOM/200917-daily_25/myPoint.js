const _totaltrail = 32

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
      this.r = random(_r)
    }
  }


  //————————————————————————————————————————————— myPoint show
  update() {
    const fcount = floor((frameCount + this.idx * 0.05) % _totalFrames)
    if (fcount % _totalFrames == 0) this.curr = (this.curr + 1) % _letters.length
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[2]](percent);

    // let nforce = map(openSimplex.noise2D(percent * TWO_PI, 0), -1, 1, -24, 24)

    this.pos.x = lerp(this.pos.x, map(percent, 0, 1, this.opos[this.curr].x, this.opos[(this.curr + 1) % _letters.length].x), 1.)
    this.pos.y = lerp(this.pos.y, map(percent, 0, 1, this.opos[this.curr].y, this.opos[(this.curr + 1) % _letters.length].y), 1.)

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }


    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  showDots() {
    for (let i = 0; i < this.trail.length - 1; i += _totaltrail / 4) {
      const elm = this.trail[i]
      const elmr = map(i, 0, this.trail.length - 1, this.r, this.r / 4)
      ellipse(elm.x, elm.y, elmr, elmr)

    }
  }

  showLine() {
    const elm_b = this.trail[this.trail.length - 1]
    vertex(elm_b.x, elm_b.y)
  }
}