const openSimplex = openSimplexNoise(1);

const _pd = 2
const _totalFrames = 100

let _mouse;
let _finnished = false
let ease, styles;
let _sw = 2

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
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];

	_mouse = createVector(width / 2, height / 2)
	background(_clrs[0]);
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	translate(-width / 1.25, -height / 5)

	if (_finnished) {
		console.log("finnished")
		noLoop()
	}

	//————————————————————————————————————————————— draw points
	stroke(_clrs[1])
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
		if (frameCount > _totalFrames * 6) {
			_finnished = true
		}
	}

}