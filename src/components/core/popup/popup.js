import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const popup = (() => {
	let open = (popupName) => {
		let popupContent = document.querySelector('.' + popupName + '-content');
		let $popupContent = $(popupContent);

		$popupContent.addClass(popupName + '_open');
		disableBodyScroll(popupContent, {
			allowTouchMove: (el) => {
				while (el && el !== document.body) {
					if (el.getAttribute('scroll-lock-ignore') !== null) {
						return true;
					}

					el = el.parentElement;
				}
			},
		});

		$popupContent.on('click', function (event) {
			if ($(event.target).is($(this))) {
				$popupContent.addClass(popupName + '_closing');

				setTimeout(function () {
					$popupContent.removeClassWild(popupName + '_*');
					enableBodyScroll(popupContent);
				}, 250);
			}
		});

		$popupContent.on(
			'click, click.manual',
			'[data-popup-close]',
			function () {
				$popupContent.addClass(popupName + '_closing');

				setTimeout(function () {
					$popupContent.removeClassWild(popupName + '_*');
					enableBodyScroll(popupContent);
				}, 250);
			}
		);
	};

	// Инициализация
	let init = () => {
		// console.log('popup init');
		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		$document.on('click', '[data-popup]', function (event) {
			let $that = $(this);

			let popupName = $that.data('popup');
			open(popupName);
		});
	};

	// Доступные методы
	return {
		init,
	};
})();

popup.init();
