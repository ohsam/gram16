/*function*/
/*layer popup*/
var popup = {
	open : function(o) {

		var opt = o;
		var popTgt = $(document.createElement('div')).attr('class', 'pop')
				.appendTo(document.body);
		/*
		if (typeof event == "object") {
				this.bakObj = $(event.target);
		}
		*/
		if (opt.sourceId != null && document.querySelector(opt.sourceId)) {
			var popSource = $(opt.sourceId).get(0).outerHTML;
			$(opt.targetId).find('.popupInfo').html(popSource);
		};

		//hide move-top
		$('.move-top').addClass('force');

		// create background
		if (popTgt.children('.pop-bg').length < 1)
			popTgt.append($('<div/>').addClass('pop-bg'));

		setTimeout(function() {
			$(opt.targetId).show().appendTo(popTgt).attr("tabindex","0");

			$(opt.targetId).css(
					{
						"top" : $(window).scrollTop()
								+ (function() {
									var rt = (($(window).height() - $(
											opt.targetId).height()) / 2);
									return rt > 30 ? rt : 30
								})() + "px",
						"left" : "50%",
						"margin-left" : -$(opt.targetId).width() / 2 + "px"
					}).off().on({
				"click" : function() {
					popup.close(this);
				}
			}, '.close').focus();

			if (typeof opt.callback === "function") {
				opt.callback.call(document.querySelector(opt.targetId));
			}
		}, 500);

	},
	openCurr : function(o) {
		var opt = o;
		var popTgt = $(document.createElement('div')).attr('class', 'pop').appendTo(document.body);
		if (event && typeof event == "object") {
			//this.bakObj = $(event.target);
		}

		if (opt.sourceId != null) {
			var popSource = $(opt.sourceId).get(0).outerHTML;
			$(opt.targetId).find('.popupInfo').html(popSource);
		}

		//hide move-top
		$('.move-top').addClass('force');

		// create background
		if (popTgt.children('.pop-bg').length < 1)
			popTgt.append($('<div/>').addClass('pop-bg'));

		setTimeout(function() {
			$(opt.targetId).show().appendTo(popTgt).closest('.pop').attr("tabindex","0")// .focus();
			$(opt.targetId).css(
					{
						"top" : $(window).scrollTop()	+ (function() {
								var rt = (($(window).height() - $(
											opt.targetId).height()) / 2);
									return rt > 30 ? rt : 30
								})() + "px",
						"left" : "50%",
						"margin-left" : -$(opt.targetId).width() / 2 + "px"
					}).off().on({
				"click" : function() {
					popup.close(this);
				}
			}, '.close');
		}, 500)
	},
	openURL : function(o) {
		var opt = o;
		var popTgt = $(document.createElement('div')).attr('class',
				'pop openURL').show().appendTo($('body'));
		if (event && typeof event == "object") {
			//this.bakObj = $(event.target);
		}

		//hide move-top
		$('.move-top').addClass('force');

		// create background
		if (popTgt.children('.pop-bg').length < 1)
			popTgt.append($('<div/>').addClass('pop-bg'));

		popTgt.load(opt.url + ' ' + opt.targetId, function() {
			var popTgtCont = popTgt.find(opt.targetId).show();

			popTgtCont.css({
				"top" : $(window).scrollTop() + 30 + "px",
				"left" : "50%",
				"margin-left" : -popTgtCont.width() / 2 + "px"
			}).off().on({
				"click" : function() { popup.close(this); }
			}, '.close, #cancel').attr({"tabindex" : "1"}).focus();
		});
	},
	msg : function(o) {
		var opt = o;
		var popTgt = $(document.createElement('div')).attr('class','pop openURL').show().appendTo($('body'));
		if (event && typeof event == "object") {
			//this.bakObj = $(event.target);
		}

		popTgt.load('/lgekor/common/commonPopupsHtml.do #popup_system',
						function() {
							var popTgtCont = popTgt.find('.popup').show();

							if (opt.title) { popTgtCont.find('.poptit').html(opt.title) };
							popTgtCont.find('.popupInfo').html(opt.msg);

							if (opt.confirm) { popTgtCont.find('.btns #ok').show() };
							popTgtCont.on({
								"click" : function() {

									var thisBtn = $(this), thisType = thisBtn.attr('id');
									switch (thisType) {
									case 'ok': // ok
										if(opt.confirmTrue) {opt.confirmTrue(); }
										popup.close(this);
										break;
									case 'cancel': // cancel
									case 'close': // close
										if(opt.confirmFalse) { opt.confirmFalse(); }
										popup.close(this);
										break;
									default:
										if(thisBtn.hasClass('close')) {
											if(opt.confirmFalse) { opt.confirmFalse(); }
											popup.close(this);
										}
									}
								}
							}, '.close, button, a');
							popTgtCont.css({
								"top" : $(window).scrollTop() + (function() {
									var rt = (($(window).height() - popTgtCont.height()) / 2);
									return rt > 30 ? rt : 30 })() + "px", "left" : "50%", "margin-left" : -popTgtCont.width()/ 2 + "px"}).attr({}).focus();
							});
	},
	close : function(n) {
		var closeTgt = $(n).closest('.pop');

		if (closeTgt.hasClass('openURL')) {
			closeTgt.remove();
		} else {
			closeTgt.children('.pop-bg').remove();
			closeTgt.find('.popup').unwrap().hide();
		}
/*
		if (this.bakObj) {
			this.bakObj.focus();
		}
*/
	}
};

