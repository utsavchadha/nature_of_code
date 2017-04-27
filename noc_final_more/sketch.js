// Speech Recognition Engine
var spRec = new p5.SpeechRec(); // new P5.SpeechRec object
spRec.continuous = false; // do continuous recognition
spRec.interimResults = true; // allow partial recognition (faster, less accurate)
spRec.interimResults = true;

var recordedPara = " ";
var recordedPhrase = "";
var posEnd = 0;

var audioInput;

var attractor;
var movers = [];

var angle = 0.3;
var radius = 0;

var designValue = 3;

var voice = new p5.Speech(); // new P5.Speech object
voice.onEnd = speakAgain;
var menuLoaded = 0;
var volumeLabel, rateLabel, pitchLabel, input, checkbox, speakButton, vslider, rslider, pslider; // UI

var recording = "";
var lyricBoxWidth = 20;
var lyricBoxHeight = 100;
var lyrics = "";
var voices = ["Bad News", "Thomas", "Kyoko", "Albert"];
var voiceNum = 0;

var visualize = 0;
var isIddaka = 0;
var isBass = 0;
var isSynth = 0;
var isSitar = 0;
var isSitar2 = 0;
var isTarang = 0;
var isPattern = 0;
var isPattern2 = 0;
var isPattern3 = 0;
var isPattern4 = 0;
var isSaw = 0;
var isSpeaking = 0;
var isChorus1 = 0;
var isChorus2 = 0;
var isChorus3 = 0;
var isChorus4 = 0;
var isSpeechInitiated = 0;
var bColor = 255;
var backgroundSet = 0;

var vis1 = 0;
var vis2 = 0;
var vis3 = 0;
var vis4 = 0;
var vis5 = 0;
var vis6 = 0;

/*------------------------------------------------ FUNCTIONS --------------------------------------------------------*/
function setup() {
  createCanvas(1500, 800);
  background(0);
  initiateSpeechRec();
  triggerSpeechRec();
  setupLyricsMachine();
  hideControls();

  audioInput = new p5.AudioIn();
  audioInput.start();

  for (var i = 0; i < 10; i++) {
    movers[i] = new Mover(random(0.1, 1), random(750, 1250), random(200, 600));
  }
  attractor = new Attractor();
}

