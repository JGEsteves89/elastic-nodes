const { particles, links } = initState();

document.addEventListener('DOMContentLoaded', function () {
	resetParameters();
	draw();
});

function draw() {
	const parameters = getParameters();
	const ctx = prepareCanvas();

	// Update section
	for (let i = 0; i < particles.length; i++) {
		particles[i].separate(i, particles, parameters);
	}
	for (const link of links) {
		link.update(parameters);
	}
	for (const particle of particles) {
		particle.update(parameters);
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
