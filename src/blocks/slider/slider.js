import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';

(() => {
	let swiper;
	const wrapper = document.querySelector('.swiper-wrapper');
	const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
	const buttons = wrapper.querySelectorAll('a.down');

	const enableSwiper = () => {
		swiper = new Swiper(".slider.swiper", {
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
			}
		});
	}

	const slideNext = () => swiper.slideNext();
	
	enquire.register("screen and (min-width: 960px)", {
		match : function() {
			enableSwiper();
			buttons.forEach((button) => button.addEventListener('click', slideNext));
		},
		unmatch : function() {
			if (swiper !== undefined ) {
				swiper.destroy(true, false);
				[wrapper, ...slides].forEach((item) => item.removeAttribute('style'));
				buttons.forEach((button) => button.removeEventListener('click', slideNext));
			} 
		}
	});


})();