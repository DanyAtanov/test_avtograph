import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const brandsSectionSlider = () => {
	let section = document.querySelector('.banners');
	let slider;

	let swiperInit = () => {
		slider = new Swiper('.banners__slider', {
			modules: [Navigation, Pagination],
			loop: false,
			slidesPerView: 1,
			observer: true,
			speed: 1100,
			longSwipesRatio: 0.3,
			watchSlidesProgress: true,
			watchOverflow: true,
			navigation: {
				nextEl: '.banners__slider-nav.swiper-button-next',
				prevEl: '.banners__slider-nav.swiper-button-prev',
			},
			pagination: {
				el: '.banners__slider-pagination',
				type: 'bullets',
				clickable: true,
				renderBullet: function (index, className) {
					return (
						'<span class="' +
						className +
						'">' +
						(index + 1) +
						'</span>'
					);
				},
			},
			on: {
				init: function () {
					this.el.classList.add('_is-loaded');
				},
				activeIndexChange: function () {},
			},
		});
	};

	let init = () => {
		if (!section) return;

		swiperInit();
		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
};

brandsSectionSlider();
