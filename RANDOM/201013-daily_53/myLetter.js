const _trailLen = 30
let _follow = false

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
    this.special = random(1) > 1
    this.light = random(1) > 1
    this.trail = []
    this.trailLen = random(_trailLen)
  }
  
  //————————————————————————————————————————————— myLetter update
  update(idxNumber){
    const fcount = floor((frameCount + this.idx * idxNumber * 0.9) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[10]](percent);

    this.pos.y = map(sin(percent * TWO_PI), -1, 1, -_movementDist, _movementDist)
    let d = abs(this.pos.y)
    if(this.pos.y < 10) {
      this.letter = this.oletter
    } else {
      let l_idx = floor(map(d, 10, _movementDist, 0, _changeTxt.length))
      this.letter = _changeTxt[l_idx]
    }

    if(this.special) {
      this.trail.push(this.pos.y)
      if(this.trail.length > this.trailLen) this.trail.splice(0,1)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show(){
    if(this.special){
      for(let i = 0; i < this.trail.length; i++){
        let y = this.trail[i]
        if(this.light){
          fill(_clrs[0])
        } else {
          fill(_clrs[1])
        }
        text(this.letter, this.pos.x, y)
      }
    }else{
      if(this.light){
        fill(_clrs[0])
      } else {
        fill(_clrs[1])
      }
      text(this.letter, this.pos.x, this.pos.y)
    }
  }
}