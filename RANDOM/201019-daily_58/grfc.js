const _clrs = [
  8,
  247,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
let _txt = "potato".toUpperCase()
// let _txt = "A".toUpperCase()
let _txtSize = 72
const _padd = 48
const _afterPadd = 5
const _total = 1
const _grfc = []

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
    _grfc.push(new myGrfc(0,0,y,1,1))
  }
}