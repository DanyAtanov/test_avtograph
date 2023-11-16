import { ScrollTrigger } from 'gsap/ScrollTrigger';

const menu = (() => {
	// Селектор
	const menu = document.querySelector('.menu');

	// Инициализация
	let init = () => {
		if (!menu) return;

		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		const body = document.querySelector('body');
		const burger = document.querySelector('.burger');
		const dropdownMenus = document.querySelectorAll('.dropdown-menu');
		const links = document.querySelectorAll('.menu__item-link');

		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				burger.classList.remove('_burger-is-clicked');
				menu.classList.remove('_is-open');
				body.classList.remove('menu_open');
			});
		});

		burger.addEventListener('click', (event) => {
			const openDropdownMenus = document.querySelectorAll(
				'.dropdown-menu._is-open'
			);

			gsap.from('.menu__item', {
				yPercent: -50,
				autoAlpha: 0,
				duration: 0.3,
				stagger: 0.1,
				force3D: true,
			});

			if (openDropdownMenus.length === 0) {
				burger.classList.toggle('_burger-is-clicked');
				menu.classList.toggle('_is-open');
				body.classList.toggle('menu_open');
			} else {
				dropdownMenus.forEach((dropdown) => {
					dropdown.classList.remove('_is-open');
					burger.classList.remove('_burger-is-clicked');
					menu.classList.remove('_is-open');
					body.classList.remove('menu_open');
				});
			}
		});

		body.addEventListener('click', (event) => {
			if (event.target.classList.contains('menu_open')) {
				burger.classList.remove('_burger-is-clicked');
				menu.classList.remove('_is-open');
				dropdownMenus.forEach((dropdown) => {
					dropdown.classList.remove('_is-open');
				});
				body.classList.remove('menu_open');
			}
		});
	};

	// Доступные методы
	return {
		init,
	};
})();

menu.init();
