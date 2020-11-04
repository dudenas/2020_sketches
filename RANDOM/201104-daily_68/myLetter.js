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
      const fcount = (frameCount + this.idx * 0.9) % _totalFrames
      let percent = (fcount) / _totalFrames;
      // 0.25 3 // default
      // percent = ease[styles[11]](percent,0.25, 3);
      percent = ease[styles[8]](percent);
      // this.pos.x = map(squareWave(percent * TWO_PI), -1, 1, this.opos.x, this.opos.x * 3, true)
      this.pos.y = map(squareWave(percent * TWO_PI), -1, 1, 0,floor(atan(this.idx)) * 100, true)
      // console.log((floor(sin(this.idx)) * 100), this.idx)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    push()
    translate(this.pos.x * (this.pos.y * 0.07), this.pos.y)
    noStroke()
    fill(_clrs[1])
    text(this.letter, 0, 0)
    pop()
  }
}

function squareWave(x){
  return (2/PI) * (asin(sin(x)))
}