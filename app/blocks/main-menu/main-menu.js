import $ from 'jquery';

module.exports = function () {
	var burger = $('.btn-burger');
	var cross = $('.btn-cross');
	var mainNav = $('.main-menu');
	var mainItem = $('.main-menu__item:not(.main-menu__logo)');
	var mainMargin;
	
	$(burger).click(function () {
		console.log('work');
		mainMargin = $(mainNav).css('margin-top').slice(0, -2);
		if (mainMargin > 0){
			$(mainNav).css({
				'margin-top':'0',
				'transition': 'ease-in-out 0.6s'
			});
			$(document).scrollTop('0');
		} else {
			$(mainNav).css({
				'margin-top':'68.4vw',
				'transition': 'ease-in-out 0.6s'
			});
		}
	});
	
	$(cross).click(function () {
		$(mainNav).css({
			'margin-top':'0',
			'transition': 'ease-in-out 0.6s'
		});
	});
}