const counter = (() => {
	let counters = document.querySelectorAll('.counter');

	// Инициализация
	let init = () => {
		if (!counters.length) return;

		counters.forEach((counter, index) => {
			let quantity = 1;

			counter.addEventListener('click', (event) => {
				let total = counters[index].querySelector('.counter__result');

				if (event.target.closest('.counter__minus')) {
					if (quantity > 1) {
						quantity--;
					}
				} else if (event.target.closest('.counter__plus')) {
					quantity++;
				}

				if (quantity === 0) return;

				total.innerHTML = quantity;
			});
		});
		_setupListeners();
	};

	let _setupListeners = () => {};

	return {
		init,
	};
})();

counter.init();