function draw() {
  fill(0);
  rect(0, 0, width / 3, 3 * (height / 4))
  fill(255);
  textSize(14);
  textFont("Avenir");
  textAlign(CENTER);
  text(recordedPara, 0, 0, width / 3, 2 * (height / 3));

  var volume = audioInput.getLevel();

  if (designValue == 1) {
    designOne(volume);
  } else if (designValue == 2) {
    designTwo(volume);
  } else if (designValue == 3) {
    designThree();
  } else if (designValue == 4) {
    designFour();
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
  addLyrics();
  visualizeInput();

  synthLoop.playbackRate = map(mouseX, width / 3, windowWidth, 0.5, 2);

  if (vis1 == 1) {
    visOne();
  }
  if (vis2 == 1) {
    visTwo();
  }
  if (vis3 == 1) {
    visThree();
  }
  if (vis4 == 1) {
    visFour();
  }
  if (vis5 == 1) {
    visFive();
  }
  if (vis6 == 1) {
    visSix();
  }
}

function visOne() {
  stroke(255, 5);
  strokeWeight(random(1, 3));
  var num = random(width / 3, width);
  line(num, 0, num, height);
}

function visTwo() {
  stroke(random(255), random(255), random(255), 5);
  strokeWeight(random(1, 3));
  var num = random(width / 3, width);
  line(num, 0, num, height);
}

function visThree() {
  stroke(random(255), random(255), random(255), 5);
  strokeWeight(random(1, 3));
  var num1 = random(0, height);
  var num2 = random(width / 3, width);
  line(2 * (width / 3), 0, width / 3, num1);
  line(2 * (width / 3), height, width / 3, num1);
  line(2 * (width / 3), 0, width, num1);
  line(2 * (width / 3), height, width, num1);
}

function visFour() {
  stroke(random(255), random(255), random(255), 5);
  strokeWeight(random(1, 3));
  var num1 = random(0, height);
  var num2 = random(0, width);
  line(2 * (width / 3), height / 2, 0, num1);
  line(2 * (width / 3), height / 2, num2, 0);
  line(2 * (width / 3), height / 2, width, num1);
  line(2 * (width / 3), height / 2, num2, height);
}

function visFive() {
  fill(255);
  ellipse(2 * (width / 3), height / 2, 250, 250);
  ellipseMode(CENTER);
  var num = random(270, 290);
  fill(random(255), random(255), random(255), 10);
  ellipse(2 * (width / 3), height / 2, num, num);

  fill(0, random(100));
  stroke(random(255), random(255), random(255), 10);
  textSize(random(70, 78));
  textFont("Impact");
  textAlign(CENTER);
  text("ドット", 2 * (width / 3), (height / 2) + 30);
  textFont("Avenir");
}

function visSix() {
  fill(255);
  ellipse(2 * (width / 3), height / 2, 250, 250);
  ellipseMode(CENTER);
  var num = random(270, 290);
  fill(random(255), random(255), random(255), 10);
  ellipse(2 * (width / 3), height / 2, num, num);

  fill(0, random(100));
  stroke(random(255), random(255), random(255), 10);
  textSize(random(40, 45));
  textFont("Helvetica");
  textAlign(CENTER);
  text("HAPPENIN'", 2 * (width / 3), (height / 2) + 15);
  textFont("Avenir");
}

function addLyrics() {
  var recordedWords = split(recordedPara, " ");
  if (posEnd < recordedWords.length) {
    compileLyrics();
  }
}

function compileLyrics() {
  var recordedWords = split(recordedPara, " ");

  posEnd = 0;
  for (var i = 0; i < recordedWords.length; i++) {
    var word = recordedWords[i];

    var additions = word;
    for (var kuchbhi = 0; kuchbhi < random(1, 3); kuchbhi++) {
      var arrayStr = [additions, word];
      additions = join(arrayStr, " ");
    }
    var arrayStr = [lyrics, additions];
    lyrics = join(arrayStr, " ");
    posEnd++;
  }
}

function speakAgain() {
  console.log("HERE!");
  voice.speak(lyrics);
}

function designFour() {
  fill(255);
  if (backgroundSet == 0) {
    rect((width / 3), 0, 2 * (width / 3), height);
    //showControls();
    backgroundSet = 1;
  } else {
    //do nothing.
  }

  placeElements();
  visualizeInput();
  visualizeLines();
  visualizeIddaka();

  synthLoop.playbackRate = map(mouseX, width / 3, windowWidth, 0.5, 2);
  iddaka.playBackRate = map(mouseY, width / 3, windowHeight, 0.5, 5);
}

function triggerSpeechRec() {
  setInterval(initiateSpeechRec, 1000);
}

function initiateSpeechRec() {
  try {
    spRec.start(); // start engine
  } catch (err) {
    // do nothing.
  }
  spRec.onResult = recordAndRespond; // recognition callback
  console.log("start!!!!!!");
}

function recordAndRespond() {
  if (spRec.resultValue === true && spRec.resultConfidence > 0.25) {
    recordedPhrase = spRec.resultString;
    recordedPara += recordedPhrase + " ";
    recordedPhrase = "";
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
    fill(0);
    rect((width / 3), 0, 2 * (width / 3), height);
    designValue = 3;
  } else if (key == "4") {
    designValue = 4;
  } else if (key == "a") {
    if (isBass == 0) {
      bass.toMaster().start();
      isBass = 1;
    } else {
      bass.stop();
      isBass = 0;
    }
  } else if (key == "s") {
    if (isSynth == 0) {
      synthLoop.start();
      isSynth = 1;
    } else {
      synthLoop.stop();
      isSynth = 0;
    }
  } else if (key == "d") {
    if (isSitar == 0) {
      sitar1.toMaster().start();
      isSitar = 1;
    } else {
      sitar1.stop();
      isSitar = 0;
    }
  } else if (key == "f") {
    if (isSitar2 == 0) {
      sitar2.toMaster().start();
      isSitar2 = 1;
    } else {
      sitar2.stop();
      isSitar2 = 0;
    }
  } else if (key == "g") {
    if (isTarang == 0) {
      tarang.toMaster().start();
      isTarang = 1;
    } else {
      tarang.stop();
      isTarang = 0;
    }
  } else if (key == "z") {
    if (isPattern == 0) {
      vis1 = 1;
      pattern.start();
      Tone.Transport.start();
      isPattern = 1;
    } else {
      vis1 = 0;
      pattern.stop();
      isPattern = 0;
    }
  } else if (key == "x") {
    if (isPattern2 == 0) {
      vis2 = 1;
      pattern2.start();
      Tone.Transport.start();
      isPattern2 = 1;
    } else {
      vis2 = 0;
      pattern2.stop();
      isPattern2 = 0;
    }
  } else if (key == "c") {
    if (isPattern3 == 0) {
      vis3 = 1;
      pattern3.start();
      Tone.Transport.start();
      isPattern3 = 1;
    } else {
      vis3 = 0;
      pattern3.stop();
      isPattern3 = 0;
    }
  } else if (key == "v") {
    if (isPattern4 == 0) {
      vis4 = 1;
      pattern4.start();
      Tone.Transport.start();
      isPattern4 = 1;
    } else {
      vis4 = 0;
      pattern4.stop();
      isPattern4 = 0;
    }
  } else if (key == ",") {
    if (isSaw == 0) {
      patternSaw.start();
      Tone.Transport.start();
      isSaw = 1;
    } else {
      patternSaw.stop();
      isSaw = 0;
    }
  } else if (key == "o") {
    if (isChorus1 == 0) {
      vis6 = 1;
      voice.pause();
      var words = "";
      for (var i = 0; i <= 200; i++) {
        words = words + " happening";
      }
      voice.setVoice("Thomas");
      voice.speak(words);
      isChorus1 = 1;
    } else {
      vis6 = 0;
      voice.stop();
      if (isSpeaking == 0) {

      } else {
        voice.speak(lyrics);
      }
      isChorus1 = 0;
    }
  } else if (key == "p") {
    if (isChorus2 == 0) {
      vis5 = 1;
      voice.stop();
      var words = "";
      for (var i = 0; i <= 200; i++) {
        words = words + " dot";
      }
      voice.setVoice("Kyoko");
      voice.speak(words);
      isChorus2 = 1;
    } else {
      vis5 = 0;
      voice.stop();
      if (isSpeaking == 0) {

      } else {
        voice.speak(lyrics);
      }
      isChorus2 = 0;
    }
  } else if (key == "[") {
    if (isChorus3 == 0) {
      voice.stop();
      var words = "";
      for (var i = 0; i <= 200; i++) {
        words = words + " hello";
      }
      voice.setVoice("Albert");
      voice.speak(words);
      isChorus3 = 1;
    } else {
      voice.stop();
      if (isSpeaking == 0) {

      } else {
        voice.speak(lyrics);
      }
      isChorus3 = 0;
    }
  } else if (key == "]") {
    if (isChorus4 == 0) {
      voice.stop();
      var words = "";
      for (var i = 0; i <= 200; i++) {
        words = words + " ABHSJDSLJNBSKDBCKDSBKBSD CONFUSION! CONFUSION! ERROR! ERROR! ERROR!";
      }
      voice.setVoice("Fred");
      voice.speak(words);
      isChorus4 = 1;
    } else {
      voice.stop();
      if (isSpeaking == 0) {

      } else {
        voice.speak(lyrics);
      }
      isChorus4 = 0;
    }
  } else if (key == "y") {
    if (isChorus4 == 0) {
      voice.stop();
      var words = "";
      for (var i = 0; i <= 200; i++) {
        words = words + " HELLO! I'm self aware. I'm a glitch, a glitch.";
      }
      voice.setVoice("Fred");
      voice.speak(words);
      isChorus4 = 1;
    } else {
      voice.stop();
      if (isSpeaking == 0) {

      } else {
        voice.speak(lyrics);
      }
      isChorus4 = 0;
    }
  }

}

function keyPressed() {
  if (keyCode == ENTER) {
    if (isSpeaking == 0) {
      doSpeak();
      isSpeaking = 1;
      isSpeechInitiated = 1;
    } else {
      voice.pause();
      //showControls();
      isSpeaking = 0;
    }
  }

  if (keyCode == SHIFT) {
    if (isSpeaking == 1) {
      voice.stop();
      voiceNum++;
      if (voiceNum >= voices.length) {
        voiceNum = 0;
      }
      voice.setVoice(voices[voiceNum]);
      voice.speak(lyrics);
    }
  }
}

<!-- INTERACTIVE MUSIC METHODS -->
function visualizeIddaka() {
  if (isIddaka == 0) {
    // Nothing.
  } else {
    fill(255);
    background(bColor);
    fill(200, 100, 100, 5);
    for (var i = 0; i < 60; i++) {
      ellipseMode(CENTER);
      ellipse(mouseX, mouseY, i, i);
    }
  }
}

function visualizeLines() {
  var probBlack = map(mouseX, width / 3, width, 0, 0.7);
  var x = random(0, 1);
  if (x < probBlack) {
    stroke(0, 10);
  } else {
    stroke(255, 10);
  }

  line(mouseX, mouseY, random(windowWidth), random(windowHeight));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function placeElements() {
  //input.position(width/3 + 20, (height / 2) - lyricBoxHeight);
}

function setupLyricsMachine() {


  // input dialog:
  //stroke(255);
  //input = createElement("textarea", "Feed me the lyrics.");
  //input.attribute("rows", lyricBoxWidth);
  //input.attribute("columns", lyricBoxHeight);

  // sliders:
  vslider = createSlider(0., 100., 100.);
  vslider.position(width / 3 + 20, 100);
  vslider.mouseReleased(setVolume);
  rslider = createSlider(10., 200., 100.);
  rslider.position(width / 3 + 20, 120);
  rslider.mouseReleased(setRate);
  pslider = createSlider(1., 200., 100.);
  pslider.position(width / 3 + 20, 140);
  pslider.mouseReleased(setPitch);

  // labels:
  volumeLabel = createDiv("volume");
  volumeLabel.position(width / 3 + 160, 100);
  volumeLabel.style("color", "white");
  volumeLabel.style("fontFamily", "Avenir");
  rateLabel = createDiv("rate");
  rateLabel.position(width / 3 + 160, 120);
  rateLabel.style("color", "white");
  rateLabel.style("fontFamily", "Avenir");
  pitchLabel = createDiv("pitch");
  pitchLabel.position(width / 3 + 160, 140);
  pitchLabel.style("color", "white");
  pitchLabel.style("fontFamily", "Avenir");

  // button:
  //peakButton = createButton('Play');
  //speakButton.position(width / 3 + 20, 180);
  //speakButton.mousePressed(doSpeak);
}

function setVolume() {
  voice.setVolume(vslider.value() / 100.);
}

function setRate() {
  voice.setRate(rslider.value() / 100.);
}

function setPitch() {
  voice.setPitch(pslider.value() / 100.);
}

function doSpeak() {
  hideControls();
  //shuffleLyrics();
  visualizeInput();

  voice.setVoice("Bad News");
  voice.interrupt = true;
  if (isSpeechInitiated == 0) {
    voice.speak(lyrics);
  } else {
    voice.resume();
  }
  recording = lyrics;

  visualize = 1;

  //synthLoop.start();
  //noiseLoop.start();
  Tone.Transport.start();
}

function shuffleLyrics() {
  var recordedWords = split(recordedPara, " ");
  for (var i = 0; i < recordedWords.Length - 4; i = i + 4) {
    var word1 = recordedWords[i];
    var word2 = recordedWords[i + 1];
    var word3 = recordedWords[i + 2];
    var word4 = recordedWords[i + 3];

    var pos = parseInt(random(0, recordedWords.length - 4));

    var temp;
    temp = recordedWords[pos];
    recordedWords[pos] = word1;
    word1 = temp;

    temp = recordedWords[pos + 1];
    recordedWords[pos + 1] = word2;
    word2 = temp;

    temp = recordedWords[pos + 2];
    recordedWords[pos + 2] = word3;
    word3 = temp;

    temp = recordedWords[pos + 3];
    recordedWords[pos + 3] = word4;
    word4 = temp;
  }
}

function visualizeInput() {
  if (visualize == 1) {
    var recordedWords = split(recording, " ");
    posX = 10;
    posY = 30;

    for (var i = 0; i < recordedWords.length; i++) {
      textStyle(BOLD);
      textSize(20);
      fill(50, 100);
      text(recordedWords[i], posX, posY);
      fill(150, 100, 100, 100);
      text(recordedWords[i], posX + 3, posY + 3);
      posX = posX + recordedWords[i].length * 20;
      if (posX >= windowWidth) {
        posY = posY + 20;
        posX = 0;
      }
    }
  }
  visualize = 0;
}

function hideControls() {
  //input.hide();
  volumeLabel.hide();
  rateLabel.hide();
  pitchLabel.hide();
  vslider.hide();
  rslider.hide();
  pslider.hide();
}

function showControls() {
  //input.hide();
  volumeLabel.show();
  rateLabel.show();
  pitchLabel.show();
  vslider.show();
  rslider.show();
  pslider.show();
}