const _clrs = [250, 5]
const _gSize = 20
const _debug = true
const _objs = []

const _textSize = 10
const _textSize_2 = 20
const _text = "copy"

let _scl
let _img
let _grfc
let _draw = false
let _picked = false
let _x, _y, _index, _pickedCell
let _d

function setup() {
	createCanvas(540, 540)
	pixelDensity(1)

	// define scale
	_scl = int(width / (_gSize + 1))

	// setup objects
	for (let i = 0; i < _gSize; i++) {
		for (let j = 0; j < _gSize; j++) {
			const x = i * _scl
			const y = j * _scl
			_objs[i + j * _gSize] = new Obj(x, y, i + j * _gSize)
		}
	}


	// text style
	textAlign(CENTER, CENTER)
	textSize(_textSize)

	// setup image
	_img = createGraphics(width, height, P2D)
	_img.background(_clrs[0])

	// main text
	_img.textSize(_textSize_2)
	_img.textAlign(CENTER, CENTER)
	_img.noStroke()
}

function draw() {
	background(_clrs[0])

	// show objects
	_objs.forEach(elm => {
		elm.show()
	})

	// draw graphics
	_img.fill(_clrs[0])
	_img.rect((_gSize / 2) * _scl - _scl + 0.5, (_gSize / 2) * _scl + 0.5, _scl * 3, _scl)
	_img.fill(_clrs[1])
	_img.text(_text, (_gSize / 2) * _scl + _scl / 2, (_gSize / 2) * _scl + _scl / 2)
	// copyGraphics()
	if (_draw) copyGraphicsMouse()

	// draw image
	image(_img, 0, 0)

	// reset draw
	if (!_draw) _picked = false
	_draw = false
}

// mouse dragged
function mouseDragged(event) {
	_draw = true
}

function copyGraphicsMouse() {
	if (!_picked) {
		_x = floor(map(mouseX, 0, _gSize * _scl, 0, _gSize, true))
		_y = floor(map(mouseY, 0, _gSize * _scl, 0, _gSize, true))
		if (_x < _gSize && _y < _gSize) {
			_index = _x + _y * _gSize
			_picked = true
			_pickedCell = _objs[_index]
			console.log(_index)
		}
	} else {
		let px = floor(map(mouseX, 0, _gSize * _scl, 0, _gSize, true))
		let py = floor(map(mouseY, 0, _gSize * _scl, 0, _gSize, true))
		let pindex = px + py * _gSize
		// draw only if the cell is not the original one
		if (pindex != _index && px < _gSize && py < _gSize) {
			let obj = _objs[pindex]
			// copy picked one to the destination
			const sx = _pickedCell.x
			const sy = _pickedCell.y
			const sw = int(_scl)
			const sh = int(_scl)
			const dx = obj.x
			const dy = obj.y
			const dw = int(_scl)
			const dh = int(_scl)
			_img.copy(sx, sy, sw, sh, dx, dy, dw, dh)
		}
	}
}

function copyGraphics() {
	// pick taken cell
	let picked = false
	let index = null
	while (!picked) {
		let rNumber = int(random(_objs.length))
		_objs.forEach(elm => {
			if (elm.index == rNumber && elm.taken &&
				// check for edge cases
				elm.index > _gSize && elm.index < _objs.length - _gSize && elm.index % _gSize != 0 && (elm.index + 1) % _gSize != 0) {
				picked = true
				index = elm.index
			}
		})
	}
	// set direction
	let obj = _objs[index]

	let dir = int(random(4))
	let moveX = null
	let moveY = null
	switch (dir) {
		case 0:
			_objs[index - _gSize].taken = true
			moveX = 0
			moveY = -_scl
			break
		case 1:
			_objs[index + 1].taken = true
			moveX = _scl
			moveY = 0
			break
		case 2:
			_objs[index + _gSize].taken = true
			moveX = 0
			moveY = _scl
			break
		case 3:
			_objs[index - 1].taken = true
			moveX = -_scl
			moveY = 0
			break
	}

	// copy it
	const sx = obj.x
	const sy = obj.y
	const sw = int(_scl)
	const sh = int(_scl)
	const dx = obj.x + moveX
	const dy = obj.y + moveY
	const dw = int(_scl)
	const dh = int(_scl)
	_img.copy(sx, sy, sw, sh, dx, dy, dw, dh)
}

// OBJECT
class Obj {
	constructor(x, y, index) {
		this.x = x
		this.y = y
		this.index = index
		this.taken = this.index == 209 || this.index == 210 || this.index == 211 ? true : false
	}

	show() {
		if (_debug) {
			noStroke()
			fill(_clrs[1])
			text(this.index, this.x + _scl / 2, this.y + _scl / 2)
			stroke(_clrs[1])
			strokeWeight(1)
			noFill()
			rect(this.x, this.y, _scl, _scl)
		}
	}
}