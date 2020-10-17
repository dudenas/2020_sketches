const _clrs = [
  247,
  8,
  [77, 0, 247],
  [77, 77, 77]
];

let _myfont;
let _txt = "mwmwmmwmwmmwmwm".toUpperCase()
let _changeTxt = "can".toUpperCase().split('')
let _txtSize = 36
const _padd = 48
const _movementDist = 200
const _total = 11
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
    // const idxNumber = random(10)
    const idxNumber = floor(map(sin(i/_total * TWO_PI - PI/2), -1, 1, 1, 5))
    console.log(easeNumber, idxNumber)
    _grfc.push(new myGrfc(0,0,y,easeNumber,idxNumber))
  }
}