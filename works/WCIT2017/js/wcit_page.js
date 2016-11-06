function detectWindow() {
	var ch = [0];
	$('.agenda_cont div').each(function() {
		$(this).removeAttr('style').removeClass('active');
	});
	$('.agenda_c').each(function() {
		for (i = 1; i < $(this).children('div').eq(-1).children('div').length; ++i) {
			ch[i] = -1;
			for (j = 2; j < 5; ++j) {
				var ch2 = $(this).children('div').eq(j).find('div').eq(i).innerHeight();
				ch[i] = ch[i] > ch2 ? ch[i] : ch2;
			}
			for (j = 2; j < 5; ++j) {
				var $this = $(this).children('div').eq(j).find('div').eq(i);
				$this.css('padding', (ch[i] - $this.height()) / 2 + 'px 0');
			}
		}
	});
	var ww = $('.wrapper').width();
	// console.log(ww);
	if (ww > 483) {
		$('.agenda_cont>div').each(function() {
			if ($(this).innerHeight() > 70 && $(this).siblings('.active').length == 0) {
				var $this = $(this),
					bk = true;
				$(this).siblings().each(function() {
					if ($(this).innerHeight() > $this.innerHeight()) {
						bk = false;
					}
				});
				if (bk) {
					$(this).addClass('active');
				}
				switch ($(this).height() / parseInt($(this).css('line-height'))) {
					case 1:
						break;
					default:
						if ($(this).find('div').length == 0) {
							$(this).css({
								'padding': '7px 0',
								'line-height': '25px'
							});
						}
						var h = $(this).innerHeight();
						$(this).siblings().each(function() {
							if ($(this).find('div').length == 0) {
								var ln = $(this).height() / parseInt($(this).css('line-height'));
								if (ln == 1) {
									$(this).css('line-height', h + 'px');
								} else {
									$(this).css({
										'padding': (h - (ln * 25)) / 2 + 'px 0',
										'line-height': '25px'
									});
								}
							} else {
								h = $(this).innerHeight() > h ? $(this).innerHeight() : h;
								$(this).siblings().each(function() {
									if ($(this).find('div').length == 0) {
										var ln = $(this).height() / parseInt($(this).css('line-height'));
										if (ln == 1) {
											$(this).css('line-height', h + 'px');
										} else {
											$(this).css({
												'padding': (h - (ln * 25)) / 2 + 'px 0',
												'line-height': '25px'
											});
										}
									}
								});
							}
						});
				}
			}
		});
	}

	// $('.ict_a iframe').height($('.ict_a iframe').width() * 0.5625);
	var imw = 0;
	$('.ict_a iframe').each(function() {
		imw = imw > $(this).width() ? imw : $(this).width();
	}).height(imw * 0.5625);

	if (ww >= 1010) {
		$('.page_speaker').css('width', 1004);
	} else if (759 <= ww && ww < 1010) {
		$('.page_speaker').css('width', 753);
	} else if (508 <= ww && ww < 759) {
		$('.page_speaker').css('width', 502);
	} else {
		$('.page_speaker').css('width', 251);
	};

	if (ww >= 680) {
		$('.page_tour figure').height($('.page_tour figure').width() * 0.76);
	} else {
		$('.page_tour figure').height('auto');
	}
};

$(window).resize(function() {
	detectWindow();
});

$(function() {
	detectWindow();

	$('.more').click(function() {
		$(this).toggleClass('active').siblings('.more_hidden').slideToggle();
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
		}
	});
	$('.menufilter').click(function() {
		$('.m_menu').click();
	});

	$('.page_tab').each(function() {
		var $tab = $(this);

		if (location.hash) {
			var $defaultLi = $('ul.tabs li', $tab).eq(location.hash.split('#')[1]).addClass('active');
		} else {
			var $defaultLi = $('ul.tabs li', $tab).eq(0).addClass('active');
		};

		$('#' + $defaultLi.attr('data-tab')).siblings().hide();

		$('ul.tabs li', $tab).click(function() {
			var $this = $(this),
				$thisTab = $('#' + $this.attr('data-tab'));
			$this.addClass('active').siblings('.active').removeClass('active');
			$thisTab.stop(false, true).fadeIn().siblings().hide();
			detectWindow();
		});
	});

	$('.lightbox').click(function() {
		var i = $(this).attr('id').slice(1);
		$('.lightbox_target').addClass('active');
		$('#lc' + i).addClass('active');
	});
	$('.lightbox_bg').click(function() {
		$('.lightbox_target, .lightbox_content').removeClass('active');
	});

	//mobile
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
		$('.speaker_item').click(function() {
			$(this).toggleClass('active');
		});
	} else {
		$('.speaker_item').hover(function() {
			$(this).addClass('active');
		}, function() {
			$(this).removeClass('active');
		});
	};
});