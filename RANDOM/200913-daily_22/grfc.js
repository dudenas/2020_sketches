const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _points = []
const _letters = ["T", "A", "U"]

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  // create font points
  const txtSize = 50
  const points = []
  for (let i = 0; i < _letters.length; i++) {
    const txt = _letters[i]
    points.push(_myfont.textToPoints(txt, 0, 0, 10, {
      sampleFactor: 12,
      simplifyThreshold: 0
    }))
  }

  const totalPoints = points[0].length

  // add Points to myPoint class
  for (let i = 0; i < points.length; i++) {
    const tempPoints = points[i]
    for (let j = 0; j < tempPoints.length; j++) {
      if (i == 0) {
        const p = tempPoints[j];
        const x = p.x * txtSize + width / 2
        const y = p.y * txtSize + height / 2
        _points.push(new myPoint(j, x, y))
        _points[j].opos.push(createVector(x, y, 0))
      } else {
        const idx = floor(map(j, 0, tempPoints.length, 0, totalPoints))
        const p = tempPoints[idx];
        const x = p.x * txtSize + width / 2
        const y = p.y * txtSize + height / 2
        _points[idx].opos.push(createVector(x, y, 0))
      }
    }
  }
}