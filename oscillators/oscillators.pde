float d = 3;
float n = 1;
float angle = 1;
float radius = 0;

void setup() {
  size(800, 800);
}

void draw() {
  float k = n / d;
  background(255);
  translate(width / 2, height / 2);
  fill(0);
  ellipse(0, 0, 700, 700);

  /*fill(0);
  ellipse(0, 0, 400, 400);
  beginShape();
  stroke(255, 90);
  noFill();
  strokeWeight(1);
  rotate(2*angle + 1);
  for (float a = 0; a < TWO_PI; a += 0.02) {
    float r = (200+radius) * cos(k * a);
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);*/

  /*fill(255);
  ellipse(0, 0, 200, 200);
  beginShape();
  stroke(0, 90);
  noFill();
  strokeWeight(1);
  rotate(angle);
  for (float a = 0; a < TWO_PI; a += 0.02) {
    float r = 200 * cos(k * a);
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);*/

  beginShape();
  stroke(255, 90);
  noFill();
  strokeWeight(1);
  rotate(-angle);
  for (float a = 0; a < TWO_PI; a += 0.02) {
    float r = (5+radius) * cos(k * a);
    float v = (r+200) * sin(a);
    float w = (r+200) * cos(a);
    //if((v<=width/4 || v>=3*(width/4)) && (w<=height/4 || w>=3*(height/4))) {
    vertex(v, w);
    //}
  }
  endShape(CLOSE);

  //d += 0.03;
  n += 0.02;
  if (radius<=100) {
    radius += 0.01;
  }
}