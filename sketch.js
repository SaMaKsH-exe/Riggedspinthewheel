let options = ["Sam", "Riya"];
let weights = [0.75, 0.25];
let angle = 0;
let spinning = false;
let result;
let diameter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  diameter = min(width, height) * 0.8;
  textAlign(CENTER, CENTER);
  textSize(diameter / 20);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  // draw the wheel
  for (let i = 1; i <= options.length; i++) {
    let j = i - 1;
    let arcStart = j * 360 / options.length;
    let arcEnd = i * 360 / options.length;
    fill(255 / options.length * i, 100, 100);
    arc(0, 0, diameter, diameter, arcStart + angle, arcEnd + angle, PIE);
  }

  // draw the text on the wheel
  for (let i = 1; i <= options.length; i++) {
    let j = i - 1;
    let arcStart = j * 360 / options.length;
    let arcEnd = i * 360 / options.length;
    fill(255);
    rotate(arcStart + angle + (arcEnd - arcStart) / 2);
    text(options[j], 0, -diameter / 2 * 0.8);
    rotate(-(arcStart + angle + (arcEnd - arcStart) / 2));
  }

  // spin the wheel if it's spinning
  if (spinning) {
    angle += random(20, 30);
  }

  // display the result if it's ready
  if (result !== undefined) {
    alert("The wheel landed on: " + result);
    result = undefined;
  }
}

function mouseClicked() {
  // start spinning the wheel on click
  if (!spinning) {
    spinning = true;
    result = undefined;
    setTimeout(stopSpinning, 3000);
  }
}

function stopSpinning() {
  // stop spinning the wheel and select the result
  spinning = false;
  let randomNumber = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < options.length; i++) {
    cumulativeProbability += weights[i];
    if (randomNumber < cumulativeProbability) {
      result = options[i];
      break;
    }
  }
}
