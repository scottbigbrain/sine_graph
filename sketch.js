let start_a = 0;
let a = start_a;
let t = 0;
let dots = [];

let circle_r = 200;

function setup() {
	// createCanvas(1260, 720);
	createCanvas(windowWidth, windowHeight);
	frameRate(30);

	speed = createSlider(0, 3, 1, 0.1);
	speed.position(width/10, 50);
	speed.style("width", width - width/5 + "px");

	reset = createButton("Reset");
	reset.position(width/2, height - 60);
	reset.size(90, 40);
	reset.style("border", "none");
	reset.style("font-size", "20px");
	reset.style("background-color", "#dcdcdc");
	reset.style("color", "#141414");
	reset.style("border-radius", "8px");
	reset.mousePressed(Reset);

	start = createSlider(0, 2*PI, 0, 0.005);
	start.position(width/2 + 140, height - 60);
	start.style("width", width/2 - 160 + "px");
}

function draw() {
	if (windowWidth != width || windowHeight != height) {
		resizeCanvas(windowWidth, windowHeight);
		makeSlides();
	}

	background(20);

	// draw & update dots
	if (frameCount % 3 == 0)
		dots.push(createVector(2*circle_r + 60, height/2 + circle_r*sin(-a)));
	for (let d of dots) {
		d.x += 2.75;
		noStroke();
		fill(108, 129, 209);
		circle(d.x, d.y, 8);
	}
	dots = dots.filter(notOverEdge);

	// draw circle
	strokeWeight(6);
	stroke(200);
	noFill();
	circle(circle_r+20, height/2, 2*circle_r);

	// draw connection line
	strokeWeight(4);
	stroke(200, 200, 220);
	line(circle_r+20 + circle_r*cos(a), height/2 + circle_r*sin(-a), 2*circle_r+60, height/2 + circle_r*sin(-a));

	// draw vertical line
	strokeWeight(3);
	stroke(200, 200, 220);
	line(2*circle_r+60, height/2 + circle_r+20, 2*circle_r+60, height/2 - circle_r-20);

	// draw point on circle
	strokeWeight(0.5);
	stroke(100);
	fill(87, 113, 207);
	circle(circle_r+20 + circle_r*cos(a), height/2 + circle_r*sin(-a), 18);

	// draw trace point
	strokeWeight(0.5);
	stroke(100);
	fill(87, 113, 207);
	circle(2*circle_r+60, height/2 + circle_r*sin(-a), 18);

	// draw speed
	strokeWeight(0.5);
	stroke(220);
	fill(200);
	textSize(24);
	text("Speed: "+speed.value(), 40, height-80);

	// draw time
	// strokeWeight(0.5);
	// stroke(220);
	// fill(200);
	// textSize(20);
	// text("Time: " + Math.round((t/1000)*10)/10, 40, height-120);

	// draw distance turned
	strokeWeight(0.5);
	stroke(220);
	fill(200);
	textSize(24);
	text("Distance Turned: " + Math.round(a*100)/100, 40, height-40);

	// update angle
	a += speed.value() / 30;

	// update time
	t += deltaTime;

	// update start pos
	start_a = start.value();
}

function notOverEdge(vec) {
	return vec.x < width+20;
}

function Reset() {
	dots = [];
	t = 0;
	a = start_a;
}

function makeSlides() {
	speed.position(width/10, 50);
	speed.style("width", width - width/5 + "px");

	reset.position(width/2, height - 60);
	reset.size(90, 40);
	reset.style("border", "none");
	reset.style("font-size", "20px");
	reset.style("background-color", "#dcdcdc");
	reset.style("color", "#141414");
	reset.style("border-radius", "8px");
	reset.mousePressed(Reset);

	start.position(width/2 + 140, height - 60);
	start.style("width", width/2 - 160 + "px");
}
