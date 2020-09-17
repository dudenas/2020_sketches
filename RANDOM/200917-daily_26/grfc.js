const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _points = []
const _letters = "the,music,is,god".split(",")

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  // create font points
  const txtSize = 25
  const points = []
  for (let i = 0; i < _letters.length; i++) {
    const txt = _letters[i]
    points.push(_myfont.textToPoints(txt, 0, 0, 10, {
      sampleFactor: 8,
      simplifyThreshold: 0
    }))
  }

  const totalPoints = points[0].length

  // add Points to myPoint class
  for (let i = 0; i < points.length; i++) {
    const tempPoints = points[i]
    for (let j = 0; j < totalPoints; j++) {
      // if first point cloud create myPoint
      if (i == 0) {
        const p = tempPoints[j];
        const bounds = _myfont.textBounds(_letters[i], 0, 0, 10)
        const x = p.x * txtSize - bounds.x * txtSize + width / 2 - bounds.w * txtSize / 2
        // const y = p.y * txtSize + height / 2 + bounds.h * txtSize / 2
        const y = p.y * txtSize + height / 2

        _points.push(new myPoint(j, x, y))
        _points[j].opos.push(createVector(x, y, 0))
      } else {
        // else add next positions
        const idx = floor(map(j, 0, totalPoints, 0, tempPoints.length))
        const p = tempPoints[idx];
        const bounds = _myfont.textBounds(_letters[i], 0, 0, 10)
        const x = p.x * txtSize - bounds.x * txtSize + width / 2 - bounds.w * txtSize / 2
        // const y = p.y * txtSize + height / 2 + bounds.h * txtSize / 2
        const y = p.y * txtSize + height / 2

        _points[j].opos.push(createVector(x, y, 0))
      }

    }
  }
}