/* toggle */
var toggle = (function(chk) {
	var that = {
		web : function(n) {
			$('.tg-slide').not('.tgM').off().on({
				'click' : tgClick
			}, '.tg-btn').find('.tg-cont').hide().end().find('.tg-btn.on')
					.each(
							function() {
								$(this).next('.tg-cont').add(
										$(this).parent().next('.tg-cont'))
										.show();
							}).end().find('.tg-slide-inner .tg-cont').show(); // only
																				// web(tv
																				// ad)
		},
		mobile : function(n) {
			$('.tg-slide').not('.tgW').off().on({
				'click' : tgClick
			}, '.tg-btn').find('.tg-cont').hide().end().find('.tg-btn.on')
					.each(
							function() {
								$(this).next('.tg-cont').add(
										$(this).parent().next('.tg-cont'))
										.show();

							});
			/* b2c_0417: 20170320 start */
			$('.tg-slide .slide-close').on('click', function() {
					$('.tg-cont').hide();
					$('.tg-btn').removeClass('on');
			});
			/* b2c_0417: 20170320 end */
		}
	}, tgClick = function() {
		var tgBtn = $(this),
			tgCont = (tgBtn.next().is('.tg-cont')) ? tgBtn.next('.tg-cont') : tgBtn.parent().next('.tg-cont'),
					tgClose = function(btn, cont) {
						btn.removeClass('on');
						cont.slideUp(200);
					}, tgOpen = function(btn, cont) {
						btn.addClass('on');
						cont.slideDown(300);
					};
		if (tgBtn.hasClass('on')) {
			tgClose(tgBtn, tgCont);
		} else {
			var accord = tgBtn.parents('.tg-slide.tg-accord');
			if (accord.length) // add accordion function
				tgClose(accord.find('.tg-btn').not(tgBtn), accord.find(
						'.tg-cont').not(tgCont));
			tgOpen(tgBtn, tgCont);
		}
	}
	return (chk) ? that.mobile : that.web;
})(setting.mobile);

