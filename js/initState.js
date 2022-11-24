function initState() {
	const nodes = 20;
	const randomLinks = 5;

	var particles = [];
	var links = [];

	for (let i = 0; i < nodes; i++) {
		const xxx = Math.ceil(Math.random() * 1000);
		const yyy = Math.ceil(Math.random() * 1000);
		particles.push(new Particle(xxx, yyy));
		if (i !== 0) {
			links.push(
				new Link(
					particles[particles.length - 2],
					particles[particles.length - 1]
				)
			);
		}
	}
	for (let i = 0; i < randomLinks; i++) {
		const iii = Math.floor(Math.random() * particles.length);
		const jjj = Math.floor(Math.random() * particles.length);
		if (iii !== jjj) {
			links.push(new Link(particles[iii], particles[jjj]));
		}
	}
	return { particles, links };
}
