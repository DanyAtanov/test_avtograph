export default (() => {
	// Селектор
	const elements = document.querySelectorAll('[data-first-letter]');

	// Инициализация
	let init = () => {
		for (let index = 0; index < elements.length; index++) {
			const element = elements[index];
			const paragraph = element.querySelector('p');
			const char = paragraph.innerText.charAt(0);
			const letter = document.createElement('span');

			letter.classList.add('first-letter');
			letter.innerHTML = char;

			paragraph.classList.add('first-letter-root');
			paragraph.appendChild(letter);
		}

		_setupListeners();
	};

	// Навешиванеи событий
	let _setupListeners = () => {};

	init();

	// Доступные методы
	// return {
	// 	init,
	// };
})();
