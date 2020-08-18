let obj;

let totalFrames = 300;
let r;

let ease, styles;
const pd = 2

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(pd)
	setupGrfc();
	saveSetup();

	r = width / 5 * 2;

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf'];

	obj = createVector();
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	for (let c of cells) {
		c.getBack();
		c.glitch();
		c.update();
		c.show();
	}

	let percent = (frameCount % totalFrames) / totalFrames;
	let percent1 = ease[styles[2]](percent);
	obj.x = width / 2 + r * cos(map(sin(percent1 * TWO_PI), -1, 1, 0, TWO_PI));
	obj.y = height / 2 + r * sin(map(sin(percent1 * TWO_PI), -1, 1, 0, TWO_PI));

	maxSpeed = map(obj.x, 0, width, 1, 10);
	maxForce = map(obj.y, 0, height, 0.5, 10);
	if (!save) {
		stroke(clrs[1]);
		strokeWeight(2);
		noFill();
		ellipse(obj.x, obj.y, 16, 16);
	}
	saveDraw();
	// image(pg, 0, 0);
}