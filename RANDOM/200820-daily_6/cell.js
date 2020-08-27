const r_ = scl
const lineLen_ = 5
const _sw = scl / 8
const totalPoints = 10
let _currentOrder = 0
const _maxDist = 100

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = r_ / 2
    this.picked = false
    this.other = null
    this.flipHorizontal = random(1) > 0.8
    this.dist = null
    this.changeColor = random(1) > 0.95
  }

  pickOther() {
    // REMOVE the current point from the unpicked points
    let cellIdx = null
    _notPickedCells.forEach((elm, tempIdx) => {
      if (elm == this) {
        cellIdx = tempIdx
      }
    })
    _notPickedCells.splice(cellIdx, 1)

    // SEARCH for other not picked point
    let distance = Infinity
    let pickedIdx = null
    for (let i = 0; i < _notPickedCells.length; i++) {
      const otherCell = _notPickedCells[i]
      const dist = p5.Vector.dist(otherCell.pos, this.pos)
      if (dist < distance && otherCell != this) {
        pickedIdx = i
        distance = dist
      }
    }

    // FIND the target point in the cells list
    cellIdx = null
    cells.forEach((elm, tempIdx) => {
      if (elm == _notPickedCells[pickedIdx]) {
        cellIdx = tempIdx
      }
    })

    this.other = cells[cellIdx]
    cells[cellIdx].picked = true
    this.picked = true
    this.dist = distance

    _notPickedCells.splice(pickedIdx, 1)
    return cellIdx
  }

  update() {}

  show() {
    if (this.other != null && this.picked && this.dist < _maxDist) {
      noFill()
      if (this.changeColor) stroke(clrs[2])
      else stroke(clrs[1])
      strokeWeight(_sw)
      if (this.flipHorizontal) {
        if (this.pos.x == this.other.pos.x) {
          beginShape()
          vertex(this.pos.x, this.pos.y)
          vertex(this.other.pos.x, this.other.pos.y)
          endShape()

          push()
          translate(this.pos.x, (this.pos.y + this.other.pos.y) / 2)
          rotate(PI / 2)
          beginShape()
          vertex(0, -this.dist / 2)
          vertex(0, +this.dist / 2)
          endShape()
          pop()
        } else if (this.pos.y == this.other.pos.y) {
          beginShape()
          vertex(this.pos.x, this.pos.y)
          vertex(this.other.pos.x, this.other.pos.y)
          endShape()

          push()
          translate((this.pos.x + this.other.pos.x) / 2, this.pos.y)
          rotate(PI / 2)
          beginShape()
          vertex(-this.dist / 2, 0)
          vertex(+this.dist / 2, 0)
          endShape()
          pop()
        } else {
          beginShape()
          vertex(this.pos.x, this.pos.y)
          vertex(this.other.pos.x, this.other.pos.y)
          endShape()

          beginShape()
          vertex(this.other.pos.x, this.pos.y)
          vertex(this.pos.x, this.other.pos.y)
          endShape()
        }
      } else {
        beginShape()
        vertex(this.pos.x, this.pos.y)
        vertex(this.other.pos.x, this.other.pos.y)
        endShape()
      }
    } else if (!this.picked) {
      noStroke()
      fill(clrs[1])
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }

  }
}