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
	smooth();
}

//————————————————————————————————————————————— draw
let _finnishFrame

function draw() {
	background(clrs[0]);

	// idx = floor(random(cells.length))
	idx = _nextId
	if (!_finnished) {
		if (frameCount < cells.length) _nextId = cells[idx].pickOther()
		else {
			cells.sort(function (a, b) {
				if (a.orderIdx < b.orderIdx) {
					return -1;
				}
				if (a.orderIdx > b.orderIdx) {
					return 1;
				}
				return 0;
			});
			_finnished = true
			_finnishFrame = frameCount
		}
	}

	beginShape()
	for (let i = 0; i < cells.length; i++) {
		let c = cells[i]
		c.update()
		c.show()

	}
	noFill()
	stroke(clrs[1])
	strokeWeight(_sw)
	endShape()

	if (_finnished && frameCount > _finnishFrame) {
		console.log("finnished")
		noLoop()
	}
	// curveTightness(map(mouseX, 0, width, -5, 5))

	saveDraw();
}