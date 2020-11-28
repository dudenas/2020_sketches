let maxDist = 0
const _maxspeed = 6; // Maximum speed
const _maxforce = 0.05; // Maximum steering force

//————————————————————————————————————————————— Point
class Point {
  constructor(x, y, z, idx) {
    this.pos = createVector(x, y, z)
    this.vel = createVector(0, 0, 0)
    this.acc = createVector(0, 0, 0)
    this.opos = createVector(x, y, z)
    this.size = _size
    this.idx = idx
    this.nidx = idx
    this.speed = 0.1
    this.angle = 0
  }

  //————————————————————————————————————————————— Point flock
  flock() {
    let seek = this.seek(_grfcCenter); // Separation
    seek.mult(1);
    // this.applyForce(seek);

    // let sep = this.separate(_grfc); // Separation
    // sep.mult(2.5);
    // this.applyForce(sep);

  }

  //————————————————————————————————————————————— Point apply force
  applyForce(force) {
    // We could add mass here if we want A = F / M
    // force.mult(this.speed / this.nidx)
    // force.setMag(this.nidx)
    // force.setMag(1./this.d)
    this.acc.add(force);
  }

  //————————————————————————————————————————————— Point separate
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.pos, boids[i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.pos, boids[i].pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(_maxspeed);
      steer.sub(this.vel);
      steer.limit(_maxforce);
    }
    return steer;
  }

  //————————————————————————————————————————————— Point seek
  seek(target) {
    let desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(_maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(_maxforce); // Limit to maximum steering force
    return steer;
  }

  // Method to update location
  update() {
    // Update velocity
    this.vel.add(this.acc);
    // Limit speed
    this.vel.limit(_maxspeed);
    this.pos.add(this.vel);
    // Reset accelertion to 0 each cycle
    this.acc.mult(0);
  }

  //————————————————————————————————————————————— Point updateAfterInit
  updateAfterInit() {
    this.d = p5.Vector.dist(this.opos, _grfcCenter)
    if (this.d > maxDist) maxDist = this.d
  }

  //————————————————————————————————————————————— Point update
  updateOther() {
    if (frameCount == 1) {
      // this.nidx = sin((this.d / maxDist) * TWO_PI)
      this.nidx = (this.d / maxDist)
      this.nidx = 1. - (this.d / maxDist)
    }

    this.speed = 0.01
    const fcount = floor(frameCount + this.idx * this.speed) % _totalFrames
    let percent = (fcount) / _totalFrames
    // percent = ease[styles[5]](percent);

    // this.size = 10./(p5.Vector.dist(this.pos, this.opos))

    // this.angle += this.nidx/10;
    // this.angle += sin(this.nidx * TWO_PI)/5 * sin(percent * TWO_PI);
    // this.angle += this.nidx/5 * sin(percent * TWO_PI);
    // this.angle += this.nidx/5 * sin(percent * TWO_PI) / this.d
    // this.angle =  this.d  * 0.01
    // else this.angle += sin(this.nidx * TWO_PI)/5 * sin(percent * TWO_PI)
    // this.angle += this.nidx / 5 * (cos(percent * TWO_PI) + 1) / 2
    this.angle += this.nidx / 5 * (cos(percent * TWO_PI) * this.d / 100.)
    this.angle += this.nidx / 10 * (sin(percent * TWO_PI))
    this.pos.z = atan(this.angle) * 100


    // percent = ease[styles[5]](percent);
    // let other = null
    // const str = map(sin(percent * TWO_PI), -1, 1, -200, 200)
    this.d = p5.Vector.dist(_grfcCenter, this.pos)
    // other = p5.Vector.sub(_grfcCenter, this.opos)
    // this.pos.add(other.setMag(str / d))
  }

  //————————————————————————————————————————————— Point show
  show() {
    push()
    //1
    //2
    // rotate(this.angle)
    rotateY(this.angle)
    // rotateX(-this.angle)
    translate(-_grfcCenter.x, -_grfcCenter.y, 0)
    translate(this.pos.x, this.pos.y, this.pos.z)
    noStroke()
    fill(_clrs[1])
    sphere(this.size)
    pop()
  }
}