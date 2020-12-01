const openSimplex = openSimplexNoise(1)

let _finnished = false
let ease, styles

const _grfc = []
const _clrs = [8,247]

// animation
const _totalFrames = 90

// dots
const _total = 50
const _size = 1
const padd = 540. / 5
let _grfcCenter;
let _ratio

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, WEBGL);
	saveSetup()
	setupGrid()
	frameRate(30)

	ease = new p5.Ease()
	styles = ease.listAlgos()
	styles = [
		'quadraticInOut', 'quadraticInOut', 'doubleEllipticOgee',
		'circularInOut', 'elasticInOut', 'doubleExponentialSigmoid',
		'gompertz', 'exponentialEmphasis', 'normalizedInverseErf',
		'backInOut', 'bounceInOut', 'variableStaircase',
		'generalSigmoidLogitCombo'
	]

	background(_clrs[0])
}

//————————————————————————————————————————————— draw
function draw() {
	background(_clrs[0]);

	//————————————————————————————————————————————— draw show
	push()
	// translate(-width / 2 + padd / 2, -height / 2 + padd / 2)
	_grfc.forEach(elm => {
		elm.updateOther()
		elm.update()
		elm.show()
	})
	pop()

	//————————————————————————————————————————————— draw save
	if (_finnished) {
		console.log("finnished")
		noLoop()
	}
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * 2) {
			_finnished = true
		}
	}
}

//————————————————————————————————————————————— setupGrid
function setupGrid() {
	_ratio = (width - padd) / _total
	for (let j = 0; j < _total; j++) {
		for (let i = 0; i < _total; i++) {
			const x = i * _ratio + _ratio / 2
			const y = j * _ratio + _ratio / 2
			const z = 0
			_grfc.push(new Point(x, y, z, i + j * _total))
		}
	}

	_grfcCenter = createVector(_total / 2 * _ratio, _total / 2 * _ratio, 0)
	_grfc.forEach(elm => elm.updateAfterInit())
}