import { enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const header = (() => {
	const burger = document.querySelector('.burger');
	let mobileMenu = document.querySelector('.header__content-wrapper');

	let menuCatalogButton = document.querySelector('.header__action-catalog');
	let menuCatalogCloseButton = document.querySelector('.menu-catalog__head');
	let menuCatalog = document.querySelector('.menu-catalog');

	let basketButton = document.querySelector('.header__basket');
	let basketCloseButton = document.querySelector('.basket__close');
	let basketButtonMobile = document.querySelector('.header__basket--mobile');
	let basket = document.querySelector('.basket');

	let burgerInit = () => {
		burger.addEventListener('click', () => {
			mobileMenu.classList.toggle('_is-open');
			document.body.classList.toggle('menu_open');

			mobileMenu.classList.contains('_is-open')
				? clearAllBodyScrollLocks()
				: (enableBodyScroll(mobileMenu),
				  menuCatalog.classList.remove('_is-open'));
		});
	};

	let menuCatalogInit = () => {
		menuCatalogButton.addEventListener('click', () => {
			menuCatalog.classList.toggle('_is-open');
			menuCatalog.classList.contains('_is-open')
				? (clearAllBodyScrollLocks(),
				  document.body.classList.add('menu_open'))
				: enableBodyScroll(menuCatalog);

			setTimeout(() => {
				initHandlerOverlay();
			}, 0);
		});

		menuCatalogCloseButton.addEventListener('click', () => {
			mobileMenu.classList.contains('_is-open')
				? menuCatalog.classList.remove('_is-open')
				: close();
		});
	};

	let basketInit = () => {
		basketButton.addEventListener('click', () => {
			basket.classList.toggle('_is-open');
			basket.classList.contains('_is-open')
				? (clearAllBodyScrollLocks(),
				  document.body.classList.add('menu_open'))
				: enableBodyScroll(basket);

			setTimeout(() => {
				initHandlerOverlay();
			}, 0);
		});

		basketButtonMobile.addEventListener('click', () => {
			basket.classList.toggle('_is-open');
			basket.classList.contains('_is-open')
				? (clearAllBodyScrollLocks(),
				  document.body.classList.add('menu_open'))
				: enableBodyScroll(basket);

			setTimeout(() => {
				initHandlerOverlay();
			}, 0);
		});
	};

	let initHandlerOverlay = () => {
		let bodyOverlay = document.querySelector('body.menu_open');
		if (!bodyOverlay) return;

		bodyOverlay.addEventListener('click', (event) => {
			if (
				event.target.closest('header') ||
				event.target.closest('.menu-catalog') ||
				event.target.closest('.basket')
			)
				return;
			close();
		});

		bodyOverlay.addEventListener(
			'keydown',
			(event) => {
				if (event.key === 'Escape' || event.keyCode === 27) {
					close();
				}
			},
			{ once: true }
		);

		basketCloseButton.addEventListener('click', () => {
			close();
		});
	};

	let close = () => {
		mobileMenu.classList.remove('_is-open');
		menuCatalog.classList.remove('_is-open');
		basket.classList.remove('_is-open');
		document.body.classList.remove('menu_open');
		clearAllBodyScrollLocks();
	};

	let init = () => {
		if (!burger) return;

		burgerInit();
		menuCatalogInit();
		basketInit();
		_setupListeners();
	};

	let _setupListeners = () => {
		window.addEventListener('resize', () => {
			close();
		});
	};

	init();
})();
