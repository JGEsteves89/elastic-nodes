document.addEventListener('DOMContentLoaded', function () {
	draw();
});
var pos = 0;
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

	// Draw section
	ctx.fillStyle = 'yellow';
	pos += 1;
	ctx.fillRect(pos, pos, 50, 50);
}
