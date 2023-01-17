let lineY = 0;
let lineHeight = 30;
let lineSpeed = 5;
let level = 1;
let bottomRectangleHeight = 0;

let bgColor;
let fgColor;
let mousepress = false;
let cnv;

//center the canvase
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  //create the canvas by providing width and height
  document.getElementById(level).classList.add("active");
  cnv = createCanvas(300, 300);
  centerCanvas();
  bgColor = randomColor();
  fgColor = randomColor();
  background(bgColor);
}

function draw() {
  //if mouse is clicked
  if (mousepress) {
    background(bgColor);
    stroke(fgColor);
    fill(fgColor);

    // draw the falling line
    rect(0, lineY, width, lineHeight);

    // draw the bottom rectangle
    if (bottomRectangleHeight > 0) {
      rect(0, height - bottomRectangleHeight, width, bottomRectangleHeight);
    }

    lineY += lineSpeed;

    // if the line reaches the bottom rectangle,
    // make the bottom rectangle bigger
    if (lineY >= height - bottomRectangleHeight - lineHeight) {

      bottomRectangleHeight += lineHeight;
      lineY = 0;

      // if the bottom rectangle fills the screen, start over
      if (bottomRectangleHeight >= height) {
        bottomRectangleHeight = 0;
        bgColor = fgColor;
        fgColor = randomColor();
        // if last level reached then reset the level and line height
        if (level == 5) {
          document.getElementById(level).classList.add("active");
          document.getElementById(level).classList.add("completed");
          document.getElementById(level-1).classList.remove("active");
          document.getElementById(level-1).classList.add("completed");
          level = 1;
          lineHeight = 30;
          alert("Congratulations, you have successfully completed all the level. Click Ok to play the game again");
          document.getElementById(5).classList.remove("active");
          for(let i=1;i<=5;i++){
            document.getElementById(i).classList.remove("completed");
          }
          document.getElementById(level).classList.add("active");
        }
        //otherwise, increase the level and line height
        else {
          alert('Congratulations, you have passed level ' + level);
          level += 1;
          lineHeight += 20;
          document.getElementById(level).classList.add("active");
          document.getElementById(level-1).classList.remove("active");
          document.getElementById(level-1).classList.add("completed");
        }
        
      }
      mousepress = false;
    }

  }
}

//when mouse clicked this will autmomatically runs
function mousePressed() {
  mousepress = true;
}

//return the random color
function randomColor() {
  return color(random(255), random(255), random(255));
}