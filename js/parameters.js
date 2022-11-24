function getSetSlider(sliderPrefix) {
	var slider = document.getElementById(sliderPrefix + 'Slider');
	var output = document.getElementById(sliderPrefix + 'Output');
	var value = slider.value;
	output.innerHTML = value;
	return value;
}
function setSlider(sliderPrefix, value) {
	var slider = document.getElementById(sliderPrefix + 'Slider');
	slider.value = value;
}
function getParameters() {
	var linkLength = getSetSlider('LinkLength');
	var nodeMass = getSetSlider('NodeMass');
	var repelLength = getSetSlider('RepelLength');
	var linkForce = getSetSlider('LinkForce');
	var repelForce = getSetSlider('RepelForce');
	var movementDrag = 1 - getSetSlider('MovementDrag') / 100;
	return {
		linkLength,
		linkForce,
		nodeMass,
		repelLength,
		repelForce,
		movementDrag,
	};
}
function resetParameters() {
	setSlider('LinkLength', 50);
	setSlider('NodeMass', 10);
	setSlider('RepelLength', 50);
	setSlider('LinkForce', 3);
	setSlider('RepelForce', 3);
	setSlider('MovementDrag', 5);
}
