const r_ = scl

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = r_ / 2
    this.showIt = false
    this.animateIt = false
  }

  update() {
    if (this.animateIt) {
      this.showIt = true
      if (this.r > 0.1) {
        this.r *= 0.9
      } else {
        this.animateIt = false;
        this.showIt = false;
        this.r = r_ / 2
      }
    }
  }

  show() {
    noStroke();
    noStroke()
    fill(clrs[1])
    push()
    translate(this.pos.x, this.pos.y)
    ellipse(0, 0, this.r, this.r)
    pop()

  }

  shine(other) {
    let diff = p5.Vector.sub(other, this.pos);
    let str = diff.mag();
    if (str < diam_ / 2) this.animateIt = true
  }
}