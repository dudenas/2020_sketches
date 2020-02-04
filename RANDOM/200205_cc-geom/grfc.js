class grfc {
  constructor() {
    this.mainPoints = [];
    this.suppPoints = [];
    this.supportLines = [];
    this.loners = [];
    this.maxDistx = maxDistX;
    this.pointRadius = pointRadius;
    this.padding = padding;

    this.createMainLine();
    this.createPoints();
    this.connectSupp();
    this.createLoners();
  }

  // random Points
  createLoners() {
    for (let i = 0; i < floor(random(1, TOTAL_LONERS)); i++) {
      let x = random(random(0, width / 3), random(width / 3 * 2, width));
      let y = random(height);
      let minD = Infinity;
      let px, py;
      this.suppPoints.forEach(p => {
        let d = dist(x, y, p.pos[0], p.pos[1]);
        if (d < minD) {
          minD = d;
          px = p.pos[0];
          py = p.pos[1];
        }
      })
      this.loners.push({
        x1: x,
        y1: y,
        x2: px,
        y2: py
      });
    }
  }

  showLoners() {
    this.loners.forEach(elm => {
      strokeWeight(SW['pointloner']);
      stroke(color(clrs['main']));
      noFill();
      point(elm.x1, elm.y1)

      strokeWeight(SW['lineloner']);
      stroke(color(clrs['main']));
      noFill();
      line(elm.x1, elm.y1, elm.x2, elm.y2);
    })
  }

  // SUPP LINES
  showSuppLines() {
    let dMax = 0;
    this.supportLines.forEach(elm => {
      let x = elm.posStart[0];
      let y = elm.posStart[1];

      // based on the distance to the main the stroke weight changes
      let d = dist(elm.main[0], elm.main[1], x, y);
      let sw = constrain(map(d, 0, 100, SW['pmin'], SW['pmax']), SW['pmin'], SW['pmax']);

      strokeWeight(sw);
      stroke(color(clrs['main']));
      noFill();
      // drawStroke
      line(x, y, elm.posEnd[0], elm.posEnd[1]);
    })
  }

  connectSupp() {
    this.suppPoints.forEach((elm, i) => {
      let x = elm.pos[0];
      let y = elm.pos[1];
      let countConnect = 0;
      for (let j = 0; j < this.suppPoints.length; j++) {
        if (countConnect < maxConnections && i != j) {
          let other = this.suppPoints[j];
          if (!other.connected.some(k => k == j)) {
            let ox = other.pos[0];
            let oy = other.pos[1];
            let d = dist(x, y, ox, oy);
            if (d < connectRadius && random(1) > map(d, 50, 200, 0.5, 0)) {
              let s = {
                posStart: [x, y],
                posEnd: [ox, oy],
                main: elm.main
              }
              elm.connected.push(i);
              this.supportLines.push(s);
              countConnect += 1;
            }
          }
        }
      }
    })
  }

  // SHOW MAIN LINE AND POINT CONNECTION
  connectMain() {
    this.suppPoints.forEach(elm => {
      strokeWeight(SW['pmain']);
      stroke(color(clrs['main']));
      noFill();
      line(elm.pos[0], elm.pos[1], elm.main[0], elm.main[1]);
    })
  }

  // POINTS
  createPoints() {
    this.mainPoints.forEach(elm => {
      for (let i = 0; i < TOTAL_SUPP; i++) {
        let x = elm.x + random(-this.pointRadius, this.pointRadius);
        let y = elm.y + random(-this.pointRadius, this.pointRadius);
        if (random(1) > variance) {
          x = elm.x + random(-this.pointRadius * 2, this.pointRadius * 2);
          y = elm.y + random(-this.pointRadius * 2, this.pointRadius * 2);
        }
        let p = {
          pos: [x, y],
          main: [elm.x, elm.y],
          connected: []
        }
        this.suppPoints.push(p);
      }
    })
  }

  showPoints() {
    this.suppPoints.forEach(elm => {
      strokeWeight(SW['points']);
      stroke(color(clrs['main']));
      noFill();
      point(elm.pos[0], elm.pos[1]);
    })
  }

  // MAIN LINE
  createMainLine() {
    let xs = [];
    let ys = [];
    for (let i = 0; i < TOTAL_MAIN; i++) {
      xs.push(width / 2 + random(-this.maxDistx, this.maxDistx));
      ys.push(random(this.padding, height - this.padding));
    }
    ys.sort();
    this.mainPoints.push(createVector(width / 2, this.padding));
    for (let i = 0; i < TOTAL_MAIN; i++) {
      this.mainPoints.push(createVector(xs[i], ys[i]));
    }
    this.mainPoints.push(createVector(width / 2, height - this.padding));
  }

  showMainLine() {
    // style main line
    beginShape();
    strokeWeight(SW['main']);
    stroke(color(clrs['main']));
    noFill();
    // go through array 
    this.mainPoints.forEach(elm => {
      vertex(elm.x, elm.y);
    })
    endShape();
  }
}