const r_ = scl
const lineLen_ = 5
const _sw = scl / 16
const totalPoints = 10


class Cell {
  constructor(x, y, idx) {
    this.pos = createVector(x, y);
    this.r = r_ / 2
    this.picked = false
    this.idx = idx
    this.other = null
    this.dist = 0
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
    let shortestDistance = Infinity
    let longestDistance = 0
    let pickedIdx = null
    for (let i = 0; i < _notPickedCells.length; i++) {
      const otherCell = _notPickedCells[i]
      const dist = p5.Vector.dist(otherCell.pos, this.pos)
      if (dist < shortestDistance && otherCell != this) {
        pickedIdx = i
        shortestDistance = dist
      }
      if (dist > longestDistance && otherCell != this) {
        // pickedIdx = i
        longestDistance = dist
      }
    }

    // FIND the target point in the cells list
    cellIdx = null
    cells.forEach((elm, tempIdx) => {
      if (elm == _notPickedCells[pickedIdx]) {
        cellIdx = tempIdx
      }
    })

    this.dist = longestDistance
    this.other = cells[cellIdx]
    cells[cellIdx].picked = true
    this.picked = true

    // REMOVE the target point
    _notPickedCells.splice(pickedIdx, 1)
  }

  update() {}

  show() {
    if (this.other != null && this.picked) {
      noFill()
      stroke(clrs[1])
      strokeWeight(_sw)
      // for (let i = 0; i < totalPoints; i++) {
      //   let x = lerp(this.pos.x, this.other.pos.x, i / totalPoints)
      //   let y = lerp(this.pos.y, this.other.pos.y, i / totalPoints)
      //   point(x, y)
      // }

      // let tempVector = p5.Vector.sub(this.other.pos, this.pos)
      // tempVector.setMag(r_ / 2 * lineLen_)
      // line(this.pos.x, this.pos.y, this.pos.x + tempVector.x, this.pos.y + tempVector.y)

      // tempVector = p5.Vector.sub(this.pos, this.other.pos)
      // tempVector.setMag(r_ / 2 * lineLen_)
      // line(this.other.pos.x, this.other.pos.y, this.other.pos.x + tempVector.x, this.other.pos.y + tempVector.y)
      let x1 = random(width)
      let y1 = random(height)
      let x2 = this.pos.x
      let y2 = this.pos.y
      let x3 = this.other.pos.x
      let y3 = this.other.pos.y
      let x4 = random(width)
      let y4 = random(height)

      curve(x1, y1, x2, y2, x3, y3, x4, y4)
      // line(this.pos.x, this.pos.y, this.other.pos.x, this.other.pos.y)

      // curveVertex(x2, y2)
      // curveVertex(x3, y3)
    } else if (!this.picked) {
      noStroke()
      fill(clrs[1])
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }

  }

  showDots(nextPoint) {
    noFill()
    stroke(clrs[1])
    strokeWeight(_sw)
    if (this.picked) {
      for (let i = 0; i < totalPoints; i++) {
        let x = lerp(this.pos.x, nextPoint.pos.x, i / totalPoints)
        let y = lerp(this.pos.y, nextPoint.pos.y, i / totalPoints)
        point(x, y)

      }
    }
  }
}