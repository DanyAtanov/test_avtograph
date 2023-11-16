const magnetElem = (() => {
	const mq = window.matchMedia('(max-width: 1023px)');

	const movementRatio = 10;

	let magnetize = (e, $elem, movement) => {
		var relX = e.pageX - $elem.offset().left;
		var relY = e.pageY - $elem.offset().top;

		gsap.to($elem, {
			ease: 'linear',
			duration: 0.2,
			x: ((relX - $elem.width() / 2) / $elem.width()) * movement,
			y: ((relY - $elem.height() / 2) / $elem.height()) * movement,
			z: 0,
		});
	};

	let magnetizeInit = (e, $elem) => magnetize(e, $elem, movementRatio);

	let magnetizeLeave = ($elem) => {
		gsap.to($elem, {
			ease: 'elastic.out(0.8, 0.4)',
			duration: 1,
			x: 0,
			y: 0,
			z: 0,
		});
	};

	// Инициализация
	let init = () => {
		if (mq.matches) return;

		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {
		$('[data-magnetic]').each((i, el) => {
			let $el = $(el);

			$el.on('mousemove', (event) => magnetizeInit(event, $el));
			$el.on('mouseleave', () => magnetizeLeave($el));
		});
	};

	// Доступные методы
	return {
		init,
	};
})();

magnetElem.init();
