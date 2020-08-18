let scl = 15;
let cols, rows;
let grid;
let myfont;
let pg;
let obj;
let r;
let objs = [];

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  for (let o of objs) {
    o.update();
    o.show();
  }

  let percent = (frameCount % totalFrames) / totalFrames;
  percent = ease[styles[1]](percent);
  obj.x = width / 2 + r * cos(map(sin(percent * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
  obj.y = height / 2 + r * sin(map(sin(percent * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
  // ellipse(obj.x, obj.y, 15, 15);
  // image(pg, 0, 0);
}


//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  cols = floor(width / scl);
  rows = floor(height / scl);
  grid = make2Darray(cols, rows);

  // create font image
  let txtSize = width * 0.3;
  pg = createGraphics(width, height);
  pg.textSize(width / 5 * 2.1);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER);
  pg.fill(clrs[1]);
  pg.noStroke();
  pg.text("2", width / 2 - txtSize * 0.9, height / 2 - txtSize * 0.8);


  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * 2 * width) * 4;
      let c = pg.pixels[index + 3];
      let bright = brightness(c);
      if (bright > 0) {
        grid[i][j] = 1;
        objs.push(new Obj(i * scl, j * scl, i + j * cols));
      } else {
        grid[i][j] = 0;
      }
    }
  }


  // create moving object which will rule the animation
  r = width / 3;
  obj = createVector();
}