let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 90;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(800, 600);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['elasticInOut'];

	// setup style
	strokeCap(ROUND);
	strokeJoin(ROUND);

	// setup graphics
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);

	// draw graphics
	translate(0, -height / 6);
	grfcDraw();

	// save
	saveDraw();

	// totalFrames = map(sin(frameCount * TWO_PI), -1, 1, 120, 40);
}