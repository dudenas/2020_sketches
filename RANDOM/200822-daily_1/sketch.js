const _pd = 2
let _finnished = false
let _nextIdx

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	smooth();
	// noLoop()
	_nextIdx = floor(random(_cells.length))
	while (!_cells[_nextIdx].picked) {
		_nextIdx = floor(random(_cells.length))
	}
}

//————————————————————————————————————————————— draw
let _countToFinnish = 0

function draw() {
	background(_clrs[0]);

	for (let i = 0; i < _cells.length; i++) {
		let c = _cells[i]
		c.update()
		c.show()
	}

	if (frameCount < 300) {
		for (let i = 0; i < 15; i++) _cells[_nextIdx].pickSpot(_nextIdx)
	} else if (_countToFinnish < 30) {
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