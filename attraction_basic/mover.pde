class Mover {

  PVector position;
  PVector prevPosition;
  PVector velocity;
  PVector acceleration;
  float mass;

  Mover() {
    position = new PVector(400, 50);
    prevPosition = new PVector(400,50);
    velocity = new PVector(0.5, 0);
    acceleration = new PVector(0, 0);
    mass = 1;
  }

  void applyForce(PVector force) {
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  void update() {
    velocity.add(acceleration.mult(2));
    prevPosition.set(position.x,position.y);
    position.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    stroke(0);
    strokeWeight(2);
    fill(0);
    if((position.x > 300 && position.x < 600) && (position.y > 300 && position.y < 600)) {
    point(position.x, position.y);
    if((prevPosition.x > 300 && prevPosition.x < 600) && (prevPosition.y > 300 && prevPosition.y < 600)) {
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