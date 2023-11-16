function addAutoResize() {
	document.querySelectorAll('[data-autoresize]').forEach(function (element) {
		element.style.boxSizing = 'border-box';
		var offset = element.offsetHeight - element.clientHeight;
		element.addEventListener('input', function (event) {
			event.target.style.height = 'auto';
			event.target.style.height =
				event.target.scrollHeight + offset + 'px';
		});
		element.removeAttribute('data-autoresize');
	});
}

const textareaAutoResize = (() => {
	let $textareas = document.querySelectorAll('[data-autoresize]');

	// Инициализация
	let init = () => {
		if ($textareas.length === 0) return;

		$textareas.forEach(function (element) {
			element.style.boxSizing = 'border-box';
			var offset = element.offsetHeight - element.clientHeight;
			element.addEventListener('input', function (event) {
				event.target.style.height = 'auto';
				event.target.style.height =
					event.target.scrollHeight + offset + 'px';
			});
			element.removeAttribute('data-autoresize');
		});

		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {};

	// Доступные методы
	return {
		init,
	};
})();

textareaAutoResize.init();
