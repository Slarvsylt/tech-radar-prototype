let data;
let dataPoints = [];

let startAngle =    0;       // angle where text should start
let distanceAngle = 90;     // how far (in degrees) text will go
let radius;                // set dynamically in setup()
const scalar = 390;

let bg;   //Background image
let cimg; //Circle Image!

function preload(){
  // Read the input from the file data.json
  data = loadJSON('data.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    radius = min(width,height) / 3;
    //createCanvas(sizeX, sizeY);
    //bg = loadImage('Evening-Sky.jpg');          //Background image stuff. Big hit to performance
    //cimg = loadImage('Twilight-Sky.jpg');     
    smooth();
    c1 = color(24,87,182);
    c2 = color(255, 214, 184);
    
    /////Background Gradient!////
/*  inputName = createInput();
    inputName.position(250, height / 2 + height / 3);
    inputDesc = createInput();
    inputDesc.position(250, height / 2 + height / 2.7);
    let button = createButton('Add Data');
    button.position(90, height / 2 + height / 3);
    button.mousePressed(() => {
    }); */

    let r = ((height / 2) + height/4) - (height / 3);
    // Make an array of all the data points contained in the global variable data
    for (var member in data) {
        dataPoints.push(new DataPoint(data[member].angle, data[member].distance, data[member].name, data[member].url, width / 2, height / 2 + height / 4, scalar, data[member].description, r));
    }
  }
  
function draw() {
    // Constant values
    const centerX = width / 2;
    const centerY = height / 2; 
    
    // Radar background lines circles
    const radiusInner = 1/3;
    const radiusMiddle = 2/3;
    const radiusOuter = 1;
    const radiusFarOuter = 4/3;
    // Radius of the data points dots that represent the specific tech in the radar
    const dataPointRadius = 12;

    //////Knowit Colors////////
    let green = color(85, 212, 64); // Green
    let white = color(254, 251, 230); // Knowit White
    let pink = color(255, 214, 184);// Pink
    let lightPink = color(255, 235, 221);// Light pink
    let purple = color(207, 206, 255); //Purple
    let lightPurple = color(247, 246, 255); //Light Purple
    let blue = color(55, 43, 197);// Blue
    let black = color(11, 11, 38);// Knowit Black
    ///////////////////////////

    ellipseMode(CENTER);
    fill(255, 255, 255, 0); // White color with 0 alpha (completely transparent)
    drawBackground();
    ////////////////////

   /* radialGradient(
        width/2, height/2, 0,//Start pX, pY, start circle radius
        width/2, height/2, 500,//End pX, pY, End circle radius
        // width/2-40, height/2-120, 0,//Start pX, pY, start circle radius
        // width/2-40, height/2-120, 380,//End pX, pY, End circle radius
        // #DBEEDE
        color(black, 100),
        color(blue, 100), 
        
    );*/

    stroke(white);
    strokeWeight(3);
    
    //arc(centerX, centerY + centerY/2, scalar * radiusFarOuter * 2, scalar * radiusFarOuter * 2, radians(180), 2*PI, PIE);
    arc(centerX, centerY + centerY/2, scalar * radiusOuter * 2, scalar * radiusOuter * 2, radians(180), 2*PI, PIE);
    arc(centerX, centerY + centerY/2, scalar * radiusMiddle * 2, scalar * radiusMiddle * 2, radians(180), 2*PI, PIE);
    arc(centerX, centerY + centerY/2, scalar * radiusInner * 2, scalar * radiusInner * 2, radians(180), 2*PI, PIE);
    //line(width/2 - scalar * radiusFarOuter, centerY + centerY/2, width/2+scalar * radiusFarOuter, centerY + centerY/2);
    line(width/2 - scalar * radiusOuter, centerY + centerY/2, width/2+scalar * radiusOuter, centerY + centerY/2);
    // Draw radar vertical line
    //line(centerX, centerY + centerY/2 - scalar * radiusFarOuter, centerX, centerY + centerY/2);
    line(centerX, centerY + centerY/2 - scalar * radiusOuter, centerX, centerY + centerY/2);

    //stroke(0,150,255);

    /////////////////////////////////////////////
    ////DRAW TEXT IN A CIRCLE, ugly as fuck/////
    ///////////////////////////////////////////
    // 'ytivitcennoC', 'ecneirepxE'
    //let areas = ['ytivitcennoC', 'ecneirepxE', 'Solutions', 'Insight'];
    let areas = ['', '', 'Social & Business', 'Technologies'];
    push();
    translate(width/2, centerY + centerY/2);  

    let str = areas[2];
    let angleBetweenLetters = radians(distanceAngle) / (str.length*1.5);
    rotate(radians(0));
    
    rotate(radians((distanceAngle*0.5) - (distanceAngle/(str.length/5))));
    for (let j=0; j<str.length; j++){
      push();
      rotate(j * angleBetweenLetters);                      // rotate to angle
      translate(0,-scalar * radiusOuter - 30);              // and translate to edge of circle
      fill(white);
      noStroke();
      textSize(radius/8);
      text(str[j], 0,0);                                    // draw character at location
      pop();
    }
    pop();
    push();
    translate(width/2, centerY + centerY/2);  

    str = areas[3];
    angleBetweenLetters = radians(distanceAngle) / (str.length*1.5);
    rotate(radians(280));
    
    rotate(radians((distanceAngle*0.5) - (distanceAngle/(str.length/5))));
    for (let j=0; j<str.length; j++){
      push();
      rotate(j * angleBetweenLetters);   // rotate to angle
      translate(0,-scalar * radiusOuter - 30);              // and translate to edge of circle
      fill(white);
      noStroke();
      textSize(radius/8);
      text(str[j], 0,0);                 // draw character at location
      pop();
    }
    pop();
   /* for(let s=0; s<areas.length; s++){
    //for(var str in areas){
      let str = areas[s];
      let angleBetweenLetters = radians(distanceAngle) / (str.length*1.5);
      rotate(radians(distanceAngle));
      
      rotate(radians((distanceAngle*0.5) - (distanceAngle/(str.length/5))));
      for (let j=0; j<str.length; j++){
        if(s < 2)continue;
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
      
      currentStartAngle += distanceAngle;
    }*/
    ////////////////////////////////
    ///////////////////////////////
    //////////////////////////////
    textSize(15);
    noStroke();
    textAlign(CENTER);
    textStyle(NORMAL);
    

    // Run through the data points
    for (let i = 0; i < dataPoints.length; i++) {
        // Draw the data points
        dataPoints[i].drawDataPoint();
    }
    for (let i = 0; i < dataPoints.length; i++){
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
        pop();

          if(mouseIsPressed){
              window.open(dataPoints[i].url, '_blank');
          }
      }
    }
    //////FPS///////
    push();
    let fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 100, 100);
    pop();
    ////////////////
    waveText(centerY/2 - scalar * radiusOuter - 60);
}

