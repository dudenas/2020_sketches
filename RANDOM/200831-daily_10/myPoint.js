const _totaltrail = 20

//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(idx, x, y, ox, oy) {
    this.idx = idx;
    this.pos = createVector(x, y)
    this.ipos = createVector(x, y)
    this.opos = createVector(ox, oy)
    this.trail = []
  }
  //————————————————————————————————————————————— myPoint show
  update() {
    let percent = ((frameCount + this.idx * 0.3) % _totalFrames) / _totalFrames;
    percent = ease[styles[3]](percent);
    const tempx = map(sin(percent * TWO_PI), -1, 1, this.ipos.x, this.opos.x)

    const nforce = map(openSimplex.noise2D(percent * TWO_PI, percent * TWO_PI), -1, 1, -10, 10)
    this.pos.x = lerp(this.pos.x, tempx, 0.1) + nforce

    const tempy = map(sin(percent * TWO_PI), -1, 1, this.ipos.y, this.opos.y)
    this.pos.y = lerp(this.pos.y, tempy, 0.1)

    if (this.trail.length > _totaltrail) {
      this.trail.splice(0, 1)
    }

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    noFill()
    beginShape()
    stroke(_clrs[1])
    strokeWeight(1)
    for (let i = 0; i < this.trail.length; i++) {
      const elm = this.trail[i]
      vertex(elm.x, elm.y)
    }
    endShape()
  }
}