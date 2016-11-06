$(document).ready(function (e) {

	var myScroll = new iScroll('wrapper'),
		panelList = new iScroll('panelWrap');

	function reScroll() {
		myScroll.refresh();
		panelList.refresh();
		setTimeout(function(){ reScroll() }, 1000);
	}

	function pc_float() {
		var t1 = $('.copyright').offset(),
			t2 = $('.pc_float2').offset();
		if (t2 != null) {
			if (t1.top - 64 <= t2.top) {
				$('.pc_float2').stop(true, true).animate({ bottom: "64px" }, 500);
			} else if (t1.top > t2.top + 128) {
				$('.pc_float2').stop(true, true).animate({ bottom: 0 }, 500);
			};
			setTimeout(function(){ pc_float() }, 500);
		}
	}

	function detectWindow() {
		var _h = $(window).innerHeight();
		$(".page, .side").innerHeight(_h);
		$("#wrapper").innerHeight(_h - 38);
		$("#panelWrap").innerHeight(_h - 40);
		$(".mainWrap_c").css('min-height', $(window).innerHeight() - $(".headerZone").innerHeight() - $(".copyright").innerHeight() - 10);
		$('.cartthx_r').css({
			'height': $('.cartthx_l').height() * 0.9,
			'top': $('.cartthx_l').height() * 0.05
		});
		//$('.banner_8').css('height', $('.blockLists > ul li').eq(6).height() * 0.235 + 'px');
		$('.banner_8 a').css('line-height', $('.blockLists').find('.block_1').eq(6).height() * 0.235 + 'px');
		$('.banner_8 + .banner_8').css('margin-top', $('.blockLists').find('.block_1').eq(6).height() * 0.02 + 'px');

		var swlre = $('.swipe-wrap div').length;
		if ($(window).width() <= 800) {
			$('.index_banner').css({ 'height': $(window).width() * 3 / 8, 'max-height': 300 });
			$('.swipe-wrap > div > a > img').css({ 'width': $(window).width(), 'max-width': 800 });
			$('.swipe-wrap').css('width', $(window).width() * (swlre + 4));
			$('.swipe').css('margin-left', $(window).width() * -2);
			$('.cartthx_r p').css({
				'margin-top': (($(window).width() - 300) / 500 * 4) + '%',
				'margin-bottom': (($(window).width() - 300) / 500 * 4) + '%',
				'line-height': (($(window).width() - 300) / 5 + 100) + '%'
			});
		} else {
			$('.index_banner').css({ 'height': 300, 'max-height': $('.mainWrap').width() * 3 / 8 });
			$('.swipe-wrap > div > a > img').css({ 'width': 800, 'max-width': $('.mainWrap').width() });
			$('.swipe-wrap').css('width', 810 * (swlre + 4));
			$('.swipe').css('margin-left', -2025);
			$('.cartthx_r p').css({
				'margin-top': 4 + '%',
				'margin-bottom': 4 + '%',
				'line-height': 200 + '%'
			});
		}
		$('#position li.on').click();
	}

	reScroll();
	detectWindow();
	window.setTimeout(pc_float, 2000);

	$(window).resize(function(){
		detectWindow();
	});
	$(window).load(function(){
		$('.cartthx_r').css({
			'height': $('.cartthx_l').height() * 0.9,
			'top': $('.cartthx_l').height() * 0.05
		});
		//$('.banner_8').css('height', $('.blockLists').find('.block_1').eq(6).height() * 0.235 + 'px');
		$('.banner_8 a').css('line-height', $('.blockLists').find('.block_1').eq(6).height() * 0.235 + 'px');
		$('.banner_8 + .banner_8').css('margin-top', $('.blockLists').find('.block_1').eq(6).height() * 0.02 + 'px');
	});

	$.fn.touchwipe = function (settings) {
		var config = {
			min_move_x: 20,
			min_move_y: 20,
			wipeLeft: function(){ },
			wipeRight: function(){ },
			wipeUp: function(){ },
			wipeDown: function(){ },
			preventDefaultEvents: true
		};

		if (settings) $.extend(config, settings);

		this.each(function(){
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

	//menus-side
	$(".header_btn_left").click(function(){
		$(".page").toggleClass("active_leftpanel");
		$("#side_left_click").toggle();
	});
	$(".header_btn_right").click(function(){
		$(".page").toggleClass("active_rightpanel");
		$("#side_right_click").toggle();
	});
	$("#side_left_click").click(function(){
		$(".header_btn_left").click();
	});
	$("#side_right_click").click(function(){
		$(".header_btn_right").click();
	});
	$("#side_left_click").touchwipe({
		wipeLeft: function(){ $(".header_btn_left").click(); }
	});
	$("#side_right_click").touchwipe({
		wipeRight: function(){ $(".header_btn_right").click(); }
	});

	//swipe
	var $index2 = $('.swipe-wrap div').length - 1,
		_width2 = $('.swipe-wrap div').innerWidth();

	for (var i = $index2; i >= 0; i--) {
		$('<li></li>').appendTo('ul#position');
	};

	if ($index2 > 0) {
		$('.swipe-wrap').find('div').slice($index2 - 1).clone().prependTo('.swipe-wrap');
		$('.swipe-wrap').find('div').slice(2, 4).clone().appendTo('.swipe-wrap');
	} else {
		$('.swipe-wrap').find('div').clone().prependTo('.swipe-wrap').clone().prependTo('.swipe-wrap').clone().prependTo('.swipe-wrap').clone().prependTo('.swipe-wrap');
	};

	var $slides2 = $('.swipe-wrap'),
		$numberLi2 = $('#position').find('li'),
		_animateSpeed2 = 600;

	$numberLi2.click(function(){
		var _width2 = $('.swipe-wrap div').width(),
			$this2 = $(this),
			_index2 = $numberLi2.filter('.on').index();
		$this2.addClass('on').siblings('.on').removeClass('on');
		if ($index2 > 1) {
			if (_index2 == $index2 && $this2.index() == 0) {
				$slides2.stop().animate({
					left: _width2 * (-$index2 - 1)
				}, _animateSpeed2, function(){
					$slides2.css('left', 0);
				});
			} else if (_index2 == 0 && $this2.index() == $index2) {
				$slides2.stop().animate({
					left: _width2
				}, _animateSpeed2, function(){
					$slides2.css('left', _width2 * (-$index2));
				});
			} else {
				$slides2.stop().animate({
					left: _width2 * $this2.index() * -1
				}, _animateSpeed2);
			};
		} else if ($index2 == 1) {
			$slides2.stop().animate({
				left: _width2 * $this2.index() * -1
			}, _animateSpeed2);
		};
		return false;
	}).eq(0).click();

	$('ul#position_control2 li').click(function(){
		var _index2 = $numberLi2.filter('.on').index();
		$numberLi2.eq((this.className.indexOf('next') > -1 ? _index2 + 1 : _index2 - 1 + $numberLi2.length) % $numberLi2.length).click();

		return false;
	});

	$('.index_banner').touchwipe({
		wipeRight: function ()
		{
			var i = $("ul#position").find("li.on").index();
			if($index2!=0)
			{
				if(i==0)
				{
					i = $index2;
				}
				else
				{
					i = i - 1;
				}
				$('#position').find('li').eq(i).click();//$('ul#position_control li.next').click();
			}
		},
		wipeLeft: function ()
		{
			var i = $("ul#position").find("li.on").index();
			if($index2!=0)
			{
				if(i==$index2)
				{
					i = 0;
				}
				else
				{
					i= i + 1;
				}
				$('#position').find('li').eq(i).click();//$('ul#position_control li.prev').click();
			}
		}
	});

	//天折
	/*var $index = $('.main2 div.discount_groups_s').length - 1,
		_width = $('.main2 div.discount_groups_s').innerWidth();

	for (var i = $index; i >= 0; i--) {
		$('<li></li>').appendTo('ul#position2');
	};

	$('.main2').css('width', ($index + 1) * _width * 3);
	$('.main2').css('margin-left', ($index + 1.5) * _width * -1);

	$('.main2').children('div').clone().appendTo('.main2').clone().appendTo('.main2');

	var $slides = $('.main2'),
		$numberLi = $('#position2').find('li'),
		_width = $('.main2 .discount_groups_s').width(),
		timer,
		_animateSpeed = 600,
		_showSpeed = 3000,
		_stop = false;

	$numberLi.on( "click", function(){

		var $this = $(this),
			_index = $numberLi.filter('.on').index();
		$this.addClass('on').siblings('.on').removeClass('on');
		clearTimeout(timer);
		if (_index == $index && $this.index() == 0) {
			$slides.stop().animate({
				left: _width * (-$index2 - 1)
			}, _animateSpeed, function(){
				$slides.css('left', 0);
				if (!_stop) timer = setTimeout(move, _showSpeed);
			});
		} else if (_index == 0 && $this.index() == $index) {
			$slides.stop().animate({
				left: _width
			}, _animateSpeed, function(){
				$slides.css('left', _width * (-$index2));
				if (!_stop) timer = setTimeout(move, _showSpeed);
			});
		} else {
			$slides.stop().animate({
				left: _width * $this.index() * -1
			}, _animateSpeed, function(){
				if (!_stop) timer = setTimeout(move, _showSpeed);
			});
		};
		return false;
	});

	$('ul#position_control li').click(function(){
		var _index = $numberLi.filter('.on').index();
		$numberLi.eq((this.className.indexOf('next') > -1 ? _index + 1 : _index - 1 + $numberLi.length) % $numberLi.length).click();

		return false;
	});

	$slides.hover(function(){
		_stop = true;
		clearTimeout(timer);
	}, function(){
		_stop = false;
		timer = setTimeout(move, _showSpeed);
	});

	function move() {
		$('ul#position_control li.next').click();
	}

	$(".main2").touchwipe({
		wipeRight: function ()
		{
			var i = $("ul#position2").find("li.on").index();
			if(i==0)
			{
				i = $index;
			}
			else
			{
				i = i - 1;
			}
			$('#position2').find('li').eq(i).click();//$('ul#position_control li.next').click();
		},
		wipeLeft: function ()
		{
			var i = $("ul#position2").find("li.on").index();
			if(i==$index)
			{
				i = 0;
			}
			else
			{
				i= i + 1;
			}
			$('#position2').find('li').eq(i).click();//$('ul#position_control li.prev').click();
		}
	});*/

	//TV Live
	var n;

	//pc_swipe
	var $index3 = $('.swipe-wrap2 div').length - 1,
		_width3 = $('.swipe-wrap2 div').innerWidth();

	if ($index3 > 0) {
		for (var i = $index3; i >= 0; i--) {
			$('<li></li>').appendTo('ul#position3');
		};

		$('.swipe-wrap2').find('div').clone().appendTo('.swipe-wrap2').clone().appendTo('.swipe-wrap2');

		$('.swipe-wrap2').css({
			'width': _width3 * ($index3 + 1) * 3,
			'margin-left': _width3 * ($index3 + 1.5) * -1
		});
	} else {
		$('.swipe-wrap2').css({
			'width': _width3,
			'margin-left': _width3 * -0.5
		});
	};


	var $slides3 = $('.swipe-wrap2'),
		$numberLi3 = $('#position3').find('li'),
		_animateSpeed3 = 600;

	$numberLi3.click(function(){
		var $this3 = $(this),
			_index3 = $numberLi3.filter('.on').index();
		$this3.addClass('on').siblings('.on').removeClass('on');
		if ($index3 == 1) {
			$slides3.stop().animate({
				left: _width3 * $this3.index() * -1
			}, _animateSpeed3);
		} else {
			if (_index3 == $index3 && $this3.index() == 0) {
				$slides3.stop().animate({
					left: _width3 * (-$index3 - 1)
				}, _animateSpeed3, function(){
					$slides3.css('left', 0);
				});
			} else if (_index3 == 0 && $this3.index() == $index3) {
				$slides3.stop().animate({
					left: _width3
				}, _animateSpeed3, function(){
					$slides3.css('left', _width3 * -$index3);
				});
			} else {
				$slides3.stop().animate({
					left: _width3 * $this3.index() * -1
				}, _animateSpeed3);
			};
		};
		return false;
	}).eq(0).click();

	$('ul#position_control3 li').click(function(){
		var _index3 = $numberLi3.filter('.on').index();
		$numberLi3.eq((this.className.indexOf('next') > -1 ? _index3 + 1 : _index3 - 1 + $numberLi3.length) % $numberLi3.length).click();

		return false;
	});

	$('.pc_swipe').touchwipe({
		wipeLeft: function(){
			if ($index3 == 1) {
				var $slides3 = $('.swipe-wrap2'),
					_animateSpeed3 = 600,
					_width3 = $('.swipe-wrap2 div').innerWidth(),
					$this3 = $('#position3').find('li').not('.on'),
					_index3 = $('#position3').find('li').filter('.on');
				$this3.addClass('on').siblings('.on').removeClass('on');
				if ($this3.index() == 0) {
					$slides3.stop().animate({
						left: _width3 * -2
					}, _animateSpeed3, function(){
						$slides3.css('left', 0);
					});
				} else {
					$slides3.stop().animate({
						left: _width3 * -1
					}, _animateSpeed3);
				};
			} else {
				$('ul#position_control3 li.next').click();
			};
		},
		wipeRight: function(){
			if ($index3 == 1) {
				var $slides3 = $('.swipe-wrap2'),
					_animateSpeed3 = 600,
					_width3 = $('.swipe-wrap2 div').innerWidth(),
					$this3 = $('#position3').find('li').not('.on'),
					_index3 = $('#position3').find('li').filter('.on');
				$this3.addClass('on').siblings('.on').removeClass('on');
				if ($this3.index() == 1) {
					$slides3.stop().animate({
						left: _width3
					}, _animateSpeed3, function(){
						$slides3.css('left', _width3 * -1);
					});
				} else {
					$slides3.stop().animate({
						left: 0
					}, _animateSpeed3);
				};
			} else {
				$('ul#position_control3 li.prev').click();
			};
		}
	});

	//scupioRecommandProd
	var $index4 = $('.scupioRecommandProd').length - 1,
		_width4 = $('.scupioRecommandProd').innerWidth()+8;

	if ($index4 > 0) {
		for (var i = $index4; i >= 0; i--) {
			$('<li></li>').appendTo('ul#position4');
		};

		$('.scupioRecommand_slide').find('.scupioRecommandProd').clone().appendTo('.scupioRecommand_slide').clone().appendTo('.scupioRecommand_slide');

		$('.scupioRecommand_slide').css({
			'width': _width4 * ($index4 + 1) * 3,
			'margin-left': _width4 * ($index4 + 1.5) * -1
		});
	} else {
		$('.scupioRecommand_slide').css({
			'width': _width4,
			'margin-left': _width4 * -0.5
		});
	};

	var $slides4 = $('.scupioRecommand_slide'),
		$numberLi4 = $('#position4').find('li'),
		_animateSpeed4 = 600;

	$numberLi4.click(function(){
		var $this4 = $(this),
			_index4 = $numberLi4.filter('.on').index();
		$this4.addClass('on').siblings('.on').removeClass('on');
		if ($index4 == 1) {
			$slides4.stop().animate({
				left: _width4 * $this4.index() * -1
			}, _animateSpeed4);
		} else {
			if (_index4 == $index4 && $this4.index() == 0) {
				$slides4.stop().animate({
					left: _width4 * (-$index4 - 1)
				}, _animateSpeed4, function(){
					$slides4.css('left', 0);
				});
			} else if (_index4 == 0 && $this4.index() == $index4) {
				$slides4.stop().animate({
					left: _width4
				}, _animateSpeed4, function(){
					$slides4.css('left', _width4 * -$index4);
				});
			} else {
				$slides4.stop().animate({
					left: _width4 * $this4.index() * -1
				}, _animateSpeed4);
			};
		};
		return false;
	}).eq(0).click();

	$('ul#position_control4 li').click(function(){
		var _index4 = $numberLi4.filter('.on').index();
		$numberLi4.eq((this.className.indexOf('next') > -1 ? _index4 + 1 : _index4 - 1 + $numberLi4.length) % $numberLi4.length).click();

		return false;
	});

	$('.scupioRecommand_slide').touchwipe({
		wipeRight: function ()
		{
			var i = $("ul#position4").find("li.on").index();
			if(i==0)
			{
				i = $index4;
			}
			else
			{
				i = i - 1;
			}
			$('#position4').find('li').eq(i).click();//$('ul#position_control li.next').click();
		},
		wipeLeft: function ()
		{
			var i = $("ul#position4").find("li.on").index();
			if(i==$index4)
			{
				i = 0;
			}
			else
			{
				i= i + 1;
			}
			$('#position4').find('li').eq(i).click();//$('ul#position_control li.prev').click();
		}
	});

	//六大館
	$('.s_classify span').click(function(){
		$(this).addClass('bfocus').siblings('span').removeClass('bfocus');
		var cn1 = $(this).index() - 1,
			cn2 = $(this).closest('.classify').siblings('.product').find('.product_main').eq(cn1);
		cn2.removeClass('product_main_hidden').siblings().addClass('product_main_hidden');
		cn2.children('div').eq(0).stop(true, false).fadeOut(0, 0).fadeTo(500, 1);
		cn2.children('div').eq(1).stop(true, false).fadeOut(0, 0).delay(300).fadeTo(500, 1);

		var x1 = $(this).parent().find('span').eq(0).innerWidth(),
			x2 = $(this).parent().find('span').eq(1).innerWidth(),
			x3 = $(this).parent().find('span').eq(2).innerWidth();
		if (cn1 == 0) {
			$(this).siblings('div').animate({ left: 14, width: x1 - 8 }, 500);
		} else if (cn1 == 1) {
			$(this).siblings('div').animate({ left: x1 + 15, width: x2 - 8 }, 500);
		} else if (cn1 == 2) {
			$(this).siblings('div').animate({ left: x1 + x2 + 16, width: x3 - 8 }, 500);
		};
	});
	$('.s_classify').each(function (index) {
		$(this).find('span').eq(0).click();
	});
	$('.product').each(function(){
		var $this = $(this);
		$this.touchwipe({
			wipeLeft: function(){
				var _bfocus = $this.siblings('.classify').find('.s_classify span').filter('.bfocus').index();
				if (_bfocus == 3) {
					_bfocus = 0;
				};
				$this.siblings('.classify').find('.s_classify span').eq(_bfocus).click();
			},
			wipeRight: function(){
				var _bfocus = $this.siblings('.classify').find('.s_classify span').filter('.bfocus').index();
				if (_bfocus == 1) {
					_bfocus = 4;
				};
				$this.siblings('.classify').find('.s_classify span').eq(_bfocus - 2).click();
			}
		});
	});

	//QnA
	$('.mqar span').click(function(){
		$(this).addClass('bfocus').siblings('span').removeClass('bfocus');
		var cn1 = $(this).index() - 1,
			cn2 = $(this).closest('.mqa').siblings('.mqac').find('.mqa_content').eq(cn1);
		cn2.stop(true, false).fadeOut(0, 0).fadeTo(500, 1);
		cn2.siblings().stop(true, false).fadeOut(0, 0);

		var x1 = $(this).parent().find('span').eq(0).innerWidth(),
			x2 = $(this).parent().find('span').eq(1).innerWidth(),
			x3 = $(this).parent().find('span').eq(2).innerWidth(),
			x4 = $(this).parent().find('span').eq(3).innerWidth();
		if (cn1 == 0) {
			$(this).siblings('div').animate({ left: 5, width: x1 - 8 }, 500);
		} else if (cn1 == 1) {
			$(this).siblings('div').animate({ left: x1 + 14, width: x2 - 13 }, 500);
		} else if (cn1 == 2) {
			$(this).siblings('div').animate({ left: x1 + x2 + 19, width: x3 - 13 }, 500);
		} else if (cn1 == 3) {
			$(this).siblings('div').animate({ left: x1 + x2 + x3 + 23, width: x4 - 13 }, 500);
		};
	}).eq(0).click();
	$('.mqac').touchwipe({
		wipeLeft: function(){
			var _bfocus = $('.mqar').find('span').filter('.bfocus').index();
			if (_bfocus == 4) {
				_bfocus = 0;
			};
			$('.mqar').find('span').eq(_bfocus).click();
		},
		wipeRight: function(){
			var _bfocus = $('.mqar').find('span').filter('.bfocus').index();
			if (_bfocus == 1) {
				_bfocus = 5;
			};
			$('.mqar').find('span').eq(_bfocus - 2).click();
		}
	});

	//搜尋頁頁籤
	var _showTab = 0;
	var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
	$($defaultLi.find('a').attr('href')).siblings().hide();

	$('ul.tabs li').click(function(){
		var $this = $(this),
			_clickTab = $this.find('a').attr('href');
		$this.addClass('active').siblings('.active').removeClass('active');
		$(_clickTab).stop(false, true).fadeIn().siblings().hide();

		return false;
	}).find('a').focus(function(){
		this.blur();
	});

	var ms_height = $(window).height() - 150;
	$('#more_search').css('height', ms_height);
	$('.ms_content_rl').css('height', ms_height);

	var ms_no = 0;

	$('#ms_tab').click(function(){
		$('#more_search').css('display', 'block');
		ms_no = 1;
	});
	if (ms_no = 1) {
		$('.headerZone').click(function(){
			$('#more_search').css('display', 'none');
			ms_no = 0;
		});
		$('#wrapper').click(function(){
			$('#more_search').css('display', 'none');
			ms_no = 0;
		});
		$('.ms_content_rl').click(function(){
			$('#more_search').css('display', 'none');
			ms_no = 0;
		});
	};
	$('#pi_single').click(function(){
		$('ul.product_groups').removeClass('product_groups_c').addClass('product_groups_b');
		$('ul.product_groups').find('li').removeClass('w_150').addClass('w_310');
		$(this).addClass('active').siblings('#pi_double').removeClass('active');
	});
	$('#pi_double').click(function(){
		$('ul.product_groups').removeClass('product_groups_b').addClass('product_groups_c');
		$('ul.product_groups').find('li').removeClass('w_310').addClass('w_150');
		$(this).addClass('active').siblings('#pi_single').removeClass('active');
	});

	$('.text_overflow').each(function(){
		if ($(window).width() > 500) {
			var maxwidth = 30;
		} else {
			var maxwidth = 23;
		};
		if ($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
			$(this).html($(this).html() + '…');
		};
	});
	$('.pname').each(function(){
		var maxwidth = 19;
		if ($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
			$(this).html($(this).html() + '…');
		};
	});
	$('.pname2').each(function(){
		if ($(window).width() > 381) {
			var maxwidth = 17;
		} else {
			var maxwidth = 19;
		};
		if ($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
			$(this).html($(this).html() + '…');
		};
	});
	$('.s_classify span a').each(function(){
		var maxwidth = 5;
		if ($(this).text().length > maxwidth) {
			$(this).text($(this).text().substring(0, maxwidth));
		};
	});

	//商品頁
	$('.pc_content2').hide();
	$('.product_content2').click(function(){
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').siblings('.active').removeClass('active');
			$('.pc_content2').slideUp();
			$(this).find('.pc_content2').slideDown();
		};
	}).eq(0).click();

	//購物車
//    $("input[name='invoice1']").click(function(){
//        if ($('#invoice_1').is(':checked') && $('#invoice_1s').val() == 2) {
//            $('#invoice1in').show('slow');
//        } else {
//            $('#invoice1in').hide('slow');
//        }
//        if ($('#invoice_2').is(':checked')) {
//            $('#invoice2in').show('slow');
//        } else {
//            $('#invoice2in').hide('slow');
//        }
//        if ($('#invoice_5').is(':checked') && $('#invoice_5s').val() == 2) {
//            $('#invoice5in').show('slow');
//        } else {
//            $('#invoice5in').hide('slow');
//        }
//        if ($('#invoice_5').is(':checked') && $('#invoice_5s').val() == 3) {
//            $('#invoice6in').show('slow');
//        } else {
//            $('#invoice6in').hide('slow');
//        }
//    });
//    $("input[name='invoice2']").click(function(){
//        if ($('#invoice_4').is(':checked')) {
//            $('#invoice4in').show('slow');
//        } else {
//            $('#invoice4in').hide('slow');
//        }
//    });
//    $("input[name='tprice']").click(function(){
//        if ($('#tprice2').is(':checked')) {
//            $('#tprice2in').show('slow');
//        } else {
//            $('#tprice2in').hide('slow');
//        }
//    });
//    $("input[name='tprice2in']").click(function(){
//        if ($('#tprice2in_3').is(':checked')) {
//            $('#tprice3in').show('slow');
//        } else {
//            $('#tprice3in').hide('slow');
//        }
//    });
//    $("#tprice2in_1s").click(function(){
//        $("#tprice2in_1").click();
//        $('#tprice3in').hide('slow');
//    });
//    $("#invoice_5s").click(function(){
//        $("#invoice_5").click();
//        $('#invoice1in').hide('slow');
//        $('#invoice2in').hide('slow');
//        if ($('#invoice_5s').val() == 2) {
//            $('#invoice5in').show('slow');
//        } else {
//            $('#invoice5in').hide('slow');
//        }
//        if ($('#invoice_5s').val() == 3) {
//            $('#invoice6in').show('slow');
//        } else {
//            $('#invoice6in').hide('slow');
//        }
//    });
//    $("#invoice_1s").click(function(){
//        $("#invoice_1").click();
//        if ($('#invoice_1s').val() == 2) {
//            $('#invoice1in').show('slow');
//        } else {
//            $('#invoice1in').hide('slow');
//        }
//        $('#invoice2in').hide('slow');
//        $('#invoice5in').hide('slow');
//        $('#invoice6in').hide('slow');
//    });
//    $("#invoice_1s").on('change', function(){
//        if ($('#invoice_1s').val() == 2) {
//            $('#invoice1in').show('slow');
//        } else {
//            $('#invoice1in').hide('slow');
//        }
//    });
//    $("#invoice_5s").on('change', function(){
//        if ($('#invoice_5s').val() == 2) {
//            $('#invoice5in').show('slow');
//        } else {
//            $('#invoice5in').hide('slow');
//        }
//        if ($('#invoice_5s').val() == 3) {
//            $('#invoice6in').show('slow');
//        } else {
//            $('#invoice6in').hide('slow');
//        }
//    });
});
