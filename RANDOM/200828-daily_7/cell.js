const _r = _scl
const _sw = _scl / 2

//————————————————————————————————————————————— Cell
class Cell {
  constructor(i, j, picked) {
    this.pos = createVector(i * _scl, j * _scl);
    this.opos = createVector(i * _scl, j * _scl);
    this.idx = i + j * _cols
    this.r = _r / 2
    this.picked = picked
    this.isFree = false
    this.other = undefined
    this.occupied = false
  }

  //——————————————————————————————————————————— Cell Update
  update() {
    if (this.other != undefined) {
      this.pos = p5.Vector.lerp(this.pos, this.other, 0.1)
    }
  }

  //——————————————————————————————————————————— Cell show
  show() {
    if (this.picked) {
      noStroke()
      if (!_showFinal) {
        if (this.other != undefined) fill(_clrs[2])
        else if (this.current) fill(_clrs[3])
        else fill(_clrs[1], 50)
        textSize(16)
        text("+", this.pos.x, this.pos.y)
      }
    } else if (this.isFree && !_showFinal) {
      fill(_clrs[3])
      textSize(16)
      text("-", this.pos.x, this.pos.y)
    }
  }

  //——————————————————————————————————————————— Cell connectLine
  connectLine() {
    noFill()
    strokeWeight(_sw)
    stroke(_clrs[1], 50)
    if (_showFinal) stroke(_clrs[1])
    vertex(this.pos.x, this.pos.y)
  }
}