const clrs = [240, 15]
let d
let nx = 0
const totalFrames = 210
let padd = 75
const sentence = "erase"
let ease, styles

function setup() {
	createCanvas(800, 600)
	pixelDensity(2)
	noStroke()
	textAlign(CENTER, CENTER)
	textSize(32)
	d = pixelDensity()
	saveSetup()
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid', 'quadraticInOut']
	frameRate(30)
}

function draw() {
	background(clrs[0])
	fill(clrs[1])
	drawText(sentence.substring(0, 2), width / 6 * 1, -150)
	drawText(sentence.substring(2, 3), width / 6 * 3, 0)
	drawText(sentence.substring(3), width / 6 * 5, 150)
	let curr = []
	loadPixels();
	for (let x = 0; x < width; x++) {
		let i = 4 * (x * d + height / 2 * d * width * d)
		curr.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]])
	}
	updatePixels()
	for (let x = 0; x < width; x++) {
		fill(curr[x][0], curr[x][1], curr[x][2], curr[x][3])
		rect(x, height / 2, 1, height / 2)
	}
	percent = frameCount % totalFrames / totalFrames
	percent = ease[styles[0]](percent, 0.4);
	// percent = ease[styles[1]](percent, 0.2);
	nx = map(percent, 0, 1, 0, height);
	saveDraw()
}

function drawText(txt, x, padd) {
	text(txt, x, (nx + height / 6 * 6 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 5 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 4 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 3 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 2 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 1 + padd) % height - 100)
}