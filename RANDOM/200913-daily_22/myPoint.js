const _totaltrail = 64

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
    }
  }


  //————————————————————————————————————————————— myPoint show
  update() {
    let percent = ((frameCount + this.idx * 0.2) % _totalFrames) / _totalFrames;
    this.pos.x = lerp(this.pos.x, map(sin(percent * TWO_PI), -1, 1, this.opos[(this.curr + 1) % _letters.length].x, this.opos[this.curr].x), 0.1)
    this.pos.y = lerp(this.pos.y, map(sin(percent * TWO_PI), -1, 1, this.opos[(this.curr + 1) % _letters.length].y, this.opos[this.curr].y), 0.1)

    if (this.trail.length > this.totalTrail) {
      this.trail.splice(0, 1)
    }

    if (frameCount % _totalFrames == 0) this.curr = (this.curr + 1) % _letters.length

    this.trail.push(this.pos.copy())
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    push()
    translate(0, 0, this.pos.z)
    beginShape()
    noFill()
    stroke(_clrs[1])
    for (let i = 0; i < this.trail.length - 1; i++) {
      const elm = this.trail[i]
      vertex(elm.x, elm.y, 0)
    }

    endShape()
    pop()
  }
}