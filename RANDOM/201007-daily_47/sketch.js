const openSimplex = openSimplexNoise(1);

const _pd = 2

let _mouse;
let _finnished = false
let ease, styles;

const _totalFrames = 90
const _sw = 1
let _currLetter = 0

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, P2D);
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

	strokeJoin(ROUND)
	strokeCap(SQUARE)
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
	// count finnished
	let totalFinnished = 0
	noFill()
	stroke(_clrs[1])
	// strokeWeight(1)
	for (let i = 0; i < _points[_currLetter].length - 1; i++) {
		const p = _points[_currLetter][i]
		p.update()
		p.updateForce()
		p.showGrfc()
		totalFinnished = p.finnished ? ++totalFinnished : totalFinnished
	}
	pop()
	if (totalFinnished > _points[_currLetter].length / 5 * 4) {
		_choseNext = true
	} else {
		_choseNext = false
	}

	//  change letter
	if (frameCount % (_totalFrames) == 0) {
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