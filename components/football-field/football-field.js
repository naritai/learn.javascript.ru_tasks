'use strict';

class FootballField {
	constructor(options) {
		this._fieldElem = options.elementField;
		this._ballElem = options.elementBall;
		
		this._ballElemWidth = this._ballElem.offsetWidth;
		this._ballElemHeight = this._ballElem.offsetHeight;
		this._maxFWidth = this._fieldElem.clientWidth - this._ballElemWidth;
		this._maxFHeight = this._fieldElem.clientHeight - this._ballElemHeight;

		this._fieldElem.onclick = this._onFieldClick.bind(this);
	}

	moveBallTo(x, y) {
		let left = Math.max(x, 0);
		left = Math.min(left, this._maxFWidth);
		let top = Math.max(y, 0);
		top = Math.min(top, this._maxFHeight)

		this._ballElem.style.left = `${left}px`;
		this._ballElem.style.top = `${top}px`;
	};

	_onFieldClick(event) {
		let left = event.offsetX - this._ballElemWidth / 2;
		let top = event.offsetY - this._ballElemHeight / 2;
		this.moveBallTo(left, top);
	};
};

new FootballField({
	elementField: document.querySelector('#field1'),
	elementBall: document.querySelector('#ball1')

});

new FootballField({
	elementField: document.querySelector('#field2'),
	elementBall: document.querySelector('#ball2')
});