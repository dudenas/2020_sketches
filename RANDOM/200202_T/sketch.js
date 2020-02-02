let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 150;

function setup() {
	createCanvas(800, 600);
	grfcSetup();

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	//save
	saveSetup();
}

function draw() {
	background(clrs[0]);
	grfcDraw();
	saveDraw();
}