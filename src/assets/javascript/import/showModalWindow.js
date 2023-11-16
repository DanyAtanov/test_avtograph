import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

//Загрузка попапа
export const showModalWindow = (
	modalWindowName,
	callbackSuccess,
	extraData,
	existId,
	callbackBeforeSend,
	manyModals
) => {
	let $body = $('body'),
		$forModals = $('.modal-content');

	app.modal = {};
	app.modal.targetElement = document.querySelector('.modal-content');

	app.modal.open = function () {
		$body.addClass('modal_open');

		disableBodyScroll(app.modal.targetElement, {
			allowTouchMove: (el) => {
				while (el && el !== document.body) {
					if (el.getAttribute('scroll-lock-ignore') !== null) {
						return true;
					}

					el = el.parentElement;
				}
			},
		});
		app.modal.$element = $(app.modal.targetElement).children();
	};

	app.modal.close = function () {
		$body.addClass('modal_closing');

		setTimeout(function () {
			$body.removeClassWild('modal_*');

			$(app.modal.$element).remove();
			enableBodyScroll(app.modal.targetElement);

			$(app.modal.targetElement).off('scroll');
		}, 250);
	};

	$forModals.on('click', function (e) {
		if ($(e.target).is(this)) {
			$forModals.find('[data-modal-close]').trigger('click');
		}
	});

	$(app.modal.targetElement).on(
		'click, click.manual',
		'[data-modal-close]',
		function () {
			app.modal.close();
		}
	);

	manyModals = typeof manyModals !== 'undefined' ? manyModals : false;

	let ajaxData = {
		csrf_test_name: Cookies.get('csrf_cookie_name'),
		modalType: modalWindowName,
	}

	if (typeof extraData !== 'undefined' && extraData !== false) {
		ajaxData.extraData = extraData;
	}

	if (typeof existId !== 'undefined' && existId !== false) {
		ajaxData.existId = existId;
	}


	$.ajax({
		url: '/ajax/getModal',
		type: 'POST',
		data: ajaxData,
		beforeSend: callbackBeforeSend,
		dataType: 'JSON',
		success: function (result) {
			if (result.template) {
				var $modal = $(result.template);

				if (!manyModals) {
					$forModals.empty();
				}

				$.each($modal.find('.g-recaptcha'), function (i, el) {
					grecaptcha.render($(el)[0], {
						sitekey: $(el).data('sitekey')
					});
				});

				$forModals.on('click', function (e) {
					if ($(e.target).is(this)) {
						$forModals.find('.close, .closePopup').trigger('click');
					}
				});

				$forModals.append($modal);
				app.modal.open();
				disableBodyScroll(app.modal.targetElement);

				$forModals.on(
					'scroll',
					_.throttle(function () {
						let modalScrolledClass = 'modal_scrolled',
							modalScrollTop = $forModals.scrollTop();

						if (modalScrollTop > 40) {
							if (!$body.hasClass(modalScrolledClass)) {
								$body.addClass(modalScrolledClass);
							}
						} else {
							if ($body.hasClass(modalScrolledClass)) {
								$body.removeClass(modalScrolledClass);
							}
						}
					}, 300)
				);

				if (typeof callbackSuccess === 'function') {
					callbackSuccess($modal);
				}
			}
		},
	});
};
//Попап с подтверждением
export const confirmPopup = (
	title,
	desc,
	callbackResult,
	acceptTitle,
	declineTitle
) => {
	let data = {
		contentTitle: typeof title !== 'undefined' ? title : '',
		contentDesc: typeof desc !== 'undefined' ? desc : '',
		acceptTitle: typeof acceptTitle !== 'undefined' ? acceptTitle : '',
		declineTitle: typeof declineTitle !== 'undefined' ? declineTitle : '',
	};

	app.showModalWindow('confirm', function ($modal) {
		$modal
			.on('click', '[data-modal-close]', function () {
				callbackResult(false);
			})
			.on('click', '[data-action="accept"]', function () {
				$modal.find('[data-modal-close]').trigger('click.manual');
				callbackResult(true);
			})
			.on('click', '[data-action="decline"]', function () {
				$modal.find('[data-modal-close]').trigger('click.manual');
				callbackResult(false);
			});
	}, data);
};
//Попап с сообщением
export const alertPopup = (title, text, callback, closeTitle) => {
	let data = {
		alertTitle: typeof title !== 'undefined' ? title : null,
		alertText: typeof text !== 'undefined' ? text : null,
		closeTitle: typeof closeTitle !== 'undefined' ? closeTitle : null,
	};

	app.showModalWindow('alert', function ($modal) {
		$modal
			.on('click', '.modal__close', function () {
				if (typeof callback === 'function') callback(false);
			})
			.on('click', '[data-action="close"]', function () {
				$modal.find('.modal__close').trigger('click.manual');
				if (typeof callback === 'function') callback(true);
			});
	}, data);
};
