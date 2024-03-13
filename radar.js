let data;
let dataPoints = [];
const sizeX = 800;
const sizeY = 800;

let startAngle =    0;     // angle where text should start
let distanceAngle = 90;   // how far (in degrees) text will go
let radius;                // set dynamically in setup()

let bg; //Background image
let cimg; //Circle Image!

function preload(){
  // Read the input from the file data.json
  data = loadJSON('data.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    radius = min(width,height) / 3;
    //createCanvas(sizeX, sizeY);
    //bg = loadImage('Evening-Sky.jpg');
    //cimg = loadImage('Twilight-Sky.jpg');
    
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
    fill(255, 255, 255, 0); // White color with 0 alpha (completely transparent)
    c1 = color(24,87,182);
    c2 = color(pink);
    
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
    //background(bg);
    tint(255,255);
    //let shape = createGraphics(width, height);
    //shape.circle(width/2, height/2, 800);
    //cimg.mask(shape);
    //image(cimg,0,0,width,height);
   /* radialGradient(
        width/2, height/2, 0,//Start pX, pY, start circle radius
        width/2, height/2, 500,//End pX, pY, End circle radius
        // width/2-40, height/2-120, 0,//Start pX, pY, start circle radius
        // width/2-40, height/2-120, 380,//End pX, pY, End circle radius
        // #DBEEDE
        color(lightPurple, 100),
        color(purple, 100), 
        
    );*/
    stroke(white);
    strokeWeight(3);
    ellipse(centerX, centerY, scalar * radiusFarOuter * 2, scalar * radiusFarOuter * 2);
    
    // Draw outer radar background lines
    ellipse(centerX, centerY, scalar * radiusOuter * 2, scalar * radiusOuter * 2);
    // Draw middle radar background lines
    ellipse(centerX, centerY, scalar * radiusMiddle * 2, scalar * radiusMiddle * 2);
    // Draw inner radar background lines
    ellipse(centerX, centerY, scalar * radiusInner * 2, scalar * radiusInner * 2);
    // Draw radar horizontal line
    line(width/2 - scalar * radiusFarOuter, centerY, width/2+scalar * radiusFarOuter, centerY);
    // Draw radar vertical line
    line(centerX, height/2 - scalar * radiusFarOuter, centerX, height/2 + scalar * radiusFarOuter);

    //stroke(0,150,255);

    /////////////////////////////
    ////DRAW TEXT IN A CIRCLE, ugly as fuck////
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
        fill(white);
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
            shadow();
            textAlign(LEFT, TOP);
            textSize(15);
            textStyle(NORMAL);
            textWrap(WORD);
            //rect(mouseX + 15, mouseY + 15, textWidth(dataPoints[i].description) + 20, 24, 4);
            let maxHeight = textHeight(dataPoints[i].description,200);
            rect(mouseX + 15, mouseY + 13, 200 + 20, maxHeight+10, 4);
            fill(white, 100);
            text(dataPoints[i].description, mouseX+20, mouseY+20, 200);
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
    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = 1;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = 'black';
}

function textHeight(text, maxWidth) {
  var words = text.split(' ');
  var line = '';
  var h = textLeading();

  for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + ' ';
      var testWidth = drawingContext.measureText(testLine).width;

      if (testWidth > maxWidth && i > 0) {
          line = words[i] + ' ';
          h += textLeading();
      } else {
          line = testLine;
      }
  }

  return h;
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
      push();
        shadow();
        var x = this.centerX + cos(radians(this.angle)) * this.scalar * this.distance;
        var y = this.centerY + sin(radians(this.angle)) * this.scalar * this.distance;
        fill(254, 251, 230)
        //fill(55, 43, 197);
        ellipse(x, y, this.dataPointRadius, this.dataPointRadius);
        textStyle(BOLD);
        text(this.name, x + this.textXOffset, y + this.textYOffset);
      pop();
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
