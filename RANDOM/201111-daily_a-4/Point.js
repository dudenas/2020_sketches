//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.nextPos = _grfc[(this.nidx+=_total/2) % _grfc.length].opos
    this.prevPos = this.pos.copy()
  }

  //————————————————————————————————————————————— Point update
  update() {
    // 0.2 with ease style 5, 0 linear
    const fcount = (frameCount + this.idx * 0.) % _totalFrames
    let percent = (fcount) / _totalFrames;
    if (fcount == 0) {
      this.updateAfterInit()
    }
    // 0.25 3 // default
    // percent = ease[styles[5]](percent);
    // percent = ease[styles[11]](percent,0.25, 12);
    this.pos.x = map(percent, 0, 1, this.prevPos.x, this.nextPos.x, true)
    this.pos.y = map(percent, 0, 1, this.prevPos.y, this.nextPos.y, true)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}