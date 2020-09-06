const _totaltrail = 12

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y, ox, oy) {
    this.idx = idx;
    this.pos = createVector(x, y, 0)
    this.ipos = createVector(x, y, 0)
    this.opos = createVector(ox, oy, 0)
    this.trail = []
    this.totalTrail = random(_totaltrail)
  }
  //————————————————————————————————————————————— myPoint show
  update() {
    let percent = ((frameCount + this.idx * 0.1) % _totalFrames) / _totalFrames;
    percent = ease[styles[2]](percent);
    let nforce = map(openSimplex.noise2D(percent * TWO_PI, percent * TWO_PI), -1, 1, -50, 50)

    percent = ((frameCount + this.idx * 0.1) % _totalFrames) / _totalFrames;
    percent = ease[styles[2]](percent);
    this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.ipos.x, this.opos.x) + nforce

    nforce = map(openSimplex.noise2D(percent * TWO_PI + PI / 3, percent * TWO_PI), -1, 1, -50, 50)
    this.pos.y = map(sin(percent * TWO_PI), -1, 1, this.ipos.y, this.opos.y) + nforce

    percent = ((frameCount) % _totalFrames) / _totalFrames;
    this.pos.z = map(sin(percent * TWO_PI + this.idx * 0.8), -1, 1, 100, -100.0)

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    // push()
    beginShape()
    strokeWeight(_sw)
    stroke(_clrs[1])
    for (let i = 0; i < this.trail.length - 1; i++) {
      // const c = lerp(_clrs[1], 0, 1 / (i + 1))
      // fill(c)
      // stroke(c)
      const elm = this.trail[i]
      if (i < 3) {
        push()
        translate(elm.x, elm.y, elm.z)
        ellipse(0, 0, _sw, _sw)
        pop()
      }
      vertex(elm.x, elm.y, 0)
    }
    endShape()
    // pop()
  }
}