let a = 0;
let t = 0;
let dots = [];

let circleR = 200;

function setup() {
	// createCanvas(1260, 720);
	createCanvas(windowWidth, windowHeight);
	frameRate(30);

	speed = createSlider(0, 3, 1, 0.1);
	speed.position(width/10, 50);
	speed.style("width", width - width/5 + "px");
}

function draw() {
	background(20);

	// draw & update dots
	if (frameCount % 3 == 0)
		dots.push(createVector(2*circleR + 60, height/2 + circleR*sin(-a)));
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
	circle(circleR+20, height/2, 2*circleR);

	// draw connection line
	strokeWeight(4);
	stroke(200, 200, 220);
	line(circleR+20 + circleR*cos(a), height/2 + circleR*sin(-a), 2*circleR+60, height/2 + circleR*sin(-a));

	// draw vertical line
	strokeWeight(3);
	stroke(200, 200, 220);
	line(2*circleR+60, height/2 + circleR+20, 2*circleR+60, height/2 - circleR-20);

	// draw point on circle
	strokeWeight(0.5);
	stroke(100);
	fill(87, 113, 207);
	circle(circleR+20 + circleR*cos(a), height/2 + circleR*sin(-a), 18);

	// draw trace point
	strokeWeight(0.5);
	stroke(100);
	fill(87, 113, 207);
	circle(2*circleR+60, height/2 + circleR*sin(-a), 18);

	// draw speed
	strokeWeight(0.5);
	stroke(220);
	fill(200);
	textSize(20);
	text("Speed: "+speed.value(), 40, height-80);

	// draw time
	strokeWeight(0.5);
	stroke(220);
	fill(200);
	textSize(20);
	text("Time: " + Math.round((t/1000)*10)/10, 40, height-120);

	// draw distance turned
	strokeWeight(0.5);
	stroke(220);
	fill(200);
	textSize(20);
	text("Distance Turned: " + Math.round(a*100)/100, 40, height-40);

	// update angle
	a += speed.value() / 30;

	// update time
	t += deltaTime;
}

function notOverEdge(vec) {
	return vec.x < width+20;
}