/* gnb */
var gnb = (function(chk) {
	var that = {
		web : function(n) {
			$('#headerWrap .gnb-list > li:not(.search,.recent)')
			.on({
				"mouseenter focusin" : function() {
					$(('~ .gnb-depth-container'),
							$('>a', this).addClass("selected")).show()
							.stop().animate({
								maxHeight : 450 //2019.06.04 
							}, 500);
				},
				"mouseleave focusout" : function() {
					$(('~ .gnb-depth-container'),
							$('>a', this).removeClass("selected"))
							.stop().animate({
								maxHeight : 0
							}, 200, function() {
								this.style.display = "none"
							});
				}
			});

			$('.gnb-list > li.search > a').click(function() {
				$(this).addClass("selected");
				return false
			}).next('.search-container').find('.btn-close').click(function() {
				$('.gnb-list > li.search > a').removeClass("selected");
				return false
			})

			$('.language button').click(function() {
				$(this).find('.icon').toggleClass('rd-arrow-d01 rd-arrow-u01');
				$(this).next('.list-language').slideToggle();
			});
			
			// footer gnb-list 2018.0316 신윤식 추가
			var fsm = $(".footer-sitemap .sitemap");
			function fsmD3(event){
				var t = $(this);
				if (t.next('ul').is(':hidden')) {
					$(".footer-sitemap .gnb-depth2>li").removeClass("active");
					t.parents("li").addClass("active");
				} else {
					t.parents("li").removeClass("active");
				}
				t.parents("li").find(".unit").mouseleave(function() {
					t.parents("li").removeClass("active")
				});
			};
			fsm.find('.gnb-depth3').prev('a').mouseenter(fsmD3).focus(fsmD3);

			/* pad bind - temp */
			if ($(setting.html).hasClass('pad')) {
				$('#headerWrap .gnb-list > li:not(.search,.recent)').on(
						{
							"click" : function() {
								var thisBtn = $(this);
								if (thisBtn.hasClass('padClk')) {

								} else {
									thisBtn.addClass('padClk');
									return false;
								}

							},
							"touchstart" : function() {
								$(('~ .gnb-depth-container'),
										$('>a', this).addClass("selected"))
										.show().stop().animate({
											maxHeight : 350
										}, 500);

							},
							"mouseleave" : function() {
								$(('~ .gnb-depth-container'),
										$('>a', this).removeClass("selected"))
										.stop().animate({
											maxHeight : 0
										}, 200, function() {
											this.style.display = "none"
										});
							}
						}, '>a');
			}

			/* skip navigation */
			$("#skip_nav").attr("tabindex", 0).focus();
			$("a[href^='#']").click(
					function(evt) {
						var anchortarget = $(this).attr("href");
						if (anchortarget != "#") {
							// $(anchortarget).attr("tabindex", 0).focus();
							$(anchortarget).length ? $(anchortarget).attr(
									"tabindex", 0).focus()
									: $('#container').length ? $('#container')
											.attr("tabindex", 0).focus() : $(
											'#ifrContent').attr("tabindex", 0)
											.focus();
						}

					});
			$("#skip_nav a").focus(function() {
				$("#skip_nav a").removeClass("on").filter(this).addClass("on");
			})
			$("#skip_nav a").blur(function() {
				$("#skip_nav a").removeClass("on");
			})

		},
		mobile : function(n) {
			/* b2c_0417 modify : 20170316 start */
			var gnbobjs = $('.gnb-main'), mbg = $('.mbg'), btnClose = $('.gnb-main-container .btn-close'), contentArea = $('#headerWrap, #contentWrap, #footerWrap');
			btnClose.hide();
			btnClose.addClass('btn_off');
			$(document)
					.on(
							{
								"click" : function(e) {

									// hide search
									document.getElementById('AKCDivTop').style.display = "none";

									if ($(this).hasClass('menu')) {
										// gnbobjs.show().animate({"right":"0",
										// "left":"15.278%"},function(){

										//document.body.style.overflow = "hidden"; 2018-06-20 삭제
										gnbobjs
												.css(
														{
															"right" : "15.278%",
															"left" : "0"
														},
														function() {
															/*
															 * $(this).addClass('on');
															 * contentArea.addClass('mgnbOn');
															 *///document.body.style.overflow = "hidden"; // 2018-06-20 삭제
														});
										gnbobjs.addClass('on');
										btnClose.removeClass('btn_off');
										mbg.css({
											"right" : "0",
											"opacity" : 0.85
										});
										btnClose.show().animate({
											"opacity" : 1
										});
									} else {
										$(this).removeClass('on');
										btnClose.addClass('btn_off');
										contentArea.removeClass('mgnbOn');
										// gnbobjs.animate({"right":"-100%",
										// "left":"100%"},function(){
										gnbobjs.css({
											"right" : "100%",
											"left" : "0%"
										}, function() {
											// $(this).hide();
										});
										gnbobjs.removeClass('on');
										btnClose.addClass('btn_off');
										//document.body.style.overflow = "visible"; // 2018-06-20 삭제
										mbg.css({
											"right" : "-100%",
											"opacity" : 0.4
										});
										btnClose.animate({
											"opacity" : 0
										}, function() {
											$(this).hide();
											btnClose.addClass('btn_off');
										});
									}
									;

									// return false;
								}
							// },'.menu, .mbg, .btn-close');
							},
							'.gnb-main-container a, .gnb-main-container button.btn-close');

			var acBtn = $('.mobile .b2c_0417 .site-map_tit');
			acBtn.on({
				"click" : function () {
					var acList = $('.mobile .b2c_0417 .gnb-depth-container');
					acList.slideUp();
					if ($(this).hasClass('select-on')) {
						acList.slideUp();
						acBtn.removeClass('select-on');
					} else {
						$(this).next('.gnb-depth-container').slideToggle();
						acBtn.removeClass('select-on');
						$(this).toggleClass('select-on');
					}
				}
			});
			/* b2c_0417 modify : 20170316 end */

			$('.gnb-list').on({
				"click" : function() {
					/*
					 * $(this).prev().toggleClass('selected');
					 * $('.gnb-depth-container').hide();
					 * $(this).next('.gnb-depth-container').show();
					 */
					var thisBtnP = $(this).prev();
					$(this).closest('ul').find('li > ul').hide();
					if (thisBtnP.hasClass('selected')) {
						thisBtnP.removeClass('selected');
					} else {
						thisBtnP.addClass('selected');
						$(this).next('.gnb-depth-container').show();
					}
				}
			}, 'button.btn-more');

			$('.language button').click(function() {
				$(this).find('.icon').toggleClass('rd-arrow-d01 rd-arrow-u01');
				$(this).next('.list-language').slideToggle();
			});
		}
	};
	return chk ? that.mobile : that.web;
})(setting.mobile);

