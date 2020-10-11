const _trailLen = 50

//————————————————————————————————————————————— myLetter
class myLetter{
  constructor(idx, letter,x,y){
    this.pos = createVector(x,y)
    this.opos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.letter = letter
    this.idx = idx
    this.special = random(1) > 0.2
    this.light = random(1) > 0.9
    this.trail = []
    this.trailLen = random(_trailLen)
  }
  
  //————————————————————————————————————————————— myLetter update
  update(easeNumber, idxNumber){
    const fcount = floor((frameCount + this.idx * idxNumber) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[4]](percent);
    randomSeed(1)
    let nforce = map(openSimplex.noise2D(frameCount * 0.02, this.idx * random(this.idx)), -1, 1, -25, 25)
    let temp = this.pos.y + nforce
    this.pos.y = lerp(this.pos.y, temp, 0.5)
    this.pos.y = lerp(this.pos.y, this.opos.y, 0.1)
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
        let col = map(i, 0, this.trail.length, 0, 100)
        if(this.light){
          // fill(_clrs[0], col)
          fill(_clrs[0])
        } else {
          fill(_clrs[1])
          // fill(_clrs[1], col)
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