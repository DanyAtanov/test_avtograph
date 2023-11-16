import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
// import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
// import { TextPlugin } from "gsap/TextPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export const animation = () => {
	const mq = window.matchMedia('(max-width: 1024px)');

	let GSAPInit = () => {
		gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);
	};

	gsap.config({
		nullTargetWarn: false,
	});

	/* 	let parallaxFunc = (to, trigger, y, scrub = true) => {
		gsap.to(to, {
			y: y,
			scrollTrigger: {
				trigger: trigger,
				start: 'top bottom',
				end: 'bottom top',
				scrub: scrub,
				delay: 0.1,
			},
		});
	}; */

	function introAnimation() {
		let intro = document.querySelectorAll('.intro-section');
		if (intro.length === 0) return;

		return (() => {
			let introOut = () => {
				const tl = gsap.timeline({
					ease: 'Expo',
					scrollTrigger: {
						trigger: '.intro',
						start: 'top',
					},
				});

				tl.set('.intro-section__tabs-nav-wrapper', {
					willChange: 'transform, opacity',
				});

				tl.from('.intro-section__tabs-nav-wrapper', {
					y: 42,
					autoAlpha: 0,
					duration: 0.6,
					delay: 0.6,
					force3D: true,
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});

				tl.set('.intro-section__tabs-nav-wrapper', {
					willChange: 'auto',
				});
			};

			let init = () => {
				introOut();
			};

			init();
		})();
	}
	function aboutSliderAnimation() {
		let aboutSlider = document.querySelectorAll('.about-slider');
		if (aboutSlider.length === 0) return;

		return (() => {
			let aboutSliderParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.about-slider__inner'
				);

				ScrollTrigger.create({
					trigger: '.about-slider',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.about-slider__inner', {
					yPercent: 40,
					scrollTrigger: {
						trigger: '.about-slider',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				aboutSliderParallax();
			};

			init();
		})();
	}
	function numbersAnimation() {
		let footer = document.querySelectorAll('.numbers');
		if (footer.length === 0) return;

		return (() => {
			let mainNumbersParallax = () => {
				const tl = gsap.timeline({
					ease: 'Expo',
					scrollTrigger: {
						trigger: '.numbers',
						start: 'top bottom',
					},
				});

				tl.set(
					'.numbers__main-item-title, .numbers__main-item-title > *, .numbers__main-item-text, .numbers__list-wrapper, .numbers__item-title, .numbers__item-text',
					{
						willChange: 'transform, opacity, letter-spacing',
					}
				);

				tl.from('.numbers__main-item-title', {
					letterSpacing: '30px',
					autoAlpha: 0,
					duration: 1.2,
					delay: 0.4,
					onStart: () => {
						ScrollTrigger.refresh();
					},
				})
					.from(
						'.numbers__main-item-title mark',
						{
							autoAlpha: 0,
							duration: 0.6,
						},
						'-=0.8'
					)
					.from(
						'.numbers__main-item-title span',
						{
							x: 32,
							autoAlpha: 0,
							duration: 0.6,
							force3D: true,
						},
						'-=0.6'
					)
					.from(
						'.numbers__main-item-text',
						{
							y: 32,
							autoAlpha: 0,
							duration: 0.8,
							force3D: true,
						},
						'-=0.6'
					)
					.from(
						'.numbers__list-wrapper',
						{
							y: 32,
							autoAlpha: 0,
							duration: 0.9,
							force3D: true,
						},
						'-=0.6'
					)
					.from(
						'.numbers__item-title',
						{
							y: 32,
							autoAlpha: 0,
							duration: 0.9,
							force3D: true,
						},
						'-=0.6'
					)
					.from(
						'.numbers__item-text',
						{
							y: 32,
							autoAlpha: 0,
							duration: 1.1,
							force3D: true,
						},
						'-=0.6'
					);

				tl.set(
					'.numbers__main-item-title, .numbers__main-item-title > *, .numbers__main-item-text, .numbers__list-wrapper, .numbers__item-title, .numbers__item-text',
					{
						willChange: 'auto',
					}
				);
			};

			let numbersItemsParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.numbers__item'
				);

				ScrollTrigger.create({
					trigger: '.numbers__inner',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.numbers__item', {
					yPercent: 40,
					stagger: 0.2,
					scrollTrigger: {
						trigger: '.numbers__list-wrapper',
						start: 'top bottom',
						end: 'bottom bottom',
						delay: 0.2,
						scrub: 4,
						force3D: true,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				setTimeout(() => {
					mainNumbersParallax();
					numbersItemsParallax();
				}, 500);
			};

			init();
		})();
	}
	function videoSectionAnimation() {
		let videoSection = document.querySelectorAll('.video-section');
		if (videoSection.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.video-section__title'
				);

				ScrollTrigger.create({
					trigger: '.video-section',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.video-section__title', {
					y: 68,
					scrollTrigger: {
						trigger: '.video-section',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.4,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
			};

			init();
		})();
	}
	function contactUsAnimation() {
		let contactUsSection = document.querySelectorAll('.contact-us');
		if (contactUsSection.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.contact-us__title'
				);

				ScrollTrigger.create({
					trigger: '.contact-us',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.contact-us__title', {
					y: 42,
					scrollTrigger: {
						trigger: '.contact-us',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.4,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
			};

			init();
		})();
	}
	function categoriesAnimation() {
		let categoriesSection = document.querySelectorAll('.categories');
		if (categoriesSection.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.categories__title'
				);

				ScrollTrigger.create({
					trigger: '.categories',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.categories__title', {
					y: 68,
					scrollTrigger: {
						trigger: '.categories',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.6,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
			};

			init();
		})();
	}
	function collectionsAnimation() {
		let collectionsSection = document.querySelectorAll('.video-section');
		if (collectionsSection.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.collections__title'
				);

				ScrollTrigger.create({
					trigger: '.collections',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.collections__title', {
					y: 68,
					scrollTrigger: {
						trigger: '.collections',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.4,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let subtitleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.collections__subtitle'
				);

				ScrollTrigger.create({
					trigger: '.collections',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.collections__subtitle', {
					y: 68,
					scrollTrigger: {
						trigger: '.collections',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.6,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
				subtitleParallax();
			};

			init();
		})();
	}
	function subscribeAnimation() {
		let subscribeSection = document.querySelectorAll('.subscribe-section');
		if (subscribeSection.length === 0) return;

		return (() => {
			let logoParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.subscribe-section__berkano-logo'
				);

				ScrollTrigger.create({
					trigger: '.subscribe-section',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.subscribe-section__berkano-logo', {
					xPercent: 18,
					scrollTrigger: {
						trigger: '.subscribe-section',
						start: 'top center',
						// end: 'bottom bottom',
						scrub: 2,
						force3D: true,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				logoParallax();
			};

			init();
		})();
	}
	function productSectionAnimation() {
		let products = document.querySelectorAll('.products');
		if (products.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.products__title'
				);

				ScrollTrigger.create({
					trigger: '.products',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.products__title', {
					y: 48,
					scrollTrigger: {
						trigger: '.products',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.4,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
			};

			init();
		})();
	}
	function advantagesSectionAnimation() {
		let advantages = document.querySelectorAll('.advantages');
		if (advantages.length === 0) return;

		return (() => {
			let titleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.advantages__head'
				);

				ScrollTrigger.create({
					trigger: '.advantages',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.advantages__head', {
					y: 48,
					scrollTrigger: {
						trigger: '.advantages',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.4,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				titleParallax();
			};

			init();
		})();
	}
	function prosSectionAnimation() {
		let prosSection = document.querySelectorAll('.pros-section');
		if (prosSection.length === 0) return;

		return (() => {
			let prosItemsParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.pros-section__item'
				);

				ScrollTrigger.create({
					trigger: '.pros-section',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.pros-section__item', {
					yPercent: 40,
					stagger: 0.2,
					scrollTrigger: {
						trigger: '.pros-section__list',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				prosItemsParallax();
			};

			init();
		})();
	}
	function lookbooksAnimation() {
		let lookbooks = document.querySelectorAll('.lookbooks');
		if (lookbooks.length === 0) return;

		return (() => {
			let lookbooksPicturesParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.lookbook__picture'
				);

				ScrollTrigger.create({
					trigger: '.lookbooks',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.lookbook__picture', {
					yPercent: 70,
					stagger: 0.2,
					scrollTrigger: {
						trigger: '.lookbooks',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 1,
						force3D: true,
						delay: 0.8,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let lookbooksTextsParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.lookbook__text'
				);

				ScrollTrigger.create({
					trigger: '.lookbooks',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.lookbook__text', {
					yPercent: 150,
					stagger: 0.3,
					scrollTrigger: {
						trigger: '.lookbooks',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 2,
						force3D: true,
						onStart: () => {
							ScrollTrigger.refresh();
						},
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				lookbooksPicturesParallax();
				lookbooksTextsParallax();
			};

			init();
		})();
	}
	function bubbleAnimation() {
		let bubble = document.querySelectorAll('.bubble');
		if (bubble.length === 0) return;
		return (() => {
			let growBubble = () => {
				const tl = gsap.timeline({
					ease: 'power4',
					scrollTrigger: {
						trigger: '.bubble__inner',
					},
				});

				tl.set('.bubble', {
					willChange: 'clip-path',
				});

				tl.from('.bubble', {
					clipPath: 'circle(0%)',
					duration: 3.9,
				});

				tl.set('.bubble', {
					willChange: 'auto',
				});
			};

			let smallBubbleParallax = () => {
				const willChangeElements = document.querySelectorAll(
					'.color-section__upper-bubble'
				);

				ScrollTrigger.create({
					trigger: '.color-section',
					// once: true,
					onToggle: (self) => {
						if (self.isActive) {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.add('will-change');
							}
						} else {
							for (const willChangeElement of willChangeElements) {
								willChangeElement.classList.remove(
									'will-change'
								);
							}
						}
					},
				});

				gsap.from('.color-section__upper-bubble', {
					yPercent: 30,
					scrollTrigger: {
						trigger: '.color-section',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: 2,
					},
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});
			};

			let init = () => {
				smallBubbleParallax();
				growBubble();
			};

			init();
		})();
	}
	function footerAnimation() {
		let footer = document.querySelectorAll('.contact-us._footer');
		if (footer.length === 0) return;

		return (() => {
			let footerScrub = () => {
				const tl = gsap.timeline({
					ease: 'power4',
					scrollTrigger: {
						trigger: '._footer',
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: true,
						force3D: true,
					},
				});

				tl.set('._footer .contact-us__inner', {
					willChange: 'transform',
				});

				tl.from('._footer .contact-us__inner', {
					yPercent: -50,
					onStart: () => {
						ScrollTrigger.refresh();
					},
				});

				tl.set('._footer .contact-us__inner', {
					willChange: 'auto',
				});
			};

			let init = () => {
				setTimeout(() => {
					footerScrub();
				}, 500);
			};

			init();
		})();
	}

	let animationInit = () => {
		introAnimation();
		aboutSliderAnimation();
		numbersAnimation();
		videoSectionAnimation();
		contactUsAnimation();
		categoriesAnimation();
		collectionsAnimation();
		subscribeAnimation();
		productSectionAnimation();
		advantagesSectionAnimation();
		prosSectionAnimation();
		lookbooksAnimation();
		bubbleAnimation();
		footerAnimation();
	};

	let mediaHandler = () => {
		if (!mq.matches) {
			animationInit();
		}
	};

	// Инициализация
	let init = () => {
		GSAPInit();

		mediaHandler();

		_setupListeners();
	};

	// Навешивание событий
	let _setupListeners = () => {};

	// Доступные методы
	// gsap.ticker.fps(120);
	gsap.ticker.lagSmoothing(500, 33);

	init();
};
