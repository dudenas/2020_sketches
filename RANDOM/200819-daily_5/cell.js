const r_ = scl
const lineLen_ = 5
const _sw = scl / 16
const totalPoints = 10
let _currentOrder = 0

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = r_ / 2
    this.picked = false
    this.orderIdx = null
    this.other = null
  }

  pickOther() {
    this.orderIdx = _currentOrder++
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

    return cellIdx
  }

  update() {}

  show(mode) {
    if (this.other != null && this.picked) {
      noFill()
      stroke(clrs[1])
      strokeWeight(_sw)
      // line(this.pos.x, this.pos.y, this.other.pos.x, this.other.pos.y)
      curveVertex(this.pos.x, this.pos.y)

    } else if (!this.picked) {
      noStroke()
      fill(clrs[1])
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }

  }
}