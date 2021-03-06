const openSimplex = openSimplexNoise(1);

const _pd = 2

let _mouse;
let _finnished = false
let ease, styles;

const _totalFrames = 15
const _sw = 1
let _rsize = 10
let _currLetter = 0

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, P2D);
	// createCanvas(540, 540);
	// setAttributes('antialias', true);

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

	strokeJoin(MITER)
	strokeCap(SQUARE)
	// sphereDetails(2, 2, 2)
}

//————————————————————————————————————————————— draw
function draw() {
	randomSeed(12)
	background(_clrs[0]);

	push()
	translate(0, height / 2.5)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	//————————————————————————————————————————————— draw points

	beginShape()
	noFill()
	stroke(_clrs[1])
	// strokeWeight(map(sin(frameCount * 0.1), -1, 1, 1, 50))
	for (let i = 0; i < _points[_currLetter].length - 1; i++) {
		strokeWeight(random(i) % 100 + 1)
		const p = _points[_currLetter][i]
		const pnext = _points[_currLetter][(i + 1) % _points[_currLetter].length]
		p.showGrfc()
		p.update()
		p.updateForce()
		if (p.pos.dist(pnext.opos) > 25) {
			endShape()
			beginShape()
		}
		if (i % 20 == 0) {
			endShape()
			beginShape()
			p.showGrfc()
		}

	}
	endShape()
	pop()

	//  change letter
	if (frameCount % _totalFrames == 0) {
		_currLetter = (_currLetter + 1) % _points.length
	}

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * _letters.length) {
			_finnished = true
		}
	}
}