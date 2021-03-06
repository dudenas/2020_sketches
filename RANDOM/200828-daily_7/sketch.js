const openSimplex = openSimplexNoise(1);

const _pd = 2

let _finnished = false
let _showFinal = true
let _mouse;
const _totalFrames = 900

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

	_mouse = createVector(width / 2, height / 2)
}

//————————————————————————————————————————————— draw

function draw() {
	background(_clrs[0]);

	for (let j = 0; j < _rows; j++) {
		beginShape()
		let first = false
		for (let i = 0; i < _cols; i++) {
			let elm = _cells[i + j * _cols]
			if (elm.picked) {
				elm.connectLine()
				if (first) {
					elm.connectLine()
					first = false
				}
			} else {
				if (!first) {
					elm.connectLine()
				}
				endShape()
				beginShape()
				first = true
			}
		}
		endShape()
	}

	for (let j = 1; j < _rows - 1; j++) {
		for (let i = 1; i < _cols - 1; i++) {
			const idx = i + j * _cols
			const c = _cells[idx]
			c.checkNoiseField()
			c.update()
			c.show()
			c.show()
		}
	}

	strokeWeight(1)
	stroke(_clrs[3])
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	ellipse(_mouse.x, _mouse.y, _scl, _scl)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	if (frameCount >= _totalFrames) {
		_finnished = true
	}

	saveDraw();
}