var sliderNew = function() {
	/* type01, type02 */
	$(".slideUl:not('.rolling')").each(
			function() {
				var $t = $(this);

				// condition for open-market
				if ($t.parents('body.open-market.unfold').length) {
					return false
				}

				// front, mobile separate
				if ($t.hasClass((setting.mobile ? '.onW' : '.onM'))) {
					return false
				}

				// children li remove at front, mobile
				$t.find(setting.mobile ? '.onW' : '.onM').remove();

				if ($t.children('li').length > 1) {
					var opt = {
						auto : (!setting.mobile) && ($t.hasClass('auto') || $t.find('.banner-1, .cmcr-info').length) || $t.is('.mainSlide'),
						autoControls : (!setting.mobile) && $t.is('.mainSlide'),
						autoHover : true,
						nextSelector : $(('.next'), $t.parent()),
						prevSelector : $(('.prev'), $t.parent()),
						nextText : 'next',
						prevText : 'prev',
						speed : 800
					}

					if ($t.hasClass('uspTit')) {
						// condition for uspTitle
						$.extend(opt, {
							onSlideAfter : function($slideElement, oldIndex,
									newIndex) {
								(!newIndex) ? $('.download').hide() : $(
										'.download').show().find(
										'a:nth-child(' + newIndex + ')').show()
										.siblings().hide();
							}
						});
					}

					if($t.hasClass('autoHeight')){
						$.extend(opt, {
							adaptiveHeight: true,
						});
					}

					if($t.hasClass('fade')){
						$.extend(opt, {
							mode: 'fade',
						});
					}

					/* 2017-05-25 */
					if($t.hasClass('mTouchNone')){
						$.extend(opt, {
							touchEnabled: false,
						});
					}

					if ($t.hasClass('thumb_pager')) {
						// condition for uspTitle
						$.extend(opt, {
							pagerCustom : '#custompager',
							pagerActiveClass : 'on'
						});

					}
					if ($t.hasClass('thumb_pager2')) {
						// condition for uspTitle
						$.extend(opt, {
							pagerCustom : '#custompager2',
							pagerActiveClass : 'on'
						});

					}
					if ($t.hasClass('thumb_pager3')) {
						// condition for uspTitle
						$.extend(opt, {
							pagerCustom : '#custompager3',
							pagerActiveClass : 'on'
						});

					}
					if ($t.hasClass('thumb_pager4')) {
						// condition for uspTitle
						$.extend(opt, {
							pagerCustom : '#custompager4',
							pagerActiveClass : 'on'
						});

					}
					if ($t.hasClass('thumb_pager5')) {
						// condition for uspTitle
						$.extend(opt, {
							pagerCustom : '#custompager5',
							pagerActiveClass : 'on'
						});

					}
					/* // 2017-05-25  */

					var uspSlider = $t.addClass('rolling').bxSlider(opt);

					if($('.reloadBxslider').size() > 0){
						$(".reloadBxslider").each(function(){
							$(this).on("click", function(e){
								uspSlider.reloadSlider();

								e.preventDefault();
							});
						});
					}

					if($('.uspVisual').size() > 0){
						$(".btnThumbView").on("click", function(){
							$('html,body').animate({
								scrollTop : '0px'
							}, 300, 'swing');
							$(".uspVisual").removeClass("open");
							$(".uspVisualClose").css({"display":"block"});
							uspSlider.reloadSlider();
						});
						$(".uspVisualClose").on("click", function(e){
							e.preventDefault();
							$(".uspVisual").addClass("open");
							$(".uspVisualClose").css({"display":"none"});
						});
					}

					//display none시 reload
					function bxslideReload(){
						setTimeout(function() {
							uspSlider.reloadSlider();
						}, 0);
					}
					
					//usp usptabs bxslider reload
					if($('.usptabs').size() > 0){
						$( ".usptabs" ).each(function(){
							$(this).find('.tabslide > li > a').on('click', function(e){
								bxslideReload();
							});
						});
					}
					
					//usp collapsible bxslider reload
					if($('.uspCollpase').size() > 0){
						$( ".uspCollpase" ).each(function(){
							$(this).find('.btn_collapse_more').on('click', function(e){
								bxslideReload();
							});
						});
					}
				}
			});

	/* type04 */
	$('.type04').each(
			function() {
				var $t = $(this), thisLi = $('.slideF li', $t);

				// condition for open-market
				if ($t.parents('body.open-market.unfold').length) {
					return false
				}

				// front, mobile separate
				if ($t.hasClass((setting.mobile ? '.onW' : '.onM'))) {
					return false
				}

				$('.slideC', $t).on(
						{
							"click" : function() {
								thisLi.eq($(this).index()).addClass('on')
										.siblings().removeClass('on');
								$(this).addClass('on').siblings().removeClass(
										'on');
							}
						}, '>*');
			});
}

/* print */
var letPrint = function() {
	window.print();
};

var browserH = $(window).height();


