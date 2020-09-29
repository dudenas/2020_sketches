function setup() {
  createCanvas(windowWidth, windowHeight)
}


function syncTime() {
  // Set up our time object, synced by the HTTP DATE header
  // Fetch the page over JS to get just the headers
  // console.log("syncing time")
  var r = new XMLHttpRequest();
  var start = (new Date).getTime();

  r.open('HEAD', document.location, false);
  r.onreadystatechange = function () {
    if (r.readyState != 4) {
      return;
    }
    var latency = (new Date).getTime() - start;
    var timestring = r.getResponseHeader("DATE");

    // Set the time to the **slightly old** date sent from the 
    // server, then adjust it to a good estimate of what the
    // server time is **right now**.
    systemtime = new Date(timestring);
    systemtime.setMilliseconds(systemtime.getMilliseconds() + (latency / 2))
  };
  r.send(null);
}

function draw() {
  background(0)
  noStroke()
  if (frameCount % 2 == 0) {
    syncTime()
  }
  const sec = (new Date()).getSeconds()
  const msec = (new Date()).getMilliseconds()
  // print(sec, msec)
  if (sec % 2 == 0) {
    fill(255)
    rect(0, 0, width / 2, height)
  }

  if (floor(msec / 100) % 2 == 0) {
    fill(255)
    rect(width / 2, 0, width / 2, height)
  }
}

////////////////////////////////////////////////////////////////////////////////////////

_run = true

function keyPressed() {
  if (key == "S") {
    _run = !_run
    console.log(`run ${_run}`)
  }
}