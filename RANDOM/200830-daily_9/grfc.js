let _clrs = [
  247,
  8,
  [77, 77, 77],
  [77, 0, 247]
];

let _myfont;
let _rows, _cols

const _totalFrames = 600
const _txt = "D"
const _txtSize = 50
const _r = 50
let _points, _bounds;

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {

  // create font image

  _points = _myfont.textToPoints(_txt, 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });

  _bounds = _myfont.textBounds(_txt, 0, 0, 10);
  console.log(_points.length)
}