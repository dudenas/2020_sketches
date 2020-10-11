const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
let _txt = "notion of motion".toUpperCase()
let _txtSize = 32
const _padd = 50
const _total = 5
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