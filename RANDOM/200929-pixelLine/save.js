// saving
let save = false;
let capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);

  frameRate(30);
  capturer = new CCapture({
    format: 'png',
    framerate: 30,
    verbose: true
  });
  if (save) {
    capturer.start();
  }
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount % (totalFrames) == 1 && frameCount > 1) {
      console.log('finnished');
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}