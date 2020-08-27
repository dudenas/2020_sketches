import processing.video.*;
Movie myMovie;

void setup() {
  size(1280, 720, JAVA2D);
  myMovie = new Movie(this, "stars_orig.mp4");
  myMovie.loop();
  frameRate(30);
  background(0);
  smooth(8);
}

void draw() {
  if (myMovie.time() / myMovie.duration() == 0) background(0);

  //blendMode(NORMAL);
  //fill(0, 5);
  //noStroke();
  //rect(0, 0, width, height);
  blendMode(LIGHTEST);
  image(myMovie, 0, 0, width, height);
  // find brightest spots
  myMovie.loadPixels();
  PVector a = new PVector(0, 0);
  PVector b = new PVector(0, 0);
  float bri_a = 0;
  float bri_b = 0;
  int step = 10;
  for (int i = 0; i < myMovie.width; i+=step) {
    for (int j = 0; j < myMovie.height; j+=step) {
      int index = i + j * myMovie.width;
      float pictureBrightness = brightness(myMovie.pixels[index]);
      if (pictureBrightness > bri_a) {
        bri_a = pictureBrightness;
        a.x = i;
        a.y = j;
      } else if (pictureBrightness > bri_b) {
        bri_b = pictureBrightness;
        b.x = i;
        b.y = j;
      }
    }
  }
  // draw line between two brightnest points
  //stroke(255);
  //line(a.x, a.y, b.x, b.y);

  // print framerate
  if (frameCount % 30 == 0) println(frameRate);
}

// Called every time a new frame is available to read
void movieEvent(Movie m) {
  m.read();
}
