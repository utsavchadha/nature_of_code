Mover m;
Mover2 mx;
Attractor a;
Attractor ax;

void setup() {
  size(900, 900);
  m = new Mover();
  mx = new Mover2();
  a = new Attractor();
  ax = new Attractor();
  
  background(255);
  stroke(0);fill(0);
  rect(200,200,500,500);
  stroke(255);fill(255);
  rect(300,300,300,300);
}

void draw() {

  PVector force = a.attract(m);
  PVector forcex = ax.attract(mx);
  m.applyForce(force);
  m.update();
  
  mx.applyForce(forcex);
  mx.update();

  a.drag();
  a.hover(mouseX, mouseY);

  a.display();
  ax.display();
  m.display();
  mx.display();
}