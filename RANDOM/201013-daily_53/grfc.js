const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
let _txt = "bounce".toUpperCase()
let _changeTxt = ".|?".toUpperCase().split('')
let _txtSize = 58
const _padd = 50
const _movementDist = 200
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
    const easeNumber = floor(random(11))
    const idxNumber = random(10)
    console.log(easeNumber, idxNumber)
    _grfc.push(new myGrfc(0,0,y,easeNumber,idxNumber))
  }
}