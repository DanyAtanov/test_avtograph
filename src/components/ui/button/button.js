(() => {
	const basketButtons = document.querySelectorAll(
		'.button.product-card__action'
	);

	let init = () => {
		if (!basketButtons.length) return;

		basketButtons.forEach((button, index) => {
			button.addEventListener('click', () => {
				button.classList.add('loading');

				setTimeout(() => {
					button.classList.remove('loading');
				}, 1000);
			});
		});

		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
})();
