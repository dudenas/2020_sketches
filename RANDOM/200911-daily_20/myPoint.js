const _totaltrail = 64

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y, ox, oy) {
    this.idx = idx;
    this.pos = createVector(x, y, 0)
    this.ipos = createVector(x, y, 0)
    this.opos = createVector(ox, oy, 0)
    this.trail = []
    this.totalTrail = floor(random(1, _totaltrail))

    this.tempi = this.ipos.copy()
    this.tempo = this.opos.copy()

    this.r = floor(random(8))
    this.idx_1 = floor(random(this.totalTrail - 1))
    this.idx_2 = floor(random(this.totalTrail - 1))
    this.stay = random(1) > 0.8
  }
  //————————————————————————————————————————————— myPoint change to the next indexes position
  changeNext(temp_idx) {
    const other = _points[(temp_idx + 1) % _points.length]

    if (temp_idx == 0) {
      this.tempi = this.ipos.copy()
      this.tempo = this.opos.copy()
    }

    this.ipos = other.ipos.copy()
    this.opos = other.opos.copy()
  }


  //————————————————————————————————————————————— myPoint show
  update() {
    // let nforce = map(openSimplex.noise2D(percent * TWO_PI, percent * TWO_PI), -1, 1, -50, 50)
    // percent = ease[styles[3]](percent);

    let percent = ((frameCount + this.idx * 0.3) % _totalFrames) / _totalFrames;
    this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.ipos.x, this.opos.x)
    this.pos.y = map(sin(percent * TWO_PI), -1, 1, this.ipos.y, this.opos.y)
    // percent = ((frameCount) % _totalFrames) / _totalFrames;
    this.pos.z = map(sin(percent * TWO_PI), -1, 1, 50 + this.idx * 0.1, -50.0 - this.idx * 0.1)

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    push()
    translate(0, 0, this.pos.z)
    beginShape()
    // noStroke()
    fill(_clrs[1])

    // stroke(_clrs[1])
    // for (let i = 0; i < this.trail.length - 1; i++) {
    //   const elm = this.trail[i]
    //   // vertex(elm.x, elm.y, 0)
    // }
    if (this.stay) {
      noFill()
      strokeWeight(_sw)
      ellipse(this.ipos.x, this.ipos.y, this.r, this.r)
      ellipse(this.opos.x, this.opos.y, this.r, this.r)
    } else {
      if (this.trail.length >= this.totalTrail) {
        vertex(this.trail[this.idx_1].x, this.trail[this.idx_1].y)
        vertex(this.trail[this.idx_2].x, this.trail[this.idx_2].y)
        // ellipse(this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y, this.r, this.r)
      }
    }
    endShape()
    pop()
  }
}