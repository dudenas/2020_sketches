const _pd = 2
let _finnished = false
let _nextIdx

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	strokeCap(PROJECT)
	strokeJoin(BEVEL)
	smooth();

	_nextIdx = floor(random(_cells.length))
	while (!_cells[_nextIdx].picked) {
		_nextIdx = floor(random(_cells.length))
	}
}

//————————————————————————————————————————————— draw
let _countToFinnish = 0
let _showFinal = false

function draw() {
	background(_clrs[0]);

	for (let i = 0; i < _cols; i++) {
		beginShape()
		for (let j = 0; j < _rows; j++) {
			let elm = _cells[i + j * _cols]
			if (elm.picked) {
				elm.connectLine()
			} else {
				endShape()
				beginShape()
			}
		}
		endShape()
	}

	for (let i = 0; i < _cells.length; i++) {
		let c = _cells[i]
		c.update()
		c.show()
	}

	if (frameCount < 300) {
		for (let i = 0; i < _pickPerFrame; i++) _cells[_nextIdx].pickSpot(_nextIdx)
	} else if (_countToFinnish < 30) {
		_showFinal = true
		_countToFinnish++
	} else {
		_finnished = true
	}

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	saveDraw();
}