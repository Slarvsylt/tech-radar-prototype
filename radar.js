let data;

function preload(){
  // Read the input from the file data.json
  data = loadJSON('data.json');
}



function setup() {
    createCanvas(800, 800);
  }
  
function draw() {
    const centerX = width / 2;
    const centerY = height / 2;
    const scalar = 400;
    const radiusInner = 1/3;
    const radiusMiddle = 2/3;
    const radiusOuter = 1;
    const dataPointRadius = 50;

    ellipseMode(CENTER);
    
    background(220);

    fill(255, 255, 255, 0); // White color with 0 alpha (completely transparent)
    // Draw outer radar background lines
    ellipse(centerX, centerY, scalar * radiusOuter, scalar * radiusOuter);
    // Draw middle radar background lines
    ellipse(centerX, centerY, scalar * radiusMiddle, scalar * radiusMiddle);
    // Draw inner radar background lines
    ellipse(centerX, centerY, scalar * radiusInner, scalar * radiusInner);
    // Draw radar horizontal line
    line(0, centerY, width, centerY);
    // Draw radar vertical line
    line(centerX, 0, centerX, height);

    // Draw the data points
    for (let i = 0; i < data.length; i++) {
      let x = centerX + cos(data[i].angle) * scalar * data[i].distance;
      let y = centerY + sin(data[i].angle) * scalar * data[i].distance;
      ellipse(x, y, dataPointRadius, dataPointRadius/2);
    }
}