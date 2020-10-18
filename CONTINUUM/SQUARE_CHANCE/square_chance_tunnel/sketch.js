let _clrs = []

const _pd = 2
const _save = false
const _total = 67
let _finnished = false

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, P2D);
	_clrs[0] = 247
	_clrs[1] = 8
	pixelDensity(_pd)
	saveSetup()
}

//————————————————————————————————————————————— draw
function draw() {
	noLoop()
	background(_clrs[0]);

	const _ratio = width / (_total)
	// noStroke()
	stroke(_clrs[1])
	fill(_clrs[1])
	const rand1 = random(1)
	const rand2 = random(0.1, 2)
	const center = (_total-1)/2
	for (let i = 0; i < _total / 2; i++) {
		const x = i * _ratio
		for (let j = 0; j < _total; j++) {
			const y = j * _ratio
			// make it circle
			const d = dist(center,center,i,j)
			if (d <= ((_total - 4)/2)) {
				// current data
				// if (rand1 > random(rand2) && (j % 2 == 0 || i % 2 == 0)) {
				if (rand1 > random(rand2) && (j % 6 == 0 || i % 2 == 0)) {
					rect(x, y, _ratio, _ratio)
					rect(width - x - _ratio, y, _ratio, _ratio)
				}
			}
		}
	}


	//————————————————————————————————————————————— draw save
	if (_save) {
		saveDraw()
	}
}

//————————————————————————————————————————————— redraw
function keyPressed() {
	if (key == "A") {
		// save(frameCount + '_4.png')
		console.log(frameCount)
		loop()
	}
}