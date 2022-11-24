function initState() {
	// const nodes = 20;
	// const randomLinks = 5;

	function get(list, name) {
		return list.filter((i) => i.name === name)[0];
	}

	var particles = [
		new Particle(100, 100, 'Water', true),
		new Particle(500, 100, 'Crude oil', true),
		new Particle(1000, 100, 'Coal', true),
		new Particle(500, 800, 'Copper ore', true),
		new Particle(100, 800, 'Iron ore', true),
		new Particle(500, 500, 'Copper cable'),
		new Particle(500, 500, 'Copper plate'),
		new Particle(500, 500, 'Advanced circuit'),
		new Particle(500, 500, 'Plastic bar'),
		new Particle(500, 500, 'Petroleum gas'),
		new Particle(500, 500, 'Sulfuric acid'),
		new Particle(500, 500, 'Sulfur'),
		new Particle(500, 500, 'Speed module'),
		new Particle(500, 500, 'Rocket control unit'),
		new Particle(500, 500, 'Processing unit'),
		new Particle(500, 500, 'Electronic circuit'),
		new Particle(500, 500, 'Iron plate'),
	];
	var links = [
		new Link(
			get(particles, 'Rocket control unit'),
			get(particles, 'Processing unit')
		),
		new Link(
			get(particles, 'Rocket control unit'),
			get(particles, 'Speed module')
		),
		new Link(
			get(particles, 'Processing unit'),
			get(particles, 'Electronic circuit')
		),
		new Link(
			get(particles, 'Processing unit'),
			get(particles, 'Advanced circuit')
		),
		new Link(
			get(particles, 'Processing unit'),
			get(particles, 'Sulfuric acid')
		),
		new Link(
			get(particles, 'Electronic circuit'),
			get(particles, 'Iron plate')
		),
		new Link(
			get(particles, 'Electronic circuit'),
			get(particles, 'Copper cable')
		),
		new Link(get(particles, 'Iron plate'), get(particles, 'Iron ore')),
		new Link(get(particles, 'Copper cable'), get(particles, 'Copper plate')),
		new Link(get(particles, 'Copper plate'), get(particles, 'Copper ore')),
		new Link(get(particles, 'Advanced circuit'), get(particles, 'Plastic bar')),
		new Link(
			get(particles, 'Advanced circuit'),
			get(particles, 'Copper cable')
		),
		new Link(
			get(particles, 'Advanced circuit'),
			get(particles, 'Electronic circuit')
		),
		new Link(get(particles, 'Plastic bar'), get(particles, 'Coal')),
		new Link(get(particles, 'Plastic bar'), get(particles, 'Petroleum gas')),
		new Link(get(particles, 'Petroleum gas'), get(particles, 'Crude oil')),
		new Link(get(particles, 'Sulfuric acid'), get(particles, 'Iron plate')),
		new Link(get(particles, 'Sulfuric acid'), get(particles, 'Sulfur')),
		new Link(get(particles, 'Sulfuric acid'), get(particles, 'Water')),
		new Link(get(particles, 'Sulfur'), get(particles, 'Water')),
		new Link(get(particles, 'Sulfur'), get(particles, 'Petroleum gas')),
		new Link(
			get(particles, 'Speed module'),
			get(particles, 'Electronic circuit')
		),
		new Link(
			get(particles, 'Speed module'),
			get(particles, 'Advanced circuit')
		),
	];

	// for (let i = 0; i < nodes; i++) {
	// 	const xxx = Math.ceil(Math.random() * 1000);
	// 	const yyy = Math.ceil(Math.random() * 1000);
	// 	particles.push(new Particle(xxx, yyy));
	// 	if (i !== 0) {
	// 		links.push(
	// 			new Link(
	// 				particles[particles.length - 2],
	// 				particles[particles.length - 1]
	// 			)
	// 		);
	// 	}
	// }
	// for (let i = 0; i < randomLinks; i++) {
	// 	const iii = Math.floor(Math.random() * particles.length);
	// 	const jjj = Math.floor(Math.random() * particles.length);
	// 	if (iii !== jjj) {
	// 		links.push(new Link(particles[iii], particles[jjj]));
	// 	}
	// }
	return { particles, links };
}
