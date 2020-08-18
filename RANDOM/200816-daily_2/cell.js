const r_ = scl
const _sw = scl / 16

class Cell {
  constructor(x, y, idx) {
    this.pos = createVector(x, y);
    this.r = r_ / 2
    this.picked = false
    this.idx = idx
    this.other = null
  }

  pickOther() {
    rnd = floor(random(cells.length))
    while (rnd == this.idx && cells[rnd].picked) {
      rnd = floor(random(cells.length))
    }
    this.other = cells[rnd]
    this.other.picked = true
    this.picked = true
  }

  update() {}

  show() {
    if (this.other != null && this.picked) {
      stroke(clrs[1])
      strokeWeight(_sw)
      noFill()
      line(this.pos.x, this.pos.y, this.other.pos.x, this.other.pos.y)
    } else if (!this.picked) {
      noStroke()
      fill(clrs[1])
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }

  }
}