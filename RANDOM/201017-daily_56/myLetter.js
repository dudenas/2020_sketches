
//————————————————————————————————————————————— myLetter
class myLetter{
  constructor(idx, special, letter,x,y){
    this.pos = createVector(x,y)
    this.opos = createVector(x,y)
    this.letter = letter
    this.idx = idx
    this.angle = 0
    this.special = special
    this.trail = []
  }
  
  //————————————————————————————————————————————— myLetter update
  update(idxNumber){
    const fcount = floor((frameCount + this.idx * 100) % _totalFrames)
    // const fcount = floor((frameCount) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[5]](percent);
    this.angle = map(percent, 0, 1, 0, TWO_PI)
    if(this.special) this.angle = map(percent, 0, 1, 0, -TWO_PI)
    
    this.trail.push(this.angle)
    if(this.trail.length > this.idx * 10) this.trail.splice(0,1)
  }

  //————————————————————————————————————————————— myLetter show
  show(elmIdx){
    for(let i = 0; i < this.trail.length; i++){
      let curr = this.trail[i]
      push()
      rotate(curr)
      translate(this.pos.x + _afterPadd * elmIdx, this.pos.y)
      // rotate(curr)
      rotate(this.angle)
      // fill(_clrs[1])
      noFill()
      // fill(_clrs[0])
      stroke(_clrs[1])
      text(this.letter, 0,0)
      pop()
    }
  }
}