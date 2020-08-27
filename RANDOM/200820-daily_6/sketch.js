const pd = 2
let _finnished = false
let _nextId = 0

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(pd)
	setupGrfc();
	saveSetup();
	strokeCap(SQUARE)
	strokeJoin(BEVEL)
	smooth();
}

//————————————————————————————————————————————— draw
let _finnishFrame

function draw() {
	background(clrs[0]);

	idx = floor(random(cells.length))
	testCount = 0
	if (!_finnished) {
		while (cells[idx].picked && testCount < 1000) {
			idx = floor(random(cells.length))
			testCount++
		}

		if (testCount < 1000 && idx < cells.length) _nextId = cells[idx].pickOther()
		else {
			_finnished = true
			_finnishFrame = frameCount
		}
	}


	for (let i = 0; i < cells.length; i++) {
		let c = cells[i]
		c.update()
		c.show()
	}

	if (_finnished && frameCount > _finnishFrame) {
		console.log("finnished")
		noLoop()
	}
	// curveTightness(map(mouseX, 0, width, -5, 5))

	saveDraw();
}