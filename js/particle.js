const SIZE = 20;
class Particle {
	constructor(x, y) {
		this.p = new Vector(x, y);
		this.s = new Size(SIZE, SIZE);
		this.vel = new Vector(0, 0);
		this.for = new Vector(0, 0);
		this.debug = '';
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
		this.rLen = parameters.repelLength;
		this.stif = parameters.repelForce;
		for (let i = 0; i < others.length; i++) {
			if (i !== me) {
				const other = others[i];
				const dist = this.p.dist(other.p);
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
	}
}
