let clrs = [250, 5, [255, 0, 85], 125]
let ease, styles
let totalFrames = 120

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540)

	// easing functions
	ease = new p5.Ease()
	styles = ease.listAlgos()
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut']

	// setup style
	strokeCap(SQUARE)
	strokeJoin(BEVEL)

	grfcSetup()
	saveSetup()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0])
	let percent = ((frameCount) % (totalFrames)) / (totalFrames)
	percent = ease[styles[2]](percent)

	translate(width / 2, height / 2 - height / 8)
	grfcDraw()
	strokeWeight(SW)
	line(width / 4 - width / 20, height / 6.7, 0, height / 2)
	saveDraw()
}