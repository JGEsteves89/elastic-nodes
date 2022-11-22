const MASS = 10;
const LENG = 50;
const STIF = 1;
const SIZE = 20;
const DAMP = 0.9;

function drawTextDebug(ctx, str, pos) {
	var fontsize = 10;
	var fontface = 'verdana';
	var lineHeight = fontsize * 1.286;
	ctx.font = fontsize + 'px ' + fontface;
	var textWidth = ctx.measureText(str).width;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillStyle = 'lightgrey';
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.fillText(str, pos.x, pos.y);
	ctx.strokeRect(pos.x, pos.y, textWidth, lineHeight);
}

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	dist(other) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	len() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	dir(other) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		return new Vector(dx, dy);
	}
	add(d1, d2) {
		if (d1.hasOwnProperty('x') && d1.hasOwnProperty('y')) {
			return new Vector(this.x + d1.x, this.y + d1.y);
		}
		return new Vector(this.x + d1, this.y + d2);
	}
	mults(scaler) {
		return new Vector(this.x * scaler, this.y * scaler);
	}
	norm() {
		return new Vector(this.x / this.len(), this.y / this.len());
	}
}

class Size {
	constructor(w, h) {
		this.w = w;
		this.h = h;
	}
}
class Particle {
	constructor(x, y) {
		this.p = new Vector(x, y);
		this.m = MASS;
		this.d = DAMP;
		this.s = new Size(SIZE, SIZE);
		this.vel = new Vector(0, 0);
		this.for = new Vector(0, 0);
		this.debug = '';
	}
	update() {
		const ac = this.for.mults(1 / this.m);
		this.vel = this.vel.add(ac.mults(1 / 2));
		this.p = this.p.add(this.vel);
		this.vel = this.vel.mults(this.d);
		this.for = new Vector(0, 0);
		// prettier-ignore
		this.debug = `Vel {x: ${this.vel.x.toFixed(2)}, y:${this.vel.y.toFixed(2)}}`;
	}
	draw() {
		ctx.fillStyle = 'yellow';
		ctx.fillRect(this.p.x, this.p.y, this.s.w, this.s.h);
		//drawTextDebug(ctx, this.debug, this.p.add(-SIZE, -SIZE * 2));
	}
}
class Link {
	constructor(p1, p2, defaultLength = LENG, stiffness = STIF) {
		this.p1 = p1;
		this.p2 = p2;

		this.l = defaultLength;
		this.st = stiffness;
	}
	update() {
		//F = −kx
		const force = this.st * this.stretch();
		const df = this.dir().norm().mults(force);
		this.p1.for = this.p1.for.add(df);
		this.p2.for = this.p2.for.add(df.mults(-1));
	}
	stretch() {
		return (this.dist() - this.l) / this.l;
	}
	dist() {
		return this.p1.p.dist(this.p2.p);
	}
	dir() {
		return this.p1.p.dir(this.p2.p);
	}
	draw(ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		const stretch = this.stretch();
		if (stretch > 0.2) {
			ctx.strokeStyle = 'red';
		} else if (stretch < -0.2) {
			ctx.strokeStyle = 'blue';
		}

		ctx.beginPath();
		ctx.moveTo(this.p1.p.x + this.p1.s.w / 2, this.p1.p.y + this.p1.s.h / 2);
		ctx.lineTo(this.p2.p.x + this.p2.s.w / 2, this.p2.p.y + this.p2.s.h / 2);
		ctx.stroke();
	}
}
document.addEventListener('DOMContentLoaded', function () {
	draw();
});
var particles = [
	new Particle(100, 100),
	new Particle(500, 500),
	new Particle(0, 500),
	new Particle(500, 0),
	new Particle(0, 10),
	new Particle(700, 2),
];
var links = [
	new Link(particles[0], particles[1]),
	new Link(particles[1], particles[2]),
	new Link(particles[1], particles[3]),
	new Link(particles[0], particles[3]),
	new Link(particles[4], particles[5]),
	new Link(particles[2], particles[5]),
];

for (let i = 0; i < 20; i++) {
	const xxx = Math.ceil(Math.random() * 1000);
	const yyy = Math.ceil(Math.random() * 1000);
	console.log(xxx, yyy);
	particles.push(new Particle(xxx, yyy));
	links.push(
		new Link(particles[particles.length - 2], particles[particles.length - 1])
	);
}
for (let i = 0; i < 20; i++) {
	const iii = Math.floor(Math.random() * particles.length);
	const jjj = Math.floor(Math.random() * particles.length);
	if (iii !== jjj) {
		console.log(iii, jjj);
		links.push(new Link(particles[iii], particles[jjj]));
	}
}
console.log(particles);
function draw() {
	// Get canvas and context element
	htmlCanvas = document.getElementById('c1');
	ctx = htmlCanvas.getContext('2d');

	// Resize to the size of the canvas
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	// Clear the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Update section
	for (const link of links) {
		link.update();
	}
	for (const particle of particles) {
		particle.update();
	}

	// Draw section
	for (const link of links) {
		link.draw(ctx);
	}
	for (const particle of particles) {
		particle.draw(ctx);
	}
	// Request redraw after this has finish
	requestAnimationFrame(draw);
}
