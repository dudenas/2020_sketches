let _clrs = [247, 8, [77, 0, 247],
  [247, 77, 0]
];

let _myfont;
let _rows, _cols
let _cells = [];

const _scl = 24;
const _pickPerFrame = 2
let _txt = "D"

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  let pg;
  _cols = floor(width / _scl);
  _rows = floor(height / _scl);

  // create font image
  let txtSize = 600 / _pd;
  pg = createGraphics(width, height);
  const x = (width / 2 / _pd * 0.97)
  const y = (height / 2 / _pd * 0.70)
  pg.background(0)
  pg.noStroke();
  pg.fill(255)
  pg.textSize(txtSize);
  pg.textFont(_myfont);
  pg.textAlign(CENTER, CENTER)
  pg.text(_txt, x, y);
  image(pg, 0, 0);

  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < _cols; i++) {
    for (let j = 0; j < _rows; j++) {
      let index = (i * _scl + j * _scl * width * _pd) * 4;
      let c = pg.pixels[index + 0];
      let bright = brightness(c);
      let cc
      if (bright != 0) {
        cc = new Cell(i, j, true);
      } else {
        cc = new Cell(i, j, false);
      }
      _cells.push(cc);
    }
  }

  for (let i = 0; i < _cells.length / 24; i++) {
    let rnd = floor(random(_cells.length))
    while (!_cells[rnd].picked) {
      rnd = floor(random(_cells.length))
    }
    console.log(i)

    let freeCell = _cells[rnd]
    freeCell.initialCell = true
    _freeCells.push(freeCell.opos.copy())
  }
}