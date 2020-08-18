let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 90;

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(800, 600);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	// grfcSetup
	grfcSetup();

	// setup save
	saveSetup();

}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	// draw Background
	background(clrs[0]);
	// grfcUpdate
	grfcUpdate();

	// save
	saveDraw();
}

//————————————————————————————————————————————— helping functions
function make2Darray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}