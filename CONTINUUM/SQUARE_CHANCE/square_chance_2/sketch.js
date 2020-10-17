let _clrs = []

const _pd = 2
const _save = true
const _total = 6
const _totalSave = 20000
let _finnished = false
let _data

//————————————————————————————————————————————— preload
function preload() {
	_data = loadJSON('matrix_6x6.json')
}

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(256, 256, P2D);
	_clrs[0] = color(255, 0, 0)
	_clrs[1] = color(0, 0, 255)
	pixelDensity(_pd)
	saveSetup()
	console.log(`total length : ${Object.keys(_data).length}`)
}

//————————————————————————————————————————————— draw
function draw() {
	if (frameCount == _totalSave-1) {
		console.log("finnished")
		_finnished = true
		noLoop()
	} else if(frameCount % 100 == 0) console.log(frameCount)

	background(_clrs[0]);

	const _ratio = width / (_total)

	// noStroke()
	stroke(_clrs[1])
	fill(_clrs[1])
	const currentIdx = floor(Object.keys(_data).length/_totalSave * frameCount)-1
	const current = _data[currentIdx]
	for (let i = 0; i < _total / 2; i++) {
		const x = i * _ratio
		for (let j = 0; j < _total; j++) {
			const y = j * _ratio
			// current data
			if (current[j][i] == 1) {
				rect(x, y, _ratio, _ratio)
				rect(width - x - _ratio, y, _ratio, _ratio)
			}
		}
	}


	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
	}
}