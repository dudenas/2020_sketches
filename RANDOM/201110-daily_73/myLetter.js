//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, letter, x, y) {
    this.pos = createVector(x, y)
    this.opos = createVector(x, y)
    this.letter = letter
    this.idx = idx
    this.initIdx = idx
    this.other = null
  }

  //————————————————————————————————————————————— myLetter update
  update() {
    if (!this.finnished) {
      // const fcount = (frameCount + (this.idx * 0.9 + (this.other.idx * 0.3))) % _totalFrames
      const fcount = (frameCount +  this.idx * 0.5) % _totalFrames
      let percent = (fcount) / _totalFrames;
      // 0.25 3 // default
      // percent = ease[styles[11]](percent,0.25, 12);
      
      this.pos.x = map(sin(percent * TWO_PI), -1, 1, this.opos.x, this.opos.x * (this.idx % 3) * 3, true)
      // this.pos.y = map(sin(percent * TWO_PI), -1, 1, 0, this.opos.x * 2 , true)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    const d = p5.Vector.dist(this.opos, this.pos)
    const opc = map(d, 0, 10, 255 , 0)
    noStroke()
    fill(_clrs[1], opc)
    // fill(_clrs[1])
    text(this.letter, 0, 0)
    pop()
  }
}

function squareWave(x){
  return (2/PI) * (asin(sin(x)))
}