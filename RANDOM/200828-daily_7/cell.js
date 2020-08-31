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
    this.other = this.pos.copy();
    this.checkNoiseField()
  }

  //——————————————————————————————————————————— Cell Update
  update() {
    if (this.other != undefined) {
      this.pos = p5.Vector.lerp(this.pos, this.other, 0.1)
    }
  }

  // 
  checkNoiseField() {
    const nstr = this.idx ** map(mouseY, 0, height, 0, 1)
    const nforce = map(openSimplex.noise2D(nstr, nstr), -1, 1, -_scl * 2, +_scl * 2)
    const nx = this.opos.x + nforce * map(mouseX, 0, width, 0, 1) * map(sin(frameCount * 0.1 + this.idx), -1, 1, -1, 1)
    this.temp = createVector(nx, this.pos.y)
    this.other = p5.Vector.lerp(this.other, this.temp, 0.1)
  }

  //——————————————————————————————————————————— Cell show
  show() {
    if (this.picked) {
      noStroke()
      if (!_showFinal) {
        fill(_clrs[1], 50)
        textSize(16)
        text("+", this.pos.x - _sw / 2, this.pos.y + _sw / 2)
      }
    }
  }

  //——————————————————————————————————————————— Cell connectLine
  connectLine() {
    noFill()
    strokeWeight(_sw)
    stroke(_clrs[1], 50)
    if (_showFinal) stroke(_clrs[1])
    curveVertex(this.pos.x, this.pos.y)
  }
}