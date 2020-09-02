const openSimplex = openSimplexNoise(1);

const _pd = 2
const _totalFrames = 150
const _r = 5

let _mouse;
let _finnished = false
let ease, styles;
let _off = 0

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, WEBGL);
	setAttributes('antialias', true);

	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	// strokeCap(PROJECT)
	// strokeJoin(BEVEL)
	// smooth();
	frameRate(30)

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];

	_mouse = createVector(width / 2, height / 2)
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);
	const percent = ((frameCount) % _totalFrames) / _totalFrames;
	_off = map(sin(percent * TWO_PI + PI / 4), -1, 1, 0.05, 0.1);
	translate(0, 0, -100)
	translate(-width / 2, -height / 2)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}
	//————————————————————————————————————————————— draw points
	stroke(_clrs[1])
	strokeWeight(1)
	for (let i = 0; i < _points.length; i++) {
		const p = _points[i]
		p.update()
		p.show()
	}

	//————————————————————————————————————————————— draw mouse
	strokeWeight(1)
	stroke(_clrs[2])
	noFill()
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	// ellipse(_mouse.x, _mouse.y, 50, 50)

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * 2) {
			_finnished = true
		}
	}

}