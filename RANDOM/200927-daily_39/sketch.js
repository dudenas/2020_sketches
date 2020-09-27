const openSimplex = openSimplexNoise(1);

const _pd = 2

let _mouse;
let _finnished = false
let ease, styles;

const _totalFrames = 90
const _sw = 1
let _rsize = 10
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
	// sphereDetails(2, 2, 2)
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	push()
	// rotateY(frameCount * 0.01)
	translate(-width / 2, -height / 5)
	// translate(0, height / 3.5)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	//————————————————————————————————————————————— draw points

	// show grfc
	for (let i = 0; i < _points[_currLetter].length - 1; i++) {
		const p = _points[_currLetter][i]
		p.update()
		p.updateForce()
		p.showGrfc()
	}

	pop()

	//————————————————————————————————————————————— draw mouse
	strokeWeight(1)
	stroke(_clrs[2])
	fill(_clrs[0])
	// noFill()
	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	// ellipse(_mouse.x - width / 2, _mouse.y - height / 2, 50, 50)
	noStroke()

	//  change letter
	if (frameCount % _totalFrames == 0) {
		_currLetter = (_currLetter + 1) % _points.length
	}

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * _letters.length * 4) {
			_finnished = true
		}
	}
}