// Speech Recognition Engine
var spRec = new p5.SpeechRec(); // new P5.SpeechRec object
spRec.continuous = false; // do continuous recognition
spRec.interimResults = true; // allow partial recognition (faster, less accurate)
spRec.interimResults = true;

var recordedPara = " ";
var recordedPhrase = "";

var audioInput;

var attractor;
var movers = [];

var angle = 0.3;
var radius = 0;

var designValue = 3;
var flock;

/*------------------------------------------------ FUNCTIONS --------------------------------------------------------*/
function setup() {
  createCanvas(1500, 800);
  background(0);
  initiateSpeechRec();
  triggerSpeechRec();

  audioInput = new p5.AudioIn();
  audioInput.start();

  for (var i = 0; i < 10; i++) {
    movers[i] = new Mover(random(0.1, 1), random(750, 1250), random(200, 600));
  }
  attractor = new Attractor();

  flock = new Flock();
}

function draw() {
  fill(0);
  rect(0, 0, width / 3, 3 * (height / 4))
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(recordedPara, 0, 0, width / 3, 2 * (height / 3));

  var volume = audioInput.getLevel();
  console.log(volume);

  if (designValue == 1) {
    designOne(volume);
  } else if (designValue == 2) {
    designTwo(volume);
  } else if (designValue == 3) {
    designThree();
  }

}

function designOne(volume) {
  push();
  translate(2 * (width / 3), height / 2);
  stroke(255, 50);
  noFill();
  strokeWeight(0.5);
  rotate(angle);
  for (var a = 0; a < TWO_PI; a += 1) {
    var r = map(volume, 0, 1, 50, 500);
    var v = r * sin(a);
    var w = r * cos(a);
    ellipse(v + r, w + r, 2, 2);
  }
  angle++;
  pop();
}

function designTwo(volume) {
  fill(0);
  rect((width / 3), 0, 2 * (width / 3), height);
  fill(255);
  var mappedVolume = map(volume, 0, 1, 5, 200);
  attractor.display();

  for (var i = 0; i < movers.length; i++) {
    var force = attractor.calculateAttraction(movers[i]);
    movers[i].applyForce(force);

    movers[i].update();
    movers[i].display(mappedVolume);
  }
}

function designThree() {
  fill(0);
  rect((width / 3), 0, 2 * (width / 3), height);
  fill(255);

  var recordedWords = split(recordedPara, " ");
  for (var i = 0; i < recordedWords.length; i++) {
    var w = recordedWords[i];
    if (w.length >= 4) {
      var wordPresent = 0;
      var wordCount = 0;

      for (var k = 0; k < recordedWords.length; k++) {
        if (recordedWords[k] == w) {
          wordCount++;
        }
      }

      for (var j = 0; j < flock.boids.length; j++) {
        if (flock.boids[j].word == w) {
          wordPresent = 1;
        }
      }
      if (wordPresent == 0) {
        var b = new Boid(2 * (width / 3), height / 2, w.length * 2, w.count);
        flock.addBoid(b);
        flock.boids[j].word = w;
        break;
      } else if (wordPresent == 1) {
        for (var j = 0; j < flock.boids.length; j++) {
          if (flock.boids[j].word == w) {
            flock.boids[j].count = wordCount;
          }
        }
      }
    }
  }

  flock.run();
}

function triggerSpeechRec() {
  setInterval(initiateSpeechRec, 1000);
}

function initiateSpeechRec() {
  spRec.start(); // start engine
  spRec.onResult = recordAndRespond; // recognition callback
  console.log("start!!!!!!");
  console.log(spRec);
}

function recordAndRespond() {
  console.log("Hello!!!");
  if (spRec.resultValue === true && spRec.resultConfidence > 0.25) {
    console.log("before : " + recordedPhrase);
    recordedPhrase = spRec.resultString;
    console.log("after : " + recordedPhrase);
    recordedPara += recordedPhrase + " ";
    recordedPhrase = "";
    console.log(spRec.resultJSON);
  }

  if (spRec.resultValue === true) {
    var liveWords = spRec.resultString;
    liveDisplay(liveWords);
  }
}

function liveDisplay(recordedPhrase) {
  fill(0);
  rect(0, 0, width / 3, height);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(recordedPhrase, 0, 3 * (height / 4), width / 3, height / 4);
}

function keyTyped() {
  if (key == "1") {
    background(0);
    designValue = 1;
  } else if (key == "2") {
    background(0);
    designValue = 2;
  } else if (key == "3") {
    designValue = 3;
  }
}