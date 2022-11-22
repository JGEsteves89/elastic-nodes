document.addEventListener('DOMContentLoaded', function () {
	draw();
});

function draw() {
	// Obtain a reference to the canvas element using its id.
	htmlCanvas = document.getElementById('c1');
	// Obtain a graphics context on the canvas element for drawing.
	ctx = htmlCanvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	//...drawing code...
}
