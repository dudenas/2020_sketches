const _clrs = [
  8,
  247,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
let _txt = "mixmix".toUpperCase()
// let _txt = "A".toUpperCase()
let _txtSize = 32
const _padd = 24
const _afterPadd = 0
const _total = 9
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
    _grfc.push(new myGrfc(i,0,y,1,1))
  }
}