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
class Link {
	constructor(
		p1x,
		p1y,
		p2x,
		p2y,
		defaultLength = 50,
		stiffness = 1,
		defaultSize = 20
	) {
		this.p1 = new Vector(p1x, p1y);
		this.p2 = new Vector(p2x, p2y);
		this.s = new Size(defaultSize, defaultSize);
		this.l = defaultLength;
		this.st = stiffness;
		this.debug = '';
		this.m = 10;
		this.d = 0.9;
		this.vel = new Vector(0, 0);
	}
	update() {
		//F = −kx
		const force = this.st * this.stretch();
		const df = this.dir().norm().mults(force);
		const ac = df.mults(1 / this.m);
		this.vel = this.vel.add(ac.mults(1 / 2));
		this.p1 = this.p1.add(this.vel);
		this.p2 = this.p2.add(this.vel.mults(-1));
		this.vel = this.vel.mults(this.d);
		this.debug = `Vel {x: ${this.vel.x.toFixed(2)}, y:${this.vel.y.toFixed(
			2
		)}}`;
	}
	stretch() {
		return (this.dist() - this.l) / this.l;
	}
	dist() {
		return this.p1.dist(this.p2);
	}
	dir() {
		return this.p1.dir(this.p2);
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
		ctx.moveTo(this.p1.x + this.s.w / 2, this.p1.y + this.s.h / 2);
		ctx.lineTo(this.p2.x + this.s.w / 2, this.p2.y + this.s.h / 2);
		ctx.stroke();

		ctx.fillStyle = 'yellow';
		ctx.fillRect(this.p1.x, this.p1.y, this.s.w, this.s.h);
		ctx.fillRect(this.p2.x, this.p2.y, this.s.w, this.s.h);

		drawTextDebug(ctx, this.debug, this.p1.add(0, -50));
	}
}
document.addEventListener('DOMContentLoaded', function () {
	draw();
});
var link = new Link(100, 100, 500, 500);
function draw() {
	// Request redraw after this has finish
	requestAnimationFrame(draw);

	// Get canvas and context element
	htmlCanvas = document.getElementById('c1');
	ctx = htmlCanvas.getContext('2d');

	// Resize to the size of the canvas
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	// Clear the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Update section
	link.update();

	// Draw section
	link.draw(ctx);
}
