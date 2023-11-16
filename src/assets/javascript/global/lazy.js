import lazySizes from 'lazysizes';
// import a plugin
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.js';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.preloadClass = '_preload';
lazySizes.cfg.loadingClass = '_is-loading';
lazySizes.cfg.loadedClass = '_is-loaded';
lazySizes.cfg.expand = 1000;
lazySizes.cfg.expFactor = 2;
lazySizes.cfg.throttleDelay = 200;
lazySizes.cfg.customMedia = {
	mobile: '(max-width: 576px)',
}; */

lazySizes.cfg.loadMode = 2;
// lazySizes.cfg.throttleDelay = 66;
lazySizes.cfg.preloadAfterLoad = true;
lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.preloadClass = '_preload';
lazySizes.cfg.loadingClass = '_is-loading';
lazySizes.cfg.loadedClass = '_is-loaded';
lazySizes.cfg.customMedia = {
	tablet: '(min-width: 640px)',
	laptop: '(min-width: 1024px)',
	desktop: '(min-width: 1280px)',
};

/* const lazy = (() => {
	// Инициализация
	let init = () => {
		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		$document.on('lazyloaded', (event) => {
			ScrollTrigger.refresh();
		});
	};

	// Доступные методы
	return {
		init,
	};
})();

$(window).on('load', function (event) {
	lazy.init();
}); */
