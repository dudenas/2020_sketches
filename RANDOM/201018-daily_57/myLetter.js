//————————————————————————————————————————————— myLetter
class myLetter {
  constructor(idx, special, letter, x, y) {
    // const temp = floor(random(-5,5)) * _padd
    // this.pos = createVector(x + idx * _afterPadd, y + temp)
    // this.opos = createVector(x + idx * _afterPadd, y + temp)
    this.pos = createVector(x + idx * _afterPadd, y + floor(random(-5,5)) * _padd)
    this.opos = createVector(x + idx * _afterPadd, y + floor(random(-5,5)) * _padd)
    this.letter = letter
    this.idx = idx
    this.angle = 0
    this.special = special
    this.trail = []
    this.taken = false
  }

  updateAfterInit(grfc){
    let found = false
    let count = 0
    let temp_idx = -1
    while(!found && count < 1000){
      temp_idx = floor(random(grfc.letters.length))
      this.other = grfc.letters[temp_idx]
      if(!this.other.taken) found = true
      count++
    }
    console.log(count)
    grfc.letters[temp_idx].taken = true
  }

  //————————————————————————————————————————————— myLetter update
  update(idxNumber) {
    const fcount = floor((frameCount + this.idx * 1) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[5]](percent);  
    this.angle = map(percent, 0, 1, 0, TWO_PI)
    if (this.special) this.angle = map(percent, 0, 1, 0, -TWO_PI)

    this.trail.push(this.angle)
    if (percent <= 0.5) this.pos.x = map(percent, 0, 0.5, this.opos.x, this.other.opos.x)
    else this.pos.y = map(percent, 0.5, 1, this.opos.y, this.other.opos.y)
    if(this.trail.length > this.idx * 10) this.trail.splice(0,1)
  }

  showGuides(){
    push()
    translate(this.opos.x, this.pos.y)
    noFill()
    stroke(_clrs[2])
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
    

    for(let i = 0; i < this.trail.length; i++){
      let curr = this.trail[i]
      push()
      rotate(curr)
      translate(this.pos.x, this.pos.y)
      // rotate(this.angle)
      noFill()
      stroke(_clrs[1])
      text(this.letter, 0,0)
      pop()
    }
  }
}