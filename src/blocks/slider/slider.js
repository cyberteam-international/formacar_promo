import { scrollClassToggle } from "../../js/libs/scroll";
import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';

(() => {
	let swiper;
	const wrapper = document.querySelector('.slider > .swiper-wrapper');
	const buttons = wrapper.querySelectorAll('a.down');
	const toggle = scrollClassToggle({ class: 'showed' });

	const classToggle = (sw) => {
		sw.slides.forEach((slide, index) => {
			slide.querySelectorAll('[data-animation]').forEach((item) => {
				item.classList[(index === sw.activeIndex) ? 'add': 'remove']('showed');
			});
		});
	}

	const enableSwiper = () => {
		return new Swiper(".slider.swiper", {
			modules: [Mousewheel, Pagination, EffectFade],
			slidesPerView: 1,
			speed: 800,
			direction: 'vertical',
			mousewheel: true,
			effect: "fade",
			fadeEffect: { crossFade: true },
			pagination: {
				el: '.slider__dots',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'active'
			},
			on: {
				afterInit: classToggle,
				activeIndexChange: classToggle
			}
		});
	}

	const slideNext = () => swiper.slideNext();
	
	enquire.register("screen and (min-width: 961px)", {
		match: function() {
			swiper = enableSwiper();
			buttons.forEach((button) => button.addEventListener('click', slideNext));
		},
		unmatch: function() {
			if (swiper !== undefined ) {
				swiper.destroy(true, true);
				buttons.forEach((button) => button.removeEventListener('click', slideNext));
			}

			toggle.init();
		}
	});

})();