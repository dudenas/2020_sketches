class Obj {
  constructor(x, y, id, index) {
    this.x = x;
    this.xx = x;
    this.xo = x;
    this.y = y;
    this.yy = y;
    this.yo = y;

    this.id = id / 50;
    this.r = map(index, 0, cols, scl / 5, scl);
    this.ro = this.r;
    this.picked = false;
  }

  update() {
    let percent = ((frameCount + this.id) % totalFrames) / totalFrames;
    percent = ease[styles[5]](percent);
    this.x = map(cos(percent * TWO_PI), -1, 1, this.xx, this.xo);
    this.r = map(sin(percent * TWO_PI), -1, 1, this.ro, scl - this.ro);
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(clrs[1]);
    noStroke();
    ellipseMode(CENTER);
    ellipse(0, 0, this.r);
    pop();
  }
}