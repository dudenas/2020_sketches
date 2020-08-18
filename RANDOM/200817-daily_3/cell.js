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

  pickOther(myIdx) {
    let shortestDistance = Infinity
    let pickedIdx = null
    _notPickedCells.splice(myIdx, 1)

    for (let i = 0; i < _notPickedCells.length; i++) {
      const otherCell = _notPickedCells[i]
      const dist = p5.Vector.dist(otherCell.pos, this.pos)
      if (dist < shortestDistance && otherCell != this) {
        pickedIdx = i
        shortestDistance = dist
      }
    }

    let cellIdx = null
    cells.forEach((elm, tempIdx) => {
      if (elm == _notPickedCells[pickedIdx]) {
        cellIdx = tempIdx
      }
    })


    this.other = cells[cellIdx]
    this.other.picked = true
    this.picked = true
    _notPickedCells.splice(pickedIdx, 1)
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