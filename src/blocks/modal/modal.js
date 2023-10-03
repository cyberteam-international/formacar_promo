import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";

(() => {

	const modal = makeModalFrame({ 
		select: '.screen__image', 
		scrollLock
	});
})();