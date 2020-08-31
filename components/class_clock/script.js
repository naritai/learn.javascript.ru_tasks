'use strict';

class Clock {
	constructor({ template }) {
		this._template = template;
	}

	start() {
		this._render();
		this._timerId = setInterval(() => {
			this._render();
		}, 1000)
	}

	stop() {
		clearInterval(this._timerId);
	}

	_render() {
		const date = new Date();
		const h = ('0' + date.getHours()).slice(-2);
		const m = ('0' + date.getMinutes()).slice(-2);
		const s = ('0' + date.getSeconds()).slice(-2);

		const formattedTime = this._template
			.replace('h', h)
			.replace('m', m)
			.replace('s', s);

		console.log(formattedTime);
	}
}


const clock = new Clock({
	template: 'h:m:s'
});

clock.start();

setTimeout(() => {
	clock.stop();
}, 7300)