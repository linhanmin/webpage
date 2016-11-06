$.fn.carousel = function(settings) {
	var config = {
		groupA: [4, 3, 2, 1],
		groupB: [1240, 964, 688],
		animateSpeed: 800,
		autoplaySpeed: 8000,
		autoplay: false,
		positionDisplay: true,
		arrowDisplay: false
	};

	if (settings) $.extend(config, settings);

	function carouselResize(ww) {
		//news carousel
		if (ww >= 1240) {
			$('.news .carousel, .news .carousel_item').css('width', 1115);
		} else if (964 <= ww && ww < 1240) {
			$('.news .carousel, .news .carousel_item').css('width', 836);
		} else if (688 <= ww && ww < 964) {
			$('.news .carousel, .news .carousel_item').css('width', 557);
		} else {
			$('.news .carousel, .news .carousel_item').css('width', 278);
		};
		//speaker carousel
		if (ww >= 1010) {
			$('.speaker .carousel, .speaker .carousel_item').css('width', 1004);
			$('.speaker .carousel, .speaker .carousel_wrap').css('height', 700);
			$('.speaker .link_btn').hide();
		} else if (759 <= ww && ww < 1010) {
			$('.speaker .carousel, .speaker .carousel_item').css('width', 753);
			$('.speaker .carousel, .speaker .carousel_wrap').css('height', 700);
			$('.speaker .link_btn').hide();
		} else if (508 <= ww && ww < 759) {
			$('.speaker .carousel, .speaker .carousel_item').css('width', 502);
			$('.speaker .carousel, .speaker .carousel_wrap').css('height', 700);
			$('.speaker .link_btn').hide();
		} else {
			$('.speaker .carousel, .speaker .carousel_item').css('width', 251);
			$('.speaker .carousel, .speaker .carousel_wrap').css('height', 350);
			$('.speaker .link_btn').show();
		};
		//brochure
		if (ww >= 1120) {
			$('.brochure').width(1120);
		} else if (560 <= ww && ww < 1120) {
			$('.brochure').width(560);
		} else {
			$('.brochure').width(280);
		}
	};

	var $this = this,
		array = [],
		arrayDiv = $this.find('.carousel_scroll>div'),
		arrayLength = arrayDiv.length,
		$carousel = $this.find('.carousel'),
		$slides = $carousel.find('.carousel_scroll'),
		$position = $carousel.find('.position');

	for (var i = 0; i < arrayLength; ++i) {
		array.push(arrayDiv.eq(i).html());
	};

	function carouselStart(ww) {
		$slides.html(function() {
			var sc = '<div class="carousel_item">';
			for (var i = 0, j = 0; i < arrayLength; ++i) {
				sc += '<div>' + array[i] + '</div>';
				++j;
				if (j == group && i != arrayLength - 1) {
					j = 0;
					sc += '</div><div class="carousel_item">';
				} else if (i == arrayLength - 1) {
					sc += '</div>'
					break;
				};
			};
			return sc;
		});

		var $slide = $slides.children('div'),
			$index = $slide.length - 1,
			$width = $slide.innerWidth();

		$position.html(function() {
			var pc = '';
			for (var i = 0; i <= $index; ++i) {
				pc += '<li></li>';
			};
			return pc;
		});

		if ($index > 0) {
			if (config.positionDisplay) {
				$this.find('.position').show();
			};
			if (config.arrowDisplay) {
				$this.find('.position_prev').show();
				$this.find('.position_next').show();
			};
		} else {
			$this.find('.position').hide();
			$this.find('.position_prev').hide();
			$this.find('.position_next').hide();
		};
		if ($index > 1) {
			$slide.slice($index).clone().prependTo($slides);
			$slide.slice(0, 1).clone().appendTo($slides);
		};

		$slides.css('left', -$width);

		var $numberLi = $position.find('li');
		$numberLi.click(function() {
			var _index = $numberLi.filter('.on').index(),
				$width = $slide.innerWidth();
			$(this).addClass('on').siblings('.on').removeClass('on');
			if ($index > 1) {
				if (_index == $index && $(this).index() == 0) {
					$slides.stop().animate({
						left: $width * (-$index - 2)
					}, config.animateSpeed, function() {
						$slides.css('left', -$width);
					});
				} else if (_index == 0 && $(this).index() == $index) {
					$slides.stop().animate({
						left: 0
					}, config.animateSpeed, function() {
						$slides.css('left', $width * (-$index - 1));
					});
				} else {
					$slides.stop().animate({
						left: $width * ($(this).index() + 1) * -1
					}, config.animateSpeed);
				};
			} else {
				$slides.stop().animate({
					left: $width * ($(this).index()) * -1
				}, config.animateSpeed);
			};
		}).eq(0).click();

		$carousel.find('.position_prev').click(function() {
			var _index = $numberLi.filter('.on').index();
			$numberLi.eq((_index - 1 + $numberLi.length) % $numberLi.length).click();
		});
		$carousel.find('.position_next').click(function() {
			var _index = $numberLi.filter('.on').index();
			$numberLi.eq((_index + 1) % $numberLi.length).click();
		});

		carouselResize(ww);
	};
	var ww = $('.wrapper').width(), //扣除scrollbar width
		group = config.groupA[0],
		_group = group;
	for (var i = 0; i < config.groupB.length; ++i) {
		if (ww < config.groupB[i]) {
			group = config.groupA[i + 1];
		};
	};
	carouselStart(ww);
	$(window).resize(function() {
		ww = $('.wrapper').width();
		_group = config.groupA[0];
		for (var i = 0; i < config.groupB.length; ++i) {
			if (ww < config.groupB[i]) {
				_group = config.groupA[i + 1];
			};
		};
		if (group != _group) {
			group = _group;
			carouselStart(ww);
		}
	});

	if (config.autoplay) {
		var ak = true;
		$(window).scroll(function() {
			if (ak && $(window).scrollTop() >= $this.offset().top) {
				ak = false;
				var $next = $this.find('.position_next'),
					timer = setInterval(function() {
						$next.click();
					}, config.autoplaySpeed);
				$this.hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(function() {
						$next.click();
					}, config.autoplaySpeed);
				});
			};
		});
	};
};

