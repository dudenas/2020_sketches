//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, letter, x, y) {
    this.pos = createVector(x, y)
    this.opos = createVector(x, y)
    this.letter = letter
    this.idx = idx
  }

  //————————————————————————————————————————————— myLetter update
  update() {
    if (!this.finnished) {
      const fcount = (frameCount + this.idx * 0.3) % _totalFrames
      let percent = (fcount) / _totalFrames;
      // 0.25 3 // default
      // percent = ease[styles[11]](percent,0.25, 3);
      // this.pos.x = map(squareWave(percent * TWO_PI), -1, 1, this.opos.x, this.opos.x * 3, true)
      this.pos.x = map(sin(percent * TWO_PI), -1, 1, pow(this.idx,1.15), pow(this.idx,.3), true)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    noStroke()
    fill(_clrs[1])
    text(this.letter, 0, 0)
    pop()
  }
}

function squareWave(x){
  return (2/PI) * (asin(sin(x)))
}