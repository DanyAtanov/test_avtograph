import select2 from 'select2';

const form = (() => {
	let updatePlaceholder = ($select) => {
		let placeholder = $select.data('placeholder');
		let placeholderSelected = $select
			.closest('.select-form')
			.find('.select-form__title')
			.text();
		let amount = $select.val().length;
		let $placeholderElement = $select
			.next('.select2')
			.find('.select-form__placeholder');

		$select.removeClassWild('_selected_*');

		if (amount === 0) {
			$placeholderElement.html(placeholder);
			$select.addClass('_selected_not');
		} else if (amount === 1) {
			let text = $select.select2('data')[0].text;
			$placeholderElement.html(text);
			$select.addClass('_selected_one');
		} else {
			$placeholderElement.html(
				placeholderSelected + '<span>' + amount + '</span>'
			);
			$select.addClass('_selected_several');
		}
	};

	// Селект
	app.initSelectFn = () => {
		let $formSelectAll = $('.select-form select');
		if (!$formSelectAll.length) return;

		import(/* webpackChunkName: "select2" */ 'select2').then((select2) => {
			$formSelectAll.each(function (index, element) {
				let $formSelect = $(element);

				$formSelect.select2({
					dropdownParent: $formSelect.parent(),
					minimumResultsForSearch: 0,
					width: '100%',
				});

				// Кастомный скролл
				$formSelect.on('select2:open', function (e) {
					document
						.querySelector(
							'.select2-container--open .select2-search__field'
						)
						.focus();

					$(this)
						.closest('.select-form')
						.find('.select2-results__options')
						.addClass('js-scroll-select');

					if (
						$(this).closest('.select-form').find('option').length >=
						10
					) {
						$('.js-scroll-select').niceScroll({
							cursorcolor: '#CFD1D3',
							cursorwidth: '4px',
							cursorborder: 'none',
							cursorborderradius: '2px',
							railpadding: {
								top: 0,
								right: 1,
								left: 1,
								bottom: 0,
							},
							horizrailenabled: false,
							scrollbarid: 'customSelectScroll',
						});
					}
				});

				$formSelect.on('select2:select', function (event) {
					$(this)
						.closest('.select-form')
						.find('.select2-selection')
						.removeClass('_error');
					$(this)
						.closest('.select-form')
						.find('label._error_field')
						.hide();
				});

				$formSelect.on('select2:close', function (event) {});

				// Мультиселект + чипсы
				if ($formSelect.attr('multiple') === 'multiple') {
					let $rendered = $formSelect
						.closest('.select-form')
						.find('.select2-selection--multiple');
					$rendered.append(
						`<div class="select-form__placeholder">
							${$formSelect.data('placeholder')}
						</div>`
					);
					$rendered
						.find('.select2-search__field')
						.attr('placeholder', '');

					updatePlaceholder($formSelect);

					// $formSelect.on('select2:open', function (e) {
					// 	document.querySelector(".select2-container--open textarea.select2-search__field").focus().removeAttr('disabled');
					// });

					$formSelect.on('select2:closing', function (e) {
						let $searchfield = $(this)
							.parent()
							.find('.select2-search__field');
						$searchfield.prop('disabled', true);
					});

					$formSelect.on('select2:opening', function (e) {
						let $searchfield = $(this)
							.parent()
							.find('.select2-search__field');
						$searchfield.prop('disabled', false);
					});

					$formSelect.on('change.select2', function () {
						$rendered
							.find('.select2-search__field')
							.prop('placeholder', '');

						updatePlaceholder($formSelect);
					});
				}
			});

			let $select2 = $('.select2');
			let $select2Arrow = $select2.find('.select2-selection__arrow');

			$select2Arrow.html(
				`<span class="select-form__arrow">
					<svg><use xlink:href="#chevron_down"></use></svg>
				</span>`
			);
		});
	};

	let initSelect = () => {
		app.initSelectFn();
	};

	let initSearchBlock = () => {
		let $searchBlockForm = $('.search-block__form');
		if (!$searchBlockForm.length) return;

		let $searchBlockInput = $searchBlockForm.find('[type="search"]');

		$searchBlockInput.each((i, el) => {
			let $input = $(el);
			let $clearBtn = $input
				.closest($searchBlockForm)
				.find('[data-action="searchInputClear"]');

			$input.on('input focus blur', (event) => {
				if (!$(event.target).val()) {
					$clearBtn.addClass('_is-hidden');
				} else {
					$clearBtn.removeClass('_is-hidden');
				}
			});

			$clearBtn.on('click', () => {
				$input.val('').focus();
			});
		});
	};

	// Инициализация
	let init = () => {
		initSelect();
		initSearchBlock();
		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {};

	// Доступные методы
	return {
		init,
		initSelect,
		initSearchBlock,
	};
})();

form.init();

export default form;
