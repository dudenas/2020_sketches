let SW = 6;
let index = 0;

class Obj {
  constructor(x, y, dir) {
    this.dir = dir;
    this.index = index / 10;
    this.sw = SW;
    this.x = x;
    this.y = y;
    this.special = floor(random(scl * 5));
    index++;
    this.newPick = true;
    if (this.dir == 1) {
      this.ax = this.x - scl;
      this.bx = this.x + scl;
      this.ay = this.y;
      this.by = this.y;
    } else {
      this.ax = this.x;
      this.bx = this.x;
      this.ay = this.y - scl;
      this.by = this.y + scl;
    }
  }

  interesctsPoints(x, y) {
    let found = false;
    for (let i = points.length - 1; i >= 0; i--) {
      let p = points[i];
      if (x == p.x && y == p.y) {
        found = true;
        points.splice(i, 1);
      }
    }
    return found;
  }

  intersects(x, y) {
    return ((this.ax == x && this.ay == y) || (this.bx == x && this.by == y));
  }

  checkA(others) {
    let available = true;
    for (let other of others) {
      if (this != other && other.intersects(this.ax, this.ay)) {
        available = false;
      }
    }
    if (available && this.interesctsPoints(this.ax, this.ay)) {
      return new Obj(this.ax, this.ay, this.dir * -1);
    } else return null;
  }

  checkB(others) {
    let available = true;
    for (let other of others) {
      if (this != other && other.intersects(this.bx, this.by)) {
        available = false;
      }
    }
    if (available && this.interesctsPoints(this.bx, this.by)) {
      return new Obj(this.bx, this.by, this.dir * -1);
    } else return null;
  }

  update() {
    let percent = ((frameCount + this.index) % totalFrames) / totalFrames;
    percent = ease[styles[0]](percent);
    if (this.dir == 1) {
      this.px = map(sin(percent * TWO_PI), -1, 1, this.x - scl, this.x + scl);
      this.sw = map(this.px, this.x - scl, this.x + scl, SW, SW / 2);
      this.py = this.y;
    } else {
      this.px = this.x;
      this.py = map(sin(percent * TWO_PI), -1, 1, this.y - scl - this.special, this.y + scl + this.special);
      this.sw = map(this.py, this.y - scl - this.special, this.y + scl + this.special, SW, SW / 2);
    }
    this.angle = map(sin(percent * TWO_PI), -1, 1, -PI / 2, PI / 2);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    point(this.px, this.py);
    pop();
  }
}