/* playmovie */
//기존이벤트 포커스이동
(function(){
	var youTubeBtn = $("a[href^='javascript:playmovie'], button[onclick^='javascript:playmovie']");
	youTubeBtn.on('click', function(){
		aItemFocus($(this));
	});
	function aItemFocus(item){
		youTubeBtn.removeClass('aItemFocus');
		item.addClass('aItemFocus');
	}
}());
var onYouTubeIframeAPIReady, ytPlayer;
function playmovie(n,type) {
	if (!setting.mobile) {
		// event.target.id = "backFocus";
		var movieHtml = $("<div class='movieCont'/>")
				.wrapInner($(document.createElement('iframe')).attr({'src' : 'https://www.youtube.com/embed/'+ n + '?rel=0&autoplay=1','frameborder' : 0}))
				.append("<a class='icon rd-close' href='#backFocus' title='close popup'></a>")
				.off('click').on('click', 'a', function() {
					$('#movie').hide().remove();
					$('.aItemFocus').focus();
					return false;
				});
		var movTgt = $(document.createElement('div')).attr('id', 'movie').css('height',browserH).append($(document.createElement('div')).addClass('pop-bg')).show().append(movieHtml).appendTo($('body'));
		if(type == 'fridge') { // 2016-02-22 KSY
			movTgt.addClass('fridge');
			movTgt.css("height",64+"%");
		}

		if(type == 'mobileYoutube') {
			movTgt.css("z-index","100");
		}

		if($('#movie .pop-bg').height() > screen.height + 500){
			//bestmall
			$('.movieCont').height(screen.height-300).css('top','1000px')
		}

		//포커스이동(키보드접근)
		$('.movieCont').attr("tabindex", 0).focus();
	} else {
		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') return;
		
		var movieHtml = $(document.createElement('iframe')).attr({'src' : 'https://www.youtube.com/embed/'+ n + '?rel=0&enablejsapi=1&autoplay=1','frameborder' : 0});
		var movTgt = $(document.createElement('div')).attr('id', 'movie').show().append(movieHtml).appendTo($('body'));
		var tag = document.createElement('script');
		
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var closeMBtn = $('body').append('<div style="left:0; top:0; width: 100%; position:fixed; text-align:right; background:#000; z-index:9999; overflow:hidden;"><a id="closeMBtn" class="icon rd-close" href="#none" title="close popup" style="margin-right:10px;float:right; font-size:30px; color:#fff; opacity:0.7;"></a></div>')
		$('#closeMBtn').on({"click":function(){
			location.reload();
		}});

		for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;)
				if (/youtube.com\/embed/.test(e[x].src))
					if (e[x].src.indexOf('enablejsapi=') === -1)
						e[x].src += (e[x].src.indexOf('?') === -1 ? '?' : '&') + 'enablejsapi=1';

		var gtmYTListeners = [],
			gtmYTListenersStates = [];
		
		(function onYouTubeIframeAPIReady(){
			ytPlayer = new YT.Player('movie', {
				videoId : n,
				rel : 0,
				playerVars : {
					'autoplay' : 1,
					'controls' : 1
				},
				events : {
					'onError' : onPlayerError,
					'onReady' : onPlayerReady,
					'onStateChange' : onPlayerStateChange
				}
			});
		}());
	
		function onPlayerReady(e) {
			var url = e.target.getVideoUrl();
			gtmYTListenersStates[url] = e.target.getPlayerState();

			setTimeout(function (){
				var state = e.target.playVideo();
		 
				if (gtmYTListenersStates[url] !== state){
					e.data = state;
					onPlayerStateChange(e);
				}
				gtmYTListenersStates[url] = state;
			}, 100);

			//e.target.playVideo();
		}

		function onPlayerStateChange(e) {
			if (e.data == 0 || e.data == 2) {
				done = true;
				window.history.go(0);
			}
		}

		function onPlayerError(e){
			dataLayer.push({
				'event': 'error',
				'eventCategory': 'Youtube Videos',
				'eventAction': 'GTM',
				'eventLabel': "youtube:" + e["target"]["src"] + "-" + e["data"]
			})
		}
	}
};

function testmovie(n,t) {
	if (!setting.mobile) {
		// event.target.id = "backFocus";
		var movieHtml = $("<div class='movieCont'/>")
				.wrapInner($(document.createElement('iframe')).attr({'src' : 'https://www.youtube.com/embed/'+ n + '?rel=0&autoplay=1','frameborder' : 0}))
				.append("<a class='icon rd-close' href='#backFocus' title='close popup'></a>")
				.off('click').on('click', 'a', function() {
					$('#movie').remove();
					$('#backFocus').focus();
					return false;
				});
		var movTgt = $(document.createElement('div')).css({'position':'absolute','left':0,'top':0}).append(movieHtml).appendTo(t.parentNode);
		movTgt.find('iframe').width('100%').height('100%');
	}
};


