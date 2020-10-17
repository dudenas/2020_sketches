
//————————————————————————————————————————————— myLetter
class myLetter{
  constructor(idx, letter,x,y){
    this.pos = createVector(x,y)
    this.opos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.letter = letter
    this.oletter = letter
    this.idx = idx
    this.angle = random(TWO_PI)
    this.scl = 1
  }
  
  //————————————————————————————————————————————— myLetter update
  update(idxNumber){
    const fcount = floor((frameCount + this.idx * idxNumber) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[2]](percent);
    this.angle = map(percent, 0, 1, 0, TWO_PI)
    this.scl = map(sin(percent * TWO_PI), -1, 1, 1, 3)
    let l_idx = floor(map((percent + 0.5) % 1, 0, 1, 0, _changeTxt.length))
    this.letter = _changeTxt[l_idx]
    
  }

  //————————————————————————————————————————————— myLetter show
  show(){
    push()
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      scale(this.scl)
      fill(_clrs[1])
      text(this.letter, 0,0)
      pop()
  }
}