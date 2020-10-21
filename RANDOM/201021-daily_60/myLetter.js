const _speed = 1
const _radius = 100

//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, special, letter, x, y) {
    const temp = floor(random(-5, 5)) * _padd
    this.pos = createVector(x + idx * _afterPadd, y + temp)
    this.opos = createVector(x + idx * _afterPadd, y + temp)
    this.letter = letter
    this.idx = idx
    this.special = special
    this.trail = []
    this.radius = _radius
    this.fc = 0
  }

  //————————————————————————————————————————————— myLetter updateNext
  updateAfterInit(grfc) {
    this.angle = map(this.idx, 0, grfc.letters.length, 0, 360)
    this.pos.x = _radius * sin(radians(this.angle))
    this.pos.y = _radius * cos(radians(this.angle))
    this.speed = _speed * this.idx / 12
  }

  //————————————————————————————————————————————— myLetter update
  update() {
    if (!this.finnished) {
      const fcount = this.fc % _totalFrames
      let percent = (fcount + this.idx * 1) / _totalFrames;
      // percent = ease[styles[5]](percent);

      this.angle += this.speed
      this.radius = map(sin(percent * TWO_PI), -1, 1, _radius, _radius * 2)
      this.pos.x = this.radius * sin(radians(this.angle))
      this.pos.y = this.radius * cos(radians(this.angle)) - 25
      // this.trail.push(this.pos.copy() * this.idx)
      // if (this.trail.length > max(this.idx * 1, 1)) this.trail.splice(0, 1)
      this.fc++
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    scale(this.idx/24)
    // noFill()
    // stroke(_clrs[1])
    // const opc = 255. / this.idx
    noStroke()
    fill(_clrs[1])
    text(this.letter, 0, 0)
    pop()

    // strokeWeight(_sw * 4 / this.idx)
    // for (let i = 0; i < this.trail.length; i++) {
    //   let curr = this.trail[i]
    //   push()
    //   translate(curr.x, curr.y)
    //   // rotate(curr)
    //   // noFill()
    //   // stroke(_clrs[1])
    //   text(this.letter, 0, 0)
    //   pop()
    // }
  }
}