//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    // this.speed = pow(2,12)
    this.speed = 0.1
    if(this.idx == 450) {
      this.size = 8
      console.log(this.idx)
    }
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    //  4 4, 8 12, 4 12 translate -width/2
    let percent = (floor(this.idx) % 4) / 12.;
    // this.angle = map(percent, 0, 1, 0, TWO_PI)
    // this.d = p5.Vector.dist(this.opos, createVector(width / 2, height / 2, 0))
    const center = _grfc[_grfc.length/2]
    this.d = p5.Vector.dist(this.opos, center.opos)
    // console.log(this.d)
    // this.angle = this.d
    this.angle= this.opos.x / this.d
    const x = this.d * cos(this.angle)
    const y = this.d * sin(this.angle)
    this.otherPos = createVector(x,y,0)
  }

  //————————————————————————————————————————————— Point update
  update() {
    // this.speed = .00005 * this.idx
    this.speed = .05
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames;
    // linear ease 2 5 10
    // percent = ease[styles[5]](percent);
    this.pos.x = map(sin(TWO_PI/4*3 + percent * TWO_PI), -1, 1, this.opos.x, this.otherPos.x)
    this.angle += percent/10
    // this.angle += 0.05
    this.pos.y = map(cos(PI + percent * TWO_PI), -1, 1, this.opos.y, this.otherPos.y)
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    rotate(sin(this.angle))
    translate(-width / 2 + padd / 2, -height / 2 + padd / 2)
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}