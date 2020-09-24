const openSimplex = openSimplexNoise(1);

const _pd = 2
const _totalFrames = 100

let _mouse;
let _finnished = false
let ease, styles;
let _sw = 1
let _r = 2
let _currLetter = 0

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, WEBGL);
	setAttributes('antialias', true);

	pixelDensity(_pd)
	setupGrfc();
	saveSetup();
	frameRate(30)

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = [
		'quadraticInOut', 'quadraticInOut', 'doubleEllipticOgee',
		'circularInOut', 'elasticInOut', 'doubleExponentialSigmoid',
		'gompertz', 'exponentialEmphasis', 'normalizedInverseErf',
		'backInOut', 'bounceInOut'
	];

	_mouse = createVector(width / 2, height / 2)
	background(_clrs[0]);
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	translate(-width / 2, -height / 3.5)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	//————————————————————————————————————————————— draw points

	// show grfc
	for (let i = 0; i < _points[_currLetter].length - 1; i++) {
		const p = _points[_currLetter][i]
		const np = _points[_currLetter][i + 1]
		const v1 = p.pos.copy().sub(np.pos.copy())
		p.update(v1)
		p.updateForce()
		p.showGrfc()
	}

	//————————————————————————————————————————————— draw mouse
	strokeWeight(1)
	stroke(_clrs[2])
	noFill()
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	// ellipse(_mouse.x, _mouse.y, 50, 50)

	if (frameCount % _totalFrames == 0) {
		_currLetter = (_currLetter + 1) % _points.length
	}

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * _letters.length * 3) {
			_finnished = true
		}
	}
}