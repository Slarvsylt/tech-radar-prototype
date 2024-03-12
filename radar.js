let data;
let dataPoints = [];
const sizeX = 800;
const sizeY = 800;

let startAngle =    0;     // angle where text should start
let distanceAngle = 90;   // how far (in degrees) text will go
let radius;                // set dynamically in setup()

function preload(){
  // Read the input from the file data.json
  data = loadJSON('data.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    radius = min(width,height) / 3;
    //createCanvas(sizeX, sizeY);
    
    smooth();
    
    // Make an array of all the data points contained in the global variable data
    for (var member in data) {
        dataPoints.push(new DataPoint(data[member].angle, data[member].distance, data[member].name, data[member].url, width / 2, height / 2, 300, data[member].description));
    }
  }
  
function draw() {
    // Constant values
    const centerX = width / 2;
    const centerY = height / 2;
    const scalar = 300;
    // Radar background lines circles
    const radiusInner = 1/3;
    const radiusMiddle = 2/3;
    const radiusOuter = 1;
    const radiusFarOuter = 4/3;
    // Radius of the data points dots that represent the specific tech in the radar
    const dataPointRadius = 12;

    let green = color(85, 212, 64); // Green
    let white = color(254, 251, 230); // Knowit White
    let pink = color(255, 214, 184);// Pink
    let lightPink = color(255, 235, 221);// Light pink
    let purple = color(207, 206, 255); //Purple
    let lightPurple = color(247, 246, 255); //Light Purple
    let blue = color(55, 43, 197);// Blue
    let black = color(11, 11, 38);// Knowit Black
    ellipseMode(CENTER);
    fill(255, 255, 255, 100); // White color with 0 alpha (completely transparent)
    background(purple);

    radialGradient(
        width/2, height/2, 0,//Start pX, pY, start circle radius
        width/2, height/2, 500,//End pX, pY, End circle radius
        // width/2-40, height/2-120, 0,//Start pX, pY, start circle radius
        // width/2-40, height/2-120, 380,//End pX, pY, End circle radius
        // #DBEEDE
        color(lightPurple, 100),
        color(purple, 100), 
        
    );
    stroke(purple);
    strokeWeight(1);
    ellipse(centerX, centerY, scalar * radiusFarOuter * 2, scalar * radiusFarOuter * 2);
    
    // Draw outer radar background lines
    ellipse(centerX, centerY, scalar * radiusOuter * 2, scalar * radiusOuter * 2);
    // Draw middle radar background lines
    ellipse(centerX, centerY, scalar * radiusMiddle * 2, scalar * radiusMiddle * 2);
    // Draw inner radar background lines
    ellipse(centerX, centerY, scalar * radiusInner * 2, scalar * radiusInner * 2);
    // Draw radar horizontal line
    line(0, centerY, width, centerY);
    // Draw radar vertical line
    line(centerX, 0, centerX, height);

    stroke(0,150,255);

    /////////////////////////////
    ////DRAW TEXT IN A CIRCLE////
    ///////////////////////////// 
    // 'ytivitcennoC', 'ecneirepxE'
    let areas = ['ytivitcennoC', 'ecneirepxE', 'Solutions', 'Insight'];
    let currentStartAngle = startAngle;
    push();
    translate(width/2, height/2);  
    for(let s=0; s<areas.length; s++){
    //for(var str in areas){
      let str = areas[s];
      let angleBetweenLetters = radians(distanceAngle-50) / str.length;
      rotate(radians(distanceAngle));
      push();
      rotate(radians((distanceAngle*0.5) - (distanceAngle/(str.length/2))));
      for (let j=0; j<str.length; j++){
        push();
        rotate(j * angleBetweenLetters);   // rotate to angle
        translate(0,-scalar * radiusOuter - 30);              // and translate to edge of circle
        if(s < 2){
          translate(0,-20);   
          rotate(radians(180));  
        }
        fill(black);
        noStroke();
        textSize(radius/8);
        text(str[j], 0,0);                 // draw character at location
        pop();
      }
      pop();
      currentStartAngle += distanceAngle;
    }
    pop();
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    textSize(15);
    noStroke();
    textAlign(CENTER);
    textStyle(NORMAL);
    

    // Run through the data points
    for (let i = 0; i < dataPoints.length; i++) {
        // Draw the data points

        // Check if mouse is over the data point,
        // if true, display the data point info
        // if mouse is clicked, open the url of the data point
        if(dataPoints[i].isMouseOver()){
          push();
            fill(blue, 100);
            //stroke(0, 0, 0, 100);
            strokeWeight(4);
            
            textAlign(LEFT, TOP);
            textSize(15);
            textStyle(NORMAL);
            rect(mouseX + 15, mouseY + 15, textWidth(dataPoints[i].description) + 20, 24, 4);
            fill(white, 100);
            text(dataPoints[i].description, mouseX+20, mouseY+20);
            //stroke(255);
            //strokeWeight(2);
          pop();

            if(mouseIsPressed){
                window.open(dataPoints[i].url, '_blank');
            }
        }
        dataPoints[i].drawDataPoint();
    }

}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE){
    let gradient = drawingContext.createRadialGradient(
      sX, sY, sR, eX, eY, eR
    );
    gradient.addColorStop(0, colorS);
    gradient.addColorStop(1, colorE);
  
    drawingContext.fillStyle = gradient;
  }
  
  function shadow(){
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 1;
    drawingContext.shadowColor = black;
    // drawingContext.shadowColor = color(0,0,0, 100);
  }

class DataPoint {
    constructor(angle, distance, name, url, centerX, centerY, scalar, description) {
        this.angle = angle;
        this.distance = distance;
        this.name = name;
        this.url = url;
        this.dataPointRadius = 12;
        this.centerX = centerX;
        this.centerY = centerY;
        this.textXOffset = 30;
        this.textYOffset = -10;
        this.scalar = scalar;
        this.description = description;
    };
    // Draw the data point
    drawDataPoint(){
        var x = this.centerX + cos(radians(this.angle)) * this.scalar * this.distance;
        var y = this.centerY + sin(radians(this.angle)) * this.scalar * this.distance;
        fill(55, 43, 197);
        //fill(11, 11, 38); // White color with 0 alpha (completely transparent)
        ellipse(x, y, this.dataPointRadius, this.dataPointRadius);
        textStyle(BOLD);
        text(this.name, x + this.textXOffset, y + this.textYOffset);
    }
    // Check if mouse is over the data point
    isMouseOver(){
        let x = this.centerX + cos(radians(this.angle)) * this.scalar * this.distance;
        let y = this.centerY + sin(radians(this.angle)) * this.scalar * this.distance;
        let d = dist(mouseX, mouseY, x, y);
        return d < this.dataPointRadius ? true : false;
    } 
}

function windowResized() {
  setup();
}
