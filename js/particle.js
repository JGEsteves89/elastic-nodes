const SIZE = 20;

function drawText(ctx, str, pos) {
	var fontsize = 10;
	var fontface = 'verdana';
	ctx.font = fontsize + 'px ' + fontface;
	var textWidth = ctx.measureText(str).width;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.strokeText(str, pos.x - textWidth / 3, pos.y);
}
class Particle {
	constructor(x, y, name = '', fixed = false) {
		this.p = new Vector(x, y);
		this.s = new Size(SIZE, SIZE);
		this.vel = new Vector(0, 0);
		this.for = new Vector(0, 0);
		this.debug = '';
		this.name = name;
		this.fixed = fixed;
	}
	right() {
		return this.p.x + this.s.w;
	}
	left() {
		return this.p.x;
	}
	bottom() {
		return this.p.y + this.s.h;
	}
	top() {
		return this.p.y;
	}
	update(parameters) {
		if (this.fixed) return;
		this.d = parameters.movementDrag;
		this.m = parameters.nodeMass;
		const ac = this.for.mults(1 / this.m);
		this.vel = this.vel.add(ac.mults(1 / 2));
		this.p = this.p.add(this.vel);
		this.vel = this.vel.mults(this.d);
		this.for = new Vector(0, 0);
		// prettier-ignore
		this.debug = `Vel {x: ${this.vel.x.toFixed(2)}, y:${this.vel.y.toFixed(2)}}`;
	}

	separate(me, others, parameters) {
		if (this.fixed) return;
		this.rLen = parameters.repelLength;
		this.stif = parameters.repelForce;
		for (let i = 0; i < others.length; i++) {
			if (i !== me) {
				const other = others[i];
				if (this.p.equal(other.p)) {
					this.p.x += Math.random();
					this.p.y += Math.random();
				}
				let dist = this.p.dist(other.p);
				if (this.p.equal(other.p)) {
					this.p.x += Math.random();
					this.p.y += Math.random();
				}
				if (dist < this.rLen) {
					const force = this.stif * ((this.rLen - dist) / this.rLen);
					const df = this.p.dir(other.p).norm().mults(force);
					this.for = this.for.add(df.mults(-1));
					other.for = other.for.add(df);
				}
			}
		}
	}

	draw() {
		ctx.fillStyle = 'yellow';
		ctx.fillRect(this.p.x, this.p.y, this.s.w, this.s.h);
		ctx.strokeRect(this.p.x, this.p.y, this.s.w, this.s.h);
		drawText(ctx, this.name, this.p);
	}
}
