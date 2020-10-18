// saving
let _capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);
  frameRate(30);
  _capturer = new CCapture({
    format: 'png',
    framerate: 30,
    verbose: true
  });
  if (_save) {
    _capturer.start();
  }
}

function saveDraw() {
  if (_save) {
    _capturer.capture(canvas);
    if (_finnished) {
      console.log('finnished');
      _capturer.stop();
      _capturer.save();
      noLoop();
    }
  }
}