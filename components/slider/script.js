class Slider {
	constructor(options) {
		this.sliderElement = options.element;
		this.travelerElement = this.sliderElement.querySelector('.slider-line__traveler'); // looking for traveler inside component on slider
		this.shiftX = 0;
		this.shiftY = 0;
		this.sliderCoords = this.sliderElement.getBoundingClientRect();
		this.travelerElement.addEventListener('dragstart', () => false);
		this.travelerElement.addEventListener('mousedown', this._onMouseDown);
		this.sliderElement.addEventListener('wheel', this._onWheel);
	};

	_onMouseDown = (event) => {					// class fields syntax to save this
		event.preventDefault(); 				// prevent text selection
		this.travelerElement.style.zIndex = 1000; 		// put elem above all other elements

		if (event.target.closest('.slider-line__traveler')) { // sure that the traveler is that we really need
			this._onStartDrag(event.clientX);
		}
	};

	_onStartDrag = (clientX) => {
		const travelerCoords = this.travelerElement.getBoundingClientRect();
		this.shiftX = clientX - travelerCoords.left;

		document.addEventListener('mousemove', this._onDocumentMouseMove); // hang handler when mouse down
		document.addEventListener('mouseup', this._onDocumentMouseUp);	   // hang handler when mouse down
	};

	_onEndDrag = () => {
		document.removeEventListener('mousemove', this._onDocumentMouseMove); // remove handler when mouse up
		document.removeEventListener('mouseup', this._onDocumentMouseUp);     // remove handler when mouse up
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

		const rightEdge = this.sliderElement.offsetWidth - this.travelerElement.offsetWidth;
		newLeft = newLeft > rightEdge ? rightEdge : newLeft;

		this.travelerElement.style.left = newLeft + 'px';
	};	
};


[...document.querySelectorAll('.slider-line')]
	.forEach(element => {
		new Slider({ element: element})
	});
