let obj;

let totalFrames = 600;
let diam_;

let ease, styles;
const pd = 2

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	pixelDensity(pd)
	setupGrfc();
	saveSetup();

	obj = createVector();
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	// update diameter
	diam_ = map(sin(frameCount * 0.01), -1, 1, 20, 400);

	for (let c of cells) {
		c.update();
		if (!c.animateIt) c.shine(obj);
		if (c.showIt) c.show();
	}

	obj.x = lerp(obj.x, mouseX, 0.1)
	obj.y = lerp(obj.y, mouseY, 0.1)

	if (!save) {
		stroke(clrs[1]);
		strokeWeight(1);
		noFill();
		ellipse(obj.x, obj.y, diam_, diam_);
	}
	saveDraw();
	// image(pg, 0, 0);
}