const openSimplex = openSimplexNoise(1);

const _pd = 2

let _finnished = false
let _showFinal = true

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

function draw() {
	background(_clrs[0]);

	for (let j = 1; j < _rows - 1; j++) {
		for (let i = 1; i < _cols - 1; i++) {
			const idx = i + j * _cols
			const c = _cells[idx]
			c.update()
			c.show()
			c.show()
		}
	}

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	if (frameCount >= _totalFrames) {
		_finnished = true
	}

	saveDraw();
}