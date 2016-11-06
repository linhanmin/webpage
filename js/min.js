function anchor(i) {
	$('html, body').animate({
		scrollTop: $(i).offset().top - 50
	}, 600);
};

function indexResize() {
	// index
	var wh = $(window).height(),
		am;
	$('.index').height(wh);
	$('.title').css({
		'margin-top': wh / 2 - 36 + 'px'
	});
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
}

function windowVisible(o) {
	var windowTop = $(window).scrollTop(),
		windowBottom = windowTop + $(window).height(),
		targetTop = $(o).offset().top,
		targetBottom = targetTop + $(o).height();
	if (windowBottom < targetTop || windowTop > targetBottom) {
		return false;
	} else {
		return true;
	}
}

function effectSwitch() {
	// about
	if (windowVisible('.about')) {
		$('.about').addClass('active');
	} else {
		$('.about').removeClass('active');
	}
	// skill
	if (windowVisible('.skill')) {
		$('.skill').addClass('active');
	} else {
		$('.skill').removeClass('active');
	}
}

$(window).scroll(function() {
	indexResize();
	effectSwitch();
});

$(window).resize(function() {
	indexResize();
	effectSwitch();
});

$(function(){
	indexResize();
	effectSwitch();
	// works
	jQuery.extend( jQuery.easing, {
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
	});
	$('.works .w2').hover(function(){
		$(this).stop().animate({'width':'110%','margin-left':'-5%'}, {duration:300,easing:'easeOutQuart'});
	},function(){
		$(this).stop().animate({'width':'100%','margin-left':'0'}, {duration:300,easing:'easeOutQuart'});
	});
});