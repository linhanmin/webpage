function anchor(i) {
	$('html, body').animate({
		scrollTop: $(i).offset().top - 65
	}, 600);
};

$(window).scroll(function() {
	//index
	if ($(window).scrollTop() <= $(window).height()) {
		am = $(window).scrollTop() / $(window).height();
		$('nav').removeClass('active');
	} else {
		am = 0;
		$('nav').addClass('active');
	}
	$('.a1, .a4').css({
		'left': -am*300 + 'px'
	});
	$('.a2, .a3').css({
		'right': -am*300 + 'px'
	});
	$('.a1, .a2').css({
		'top': 50 -am*150 + 'px'
	});
	$('.a3, .a4').css({
		'bottom': -am*150 + 'px'
	});
	//about
	if ($(window).scrollTop() > $(window).height() - 100) {
		$('.about').addClass('active');
	}
	if ($(window).scrollTop() < 100) {
		$('.about').removeClass('active');
	}
	//skill
	if ($(window).scrollTop() > $('.skill').offset().top - 100) {
		$('.skill').addClass('active');
	}
	if ($(window).scrollTop() < 100) {
		$('.skill').removeClass('active');
	}
});

$(function(){
	var ww = $('.wrapper').width(),
		wh = $(window).height(),
		am;
	$('.index').height(wh);
	$('.title').css({
		'margin-top': (wh - $('.title').height()) / 2 + 'px'
	});
});