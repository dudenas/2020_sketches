let SW = 20
let total = 5
let grfc
let ratio = 1.223

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Obj
class Obj {
  constructor(x, y, r, index, parent) {
    this.x = x
    this.y = y
    this.r = r
    if (!parent) this.sw = SW
    else this.sw = SW / 1.2
    this.index = index
    index++

    this.parent = parent ? parent : null
    if (index < total) {
      let newR = this.r / ratio
      this.grfc = new Obj(this.r - newR, 0, newR, index, this)
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Obj update
  update() {
    let percent = ((frameCount + this.index * 5) % (totalFrames)) / (totalFrames)
    percent = ease[styles[0]](percent)
    if (this.parent) {
      let angle = map(sin(percent * TWO_PI), -1, 1, 0, TWO_PI)
      this.x = ((this.parent.r - this.r)) * cos(angle)
      this.y = ((this.parent.r - this.r)) * sin(angle)
    }
  }
  //————————————————————————————————————————————————————————————————————————————————— Obj show
  show() {
    push()
    translate(this.x, this.y)
    stroke(clrs[1])
    strokeWeight(this.sw)
    noFill()
    ellipse(0, 0, this.r * 2)
    if (this.grfc) {
      this.grfc.update()
      this.grfc.show()
    }
    pop()
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  grfc.show()
  grfc.update()
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  grfc = new Obj(0, 0, width / 4, 0)
}