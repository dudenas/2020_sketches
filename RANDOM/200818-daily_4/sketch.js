const pd = 2
let _finnished = false

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(pd)
	setupGrfc();
	saveSetup();
	strokeCap(SQUARE)

}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	testCount = 0
	idx = floor(random(cells.length))
	// idx = frameCount
	if (!_finnished) {
		while (cells[idx].picked && testCount < 5000) {
			idx = floor(random(cells.length))
			// idx = (frameCount + testCount) % cells.length
			testCount++
		}

		if (testCount < 5000) cells[idx].pickOther()
		else _finnished = true
	}

	// beginShape()
	// noStroke()
	// fill(clrs[1])
	noFill()
	stroke(clrs[1])
	strokeWeight(_sw)
	// noFill()
	for (let i = 0; i < cells.length; i++) {
		let c = cells[i]
		c.update()
		c.show()
		c.showDots(cells[(i + 1) % cells.length])
	}
	// endShape()

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	saveDraw();
}