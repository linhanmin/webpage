$(document).ready(function(){
	function Isie7() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("MSIE 7.0");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
		}
		return flag;
	}
	var ie7 = Isie7();
	$.fn.selectDrop = function(){
		var Selects = $(this);
		Selects.hide();
		Selects.wrap("<div class='optionGroup'>").after("<div class='inputbox'><span class='text'></span><span class='icon'></span></div>");
		var $input_selectBox = Selects.parent().find("div.inputbox");
		var $ul = $("<ul></ul>");
		var opt = $('option', Selects);
		var opt_num = opt.length;
		var opt_list = [];
		// init
		$ul.addClass('select_ul');
		for (var i = 0; i < opt_num; i++) {
			opt_list[i] = $(opt[i]).text();
			var $li = $("<li class='option_" + (i + 1) + "'>" + opt_list[i] + "</li>");
			$li.click(function () {
				$input_selectBox.find('span.text').text($(this).text());
				$li.parent().slideUp(200).scrollTop(0);
				$(this).addClass("current").siblings().removeClass("current");
				var $now = $(this).index();
				Selects.find("option").removeAttr("Selected")
				Selects.find("option").eq($now).attr("Selected", "");
			});
			$ul.append($li);
		};
		$ul.find("li").eq(0).addClass("current");
		$("<div class='select_ul_arrow'></div>").prependTo($ul);
		$input_selectBox.find("span.text").text(opt_list[0]);
		$input_selectBox.after($ul);
		$ul.hide();
		$input_selectBox.click(function(){
			$ul.slideDown(200);
		});
		if (ie7) {
			$('.optionGroup').mouseleave(function(){
				$ul.slideUp(200);
			});
		} else {
			$('.select_ul').mouseleave(function(){
				$ul.slideUp(200);
			});
		};
	};
	$("#catesSelect").selectDrop();

	// 2014.03.17 add by min
	// 選單
	var header_h = $('.header').height()-$('.header_bottom').height(),
		nlt = false,
		nlf = false;
	$(window).scroll(function(){
		if ($(window).scrollTop()>header_h) {
			$('.header_nav').addClass('active');
		} else {
			$('.header_nav').removeClass('active');
		};
		if (!nlf) {
			if ($(window).scrollTop()>header_h+529) {
				$('.nav_left_title>span').css('display','inline-block');
				$('.nav_left').css({
					'display': 'none',
					'position': 'fixed',
					'top': '36px'
				});
				nlt = true;
				nlf = true;
			};
		};
		if (nlf) {
			if ($(window).scrollTop()<=header_h+529) {
				$('.nav_left_title>span').css('display','none');
				$('.nav_left_title>span').removeClass('active');
				$('.nav_left').css({
					'display': 'block',
					'position': 'absolute',
					'top': 0
				});
				nlt = false;
				nlf = false;
			};
		};
	});
	/*
	$('.nav_left_title').mouseenter(function(){
		if (nlt) {
			if ($('.nav_left').is(':visible')==false) {
				$('.nav_left').stop(true,false).slideDown('slow');
				$('.nav_left_title>span').addClass('active');
			};
		};
	});
	$('.nav_left').mouseleave(function(){
		if (nlt) {
			$('.nav_left').stop(true,false).slideUp('slow');
			$('.nav_left_title>span').removeClass('active');
			$('.subnav').hide();
		};
	});
	*/
	$('.nav_left_title').click(function(){
		if (nlt) {
			if ($('.nav_left').is(':visible')==false) {
				$('.nav_left').stop(true,false).slideDown('slow');
				$('.nav_left_title>span').addClass('active');
			} else {
				$('.nav_left').stop(true,false).slideUp('slow');
				$('.nav_left_title>span').removeClass('active');
			};
		};
	});
	// 左選單 nav_left
	$('.nav_left ul li').hover(
		function(){
			$(this).siblings('li').find('.subnav').css('display','none');
			$(this).find('.subnav').css('display','block');
			var x = $(this).index(),
				y = $(window).scrollTop();
			if (y>header_h+529) {
				if (x<6) {
					$(this).find('.subnav').css('top',x*28*-1);
				} else if (x>11) {
					$(this).find('.subnav').css('top',(x-2)*28*-1);
				} else {
					$(this).find('.subnav').css('top',(x-1)*28*-1);
				};
			} else {
				if (y<162) {
					if (x<3) {
						$(this).find('.subnav').css('top',x*28*-1);
					} else if (x>14) {
						$(this).find('.subnav').css('top',(x-2)*28*-1);
					} else {
						$(this).find('.subnav').css('top',(x-1)*28*-1);
					};
				} else if (y>300) {
					$(this).find('.subnav').css('top',x*28*-1+y-126);
				} else {
					if (x<10) {
						$(this).find('.subnav').css('top',x*28*-1+y-126);
					} else {
						$(this).find('.subnav').css('top',x*28*-1+y-33);
					};
				};
			};
		}, function(){
			$(this).find('.subnav').css('display','none');
		}
	);
	//電視購物
	$($('.tv_tab li').find('a').attr('class')).siblings('.left_tabcontent').hide();
	$('.tv_tab li').hover(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		$('.tv_arrow').css('left',25+$(this).index()*62);
		$($(this).find('a').attr('class')).stop(false, true).show().siblings('.left_tabcontent').hide();
		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	//熱銷排行
	$($('.hot_tab li').find('a').attr('class')).siblings('.left_tabcontent').hide();
	$('.hot_tab li').hover(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		$('.hot_arrow').css('left',40+$(this).index()*93);
		$($(this).find('a').attr('class')).stop(false, true).show().siblings('.left_tabcontent').hide();
		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	//main_r1(SP區塊)
	$('.main_r1_nav li').hover(function(){
		var n = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$('.main_r1_arrow').css('top',26+70*n);
		$('.main_r1_content>div').eq(n).addClass('active').siblings('.active').removeClass('active');
	});
	//main_r3(推薦商品)
	var r3 = $('.main_r3_scroll ul').length-1,
		r3n = 0,
		r3autoscroll = true;
	$('.main_r3_scroll ul').eq(r3).clone().prependTo('.main_r3_scroll');
	$('.main_r3_scroll ul').eq(1).clone().appendTo('.main_r3_scroll')
	$('.main_r3_scroll').css('width',750*(r3+3));
	$('.main_r3_left').click(function(){
		clearTimeout(timer);
		if (r3n == 0) {
			$('.main_r3_scroll').animate({
				left:0
			},600,function(){
				$('.main_r3_scroll').css('left',750*(r3+1)*-1);
				r3n=r3;
				if(r3autoscroll) timer = setTimeout(r3move, 7000);
			});
		} else {
			$('.main_r3_scroll').animate({
				left:750*r3n*-1
			},600,function(){
				r3n=r3n-1;
				if(r3autoscroll) timer = setTimeout(r3move, 7000);
			});
		};
	});
	$('.main_r3_right').click(function(){
		clearTimeout(timer);
		if (r3n == r3) {
			$('.main_r3_scroll').animate({
				left:750*(r3n+2)*-1
			},600,function(){
				$('.main_r3_scroll').css('left',750*-1);
				r3n=0;
				if(r3autoscroll) timer = setTimeout(r3move, 7000);
			});
		} else {
			$('.main_r3_scroll').animate({
				left:750*(r3n+2)*-1
			},600,function(){
				r3n=r3n+1;
				if(r3autoscroll) timer = setTimeout(r3move, 7000);
			});
		};
	});
	$('.main_r3').hover(function(){
		r3autoscroll = false;
		clearTimeout(timer);
	}, function(){
		r3autoscroll = true;
		timer = setTimeout(r3move, 7000);
	});
	function r3move(){
		$('.main_r3_right').click();
	}
	timer = setTimeout(r3move, 7000);
	//main_r5(折價卷專區)
	$('.recomLayoutMenus li').hover(function(){
		var n = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().siblings('.recomLayoutItem').find('.recomTab').eq(n).show().siblings('.recomTab').hide();
	});
	//回Top&右下購物車
	$('.backTop').click(function(){
		$('body').animate({ scrollTop: 0 }, 300);
	});
});
var KwLimit = function(){
	if ($('#txtSearchKeyword').val().length < 1 || $('#txtSearchKeyword').val().length > 96 || $("#txtSearchKeyword").val() === "請輸入關鍵字或商品序號") {
		alert('搜尋字數最少1個字，最大限制為96個中文字！');
	}
	else {
		var url = window.location.href.split("/");
		var qstring = "";
		if ($('#txtSearchKeyword').val() != $('#txtSearchKeyword').attr('focucmsg')) {
			qstring = "/Search.aspx?keyword=" + encodeURIComponent($('#txtSearchKeyword').val());
		}
		else {
			qstring = "/Search.aspx?keyword=" + qstring;
		}

		if ($('#catesSelect').val() != 0) {
			qstring += "&cid=" + $('#catesSelect').val();
		}
		window.location = "http://" + url[2] + qstring;
	}
}
function EnterKey(e) {
	if (e.keyCode == 13) {
		setTimeout(KwLimit, 250);
	}
}