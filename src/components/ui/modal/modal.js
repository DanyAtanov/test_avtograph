import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const modal = (() => {
	// Селектор
	let modalContent = document.querySelector('.modal-content');
	let $modalContent = $(modalContent);
	let modalName;

	// Scroll Jumping Stop
	document.documentElement.style.setProperty(
		'--scrollbar-width',
		window.innerWidth - document.documentElement.clientWidth + 'px'
	);

	let _showModal = () => {
		$body.addClass('modal_open');
		disableBodyScroll(modalContent);

		//Инициализация плагинов
	};

	let open = (modalName) => {
		if (!modalName) {
			_showModal();
			return;
		}

		$.ajax({
			// url: '../../modals/' + modalName + '-modal.html',
			url: '/modals/' + modalName + '-modal.html',

			cache: false,
		}).done(function (html) {
			$modalContent.append(html);
			_showModal();
		});
	};

	let close = () => {
		let $element = $modalContent.children();
		$body.addClass('modal_closing');

		setTimeout(function () {
			$body.removeClassWild('modal_*');

			if ($element) {
				$element.remove();
			}

			enableBodyScroll(modalContent);
		}, 250);

		modalName = '';
	};

	// Инициализация
	let init = () => {
		if ($modalContent.length === 0) return;

		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		$document.on('click', '[data-modal]', function (event) {
			event.preventDefault();
			let $that = $(this);

			modalName = $that.data('modal');
			open(modalName);
		});

		$(document).on('keydown', function (event) {
			if (event.key === 'Escape' || event.keyCode === 27) {
				close();
			}
		});

		$modalContent.on('click', function (event) {
			if ($(event.target).is($(this))) {
				close();
			}
		});

		$modalContent.on(
			'click, click.manual',
			'[data-modal-close]',
			function () {
				close();
			}
		);
	};

	// Доступные методы
	return {
		init,
		open,
	};
})();

modal.init();
