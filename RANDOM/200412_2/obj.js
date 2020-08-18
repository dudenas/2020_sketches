class Obj {
  constructor(x, y, id) {
    this.x = x;
    this.xo = x;
    this.y = y;
    this.yo = y;
    let num = floor(random(1, 9));
    this.id = id / 10;
    this.white = random(1) > 0.75;
    this.r = this.white ? scl : random(2, scl);
    switch (num) {
      case 1:
      case 2:
        this.special = 0;
        break;
      case 3:
      case 4:
        this.special = 1;
        break;
      case 5:
      case 6:
        this.special = 2;
        break;
      case 7:
      case 8:
        this.special = 3;
        break;
      default:
    }
  }

  update() {
    let percent = ((frameCount + this.id) % totalFrames) / totalFrames;
    percent = ease[styles[3]](percent);
    switch (this.special) {
      case 0:
        this.x = map(sin(percent * TWO_PI), -1, 1, this.xo, this.xo + scl);
        break;
      case 1:
        this.x = map(sin(percent * TWO_PI), -1, 1, this.xo, this.xo - scl);
        break;
      case 2:
        this.y = map(sin(percent * TWO_PI), -1, 1, this.yo, this.yo + scl);
        break;
      case 3:
        this.y = map(sin(percent * TWO_PI), -1, 1, this.yo, this.yo - scl);
        break;

    }
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(clrs[1]);
    if (this.white) fill(clrs[0]);
    noStroke();
    ellipseMode(CENTER);
    ellipse(0, 0, this.r);
    pop();
  }
}