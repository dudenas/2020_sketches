const _maxSpeed = 10
const _maxForce = 0.5
const _separateDist = 25

const _trailLen = 30
let _follow = false

//————————————————————————————————————————————— myLetter
class myLetter{
  constructor(idx, letter,x,y){
    this.pos = createVector(x,y)
    this.opos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.letter = letter
    this.idx = idx
    this.special = random(1) > 1
    this.light = random(1) > 1
    this.trail = []
    this.trailLen = random(_trailLen)
  }

  //————————————————————————————————————————————— forces
  updateForce() {
    this.vel.add(this.acc)
    this.vel.limit(_maxSpeed);
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  addForce(f) {
    this.acc.add(f)
  }

  align() {
    let neighbordist = _separateDist * 2;
    let sum = createVector(0, 0);
    let count = 0;
    for(let n = 0; n < _grfc.length; n++){
      let array = _grfc[n].letters
      for (let i = 0; i < array.length; i++) {
        let d = p5.Vector.dist(this.pos, array[i].pos);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(array[i].vel);
          count++;
        }
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(_maxSpeed);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(_maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Arrive at some location
  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = _maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, _maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(_maxForce);
    return steer;
  }

  // Method checks for nearby boids and steers away
  separate() {
    let desiredseparation = _separateDist;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for(let n = 0; n < _grfc.length; n++){
      let array = _grfc[n].letters
      for (let i = 0; i < array.length; i++) {
        let d = p5.Vector.dist(this.pos, array[i].pos);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
          // Calculate vector pointing away from neighbor
          let diff = p5.Vector.sub(this.pos, array[i].pos);
          diff.normalize();
          diff.div(d); // Weight by distance
          steer.add(diff);
          count++; // Keep track of how many
        }
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
      steer.mult(_maxSpeed);
      steer.sub(this.vel);
      steer.limit(_maxForce);
    }
    return steer
  }
  
  //————————————————————————————————————————————— myLetter update
  update(easeNumber, idxNumber, array, mouseForce){
    const fcount = floor((frameCount + this.idx * idxNumber) % _totalFrames)
    let percent = (fcount) / _totalFrames;
    percent = ease[styles[4]](percent);

    let f = this.arrive(mouseForce)
    if(!_follow){
      f = this.arrive(this.opos)
    } else {
      let f_2 = this.separate()
      f_2.mult(10)
      this.addForce(f_2)
    }
    f.mult(1)
    this.addForce(f)
    let f_3 = this.align()
    f_3.mult(1)
    // this.addForce(f_3)
    // this.pos.y = lerp(this.pos.y, temp, 0.5)
    // this.pos.y = lerp(this.pos.y, this.opos.y, 0.1)

    if(this.special) {
      this.trail.push(this.pos.y)
      if(this.trail.length > this.trailLen) this.trail.splice(0,1)
    }
  }

  //————————————————————————————————————————————— myLetter show
  show(){
    if(this.special){
      for(let i = 0; i < this.trail.length; i++){
        let y = this.trail[i]
        if(this.light){
          fill(_clrs[0])
        } else {
          fill(_clrs[1])
        }
        text(this.letter, this.pos.x, y)
      }
    }else{
      if(this.light){
        fill(_clrs[0])
      } else {
        fill(_clrs[1])
      }
      text(this.letter, this.pos.x, this.pos.y)
    }
  }
}