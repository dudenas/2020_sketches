let clrs = [8, 247, [85, 0, 255]];

let scl = 32;
const _initialrand = .9
let cols, rows;
let myfont;
let pg;
let cells = [];
let _notPickedCells = []

let txt = "N"

//————————————————————————————————————————————— preload Grfc
function preload() {
  myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  cols = floor(width / scl);
  rows = floor(height / scl);

  // create font image
  let txtSize = 600 / pd;
  pg = createGraphics(width, height);
  const x = (width / 2 / pd * 0.97)
  const y = (height / 2 / pd * 0.70)
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
        // let c = new Cell(i * scl, j * scl);
        let c = new Cell((i + random(-_initialrand, _initialrand)) * scl, (j + random(-_initialrand, _initialrand)) * scl);
        cells.push(c);
      }
    }
  }

  // remove the last point if the length of the cells are not equal
  if (cells.length % 2 != 0) cells.pop()

  // copy the array
  _notPickedCells = cells.slice()
}