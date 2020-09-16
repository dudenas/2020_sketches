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
      this.sw = random(_sw)
    }
  }


  //————————————————————————————————————————————— myPoint show
  update() {

    const fcount = floor((frameCount + this.idx * 0.2) % _totalFrames)
    if (fcount % _totalFrames == 0) this.curr = (this.curr + 1) % _letters.length
    const percent = (fcount) / _totalFrames;

    let nforce = map(openSimplex.noise2D(percent * TWO_PI, 0), -1, 1, -24, 24)

    this.pos.x = lerp(this.pos.x, map(percent, 0, 1, this.opos[this.curr].x, this.opos[(this.curr + 1) % _letters.length].x), 1.) + nforce
    this.pos.y = lerp(this.pos.y, map(percent, 0, 1, this.opos[this.curr].y, this.opos[(this.curr + 1) % _letters.length].y), 1.)

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
    noFill()
    stroke(_clrs[1])
    strokeWeight(this.sw)
    for (let i = 0; i < this.trail.length - 1; i++) {
      const elm = this.trail[i]
      vertex(elm.x, elm.y, 0)
    }

    endShape()
    pop()
  }
}