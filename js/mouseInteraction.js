var selParticle = null;
function setMouseInteraction(canvas) {
	canvas.onmousedown = function (e) {
		const x = e.x - canvas.offsetLeft;
		for (const part of particles) {
			if (
				x > part.left() &&
				x < part.right() &&
				e.y > part.top() &&
				e.y < part.bottom()
			) {
				selParticle = part;
				return;
			}
		}
		selParticle = null;
	};
	canvas.onmouseup = function (e) {
		selParticle = null;
	};

	canvas.onmousemove = function (e) {
		if (!selParticle) return;
		const x = e.x - canvas.offsetLeft;
		selParticle.p.x = x;
		selParticle.p.y = e.y;
	};
}
