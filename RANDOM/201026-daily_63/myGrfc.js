
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
      let tidx = i
      let special = i % 2 == 0
      this.letters.push(new myLetter(tidx + this.idx * this.txt.length, special, this.txt[i], x, 0))
    }

    this.letters.forEach(elm => {
      elm.updateAfterInit(this)
    })
  }
  

  //————————————————————————————————————————————— myPoint show
  update() {
    this.letters.forEach(elm => {
      elm.update()
    })
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    noStroke()
    push()
    translate(this.pos.x, this.pos.y)
    this.letters.forEach((elm) => {
      elm.show()
    })
    pop()
  }
}