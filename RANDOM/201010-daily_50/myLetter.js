const _trailLen = 100

//————————————————————————————————————————————— myLetter
class myLetter{
  constructor(idx, letter,x,y){
    this.pos = createVector(x,y)
    this.opos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.letter = letter
    this.idx = idx
    this.special = random(1) > 0.5
    this.trail = []
    this.trailLen = random(_trailLen)
  }
  
  //————————————————————————————————————————————— myLetter update
  update(easeNumber, idxNumber){
    const fcount = floor((frameCount + this.idx * idxNumber) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[easeNumber]](percent);
    let nforce = map(openSimplex.noise2D(percent * TWO_PI, idxNumber), -1, 1, -25, 25)
    this.pos.x += nforce
    this.pos.x = lerp(this.pos.x, this.opos.x, 0.1)
    if(this.special) {
      this.trail.push(this.pos.x)
      if(this.trail.length > this.trailLen) this.trail.splice(0,1)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show(){
    if(this.special){
      for(let i = 0; i < this.trail.length; i++){
        let x = this.trail[i]
        let col = map(i, 0, this.trail.length, 0, 100)
        fill(_clrs[1], col)
        text(this.letter, x, this.pos.y)
      }
    }else{
      text(this.letter, this.pos.x, this.pos.y)
    }
  }
}