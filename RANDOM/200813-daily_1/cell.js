class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.origPos = this.pos.copy();
    this.id = random(0, 1);
    this.rotating = random(1) > 0.5;
    this.sw = random(1) > 0.5 ? 1 : 2 * 1.618
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed * this.id);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    // fill(clrs[1]);
    noFill();
    stroke(clrs[1])
    // ellipse(this.pos.x, this.pos.y, scl * (1 - this.id), scl * (1 - this.id));
    // line(this.pos.x, this.pos.y);
    push()
    translate(this.pos.x + scl * (1 - this.id) / 2, this.pos.y)
    if (this.rotating) rotate(this.vel.y * 0.3)
    strokeWeight(this.sw)
    line(-scl * (1 - this.id) / 2, 0, scl * (1 - this.id) / 2, 0)
    pop()

  }

  getBack() {
    let diff = p5.Vector.sub(this.origPos, this.pos);
    let str = diff.mag();
    diff.normalize();
    str = map(str, 0, 100, 0, maxForce * this.id);
    let force = p5.Vector.sub(diff, this.vel);
    force.mult(str);
    this.acc.add(force);
  }

  glitch() {
    if (random(1) > 0.9) {
      let factor = floor(random(0, 10));
      this.acc.y += random(-scl * factor, scl * factor);
    }
  }
}