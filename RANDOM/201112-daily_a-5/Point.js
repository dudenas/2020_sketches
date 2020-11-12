//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    this.speed = 0.1
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.nextPos = _grfc[(this.nidx += floor(this.idx % 20)) % _grfc.length].opos
    this.prevPos = this.pos.copy()
  }

  //————————————————————————————————————————————— Point update
  update() {
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;
    if (fcount == 0) {
      this.updateAfterInit()
    }
    // linear ease 5
    percent = ease[styles[5]](percent);
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