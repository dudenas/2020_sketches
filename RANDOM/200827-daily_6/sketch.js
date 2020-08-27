const _pd = 2
let _finnished = false
let _nextIdx
const _totalTime = 210

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	strokeCap(PROJECT)
	strokeJoin(BEVEL)
	smooth();

	pickOther()
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

	for (let j = 1; j < _rows - 1; j++) {
		for (let i = 1; i < _cols - 1; i++) {
			const idx = i + j * _cols
			const prevCell = _cells[findOther(idx - 1)]
			const nextCell = _cells[findOther(idx + 1)]
			const c = _cells[findOther(idx)]
			c.update()
			if (!prevCell.picked || !nextCell.picked) c.show()
			else c.show(prevCell, nextCell)
			c.current = false
		}
	}

	if (frameCount < _totalTime) {
		for (let i = 0; i < _pickPerFrame; i++) _cells[_nextIdx].pickSpot()
	} else if (_countToFinnish < 90) {
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

function pickOther() {
	_nextIdx = floor(random(_cells.length))
	while (!_cells[_nextIdx].picked || _cells[_nextIdx].initialCell) {
		_nextIdx = floor(random(_cells.length))
	}
}