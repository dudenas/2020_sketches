const pd = 2
let _finnished = false

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(pd)
	setupGrfc();
	saveSetup();
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	// rnd = floor(random(cells.length))
	testCount = 0
	idx = floor(random(cells.length))
	if (!_finnished) {
		while (idx < cells.length && cells[idx].picked && testCount < 1000) {
			// idx = frameCount + testCount++
			idx = floor(random(cells.length))
			testCount++
		}
		// while (cells[rnd].picked && testCount < 1000) {
		// 	rnd = floor(random(cells.length))
		// 	testCount++
		// }
		// if () cells[rnd].pickOther()
		// else _finnished = true
		if (testCount < 1000) cells[idx].pickOther(idx)
		else _finnished = true
		// if (idx < cells.length) cells[idx].pickOther(idx)

	}

	for (let c of cells) {
		c.update();
		c.show();
	}

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	saveDraw();
}