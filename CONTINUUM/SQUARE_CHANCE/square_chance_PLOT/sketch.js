let _clrs = []

const _total = 4
const _totalSave = 256
let _data

//————————————————————————————————————————————— preload
function preload() {
	_data = loadJSON('test.json')
}

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(512, 512, SVG);
	_clrs[0] = 240
	_clrs[1] = 0
	pixelDensity(1)
	scale(1/2)
	
	console.log(`total length : ${Object.keys(_data).length}`)
	noLoop()
}

//————————————————————————————————————————————— draw
function draw() {
	// background(_clrs[0]);

	const _ratio = width / (_total)

	push()
	// noStroke()
	scale(1 / 16)
	noStroke()
	fill(_clrs[1])
	for (let n = 0; n < 16; n++) {
		for (let m = 0; m < 16; m++) {
			const currentIdx = n + m * 16
			const current = _data[currentIdx]
			push()
			translate(n * width + width * 0.1, m * height + height * 0.1)
			scale(0.8)
			for (let i = 0; i < _total / 2; i++) {
				const x = i * _ratio
				for (let j = 0; j < _total; j++) {
					const y = j * _ratio
					// current data
					if (current[j][i] == 1) {
						rect(x, y, _ratio, _ratio)
						rect(width - x - _ratio, y, _ratio, _ratio)
					}
				}
			}
			pop()
		}
	}
	pop()
	save(`SQUARE_${floor(random(1000))}`)
	console.log("saved")
}