/* common tab */
var commonTab = (function(chk) {
	var that = {
		web : function(n) {
			var tab = $('.common-tab');
			$('a', tab).each(
					function(index) {

						try{
							this.title = $(this).text().trim();
						}catch(e){
							this.title = $(this).text();
						};

						if ($(this).hasClass("selected")) {
							$(this).closest('li:not(.sub-common-tab > li)').find('>a').html($(this).text());
						}
					});

			tab.on(
					{
						"mouseenter focusin" : function() {
							$(this).closest('li').siblings().find('ul').stop().slideUp(300);
							$(this).closest('li').find('ul').stop().slideDown(300);
						}
					}, 'li>a').on({
				"mouseleave" : function() {
					$(this).find('ul').stop().slideUp(300);
				}
			}, 'li').on(
					{
						"click" : function() {
							if($(this).attr("href") == '#none' && $(this).next().hasClass("sub-common-tab")){
								location.href = $(this).next().find('a').eq(0).attr("href");
							} else {
								$('a', tab).each(function() {
									$(this).text(this.title);
								});
								$(this).closest('li:not(.sub-common-tab > li)').find('>a').html($(this).text());
							}
						}
					}, 'a');
		},
//		mobile : function(n) {
//			var tab = $('.common-tab');
//			$('a', tab).each(
//					function(index) {
//						this.title = $(this).html();
//
//						if ($(this).hasClass("selected")) {
//							$(this).closest('li:not(.sub-common-tab > li)')
//									.find('>a').html($(this).html());
//						}
//					});
//
//			tab.on({
//				"mouseenter" : function() {
//					$(this).addClass("no");
//					$(this).closest('li').find('ul').stop().slideDown(300);
//				}
//			}, 'li>a').on({
//				"mouseleave" : function() {
//					$(this).find('>a').removeClass("no");
//					$(this).find('ul').stop().slideUp(300);
//				}
//			}, 'li').on(
//					{
//						"click" : function() {
//							$('a', tab).each(function() {
//								$(this).html(this.title);
//							});
//							$(this).closest('li:not(.sub-common-tab > li)')
//									.find('>a').html($(this).html());
//						}
//					}, 'a');
//		}
		mobile : function(n) {
            var tab = $('.common-tab');
            $('a', tab).each(function(index) {
                this.title = this.innerHTML;

                if ($(this).hasClass("selected")) {
                    $(this).closest('li:not(.sub-common-tab > li)').find('>a').html(this.innerHTML);
                }
            });

            tab.on({
                "mouseleave" : function() {
                    $(this).find('>a').removeClass("no");
                    $(this).find('ul').stop().slideUp(300);
                }
            }, 'li')
            .on({
                "click" : function() {
                	(!$(this).is('.no')) ? $(this).addClass("no").closest('li').find('ul').stop().slideDown(300) : $(this).removeClass("no").closest('li').find('ul').stop().slideUp(300);
                }
            }, 'a');
        }
	};
	return chk ? that.mobile : that.web;
})(setting.mobile);

var actJScrollPane = function() {
	$(".prdlist-opt .opts:not('.jspScrollable')").jScrollPane({
		autoReinitialise : true
	});
};

/* fixToMobile */
var fixToMobile = {
	//option : {widthSize : 960},
	option : {widthSize : 360}, //모바일  버전
	init : function(o) {
		$.extend(this.option, o)
		this.rezoom();
		this.bind();
		console.log('fixToMobile')
		return this;
	},
	bind : function() {
		$(window).on({
			'resize' : this.rezoom
		});

		fixToMobile.option.wrap.on({
			'click' : this.rezoom
		}, '.tab-link a').on({
			"click" : function(e) {
				e.preventDefault();
				$(window).scrollTop($($(this).attr('href')).offset().top || 0)
			}
		}, '.new_tabMenu a')

	},
	rezoom : function() {
		//var rate = $(window).width() / fixToMobile.option.widthSize;
		var rate = 1;
		var scaleWrapC = $('#scaleWrap').length ? fixToMobile.option.wrap
				.find("#scaleWrap") : fixToMobile.option.wrap.wrapInner(
				"<div id='scaleWrap'/>").find('>div');

		scaleWrapC.css({
			'-webkit-transform' : 'scale(' + rate + ')',
			'-moz-transform' : 'scale(' + rate + ')',
			'-ms-transform' : 'scale(' + rate + ')',
			'-o-transform' : 'scale(' + rate + ')',
			'transform' : 'scale(' + rate + ')',
			'-webkit-transform-origin' : "left top",
			'-moz-transform-origin' : "left top",
			'-ms-transform-origin' : "left top",
			'-o-transform-origin' : "left top",
			'transform-origin' : "left top"
		});
/*
                var tgrWrap = fixToMobile.option.wrap;
                setTimeout(function(){
                    tgrWrap.width(fixToMobile.option.widthSize).height($('#scaleWrap').height()*rate ).css({"overflow":"hidden"}).removeAttr('width').width('');
                    //$('#scaleWrap').addClass('asdasd').width((function(){return $(this).parent().width})())

                    console.log($('#scaleWrap').parent().width());
                    console.log($(window).width());

                    if($('#scaleWrap').width() <= $(window).width()){
                    	$('#scaleWrap').width((function(){return $('#scaleWrap').parent().width() / rate})())
                    }
                },100);
				*/
	}
};
/* Go to top */
var goTop = function() {
	if (!document.querySelector('.move-top')) {
		// Create top-btn
		/* b2c_0417 modify : 201703320 start */
		var $btnTop = $(
				'<div class="move-top b2c_0417"><a href="#top" title="Go to Top" class="sp">go top</a></div>')
				.appendTo('body');
		/* b2c_0417 modify : 201703320 end */
		// Scroll top-btn
		$btnTop.find('>a').click(function() {
			$('html,body').animate({
				scrollTop : '0px'
			}, 300, 'swing');
			return false;
		});
		$(window).on('scroll', function() {
			if ($(window).scrollTop() > $('.gnb-main-container').height())
				$btnTop.addClass('show')
			else
				$btnTop.removeClass('show')
		})
	}
}

