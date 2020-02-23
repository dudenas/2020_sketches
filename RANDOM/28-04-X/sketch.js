let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 150;
let video;

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	video = createVideo('files/walk.mp4');
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);
	video.size(width, height);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	grfcSetup();
	saveSetup();

	video.loop();
	video.hide();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);
	// image(video, 0, 0);
	video.loadPixels();
	grfcDraw();
	saveDraw();

}