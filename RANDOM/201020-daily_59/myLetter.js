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
  }

  //————————————————————————————————————————————— myLetter updateNext
  updateNext(grfc) {
    let found = false
    let count = 0
    let temp_idx = -1
    this.opos = this.other.oposTemp.copy()

    while (!found && count < 1000) {
      temp_idx = floor(random(grfc.letters.length))
      this.other = grfc.letters[temp_idx]
      if (!this.other.taken) found = true
      count++
    }

    grfc.letters[temp_idx].taken = true
  }

  //————————————————————————————————————————————— myLetter update
  update() {
    if (!this.finnished) {
      const fcount = this.fc % _totalFrames
      let percent = (fcount) / _totalFrames;
      percent = ease[styles[5]](percent);

      this.angle += map(sin(percent * TWO_PI), -1, 1, 0, _speed)
      this.radius = map(sin(percent * TWO_PI), -1, 1, _radius, _radius * 2)
      this.pos.x = this.radius * sin(radians(this.angle))
      this.pos.y = this.radius * cos(radians(this.angle))
      this.trail.push(this.angle)
      if (this.trail.length > max(this.idx * 5, 5)) this.trail.splice(0, 1)
      this.fc++
    }
  }

  //————————————————————————————————————————————— myLetter show
  show() {
    // push()
    // translate(this.pos.x, this.pos.y)
    // noFill()
    // stroke(_clrs[1])
    // text(this.letter, 0, 0)
    // pop()

    strokeWeight(_sw / this.idx)
    for (let i = 0; i < this.trail.length; i++) {
      let curr = this.trail[i]
      push()
      translate(this.pos.x, this.pos.y)
      rotate(curr)
      noFill()
      stroke(_clrs[1])
      text(this.letter, 0, 0)
      pop()
    }
  }
}