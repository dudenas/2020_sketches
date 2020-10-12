const _clrs = [247, 8]

const _pd = 2
const _save = false
const _total = 4
let _finnished = false
let _data

//————————————————————————————————————————————— preload
function preload(){
	_data = loadJSON('test.json')
}

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, P2D);
	pixelDensity(_pd)
	// frameRate(4)
	saveSetup()

	console.log(`total length : ${Object.keys(_data).length}`)
}

//————————————————————————————————————————————— draw
function draw() {
	if(frameCount % Object.keys(_data).length == 0) {
		console.log("finnished")
		_finnished = true
		noLoop()
	} else {
		console.log(frameCount)
	}

	background(_clrs[0]);
	// noLoop()

	const _ratio = width / (_total)

	noStroke()
	fill(_clrs[1])
	const current = _data[frameCount % Object.keys(_data).length]
	for(let i = 0; i < _total/2; i++){
		const x = i * _ratio
		for(let j = 0; j < _total; j++){
			const y = j * _ratio
			// current data
			if(current[j][i] == 1){
				rect(x,y,_ratio, _ratio)
				rect(width - x - _ratio,y,_ratio, _ratio)
			}
		}
	}
	

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
	}
}