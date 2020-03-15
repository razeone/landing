let theta;
let yoff = 0.0; // 2nd dimension of perlin noise
let x_axis = 1;


function setup() {
  canvas = createCanvas(windowWidth/3, windowHeight/3);
  //canvas.position(windowWidth/2, windowHeight-windowHeight/3);
  canvas.parent('razeContainer');
  canvas.style('z-index', '-1');
}

function draw() {
  //background(255, 255, 255, 55);
  if(x_axis % 3){
    background(Math.random(255) * 1000, Math.random(255) * 1000, Math.random(255) * 1000, 5);
  }
  frameRate(240);
  stroke(150);
  // Let's pick an angle 0 to 90 degrees based on the mouse position
  let a = (x_axis / width) * 90;
  // Convert it to radians
  theta = radians(a);
  // Start the tree from the bottom of the screen
  translate(width/2,height);
  // Draw a line 120 pixels
  line(0,0,0,-120);
  // Move to the end of that line
  translate(0,-120);
  // Start the recursive branching!
  branch(windowHeight/15);
  textSize(32);
  fill(0, 102, 153, 51);
  text('raZe', 10, 90);
  x_axis++;
}

function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(theta);   // Rotate by theta
    line(0, 0, 0, -h);  // Draw the branch
    translate(0, -h); // Move to the end of the branch
    branch(h);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth/3, windowHeight/3);
  canvas.parent('razeContainer');
}