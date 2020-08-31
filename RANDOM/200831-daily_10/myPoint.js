//————————————————————————————————————————————— myPoint 
class myPoint {
  constructor(x, y, ox, oy) {
    this.pos = createVector(x, y)
    this.opos = createVector(ox, oy)
    this.r = _r
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    noStroke()
    fill(_clrs[1])
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}