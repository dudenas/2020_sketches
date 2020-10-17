
//————————————————————————————————————————————— myGrfc 
class myGrfc {
  constructor(idx, x, y, easeNumber, idxNumber) {
      this.txt = _txt
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.opos = createVector(x, y, 0)
      this.vel = createVector(0, 0, 0)
      this.acc = createVector(0, 0, 0)
      this.letters = []
      this.createLetters()
      this.easeNumber = easeNumber
      this.idxNumber = idxNumber
  }
  //————————————————————————————————————————————— myPoint createLetters
  createLetters(){
    let bbox = _myfont.textBounds(this.txt, 0, 0, _txtSize)
    let tempTxt = ''
    for(let i = 0; i < this.txt.length; i++){
      tempTxt += this.txt[i]
      const char = _myfont.textBounds(this.txt[i], 0, 0, _txtSize)
      const tempBox = _myfont.textBounds(tempTxt, 0, 0, _txtSize)
      let x = bbox.x + tempBox.w - char.w/2
      let tidx = map(sin(i/this.txt.length * TWO_PI - PI/2), -1, 1, 1, 5)
      this.letters.push(new myLetter(tidx, this.txt[i], x, 0))
    }
  }
  

  //————————————————————————————————————————————— myPoint show
  update() {
    this.letters.forEach(elm => {
      elm.update(this.idxNumber)
    })
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    noStroke()
    push()
    translate(this.pos.x, this.pos.y)
    this.letters.forEach(elm => {
      fill(_clrs[1])
      elm.show()
    })
    pop()
  }
}