const openSimplex = openSimplexNoise(1)

let _finnished = false
let ease, styles

const _pd = 2
const _grfc = []
const _clrs = [247, 8]

// animation
const _totalFrames = 90

// dots
const _total = 50
const _size = 1
const padd = 540. / 5
let _grfcCenter;
let other

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, WEBGL);
	pixelDensity(_pd)
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
	let totalFinnished = 0
	_grfc.forEach(elm => {
		elm.update()
		elm.show()
		if (elm.endCycle) totalFinnished++
	})
	pop()
	if (totalFinnished == _grfc.length) {
		console.log("new line")
		// pick another point when all is done
		other = _grfc[floor(random(_grfc.length))].opos.copy()
		// reset all to unfinnished state
		_grfc.forEach(elm => {elm.endCycle = false})
	}

	//————————————————————————————————————————————— draw save
	if (_finnished) {
		console.log("finnished")
		noLoop()
	}
	if (_save) {
		saveDraw()
		if (frameCount > _totalFrames * 10) {
			_finnished = true
		}
	}
}

//————————————————————————————————————————————— setupGrid
function setupGrid() {
	const ratio = (width - padd) / _total
	for (let j = 0; j < _total; j++) {
		for (let i = 0; i < _total; i++) {
			const x = i * ratio + ratio / 2
			const y = j * ratio + ratio / 2
			const z = 0
			_grfc.push(new Point(x, y, z, i + j * _total))
		}
	}

	_grfcCenter = createVector(_total / 2 * ratio, _total / 2 * ratio, 0)
	_grfc.forEach(elm => elm.updateAfterInit())

	// pick first point to all go there
	other = _grfc[floor(random(_grfc.length))].opos.copy()
	console.log(other.x)
}