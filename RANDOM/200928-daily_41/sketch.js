let myShader;

function preload() {
	myShader = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
	createCanvas(400, 400, WEBGL);
}

function draw() {
	shader(myShader);
	noStroke();
	rect(0, 0, width, height);
}