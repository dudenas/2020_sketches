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
	createCanvas(800, 600, WEBGL);
	noStroke();

	cam = createCapture(VIDEO);
	cam.size(windowWidth, windowHeight);

	cam.hide();
}

function draw() {
	// shader() sets the active shader with our shader
	shader(theShader);

	// here we're using setUniform() to send our uniform values to the shader
	// set uniform is smart enough to figure out what kind of variable we are sending it,
	// so there's no need to cast (unlike processing)
	theShader.setUniform("u_resolution", [width, height]);
	theShader.setUniform("u_time", millis() / 100.0);
	theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
	theShader.setUniform('tex0', cam);

	// rect gives us some geometry on the screen
	rect(0, 0, width, height);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}