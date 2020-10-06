const _clrs = [
  8,
  247,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _points = []
// const _letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('')
const _letters = "abcde".toUpperCase().split('')
// const _letters = "A".split(' ')
let _minY, _maxY;

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/ORTE2LOT.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  // create font points
  const txtSize = 21

  for (let i = 0; i < _letters.length; i++) {
    const txt = _letters[i]
    _points[i] = []
    const points = (_myfont.textToPoints(txt, 0, 0, txtSize, {
      sampleFactor: 6,
      simplifyThreshold: 0 //pow(0.1, 350)
    }))

    const totalPoints = points.length

    // add Points to myPoint class
    let bounds_first;

    _minY = Infinity
    _maxY = 0
    for (let j = 0; j < totalPoints; j++) {
      // if first point cloud create myPoint
      const p = points[j];
      bounds_first = _myfont.textBounds(txt, 0, 0, txtSize)
      const x = p.x * txtSize - bounds_first.x * txtSize + width / 2 - bounds_first.w * txtSize / 2
      const y = p.y * txtSize + height / 2
      _points[i].push(new myPoint(j, x, y))
      if (y < _minY) _minY = y
      if (y > _maxY) _maxY = y
    }
  }

  // remove dublicates
  for (let i = 0; i < _letters.length; i++) {
    for (let n = _points[i].length - 1; n >= 0; n--) {
      const p1 = _points[i][n].opos
      for (let m = _points[i].length - 1; m >= 0; m--) {
        const p2 = _points[i][m].opos
        const d = p1.dist(p2)
        if (d < 3 && m != n) {
          _points[i].splice(n, 1)
          break;
        }
      }
    }
  }

  // add next position
  // for (let i = 0; i < _letters.length; i++) {
  //   _points[i].forEach((elm, idx) => {
  //     const index = floor(random(_points[i].length))
  //     const other = _points[i][index]
  //     elm.updateAfterInit(other)
  //   })
  // }
}