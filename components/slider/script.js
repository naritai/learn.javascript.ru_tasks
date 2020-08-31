class Slider {
	constructor(options) {
		this.slider = options.slider;
		this.traveler = options.traveler;
		this.sliderCoords = this.slider.getBoundingClientRect();

		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);

		this.traveler.addEventListener('dragstart', () => false);
		this.traveler.addEventListener('mousedown', this._onMouseDown);
	};

	_onMouseDown(event) {
		event.preventDefault(); 				// prevent text selection
		this.traveler.style.zIndex = 1000; 		// put elem above all other elements
		document.addEventListener('mousemove', this._onMouseMove);
		document.addEventListener('mouseup', this._onMouseUp);
	};

	_onMouseMove(event) {
		const shiftX = event.clientX - this.traveler.getBoundingClientRect().left;
		const { left } = this.sliderCoords;
		let value = event.clientX - left; // shiftX breaks for now
		const rightEdge = this.slider.offsetWidth - this.traveler.offsetWidth;

		value = value < 0 ? 0 : value;
		value = value > rightEdge ? rightEdge : value;
		this.traveler.style.left = value + 'px';
	};

	_onMouseUp(event) {
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
	};
}

const slider = new Slider({
	slider: document.querySelector('.slider-line'),
	traveler: document.querySelector('.slider-line__traveler')
});


// **********************************************
// *********** SOLUTION WITHOUT CLASS ***********
// **********************************************

// traveler.addEventListener('dragstart', () => false);

// traveler.addEventListener('mousedown', function(event) {
// 	event.preventDefault(); 						// prevent text selection
// 	traveler.style.zIndex = 1000; 					// put elem above all other elements

// 	const shiftX = event.clientX - traveler.getBoundingClientRect().left;
// 	const { left: leftBoundry } = sliderCoords;

// 	moveAt(event.clientX); 							// set traveler under the cursor

// 	function moveAt(clientX) {
// 		let value = clientX - leftBoundry - shiftX;
// 		const rightEdge = slider.offsetWidth - traveler.offsetWidth;

// 		value = value < 0 ? 0 : value;
// 		value = value > rightEdge ? rightEdge : value;

// 		traveler.style.left = value + 'px';
// 	};

// 	function onMouseMove(event) {
// 		moveAt(event.clientX);
// 	};

// 	function onMouseUp(event) {
// 		document.removeEventListener('mousemove', onMouseMove);
// 		document.removeEventListener('mouseup', onMouseUp);
// 	};

// 	document.addEventListener('mousemove', onMouseMove);
// 	document.addEventListener('mouseup', onMouseUp);
// });













