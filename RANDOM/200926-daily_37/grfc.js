const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _points = []
const _letters = "A B C D".split(' ')
// const _letters = "A".split(' ')
let _minY, _maxY;

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  // create font points
  const txtSize = 22

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
      // const y = p.y * txtSize + height / 2 + bounds.h * txtSize / 2
      const y = p.y * txtSize + height / 2
      _points[i].push(new myPoint(j, x, y))
      if (y < _minY) _minY = y
      if (y > _maxY) _maxY = y
    }

    _points[i].forEach(elm => {
      elm.otherIdx = (elm.idx + _idxStep) % _points[_currLetter].length
    })
  }
}