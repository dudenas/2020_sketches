let clrs = [5, 250, 125];

let scl = 16;
let cols, rows;
let myfont;
let pg;
let cells = [];
let maxSpeed = 4;
let maxForce = 0.5;
let txt = "H"

//————————————————————————————————————————————— preload Grfc
function preload() {
  myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  cols = floor(width / scl);
  rows = floor(height / scl);

  // create font image
  // create different lettrs with different pg graphics
  let txtSize = 600 / pd;
  pg = createGraphics(width, height);
  const x = (width / 2 / pd * 0.95)
  const y = (height / 2 / pd * 0.75)
  pg.background(0)
  pg.noStroke();
  pg.fill(255)
  pg.textSize(txtSize);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER)
  pg.text(txt, x, y);
  image(pg, 0, 0);

  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * width * pd) * 4;
      let c = pg.pixels[index + 0];
      let bright = brightness(c);
      if (bright != 0) {
        let c = new Cell(i * scl, j * scl);
        cells.push(c);
      }
    }
  }
  // noLoop();
}

//————————————————————————————————————————————— individual letter