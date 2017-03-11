class Mover2 {

  PVector position;
  PVector prevPosition;
  PVector velocity;
  PVector acceleration;
  float mass;

  Mover2() {
    position = new PVector(200, 50);
    prevPosition = new PVector(200,50);
    velocity = new PVector(0.5, 0);
    acceleration = new PVector(0, 0);
    mass = 1;
  }

  void applyForce(PVector force) {
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  void update() {
    velocity.add(acceleration.mult(5));
    prevPosition.set(position.x,position.y);
    position.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    if(((position.x > 200  && position.x < 300) || (position.x > 600 && position.x < 700)) || ((position.y > 200 && position.y < 300) || (position.y > 600 && position.y < 700))) {
    point(position.x, position.y);
    if((prevPosition.x > 200 && prevPosition.x < 700) && (prevPosition.y > 200 && prevPosition.y < 700)) {
    line(position.x,position.y,prevPosition.x,prevPosition.y);
    }
    }
  }

  void checkEdges() {

    if (position.x > width) {
      position.x = 0;
    } else if (position.x < 0) {
      position.x = width;
    }

    if (position.y > height) {
      velocity.y *= -1;
      position.y = height;
    }
  }
}