/* chatbots */
var chatBots = function() {
	var url_full = "https://lgechat.co.kr/kr/index.html?mkt_homepage";
	function PopupCenter(url, title, w, h, opts) {
	   var _innerOpts = '';
	   if(opts !== null && typeof opts === 'object' ){
	       for (var p in opts ) {
	           if (opts.hasOwnProperty(p)) {
	               _innerOpts += p + '=' + opts[p] + ',';
	           }
	       }
	   }
	     // Fixes dual-screen position, Most browsers, Firefox
	   var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	   var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	
	   var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	   var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	
	   var left = ((width) - (w+100)) + dualScreenLeft;
	   var top = ((height / 2) - (h / 2)) + dualScreenTop;
	   var newWindow = window.open(url, title, _innerOpts + ' width=' + w + ', height=' + h + ', top=50' + ', left=' + left+',resizable=yes');
	
	// Puts focus on the newWindow
	   if (window.focus) {
	       newWindow.focus();
	   }
	}

	if (!document.querySelector('.go-chatBots')) {
		var $btnChatbot = $(
				'<div class="go-chatBots"><button type="button" class="img_0"><span>chatbot beta</span></button></div>');
		if (document.querySelector('.appChatBot')) {
				$btnChatbot.appendTo('.appChatBot');
		}
		$btnChatbot.find('>button').click(function() {
			var newWindow = PopupCenter(url_full,'',380,670,'_blank');
			return false;
		});	
		var num = 0;
		var max = 2;
		var img_num;
		/*imgChange = setInterval(function() {
			img_num = num % 2;
		  	$btnChatbot.find('>button').attr("class","img_"+img_num);
			num++;
		}, 3000);*/
	}
}

//특정 링크이동시 테마로 이동
function locationLink(){
	var url = document.location.href.split("#")[1];
	if(url){
		var link = $('.'+url);
		link.each(function(index){
			var scrollT = link.offset().top;
			
			if (setting.mobile){
				var stickyH = $(".select_text").parent().height();

				$(".select_text").size() > 0 ? $("html, body").animate({
					scrollTop: scrollT - stickyH
				}, 400) : $("html, body").animate({
					scrollTop: scrollT
				}, 400);
			}else{
				var stickyH = $(".featureClone").height() + $(".featureBtns.clone").height();

				$(".featureClone").size() > 0 && $(".featureBtns.clone").size() > 0 ? $("html, body").animate({
					scrollTop: scrollT - stickyH
				}, 400) : $("html, body").animate({
					scrollTop: scrollT
				}, 400);
			}
		});
	}

	$(document).on('click', function(e){
		if(e.target.href){
			var url = e.target.href.split('#')[1];
			if(url){
				var link = $('.'+url);
				if(link.length > 0){
					var scrollT = link.offset().top;
					$('html, body').animate({scrollTop: scrollT}, 400);
				}
			}
		}
	});
}

