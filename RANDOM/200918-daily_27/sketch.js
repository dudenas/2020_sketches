const openSimplex = openSimplexNoise(1);

const _pd = 2
const _totalFrames = 150

let _mouse;
let _finnished = false
let ease, styles;
let _sw = 1
let _len = 18

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
	styles = ['quadraticInOut', 'quadraticInOut', 'doubleEllipticOgee',
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

	// translate(-width / 1.05, -height / 3)
	translate(-width / 2, -height / 2.5)
	// translate(-width / 2, -height / 2)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	//————————————————————————————————————————————— draw points

	// show line
	noFill()
	stroke(_clrs[1])
	strokeWeight(_sw)
	for (let i = 0; i < _points.length - 1; i++) {
		const p = _points[i]
		const np = _points[i + 1]
		const v1 = p.pos.sub(np.pos)
		const angle = v1.heading() + PI / 2
		// if (i < 5) console.log(angle)
		// if (i < 10) console.log(angle)
		p.update(angle)
		p.showLine()
	}

	// show dots
	// noStroke()
	// fill(_clrs[1])
	// for (let i = 0; i < _points.length - 1; i++) {
	// 	const p = _points[i]
	// 	// p.showDots()

	// }

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
		if (frameCount > _totalFrames * 2 * _letters.length) {
			_finnished = true
		}
	}

}