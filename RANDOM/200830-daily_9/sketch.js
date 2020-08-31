const openSimplex = openSimplexNoise(1);

const _pd = 2

let _finnished = false
let _showFinal = true
let _endPoint = 0,
	_startPoint = 0
let _mouse;
const _padd = 100

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

function mouseMoved() {
	_endPoint = floor(
		lerp(
			_endPoint,
			map(_mouse.x, _padd, width - _padd, 1, _points.length, true),
			0.1
		))
	_startPoint = floor(
		lerp(
			_startPoint,
			map(_mouse.y, _padd, height - _padd, 0, _endPoint, true),
			0.1
		))
}

//————————————————————————————————————————————— draw

function draw() {
	background(_clrs[0]);

	// translate to the middle of the screen
	push()
	translate(
		-_bounds.x * _txtSize + width / 2 - _bounds.w * _txtSize / 2,
		height / 2 + _bounds.h * _txtSize / 2
	)

	beginShape();
	noStroke()
	for (let i = _startPoint; i < _endPoint; i++) {
		let opc = map(i, _startPoint, _endPoint, 0, 100)
		fill(_clrs[1], _clrs[1], _clrs[1], opc)
		let p = _points[i];
		ellipse(
			p.x * _txtSize,
			p.y * _txtSize,
			_r + (1000 / i)
		)
	}
	endShape(CLOSE);
	pop()

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	strokeWeight(1)
	stroke(_clrs[3])
	noFill()
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	ellipse(_mouse.x, _mouse.y, _r, _r)

	// if (frameCount >= _totalFrames) {
	// 	_finnished = true
	// }

	saveDraw();
}