/* INIT */
var init = function() {
	(setting.ieV <= 8) && require([ 'ie8support' ]);

	/* [header,footer] binding event */
	/*
	 * if(document.getElementById('headerWrap') == null) {
	 * $(document.getElementById('headerWrap')).load(function(){
	 * if(document.getElementById('footerWrap') == null) {
	 * $(document.getElementById('footerWrap')).load(function(){ gnb() }); }
	 * else { gnb(); goTop(); } }) } else { gnb(); goTop(); }
	 */
	/* [common] toggle */
	document.querySelector('.tg-slide') && toggle();

	/* [common] tab menu */
	document.querySelector('.common-tab') && commonTab();

	/* sliderNew */
	if ($(".slideUl:not('.rolling')").length || document.querySelector('.type04')) {
		require(['bxSlider'], function() { sliderNew() });
	}

	if (setting.mobile) {
		/* [usp-mobile] review slide */
		if (document.querySelector('.sl-slide')) {
			require([ 'slick' ], function() {
				if(document.querySelector('.m-review')){
					$('.m-review li a').show(0);
					$('.m-review').slick({
						dots : true,
						arrows : false,
						adaptiveHeight: true
					});
				}else{
					$('.sl-slide').slick({
						centerMode : true,
						centerPadding : '25%',
						speed : 300,
						arrows : false
					});
				}
			})
			
		}

		/* [fixToMobile] fix zoom */
		if ($('html').is('.rentalcare')) {
			fixToMobile.init({
				wrap : $('#container')
			})
		}
		;
		if ($('html').is('.product_usp_type_web')) {
			fixToMobile.init({
				wrap : $('#container')
			})
		}
		;
	} else {
		if (document.querySelector('.sl-slide.web')) {
			require([ 'slick' ], function() {
				$('.sl-slide.web').slick({
					dots: true,
					slidesToShow: 4,
					slidesToScroll: 4
				});
			});
		}
	}

	/* [common] custom scroll */
	if (!setting.mobile && $('.prdlist-opt .opts').length) {
		require([ 'jscroll' ], function() {
			actJScrollPane()
		});
	}

	/* iframeHeight */
	if (document.getElementById('ifrContent')) {
		require([ 'iframeHeight' ], function(fnc) {
			$('#ifrContent').iframeHeight({
				resizeMaxTry : 2,
				resizeWaitTime : 300,
				minimumHeight : 10,
				defaultHeight : 1000,
				heightOffset : 30,
				exceptPages : "",
				debugMode : false,
				visibilitybeforeload : false,
				blockCrossDomain : false,
				// externalHeightName : "bodyHeight",
				// onMessageFunctionName: "getHeight",
				domainName : "*",
				watcher : true,
				watcherTime : 1000
			});
		});
	}
	;

	/** ****** gnb temp for html ******* */
	/*
	var url = location.href.split('/');
	if (url[url.length - 1].indexOf('.html') > 0) {
		if (!$(document.body).hasClass('open-market')) {
			if (document.getElementById('headerWrap') == null) {
				$(document.createElement('div')).load(
						'/html/include/header.jsp',
						function(data) {
							$(document.body).prepend(data);
							$(document.createElement('div')).load(
									'/html/include/footer.jsp', function(data) {
										$(document.body).append(data);
										gnb();
										goTop();
									});
						});
			} else {
				gnb();
				goTop();
			}
		}
	} else {
		gnb();
		goTop();
	}
	*/
	gnb();
	goTop();
	chatBots();
	//old usp bugfix
        if(setting.mobile && $('.product_usp_type_web').length){
            $('.product_usp_type_web #container').on({'click':function(e){
            	/*href*/
            	if($(this).attr('href') && $(this).attr('href').indexOf('https://') != 0){
            		e.preventDefault();
                    try{
                    	$('html,body').scrollTop($($(this).attr('href')).offset().top);
                        //$($(this).attr('href')).attr('tabindex',1).focus();
                    }catch(e){}
            	}
            }},'a');
            $('body').addClass('ovxh');
        }

	/** ****** gnb temp ******* */

};

;(function($){
	//image
	$.fn.mediaImg = function(opts){
		var options = $.extend({}, $.fn.mediaImg.defaults, opts);
		return this.each(function(){
			var el = $(this);
			var elImg = el.children('img');
			var src = elImg.attr('src');
			var source = elImg.prev('source');
			var srcset = source.attr('srcset');
			
			if(el.length > 0){
				if(!setting.mobile){
					elImg.css({opacity: 1});
					source.attr('srcset', src);
				}else{
					elImg.attr('src', srcset);
				}
			}
		});
	}
	$.fn.mediaImg.defaults = {
		loading: '/lgekor/asset/images/usp/common/loading.gif'
	};
	$('.mediaImg').mediaImg();
})(jQuery);

if(!setting.mobile){
	require(['bxSlider'],function(){
		$('.codeSlide').bxSlider({
		  minSlides: 4,
		  maxSlides: 4,
		  pager: false,
		  controls: true,
		  moveSlides: 1,
		  slideWidth: 360,
		  slideMargin: 10
		});
	});
}

// 메인 thinq 탭 이벤트
$(document).ready(function() {	
	var tabs = $(".hero-tabs");
	function figure(event){
		var t = $(this);
		if (t.next('figure').is(':hidden')) {
			t.parent(tabs).find('figure').hide();
			t.parent(tabs).find('h3>a').removeClass("active");
			t.find('>a').addClass("active");
			t.next("figure").show();
		}
        return false;
	};
	tabs.find('h3').click(figure).focus(figure);
});

$(function() {
	init();
	locationLink();
});

/* temp font bold change */
/*
 * $(function(){ $(document.createElement('button')).html('Original
 * font').addClass('btn-r on
 * basicFont').css({'position':'fixed','left':'10px','bottom':'10px','z-index':'100'}).appendTo(document.body).on({"click":function(){
 * $(this).addClass('on'); $('.boldFont').removeClass('on');
 * $('*').each(function(){
 * $(this).css('font-weight',$(this).attr('data'))//('data',$(this).css('font-weight')); })
 * //$('*').css({'font-weight':200}); }});
 * $(document.createElement('button')).html('Bold font').addClass('btn-r
 * boldFont').css({'position':'fixed','left':'140px','bottom':'10px','z-index':'100'}).appendTo(document.body).on({"click":function(){
 * $(this).addClass('on'); $('.basicFont').removeClass('on');
 * $('*').each(function(){ $(this).attr('data',$(this).css('font-weight')); });
 * $('*').css({'font-weight':400}) }}); });
 */