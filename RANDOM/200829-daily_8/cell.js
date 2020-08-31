const _sw = _scl / 2

//————————————————————————————————————————————— Cell
class Cell {
  constructor(i, j, picked) {
    this.pos = createVector(i * _scl, j * _scl);
    this.idx = i + j * _cols
    this.picked = picked
    this.scl = _scl / 2
    this.xoff = 0
  }

  //——————————————————————————————————————————— Cell Update
  update() {
    let percent
    switch (_mode) {
      case 0:
        percent = ((frameCount * map(this.idx, 0, _cells.length, 0, 1) + this.pos.x) % _totalFrames) / _totalFrames;
        this.scl = map(sin(percent * TWO_PI), -1, 1, 1, _scl / 2)
        break;
      case 1:
        percent = ((frameCount + this.idx + this.pos.x) % _totalFrames) / _totalFrames;
        this.scl = map(sin(percent * TWO_PI), -1, 1, 1, _scl / 2)
        break;
      case 2:
        const nforce_2 = map(openSimplex.noise2D(this.idx, this.idx), -1, 1, -_scl, +_scl)
        percent = ((frameCount + this.idx * sin(nforce_2)) % _totalFrames) / _totalFrames;
        this.scl = map(sin(percent * TWO_PI), -1, 1, 0, nforce_2)
        break;
      case 3:
        const nforce_3 = map(openSimplex.noise2D(this.idx * 0.05, this.idx * 0.05), -1, 1, 0, _scl)
        this.scl = map(sin(frameCount * 0.2 + this.idx), -1, 1, 0, nforce_3)
        this.xoff = floor(map(sin(frameCount * 0.1 + this.idx), -1, 1, 0, 3)) * _scl / 2
        break;
    }
  }

  //——————————————————————————————————————————— Cell show
  show() {
    if (this.picked) {
      noFill()
      strokeWeight(_sw)
      stroke(_clrs[1], 50)
      if (_showFinal) stroke(_clrs[1])
      switch (_mode) {
        case 0:
          line(this.pos.x, this.pos.y, this.pos.x + this.scl, this.pos.y)
          break;
        case 1:
          line(this.pos.x, this.pos.y, this.pos.x + this.scl, this.pos.y)
          break;
        case 2:
          line(this.pos.x, this.pos.y, this.pos.x + this.scl, this.pos.y + this.scl)
          break;
        case 3:
          line(this.pos.x + this.xoff, this.pos.y, this.pos.x + this.xoff, this.pos.y + this.scl)
          break;
      }
    }
  }
}