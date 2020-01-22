let clrs = [250, 5];
let myFont;

let txtSize = 824;
let slices = 54;
let grfc = [];
let totalFrames = 300;
let sz = txtSize / 2;
let ease, styles;

function preload() {
	myFont = loadFont('data/Silka-Bold.otf', () => console.log('font loaded'));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
	createCanvas(1080, 1080);
	pixelDensity(1);
	ease = new p5.Ease();
	styles = ease.listAlgos();
	// styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];
	styles = ['doubleExponentialSigmoid', 'backIn', 'bounceIn'];
	splitLetter();
	saveSetup();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function draw() {
	background(clrs[0]);
	let percent = ((frameCount) % totalFrames) / totalFrames;
	for (let g of grfc) {
		// reorder
		// if (random(1) > 0.99) {
		// 	if (g.y == g.yo) {
		// 		let other = random(grfc);
		// 		let index = grfc.indexOf(other)
		// 		g.reorder(other, index);
		// 	} else {
		// 		g.y = g.yo;
		// 	}
		// }
		g.update();
		g.show();
	}
	saveDraw();
}

function splitLetter() {
	for (let n = 0; n < slices; n++) {
		let mid = floor(slices / 2);
		// let index = (slices - n) % mid;
		let index = slices - abs(n - mid);
		// let index = n;
		grfc.push(new Slice(n, index));
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Slice {
	constructor(n, index) {
		this.x = 0;
		this.y = 0;
		this.yo;
		this.n = index;
		this.speed = floor(random(styles.length));
		this.padd = random(width / 2);
		this.special = random(1) > 0.5 ? true : false;
		this.pg = this.createSlice(n);
	}

	update() {
		this.padd = this.n;
		let percent = ((frameCount + this.n) % totalFrames) / totalFrames;
		let percenta = ease[styles[2]](percent);
		let percentb = ease[styles[this.speed]](percent);
		this.x = map(sin(percenta * TWO_PI), -1, 1, -width / 2 + this.padd, width / 2 - this.padd);
		if (this.special) this.x = map(sin(percentb * TWO_PI), 1, -1, -width / 2 + this.padd, width / 2 - this.padd);
	}

	createSlice(n) {
		let pg = createGraphics(width, height / slices);
		pg.fill(clrs[1]);
		pg.noStroke();
		pg.textFont(myFont);
		pg.textSize(txtSize);
		pg.textAlign(CENTER, CENTER);
		pg.text('S', width / 2, height / 2 - txtSize / 8 - (height / slices) * n);
		this.y = (height / slices) * n;
		this.yo = this.y;
		return pg;
	}

	reorder(other, index) {
		this.y = other;
		grfc[index].y = this.yo;
	}

	show() {
		image(this.pg, this.x, this.y);
	}
}