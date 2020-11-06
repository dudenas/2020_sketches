
//————————————————————————————————————————————— myGrfc 
class myGrfc {
  constructor(idx, x, y) {
      this.txt = _txt
      this.idx = idx;
      this.pos = createVector(x, y, 0)
      this.letters = []
      this.createLetters()
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
      // increase the spacing
      let tidx = i * 8
      // idx, letter, x, y
      this.letters.push(new myLetter(tidx + this.idx * this.txt.length, this.txt[i], x, 0))
    }
  }
  

  //————————————————————————————————————————————— myPoint show
  update() {
    randomSeed(1)
    this.letters.forEach(elm => {
      elm.update()
    })
  }

  //————————————————————————————————————————————— myPoint show
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    this.letters.forEach((elm) => {
      elm.show()
    })
    pop()
  }
}