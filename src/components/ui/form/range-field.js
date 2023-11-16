import noUiSlider from 'nouislider';

app.rangeField = (() => {
	// Селектор
	let $rangeField = $('.range-field');
	let rangeSliderAll = document.querySelectorAll(
		'.range-field__slider .range-field__noUi'
	);

	// Инициализация
	let init = (parent) => {
		_setupListeners();

		if (parent) {
			rangeSliderAll = parent.querySelectorAll(
				'.range-field__slider .range-field__noUi'
			);
		}

		for (let index = 0; index < rangeSliderAll.length; index++) {
			const slider = rangeSliderAll[index];
			const $parent = $(slider).closest('.range-field');
			const $startField = $parent.find('[data-range-start]');
			const $endField = $parent.find('[data-range-end]');
			const step = $parent.find('[data-range-step]').data('rangeStep');

			if ($startField.length) {
				let setInputValue = (values, handle) => {
					if (handle) {
						$endField.val(values[handle]);
					} else {
						$startField.val(values[handle]);
					}
				};

				noUiSlider.create(slider, {
					start: [
						$startField.data('rangeStart'),
						$endField.data('rangeEnd'),
					],
					connect: true,
					range: {
						min: $startField.data('rangeMin'),
						max: $endField.data('rangeMax'),
					},
					step: step,
					format: {
						// 'to' the formatted value. Receives a number.
						to: function (value) {
							return Math.round(value);
						},
						// 'from' the formatted value.
						// Receives a string, should return a number.
						from: function (value) {
							return Math.round(value);
						},
					},
				});

				slider.noUiSlider.on('slide', setInputValue);
				slider.noUiSlider.on('set', setInputValue);

				$startField.on('change', function (event) {
					slider.noUiSlider.set([this.value, null]);
				});

				$endField.on('change', function (event) {
					slider.noUiSlider.set([null, this.value]);
				});

				// Кнопка "Новые"
				let $setValueBtn = $parent.find(
					'[data-action="setRangeValue"]'
				);
				$setValueBtn.on('click', (e) => {
					let $btn = $(e.currentTarget);
					$btn.toggleClass('_is-active');

					if ($btn.hasClass('_is-active')) {
						slider.noUiSlider.set([
							$endField.data('rangeEnd'),
							null,
						]);
					} else {
						slider.noUiSlider.set([
							$startField.data('rangeStart'),
							null,
						]);
					}
				});
			}

			// Выбор единицы измерения/валюты

			let $measure = $parent.find('.range-field__measure');
			let $measureToggle = $measure.find('.range-field__measure-title');
			let $measureItem = $measure.find('.range-field__measure-item');

			$measureToggle.on('click', () => {
				$measure.toggleClass('_is-active');
			});
			$measureItem.on('click', (e) => {
				let $item = $(e.currentTarget);
				$item
					.addClass('_is-selected')
					.siblings()
					.removeClass('_is-selected');
				$measureToggle.find('span').text($item.find('._long').text());
				setTimeout(() => $measure.removeClass('_is-active'), 150);
			});
			$document.on('click', function (e) {
				if ($(e.target).closest($measure).hasClass('_is-active'))
					return;

				$measure.removeClass('_is-active');

				e.stopPropagation();
			});
		}
	};

	// Навешиванеи событий
	let _setupListeners = () => {};

	// Доступные методы
	return {
		init,
	};
})();

app.rangeField.init();
