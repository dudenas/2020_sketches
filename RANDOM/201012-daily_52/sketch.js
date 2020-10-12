const openSimplex = openSimplexNoise(1);

const _pd = 2

let _mouse;
let _mouseForce;
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
	_mouseForce = createVector(width / 2, height / 2)
	background(_clrs[0]);
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	push()
	let bbox = _myfont.textBounds(_txt, 0, 0, _txtSize)
	translate(width/2, height/2 - _grfc.length/2 * _padd + bbox.h)

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

	_mouse.x = lerp(_mouse.x, mouseX, 0.2)
	_mouse.y = lerp(_mouse.y, mouseY, 0.2)
	_mouseForce.x = lerp(_mouseForce.x, mouseX - width/2, 0.2)
	_mouseForce.y = lerp(_mouseForce.y, mouseY - height/2 + _grfc.length/2 * _padd - bbox.h, 0.2)
	stroke(_clrs[2])
	noFill()
	ellipse(_mouse.x, _mouse.y, 20,20)

	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * 6) {
			_finnished = true
		}
	}
}

function mouseClicked(){
	_follow = !_follow
	console.log(`follow : ${_follow}`)
}