function detectWindow() {
	var ww = $('.wrapper').width(),
		wh = $(window).height(),
		ratio = ww / wh;
	//console.log(ww);
	//console.log(ratio);
	$('.bgvideo, .bgfilter').height(wh);
	if (ratio > 1.78) {
		$('.bgvmove').css({
			'top': ((ww / 1.78) - wh) / -2,
			'left': 0
		});
		$('video').css({
			'width': ww,
			'height': 'auto'
		});
	} else {
		$('.bgvmove').css({
			'top': 0,
			'left': ((wh * 1.78) - ww) / -2
		});
		$('video').css({
			'width': 'auto',
			'height': wh
		});
	};

	if (ww < 650) {
		$('.p1_logo>div').css({
			'width': ww / 650 * 420,
			'height': ww / 650 * 286
		});
		$('.p1_text p').css({
			'font-size': ww / 650 * 33 + 'px',
			'line-height': ww / 650 * 42 + 'px'
		});
		$('.p1_text p span').css({
			'font-size': ww / 650 * 26 + 'px'
		});
		$('.p1_text2').css({
			'font-size': ww / 650 * 24 + 'px'
		});
	} else {
		$('.p1_logo>div').css({
			'width': 420,
			'height': 286
		});
		$('.p1_text p').css({
			'font-size': 33 + 'px',
			'line-height': 42 + 'px'
		});
		$('.p1_text p span').css({
			'font-size': 26 + 'px'
		});
		$('.p1_text2').css({
			'font-size': 24 + 'px'
		});
	};
	if (wh > $('.p1').height() + 132) {
		$('.p1').css('top', (wh - $('.p1').height()) / 2);
	} else {
		$('.p1').css('top', 67);
	};
	if (ww >= 960) {
		$('.agenda ul').css('width', 960);
	} else if (800 <= ww && ww < 960) {
		$('.agenda ul').css('width', 800);
	} else if (640 <= ww && ww < 800) {
		$('.agenda ul').css('width', 640);
	} else if (480 <= ww && ww < 640) {
		$('.agenda ul').css('width', 480);
	} else {
		$('.agenda ul').css('width', 320);
	};
};

