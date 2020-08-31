const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _points = []

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  // create font points
  const txtSize = 50
  const txt = "T"
  const points = _myfont.textToPoints(txt, 0, 0, 10, {
    sampleFactor: 3,
    simplifyThreshold: 0
  });

  const bounds = _myfont.textBounds(txt, 0, 0, 10);

  // other points
  const otxt = "S"
  const opoints = _myfont.textToPoints(otxt, 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });

  const obounds = _myfont.textBounds(otxt, 0, 0, 10);

  console.log(opoints.length, points.length)

  // add Points to myPoint class
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const oi = floor(map(i, 0, points.length, 0, opoints.length))
    const op = opoints[oi];
    const x = p.x * txtSize - bounds.x * txtSize + width / 2 - bounds.w * txtSize / 2
    const y = p.y * txtSize + height / 2 + bounds.h * txtSize / 2
    const ox = op.x * txtSize - obounds.x * txtSize + width / 2 - obounds.w * txtSize / 2
    const oy = op.y * txtSize + height / 2 + obounds.h * txtSize / 2
    _points.push(new myPoint(i, x, y, ox, oy))
  }
}