function waveText(radius){
  str = '★ ☆ Knowit Tech Radar ☆ ★';
  fontSize = 55;            //30-90
  tracking = 20;            //30-120
  yWaveSize = 10;           //30-180
  yWaveLength = 170;        //30-210
  yWaveSpeed = 0.05;        //30-240
  push();
  textSize(fontSize);
  textAlign(CENTER);
  // Center matrix
  translate(width/2, height/2 - radius);
  let angleBetweenLetters = 3;
  rotate(radians(-str.length * angleBetweenLetters / 2.06))
  //rotate(radians((distanceAngle*0.5) - (distanceAngle/(str.length/5))));
  //Reposition  matrix depending on width & height of the grid
  //translate(-(str.length-1)*tracking/2,0);
  for(var i = 0; i < str.length; i++){

    yWave = sin(frameCount*yWaveSpeed + i*yWaveLength) * yWaveSize;
    fill(254, 251, 230);
    //translate(i*tracking,0);
    fill(55, 43, 197);
    text(str.charAt(i),5,yWave+radius*2.2+5);
    fill(0,0,0);
    text(str.charAt(i),3,yWave+radius*2.2+3);
    fill(254, 251, 230);
    text(str.charAt(i),0,yWave+radius*2.2);
    rotate(radians(angleBetweenLetters));
  }
  pop();
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
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 3;
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

function drawBackground(){
  c1 = color(24,87,182);
  c2 = color(255, 214, 184);
  
  /////Background Gradient!////
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

class DataPoint {
    constructor(angle, distance, name, url, centerX, centerY, scalar, description, radius) {
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
        this.radius = radius;
    };
    // Draw the data point
    drawDataPoint(){
      push();
        shadow();
        
        //var x = this.centerX + cos(radians(this.angle)) * this.scalar * this.distance;
        //var y = this.centerY + sin(radians(this.angle)) * this.scalar * this.distance;
        //var c = Math.sqrt(Math.pow(x-this.centerX,2) + Math.pow(y - this.centerY,2));
        translate(this.centerX,this.centerY);
        rotate(radians(this.angle));
        translate(0,this.radius*this.distance);

        fill(254, 251, 230)
        //ellipse(x, y, this.dataPointRadius, this.dataPointRadius);
        ellipse(0, 0, this.dataPointRadius, this.dataPointRadius);
        textStyle(BOLD);
        //text(this.name, x + this.textXOffset, y + this.textYOffset);
        rotate(radians(-this.angle));
        text(this.name, this.textXOffset, this.textYOffset);
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
  console.log("Resize!");
  clear();
  drawBackground();
  setup();
}