function anchor(i) {
	$('html, body').animate({
		scrollTop: $(i).offset().top - 132
	}, 600);
};

function lightbox() {
	$('.lightbox_target').addClass('active');
};

$(window).resize(function() {
	detectWindow();
});

$(function() {
	detectWindow();

	$('.down_arrow').click(function() {
		$('html, body').animate({
			scrollTop: $(window).height()
		}, 800);
	});

	var mn = 0;
	$('.m_menu').click(function() {
		$(this).toggleClass('active');
		$('.menufilter').toggle();
		mn++;
		if (mn % 2 == 0) {
			$('.menu').slideUp(400, function() {
				$(this).removeAttr('style')
			});
		} else {
			$('.menu').slideDown();
		};
	});
	$('.menufilter').click(function() {
		$('.m_menu').click();
	});

	$('.lightbox_bg').click(function() {
		$('.lightbox_target').removeClass('active');
	});

	//sponsor_carousel
	var index_sponsor = true;
	$(window).scroll(function() {
		if (index_sponsor) {
			if ($(this).scrollTop() + $(window).height() > $('.sponsor_carousel').offset().top) {
				index_sponsor = false;
				var scw = $('.sponsor_carousel').width(),
					scl = $('.sc_scroll figure').length,
					scd = 360 / scl,
					sctz = Math.round((scw / 2) / Math.tan(Math.PI / 360 * scd)),
					scn = 0;
				$('.sc_scroll').css({
					'-webkit-transform': 'translateZ(' + sctz * -1 + 'px) rotateY(0deg)',
					'transform': 'translateZ(' + sctz * -1 + 'px) rotateY(0deg)'
				});
				for (var i = 0; i < scl; ++i) {
					$('.sponsor_carousel figure').eq(i).css({
						'-webkit-transform': 'rotateY(' + scd * i + 'deg) translateZ(' + sctz + 'px)',
						'transform': 'rotateY(' + scd * i + 'deg) translateZ(' + sctz + 'px)'
					});
				};
				$('.sponsor .position_prev').click(function() {
					++scn;
					$('.sc_scroll').css({
						'-webkit-transform': 'translateZ(' + sctz * -1 + 'px) rotateY(' + scn * scd + 'deg)',
						'transform': 'translateZ(' + sctz * -1 + 'px) rotateY(' + scn * scd + 'deg)'
					});
				});
				$('.sponsor .position_next').click(function() {
					--scn;
					$('.sc_scroll').css({
						'-webkit-transform': 'translateZ(' + sctz * -1 + 'px) rotateY(' + scn * scd + 'deg)',
						'transform': 'translateZ(' + sctz * -1 + 'px) rotateY(' + scn * scd + 'deg)'
					});
				});
				timer = setInterval(function() {
					$('.sponsor .position_next').click();
				}, 5000);
				$('.sponsor').hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(function() {
						$('.sponsor .position_next').click();
					}, 5000);
				});
			}
		}
	});

	// var index_sponsor = true;
	// $(window).scroll(function() {
	// 	if (index_sponsor) {
	// 		if ($(this).scrollTop() + $(window).height() > $('.sponsor_carousel').offset().top) {
	// 			index_sponsor = false;
	// 			var speed = 15,
	// 				timer,
	// 				m = $('.sc_scroll'),
	// 				m_w = m.innerWidth(),
	// 				left = $('.sponsor').width() / 2 - m_w;
	// 			// $('.sponsor').height() = m.height();
	// 			m.find('a').clone().appendTo('.sc_scroll');

	// 			function picMarquee() {
	// 				if (m_w + left <= 0) {
	// 					left = 0;
	// 				} else {
	// 					left--;
	// 				}
	// 				m.css('left', left);
	// 			}
	// 			timer = setInterval(picMarquee, speed);
	// 			m.onmouseover = function() {
	// 				clearInterval(timer);
	// 			};
	// 			m.onmouseout = function() {
	// 				timer = setInterval(picMarquee, speed);
	// 			};
	// 		}
	// 	}
	// });

	//b2b
	$('.b2b_input select').mousedown(function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').find('option').eq(0).remove();
		}
	});

	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		//alert(userAgentInfo);
		var Agents = ["Mobile", "Android", "iPhone"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	var x = IsPC();
	if (x === false) {
		$('.news').carousel();
		$('.speaker').carousel({
			groupA: [8, 6, 4, 1],
			groupB: [1010, 759, 508]
		});

		$.fn.touchwipe = function(settings) {
			var config = {
				min_move_x: 20,
				min_move_y: 20,
				wipeLeft: function() {},
				wipeRight: function() {},
				wipeUp: function() {},
				wipeDown: function() {},
				preventDefaultEvents: false
			};

			if (settings) $.extend(config, settings);

			this.each(function() {
				var startX,
					startY,
					isMoving = false;

				function cancelTouch() {
					this.removeEventListener('touchmove', onTouchMove);
					startX = null;
					isMoving = false;
				}

				function onTouchMove(e) {
					if (config.preventDefaultEvents) {
						e.preventDefault();
					}
					if (isMoving) {
						var x = e.touches[0].pageX;
						var y = e.touches[0].pageY;
						var dx = startX - x;
						var dy = startY - y;
						if (Math.abs(dx) >= config.min_move_x) {
							cancelTouch();
							if (dx > 0) {
								config.wipeLeft();
							} else {
								config.wipeRight();
							}
						} else if (Math.abs(dy) >= config.min_move_y) {
							cancelTouch();
							if (dy > 0) {
								config.wipeDown();
							} else {
								config.wipeUp();
							}
						}
					}
				}

				function onTouchStart(e) {
					if (e.touches.length == 1) {
						startX = e.touches[0].pageX;
						startY = e.touches[0].pageY;
						isMoving = true;
						this.addEventListener('touchmove', onTouchMove, false);
					}
				}

				if ('ontouchstart' in document.documentElement) {
					this.addEventListener('touchstart', onTouchStart, false);
				}
			});

			return this;
		};

		$('.news').touchwipe({
			wipeRight: function() {
				$('.news').find('.position_prev').click();
			},
			wipeLeft: function() {
				$('.news').find('.position_next').click();
			}
		});
		$('.speaker').touchwipe({
			wipeRight: function() {
				$('.speaker').find('.position_prev').click();
			},
			wipeLeft: function() {
				$('.speaker').find('.position_next').click();
			}
		});
		$('.sponsor').touchwipe({
			wipeRight: function() {
				$('.sponsor').find('.position_prev').click();
			},
			wipeLeft: function() {
				$('.sponsor').find('.position_next').click();
			}
		});
		$('.position_prev, .position_next').hide();

		$('.bgvmove').hide();
		$('.bgfilter').css({
			'background': 'url(/video/bgvideo.jpg) no-repeat 0 0',
			'background-size': 'cover',
			'background-position': 'center'
		});

		$('.speaker .carousel_item>div').click(function() {
			$(this).toggleClass('active');
		});

		$('.b2b_input select').addClass('mobile');

		$('.brochure').addClass('active');
	} else {
		$('.news').carousel({
			autoplay: false,
			arrowDisplay: true
		});
		$('.speaker').carousel({
			groupA: [8, 6, 4, 1],
			groupB: [1010, 759, 508],
			autoplay: false,
			arrowDisplay: true
		});

		$('.speaker .carousel_item>div').hover(function() {
			$(this).addClass('active');
		}, function() {
			$(this).removeClass('active');
		});
	};
});