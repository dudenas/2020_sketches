// saving
let save = false;
let capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);
  frameRate(60);
  capturer = new CCapture({
    format: 'png',
    framerate: 60,
    verbose: true
  });
  if (save) {
    capturer.start();
  }
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount == (totalFrames * 2)) {
      console.log('finnished');
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}