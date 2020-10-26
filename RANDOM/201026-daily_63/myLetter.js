const _speed = 1
const _radius = 75

//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, special, letter, x, y) {
    // const temp = floor(random(-5, 5)) * _padd
    const temp = 0
    this.pos = createVector(x + idx * _afterPadd, y + temp)
    this.opos = createVector(x + idx * _afterPadd, y + temp)
    this.letter = letter
    this.idx = idx
    this.special = special
    this.radius = _radius
    this.fc = 0
  }

  //————————————————————————————————————————————— myLetter updateNext
  updateAfterInit(grfc) {
    this.angle = map(this.idx, 0, grfc.letters.length, 0, 30)
    this.pos.x = _radius * sin(radians(this.angle))
    this.pos.y = _radius * cos(radians(this.angle))
    this.speed = _speed * (this.idx+1) / 2
  }

  //————————————————————————————————————————————— myLetter update
  update() {
    if (!this.finnished) {
      const fcount = (this.fc + this.idx * .3) % _totalFrames
      let percent = (fcount) / _totalFrames;
      percent = ease[styles[7]](percent);

      this.angle += pow(this.speed,1/2)
      this.radius = map(sin(percent * TWO_PI), -1, 1, _radius, _radius * 2.)
      this.pos.x = this.radius * sin(radians(this.angle))
      // this.pos.y = this.radius * tan(radians(this.angle))
      this.fc++
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    // option 1 / 2
    // scale(_grfc[0].letters.length/(this.idx)+0.1)
    scale((this.idx)/(_grfc[0].letters.length * _total))
    noFill()
    stroke(_clrs[1])
    text(this.letter, 0, 0)
    pop()
  }
}