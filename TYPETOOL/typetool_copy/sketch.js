const _clrs = [250, 5, [250, 0, 85]]
const _gSize = 30
const _objs = []

const _textSize = 200 / _gSize
const _textSize_2 = 40

let _alphabeth = "God does not play dice with the universe".split(" ")
let _current = 0
// speed how fast the text will change
let _speedChange = 30
let _debug = false

let _scl, _img
let _draw = false
let _picked = true
let _x, _y, _index
let _pickedCells = []
let _maxPickedCells = 8
let _d = 1
let _paintBlack = false

function setup() {
	createCanvas(600, 600, P2D)
	pixelDensity(_d)

	// define scale
	_scl = floor(width / (_gSize))

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
	_img = createGraphics(width * _d, height * _d, P2D)
	_img.background(_clrs[1])

	// main text
	_img.textSize(_textSize_2)
	_img.textAlign(CENTER, CENTER)
	_img.noStroke()
}

function draw() {
	background(_clrs[0])

	// draw image
	push()
	scale(1 / _d)
	image(_img, 0, 0)
	pop()
	// show objects if not debug
	if (_debug) {
		_objs.forEach(elm => {
			elm.show()
		})
	}

	// draw main text in the middle
	_img.fill(_clrs[0])
	_img.rect((_gSize / 2) * _scl - _scl * 3, (_gSize / 2) * _scl - _scl, _scl * 7, _scl * 3)
	_img.fill(_clrs[1])
	if (_paintBlack) {
		_img.rect((_gSize / 2) * _scl, (_gSize / 2) * _scl, _scl, _scl)
	} else _img.text(_alphabeth[_current], (_gSize / 2) * _scl + _scl / 2, (_gSize / 2) * _scl + _scl / 2)
	// copy graphics
	copyGraphics()

	// update text
	if (frameCount % _speedChange == 0) {
		_current = (_current + 1) % _alphabeth.length
	}

	// show picked cells
	_pickedCells.forEach(elm => elm.show(true))
	_picked = true

	// print frame
	// if (frameCount % 10 == 0) console.log(frameRate())
}

function keyPressed() {
	// start stop drawing
	if (key == "E") {
		_draw = !_draw
	}

	// repic cell
	if (key == "R") {
		if (!_paintBlack)
			_picked = false
	}

	// delete all cells and create a black one
	if (key == "T") {
		_paintBlack = !_paintBlack
		_pickedCells = []
		if (_paintBlack) {
			let idx = _gSize / 2 + _gSize / 2 * _gSize
			_pickedCells.push(_objs[idx])
		}
	}

	if (key == "Y") {
		_pickedCells = []
	}

	// debug
	if (key == "D") {
		_debug = !_debug
	}
}

function copyGraphics() {
	// pick a new cell if not picked
	if (!_picked) {
		_x = floor(map(mouseX, 0, _gSize * _scl, 0, _gSize, true))
		_y = floor(map(mouseY, 0, _gSize * _scl, 0, _gSize, true))
		if (_x < _gSize && _y < _gSize) {
			_index = _x + _y * _gSize
			_picked = true
			// if it is already selected remove that cell
			let remove = false
			_pickedCells.forEach((elm, elmIndex) => {
				if (elm.index == _index) {
					_pickedCells.splice(elmIndex, 1)
					remove = true
				}
			})
			if (!remove && _pickedCells.length < _maxPickedCells) _pickedCells.push(_objs[_index])
		}
	}

	// copy graphics if activated
	else if (_draw) {
		let px = floor(map(mouseX, 0, _gSize * _scl, 0, _gSize, true))
		let py = floor(map(mouseY, 0, _gSize * _scl, 0, _gSize, true))
		let pindex = px + py * _gSize
		// go over all picked cells and copy accordingly if it is possible
		let firstCell = null
		_pickedCells.forEach(elm => {
			let npx = px
			let npy = py
			if (firstCell) {
				let diff_x = floor(map(elm.x - firstCell.x, 0, _gSize * _scl, 0, _gSize))
				let diff_y = floor(map(elm.y - firstCell.y, 0, _gSize * _scl, 0, _gSize))
				npx += diff_x
				npy += diff_y
				pindex = npx + npy * _gSize
			} else {
				// copy first elmenet
				firstCell = elm
			}
			// check if it is within the boundaries of the canvas
			if (npx <= _gSize && npx >= 0 &&
				npy <= _gSize && npy >= 0 &&
				_objs[pindex] != undefined) {
				let obj = _objs[pindex]
				const sx = elm.x
				const sy = elm.y
				const sw = int(_scl)
				const sh = int(_scl)
				const dx = obj.x
				const dy = obj.y
				const dw = int(_scl)
				const dh = int(_scl)
				_img.copy(sx, sy, sw, sh, dx, dy, dw, dh)
			}
		})
	}
}

// OBJECT
class Obj {
	constructor(x, y, index) {
		this.x = x
		this.y = y
		this.index = index
	}

	show(special) {
		noStroke()
		fill(_clrs[1])
		text(this.index, this.x + _scl / 2, this.y + _scl / 2)
		// if it's picked draw with different color
		if (special) {
			stroke(_clrs[2])
		} else stroke(_clrs[1])
		strokeWeight(1)
		noFill()
		rect(this.x, this.y, _scl, _scl)
	}
}