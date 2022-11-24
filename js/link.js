class Link {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	update(parameters) {
		this.l = parameters.linkLength;
		this.st = parameters.linkForce;
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
