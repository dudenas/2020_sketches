const _r = _scl
const _sw = _scl / 16
const _freeCells = []

//————————————————————————————————————————————— Cell
class Cell {
  constructor(i, j, picked) {
    this.pos = createVector(i * _scl, j * _scl);
    this.opos = createVector(i * _scl, j * _scl);
    this.idx = i + j * _cols
    this.r = _r / 2
    this.picked = picked
    this.other = undefined
    this.initialCell = false
    this.current = false
  }
  //——————————————————————————————————————————— Cell Pick spot
  pickSpot() {
    this.current = true

    let found = false
    let otherIdx = -1
    let testCount = 0
    while (!found && testCount < 1000) {
      let dirX = floor(random(-1, 2))
      let dirY = floor(random(-1, 2))
      if (dirX == -1 && dirY == -1) otherIdx = this.idx - _cols - 1
      if (dirX == -1 && dirY == 0) otherIdx = this.idx - 1
      if (dirX == -1 && dirY == 1) otherIdx = this.idx + _cols - 1
      if (dirX == 0 && dirY == -1) otherIdx = this.idx - _cols
      if (dirX == 0 && dirY == 0) otherIdx = -1
      if (dirX == 0 && dirY == 1) otherIdx = this.idx + _cols
      if (dirX == 1 && dirY == -1) otherIdx = this.idx - _cols + 1
      if (dirX == 1 && dirY == 0) otherIdx = this.idx + 1
      if (dirX == 1 && dirY == 1) otherIdx = this.idx + _cols + 1
      otherIdx = this.findOther(otherIdx)
      if (_cells[otherIdx] != undefined && _cells[otherIdx].picked) {
        if (_cells[otherIdx].initialCell) {
          found = true
        }
      }
      testCount++
    }

    if (testCount < 1000) {
      this.other = _cells[otherIdx].opos.copy()
      // add the other cell as visited in order not to go into it a second time
      // _freeCells.push(this.other)
    }

    pickOther()
  }
  //——————————————————————————————————————————— Cell findother
  findOther(otherIdx) {
    for (let i = 0; i < _cells.length; i++) {
      if (_cells[i].idx == otherIdx) {
        return i
      }
    }
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
      if (_showFinal) {
        if (this.other != undefined) {
          fill(_clrs[1])
          ellipse(this.pos.x, this.pos.y, this.r / 1.618, this.r / 1.618)
        }
      } else {
        if (!this.initialCell) {
          if (this.other != undefined) fill(_clrs[2])
          else if (this.current) fill(_clrs[3])
          else fill(_clrs[1], 50)
          ellipse(this.pos.x, this.pos.y, this.r, this.r)
        }

      }
    }
  }

  connectLine() {
    noFill()
    strokeWeight(_sw)
    stroke(_clrs[1], 50)
    if (_showFinal) stroke(_clrs[1])
    vertex(this.pos.x, this.pos.y)
  }
}