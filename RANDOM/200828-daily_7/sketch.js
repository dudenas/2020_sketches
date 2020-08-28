const _pd = 2
let _finnished = false
let _freeIdx = -1

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	strokeCap(PROJECT)
	strokeJoin(BEVEL)
	smooth();
	frameRate(30)
}

//————————————————————————————————————————————— draw
let _countToFinnish = 0
let _showFinal = false

function draw() {
	background(_clrs[0]);

	for (let j = 0; j < _rows; j++) {
		beginShape()
		for (let i = 0; i < _cols; i++) {
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
			const c = _cells[idx]
			c.update()
			c.show()
			c.show()
		}
	}

	if (!_showFinal) {
		fillEmptySpot(_freeIdx)
	} else if (_countToFinnish < 90) {
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

//————————————————————————————————————————————— fillEmptySpot
function fillEmptySpot(idx) {
	let found = false
	let otherIdx = -1
	let testCount = 0
	// pick direction
	while (!found && testCount < 1000) {
		let dirX = floor(random(-1, 2))
		let dirY = floor(random(-1, 2))
		if (dirX == -1 && dirY == -1) otherIdx = idx - _cols - 1
		if (dirX == -1 && dirY == 0) otherIdx = idx - 1
		if (dirX == -1 && dirY == 1) otherIdx = idx + _cols - 1
		if (dirX == 0 && dirY == -1) otherIdx = idx - _cols
		if (dirX == 0 && dirY == 0) otherIdx = -1
		if (dirX == 0 && dirY == 1) otherIdx = idx + _cols
		if (dirX == 1 && dirY == -1) otherIdx = idx - _cols + 1
		if (dirX == 1 && dirY == 0) otherIdx = idx + 1
		if (dirX == 1 && dirY == 1) otherIdx = idx + _cols + 1
		if (_cells[otherIdx] != undefined && _cells[otherIdx].picked && !_cells[otherIdx].other) {
			found = true
		}
		testCount++
	}

	// if direction found copy the other position to which the cell will move
	if (testCount < 1000) {
		_cells[otherIdx].other = _cells[idx].opos.copy()

		// _cells[idx].occupied = true
		_cells[otherIdx].occupied = true

		_freeIdx = otherIdx
	} else {
		pickFreeIdx()
	}
}

//————————————————————————————————————————————— fillEmptySpot
function pickFreeIdx() {
	idx = floor(random(_cells.length))
	testCount = 0
	while ((!_cells[idx].picked || _cells[idx].isFree || _cells[idx].occupied) && testCount < 10000) {
		idx = floor(random(_cells.length))
		testCount++
	}

	if (testCount < 10000) {
		_freeIdx = idx
		_cells[_freeIdx].picked = false
		_cells[_freeIdx].isFree = true

		console.log(_freeIdx)
	} else {
		_showFinal = true
	}
}