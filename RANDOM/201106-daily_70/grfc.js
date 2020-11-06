const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
const _grfc = []

// change values here
let _txt = "poetry"
let _txtSize = 16
const _padd = _txtSize
let _total = 32

//————————————————————————————————————————————— preload Grfc
function preload() {
  _myfont = loadFont("data/Silka-Medium.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  textFont(_myfont)
  textAlign(CENTER, CENTER)
  textSize(_txtSize)

  for(let i = 0; i < _total; i++){
    const y = i * _padd
    // idx, x, y
    _grfc.push(new myGrfc(i,0,y,1,1))
  }

  randomSeed(1)
  _grfc.forEach(elm => {
    elm.letters.forEach(l => {
      const chosenGrfc = _grfc[floor(random(_grfc.length))]
      const other = chosenGrfc.letters[floor(random(chosenGrfc.letters.length))]
      l.other = other
    })
  })
}