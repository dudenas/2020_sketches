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

	rnd = floor(random(cells.length))
	testCount = 0
	if (!_finnished) {
		while (cells[rnd].picked && testCount < 1000) {
			rnd = floor(random(cells.length))
			testCount++
		}
		if (testCount < 1000) cells[rnd].pickOther()
		else _finnished = true
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