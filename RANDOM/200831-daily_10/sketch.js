const openSimplex = openSimplexNoise(1);

const _pd = 2
const _totalFrames = 600
const _r = 5

let _mouse;
let _finnished = false

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

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}
	//————————————————————————————————————————————— draw points
	for (let i = 0; i < _points.length; i++) {
		const p = _points[i]
		p.show()
	}
	//————————————————————————————————————————————— draw mouse
	strokeWeight(1)
	stroke(_clrs[2])
	noFill()
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	ellipse(_mouse.x, _mouse.y, 50, 50)

	//————————————————————————————————————————————— draw save
	if (frameCount >= _totalFrames && _save) {
		_finnished = true
		saveDraw();
	}

}