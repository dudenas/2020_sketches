// main line variables
const TOTAL_MAIN = 12;
const TOTAL_SUPP = 3;
const TOTAL_LONERS = 5;
const maxDistX = 50;
const padding = 100;
const pointRadius = 75;
const connectRadius = 125;
const maxConnections = 1;
const variance = 0.7;

// style variables
const SW = {
	'main': 3,
	'points': 4,
	'pmain': 1,
	'pmin': 0.5,
	'pmax': 2,
	'pointloner': 4,
	'lineloner': 1
}

let clrs = {
	'main': (5, 5, 5),
	'bg': (250, 250, 250)
}

// main variables
let art;

function setup() {
	createCanvas(800, 800);

	// create graphics
	art = new grfc();
}

function draw() {
	background(color(clrs['bg']));

	// show graphics
	art.showMainLine();
	art.showPoints();
	art.showSuppLines();
	art.connectMain();
	art.showLoners();
	noLoop();
}

// generate new graphics when the key is pressed
function keyPressed() {
	if (key == 'N') {
		art = new grfc();
		loop();
	}
	if (key == 'S') {
		let now = new Date();
		console.log('saved');
		save(`output${now.getMinutes()}-${now.getSeconds()}.png`);
	}
}