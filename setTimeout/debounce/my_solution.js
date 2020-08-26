

function test(x) {
	console.log(x);
}

function debounce(f, delay) {
	let isRunning = false;
	let timerId = null;

	return function(...args) {
		if (isRunning) {
			clearTimeout(timerId);
		}

		isRunning = true;
		timerId = setTimeout(
			function() {
				f.apply(this, args);
				isRunning = false;
				timerId = null;
			}, 
			delay
		);
		
	}
};

const debounced = debounce(test, 1000);

debounced(1);
debounced(2);

setTimeout( function() { debounced(3) }, 1100); // через 1100 мс отложим вызов еще на 1000 мс
setTimeout( function() { debounced(4) }, 1200); // игнорируем вызов (3)

