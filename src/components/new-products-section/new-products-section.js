import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const newProductsSectionSlider = () => {
	let section = document.querySelector('.new-products-section');
	let slider;

	let swiperInit = () => {
		slider = new Swiper('.new-products-section__slider', {
			modules: [Navigation],
			loop: true,
			observer: true,
			speed: 1000,
			longSwipesRatio: 0.3,
			centeredSlides: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			navigation: {
				nextEl: '.new-products-section__slider-nav.swiper-button-next',
				prevEl: '.new-products-section__slider-nav.swiper-button-prev',
			},
			on: {
				init: function () {
					this.el.classList.add('_is-loaded');
				},
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 12,
				},
				375: {
					slidesPerView: 2,
					spaceBetween: 19,
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3,
				},
				1024: {
					spaceBetween: 32,
					slidesPerView: 4,
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

newProductsSectionSlider();
