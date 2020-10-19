let _clrs = []

const _pd = 1
const _total = 33
let sketch = function (p) {
	//————————————————————————————————————————————— setup
	p.setup = function () {
		p.createCanvas(540, 540, p.SVG)
		p.pixelDensity(_pd)
		p.scale(1 / 2)
		p.randomSeed(p.random(1000))
		_clrs[0] = 0
		_clrs[1] = 255
	}

	//————————————————————————————————————————————— draw
	p.draw = function () {
		p.noLoop()
		p.background(_clrs[0])
		const _ratio = p.width / (_total)
		// p.noStroke()
		p.stroke(_clrs[1])
		p.strokeWeight(0.5)
		p.fill(_clrs[1])
		const rand1 = 1
		const rand2 = 1.21
		const center = (_total - 1) / 2
		const temp = []
		for (let i = 0; i < _total / 2; i++) {
			const x = i * _ratio
			for (let j = 0; j < _total; j++) {
				const y = j * _ratio
				// make it circle
				const d = p.dist(center, center, i, j)
				if (d <= ((_total - 4) / 2)) {
					// current data
					if (rand1 > p.random(rand2) && (j % 6 == 0 || i % 2 == 0)) {
						p.rect(x, y, _ratio, _ratio)
						p.rect(p.width - x - _ratio, y, _ratio, _ratio)
						temp.push([x, y])
					}
				}
			}
		}

		// save it
		const filename = p.floor(p.random(100))
		p.save(`WGM_${filename}`)
		console.log(`saved ${filename}`)
	}
}

// delete the sketch for new svg
function recreate() {
	svg = new p5(sketch, "main");
	svg.type = "SVG";
}

function deleteChild() {
	var e = document.querySelector("#main")
	var child = e.lastElementChild
	while (child) {
		e.removeChild(child)
		child = e.lastElementChild
	}
}

svg = new p5(sketch, "main");
svg.type = "SVG";