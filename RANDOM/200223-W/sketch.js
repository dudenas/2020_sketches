let clrs = [250, 5, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 150;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	grfcSetup();
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);
	translate(0, -scl);
	grfcDraw();
	saveDraw();
}