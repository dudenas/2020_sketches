//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, special, letter, x, y) {
    const temp = floor(random(-5, 5)) * _padd
    this.pos = createVector(x + idx * _afterPadd, y + temp)
    this.opos = createVector(x + idx * _afterPadd, y + temp)
    this.oposTemp = createVector(x + idx * _afterPadd, y + temp)
    this.letter = letter
    this.idx = idx
    this.angle = 0
    this.special = special
    this.trail = []
    this.taken = false
    this.fc = 0
    this.finnished = false
  }

  //————————————————————————————————————————————— myLetter updateAfterInit
  updateAfterInit(grfc) {
    let found = false
    let count = 0
    let temp_idx = -1
    while (!found && count < 1000) {
      temp_idx = floor(random(grfc.letters.length))
      this.other = grfc.letters[temp_idx]
      if (!this.other.taken) found = true
      count++
    }
    grfc.letters[temp_idx].taken = true
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
      const fcount = this.fc
      let percent = (fcount) / _totalFrames;
      percent = ease[styles[3]](percent);
      this.angle = map(percent, 0, 1, 0, TWO_PI)
      if (this.special) this.angle = map(percent, 0, 1, 0, -TWO_PI)
      this.trail.push(this.angle)
      if (percent <= 0.5) {
        this.pos.x = map(percent, 0, 0.5, this.opos.x, this.other.opos.x)
        // this.pos.y = this.opos.y
      } else this.pos.y = map(percent, 0.5, 1, this.opos.y, this.other.opos.y)
      if (this.trail.length > max(this.idx * 10, 10)) this.trail.splice(0, 1)
      this.fc = (this.fc + 1) % _totalFrames
      if (this.fc == 0) {
        this.finnished = true
      }
    }
  }

  showGuides() {
    push()
    translate(this.opos.x, this.opos.y)
    noFill()
    stroke(_clrs[2])
    strokeWeight(_sw)
    text(this.letter, 0, 0)
    pop()
  }

  //————————————————————————————————————————————— myLetter show
  show() {

    // push()
    // translate(this.pos.x, this.pos.y)
    // noFill()
    // stroke(_clrs[1])
    // text(this.letter, 0, 0)
    // pop()

    strokeWeight(_sw / 5)
    for(let i = 0; i < this.trail.length; i++){
      let curr = this.trail[i]
      push()
      translate(this.pos.x, this.pos.y)
      rotate(curr)
      noFill()
      stroke(_clrs[1])
      text(this.letter, 0,0)
      pop()
    }
  }
}