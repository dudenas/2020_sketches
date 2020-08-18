let scl = 15;
let cols, rows;
let myfont;
let pg;
let objs = [];

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  for (let o of objs) {
    o.update();
    o.show();
  }
}


//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  cols = floor(width / scl);
  rows = floor(height / scl);

  // create font image
  let txtSize = height * 0.1;
  pg = createGraphics(width, height);
  pg.textSize(width / 5 * 2.25);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER);
  pg.fill(clrs[1]);
  pg.noStroke();
  pg.text("3", width / 2 - txtSize * 3.5, height / 2 - txtSize * 3.25);


  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * 2 * width) * 4;
      let c = pg.pixels[index + 3];
      let bright = brightness(c);
      if (bright > 0) {
        objs.push(new Obj(i * scl, j * scl, i + j * cols, i));
      }
    }
  }

  for (let obj of objs) {
    let picked = false;
    while (!picked) {
      let other = random(objs);
      if (!objs.picked) {
        obj.xo = other.xo;
        obj.yo = other.yo;
        other.picked = true;
        picked = true;
      }
    }
  }
}