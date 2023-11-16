import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';

const brandsSectionSlider = () => {
	let section = document.querySelector('.brands-section');
	let slider;

	let swiperInit = () => {
		slider = new Swiper('.brands-section__slider', {
			modules: [Navigation, FreeMode],
			loop: true,
			slidesPerView: 'auto',
			observer: true,
			speed: 1200,
			longSwipesRatio: 0.3,
			watchSlidesProgress: true,
			watchOverflow: true,
			navigation: {
				nextEl: '.brands-section__slider-nav.swiper-button-next',
				prevEl: '.brands-section__slider-nav.swiper-button-prev',
			},
			on: {
				init: function () {
					this.el.classList.add('_is-loaded');
				},
			},
			breakpoints: {
				320: {
					centeredSlides: false,
					spaceBetween: 26,
					freeMode: {
						enabled: true,
						sticky: false,
					},
				},
				768: {
					centeredSlides: true,
					freeMode: {
						enabled: false,
					},
				},
				1280: {
					allowTouchMove: false,
				},
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
