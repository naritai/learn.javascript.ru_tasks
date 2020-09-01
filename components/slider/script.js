class Slider {
	constructor(options) {
		this.slider = options.slider;
		this.traveler = options.traveler;
		this.shiftX = 0;
		this.shiftY = 0;
		this.sliderCoords = this.slider.getBoundingClientRect();
		this.traveler.addEventListener('dragstart', () => false);
		this.traveler.addEventListener('mousedown', this._onMouseDown);
	};

	_onMouseDown = (event) => {					// class fields syntax to save this
		event.preventDefault(); 				// prevent text selection
		this.traveler.style.zIndex = 1000; 		// put elem above all other elements

		if (event.target.closest('.slider-line__traveler')) { // sure that the traveler is that we really need
			this._onStartDrag(event.clientX, event.clientY);
		}
	};

	_onStartDrag = (clientX, clientY) => {
		const travelerCoords = this.traveler.getBoundingClientRect();
		this.shiftX = clientX - travelerCoords.left;
		this.shiftY = clientY - travelerCoords.top;

		document.addEventListener('mousemove', this._onDocumentMouseMove);
		document.addEventListener('mouseup', this._onDocumentMouseUp);
	};

	_onEndDrag = () => {
		document.removeEventListener('mousemove', this._onDocumentMouseMove);
		document.removeEventListener('mouseup', this._onDocumentMouseUp);
	}

	_onDocumentMouseMove = (event) => {		
		this.moveAt(event.clientX);
	};

	_onDocumentMouseUp = (event) => {
		this._onEndDrag();
	};

	moveAt = (clientX) => {
		let newLeft = clientX - this.shiftX - this.sliderCoords.left;
		newLeft = newLeft < 0 ? 0 : newLeft;

		const rightEdge = this.slider.offsetWidth - this.traveler.offsetWidth;
		newLeft = newLeft > rightEdge ? rightEdge : newLeft;
		
		this.traveler.style.left = newLeft + 'px';
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













