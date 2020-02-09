let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 35;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(800, 600);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup style
	strokeCap(PROJECT);
	strokeJoin(BEVEL);

	// setup graphics
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);

	// draw graphics
	grfcDraw();

	// save
	saveDraw();
	let percent = ((frameCount) % (totalFrames)) / (totalFrames);
	SW = map(sin(percent * TWO_PI), -1, 1, 2, 48);

}