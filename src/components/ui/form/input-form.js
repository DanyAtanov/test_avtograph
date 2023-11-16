const formInput = (() => {
	// Инициализация
	let init = () => {
		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		document.addEventListener('focusin', (event) => {
			const that = event.target;

			if (that.classList.contains('input-form__field')) {
				const formInput = that.closest('.input-form');

				formInput.classList.add('_is-focus');
			}
		});

		document.addEventListener('focusout', (event) => {
			const that = event.target;

			if (that.classList.contains('input-form__field')) {
				const formInput = that.closest('.input-form');
				const value = that.value;

				formInput.classList.remove('_is-focus');

				if (!value) {
					formInput.classList.remove('_is-filled');
				} else {
					formInput.classList.add('_is-filled');
				}
			}
		});

		document.addEventListener('change', (event) => {
			const that = event.target;

			if (!that.classList.contains('input-form__field')) return;
			if (!that.value) return;

			const formInput = that.closest('.input-form');
			formInput.classList.add('_is-filled');
		});
	};

	return {
		init,
	};
})();

formInput.init();
