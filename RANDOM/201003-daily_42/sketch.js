// in this example we will send a value from our p5 sketch to the shader
// these values are called "uniform" variables
// we will use p5's setUniform function to make this happen
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let theShader;
let cam;

function preload() {
	// load the shader
	theShader = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
	// shaders require WEBGL mode to work
	createCanvas(256, 256, WEBGL);
	noStroke();
	cam = createCapture(VIDEO);
	cam.size(width, height);

	// cam.hide();
}

function draw() {
	// shader() sets the active shader with our shader
	shader(theShader);

	theShader.setUniform("iResolution", [width, height]);
	theShader.setUniform("iTime", millis() / 100.);
	theShader.setUniform("iChannel0", cam);



	// rect gives us some geometry on the screen
	rect(0, 0, width, height);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}