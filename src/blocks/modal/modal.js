import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";
import { selectTweaker } from "../../js/libs/selectTweaker";

(() => {
	const setPlayButton = (content, video) => {
		let play = content.querySelector('.modal__play');

		if (!! video?.canPlayType) {
			video.controls = true;
			play ||= document.createElement('button');
			play.className = 'modal__play';
			play.addEventListener('click', (e) => video.play());
			content.append(play);

			['pause', 'ended', 'playing'].forEach((event) => {
				video.addEventListener(event, (e) => {
					play.classList.toggle('playing', !(video.paused || video.ended));
				});
			});
		} else {
			content.querySelectorAll('video').forEach((video) => video.pause());
			play?.remove();
		}
	}

	const modal = makeModalFrame({ 
		select: '[data-modal]', 
		scrollLock,
		open: function({ slideshow }) {
			const active = slideshow ? '.active': '';
			setPlayButton(this, this.querySelector(`video${active}`));
			selectTweaker(this.querySelectorAll('.form__field_select'));

			this.querySelectorAll('.form__field').forEach(field => {
				field.addEventListener('click', () => field.classList.remove('form__field_error'));
				field.querySelector('textarea')?.addEventListener('input', function() {
					this.style.height = Math.max(this.scrollHeight, this.offsetHeight) + 'px';
				}); 
			});
		},
		move: function() {
			setPlayButton(this, this.querySelector('video.active'));
		}
	});

	modal.body.addEventListener('swiped-left', (e) => modal.move(-1));
	modal.body.addEventListener('swiped-right', (e) => modal.move());

})();