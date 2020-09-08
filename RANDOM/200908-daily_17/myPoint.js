const _totaltrail = 24

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y, ox, oy) {
    this.idx = idx;
    this.pos = createVector(x, y, 0)
    this.ipos = createVector(x, y, 0)
    this.opos = createVector(ox, oy, 0)
    this.trail = []
    this.totalTrail = random(_totaltrail)

    this.tempi = this.ipos.copy()
    this.tempo = this.opos.copy()
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
    // let percent = ((frameCount + this.idx * 0.2) % _totalFrames) / _totalFrames;
    // percent = ease[styles[3]](percent);
    // let nforce = map(openSimplex.noise2D(percent * TWO_PI, percent * TWO_PI), -1, 1, -50, 50)

    let percent = ((frameCount + this.idx * 0.1) % _totalFrames) / _totalFrames;
    percent = ease[styles[3]](percent);
    this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.ipos.x, this.opos.x)
    this.pos.y = map(sin(percent * TWO_PI), -1, 1, this.ipos.y, this.opos.y)
    percent = ((frameCount) % _totalFrames) / _totalFrames;
    // this.pos.z = map(sin(percent * TWO_PI + this.idx * 0.8), -1, 1, 100, -100.0)

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    // push()
    // beginShape()
    // strokeWeight(_sw)
    // stroke(_clrs[1])
    // for (let i = 0; i < this.trail.length - 1; i++) {
    //   const elm = this.trail[i]
    //   vertex(elm.x, elm.y, 0)
    // }
    // endShape()

    vertex(this.opos.x, this.opos.y, 0)
    if (this.idx % 2 == 0) {
      const elmFirst = this.trail[0]
      vertex(elmFirst.x, elmFirst.y, 0)
    } else {
      const elmLast = this.trail[this.trail.length - 1]
      vertex(elmLast.x, elmLast.y, 0)
    }
    vertex(this.ipos.x, this.ipos.y, 0)

    // pop()
  }
}