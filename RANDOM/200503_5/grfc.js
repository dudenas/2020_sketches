let scl = 10;
let cols, rows;
let myfont;
let pg;
let points = [];
let objs = [];

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  translate(width / 2 + 5, height / 2 - 15);
  for (let obj of objs) {
    obj.update();
    obj.show();
  }
  // for (let p of points) {
  //   stroke(clrs[1]);
  //   strokeWeight(SW / 4);
  //   point(p.x, p.y);
  // }
}


//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  objs.push(new Obj(0, 0, 1));

  cols = floor(width / scl);
  rows = floor(height / scl);

  // create font image
  let txtSize = width * 0.3;
  pg = createGraphics(width, height);
  pg.textSize(txtSize * 2);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER);
  pg.fill(clrs[1]);
  pg.noStroke();
  pg.text("5", width / 2 - txtSize * 0.9, height / 2 - txtSize * 1.1);


  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * 2 * width) * 4;
      let c = pg.pixels[index + 3];
      let bright = brightness(c);
      if (bright > 0) {
        points.push(createVector(i * scl - width / 2, j * scl - height / 2));
      }
    }
  }

  // create the graphics
  let found = true;
  while (found) {
    let next = [];
    for (let obj of objs) {
      if (obj.newPick) {
        let nextA = obj.checkA(objs);
        let nextB = obj.checkB(objs);
        if (nextA != null) next.push(nextA);
        if (nextB != null) next.push(nextB);
        obj.newPick = false;
      }
    }
    if (next.length == 0) found = false;
    objs = objs.concat(next);
  }
}