const openSimplex = openSimplexNoise(1);

const _pd = 2

let _finnished = false
let ease, styles;

const _totalFrames = 150
const _sw = 1

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
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	push()
	let bbox = _myfont.textBounds(_txt, 0, 0, _txtSize)
	translate(width/2, height/2 - bbox.h/2)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	for(let i = 0; i < _grfc.length; i++){
		const g = _grfc[i]
		g.update()
		g.show()
	}

	pop()

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * 2) {
			_finnished = true
		}
	}
}