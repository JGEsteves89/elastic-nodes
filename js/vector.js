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
	equal(other) {
		return this.x === other.x && this.y === other.y;
	}
}
