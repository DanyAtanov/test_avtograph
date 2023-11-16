import 'core-js';
import svg4everybody from 'svg4everybody';
// import '@fancyapps/fancybox';
/* import {
	showModalWindow,
	confirmPopup,
	alertPopup,
} from '../import/showModalWindow'; */
import '../import/removeClassWild';

window.$window = $(window);
window.$document = $(document);
window.$body = $('body');
window.$header = $('.header');
window.windowWidth = $window.width();
window.windowScroll = 0;
window.windowLastScroll = 0;

/* window.app = {
	showModalWindow,
	confirmPopup,
	alertPopup,
}; */

let updateScrollState = () => {
	windowWidth = $window.width();

	windowScroll = $window.scrollTop();
	if (windowScroll > 66) {
		if (!$body.hasClass('page_scrolled')) {
			$body.addClass('page_scrolled');
		}
	} else {
		if ($body.hasClass('page_scrolled')) {
			$body.removeClass('page_scrolled');
		}
	}

	if (windowScroll > 66) {
		if (windowScroll > windowLastScroll) {
			$body.addClass('page_scroll-down');
			$body.removeClass('page_scroll-up');
		} else if (windowScroll < windowLastScroll) {
			$body.addClass('page_scroll-up');
			$body.removeClass('page_scroll-down');
		}
	}

	windowLastScroll = windowScroll;
};

$window.on('load', function () {
	$body.addClass('page_loaded');
	$body.removeClass('preload');
	svg4everybody();
});

$window.on('load resize', function () {
	updateScrollState();
});

let timer;

$window.on('scroll', _throttle(updateScrollState, 125));
$window.on('scroll', function () {
	clearTimeout(timer);
	if (!$body.hasClass('disable-hover')) {
		$body.addClass('disable-hover');
	}

	timer = setTimeout(function () {
		$body.removeClass('disable-hover');
	}, 350);
});
