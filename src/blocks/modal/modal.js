import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";

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
		},
		move: function() {
			setPlayButton(this, this.querySelector('video.active'));
		}
	});

	modal.body.addEventListener('swiped-left', (e) => modal.move(-1));
	modal.body.addEventListener('swiped-right', (e) => modal.move());

})();