/*layout-5 slide*/
function layout5(){
  $('.layout-5').on({
    "click" : function(){
      $(this).toggleClass('on');
    }
  },'.subDetail')
};

/*fridgeGallery*/
var fridgeGallery = (function(chk){
    var that = {
		web : function(n){
			var fridgeWrap = $('.fridge-gallery-wrap'),
			fridgeSlide = fridgeWrap.find('.slide'),
			fridgeSlideControl = fridgeWrap.find('.slide-control'),
			fridgeSlideDots = fridgeWrap.find('.slide-dots');

			fridgeWrap.on({'click':function(){

				fridgeSlideDots.find('span').eq($(this).index()).addClass('on').siblings().removeClass('on');
				fridgeSlideControl.toggleClass('on');

				fridgeSlide.stop().animate({"margin-left": ($(this).index() * -100) + "%"},700)

			}},'.slide-control button , .slide-dots span');
		},
        mobile : function(n){
        	if(document.querySelector('.slide-fridge-m')) {
        		require(['slick'],function(){
	    			$('.slide-fridge-m').each(function(){
	            		$(this).slick({
	            			dots: true,
	            			arrows: false,
	            			speed: 300,
	            			slidesToShow: 3,
	            			slidesToScroll: 3
	            		});
	            	});
        		});
        	}
        }
    }
    return (chk)? that.mobile : that.web;
})(setting.mobile);

/*faq mobile*/
var faqM = function(){
	$('.faqM').each(function(){
		$(this).find('.faq-list').bxSlider({auto : false});
		var thisDom = $('.faqM')
		setTimeout(function(){
	        thisDom.on({
	          'click' : function(){
	            //$(this).toggleClass('on').parent().next('.bx-wrapper').slideToggle();
				if($(this).hasClass('on')){
					$(this).removeClass('on').parent().next('.bx-wrapper').hide();
				}else{
					$(this).addClass('on').parent().next('.bx-wrapper').show();
				}
	          }
	        },'.see-more').find('.see-more').trigger('click');
        },1000);
	});
};

/*acc mobile*/
var accM = function(){
	$('.accM').each(function(){
		$t = $(this);

		var tmpHtml = $(document.createElement('div')).attr('class','acc-ul').appendTo($t);
		$t.find(".slideUl >  li:not('.bx-clone')").find('li').each(function(){
			$(this).clone().appendTo(tmpHtml);
		});
		$t.find('.slideF').html(tmpHtml);
		(tmpHtml.find('li>').length > 1) && tmpHtml.bxSlider({auto : false});
		setTimeout(function(){
			$t.on({
				'click' : function(){
					//$(this).toggleClass('on').parent().next('.slide').slideToggle();
					if($(this).hasClass('on')){
						$(this).removeClass('on').parent().next('.slide').hide();
					}else{
						$(this).addClass('on').parent().next('.slide').show();
					}
				}
			},'.see-more').find('.see-more').trigger('click');
        },1000)
	});
};

var notiBox = function(){
	$('.noti-box').each(function(){
		$(this).on('click', ' button', function(){
		  if($(this).parent().hasClass('on')){
			  $(this).parent().removeClass('on');
			  $(this).removeClass('rd-plus');
			  $(this).addClass('rd-minus');
		  }else{
			  $(this).parent().addClass('on');
			  $(this).removeClass('rd-minus');
			  $(this).addClass('rd-plus');
		  }
		});
	});
};

/*init_usp*/
var init_usp = {
	feature : function(reset){
		if(reset) {
			responsiveImage.oldWideMode = 0;
			responsiveImage.change();
			document.querySelector('.tg-slide') && toggle();
		    document.querySelector('.common-tab') && commonTab();
		    sliderNew();
		    featureScroll();
		}

	    if(setting.mobile) {
	    	/* [mobile-common] */
	    	document.querySelector('.faqM') && require(['bxSlider'],function(){ faqM() });
			document.querySelector('.accM') && require(['bxSlider'],function(){ accM() });
			document.querySelector('.layout-5') && layout5();
			document.querySelector('.noti-box') && notiBox();
			if(reset) {
			    document.querySelector('.sl-slide') &&  $('.sl-slide').slick({ centerMode:1, centerPadding:'25%', speed:300, arrows:0 });
			}
	    } else {
	    	if(reset) {
		    	/* [web-common] custom scroll */
			    $('.prdlist-opt .opts').length && actJScrollPane()
	    	}
	    }

		if(document.querySelector('.fridge-gallery-wrap')) {fridgeGallery()}
	},
	other : function(){

		$('.featureBtns.clone').remove();
		document.querySelector('.tg-slide') && toggle();

	}
}

/*responsive image*/
var responsiveImage = {
  //breakName : [720,1024,1600],
	breakName : (function(){
		return setting.mobile ? [720] : [1024,1600]
	})(),
	oldWideMode : null,
	thisWideMode : null,
	intervalChk : null,
	changeChk : null,
	imgs : $('img.responsive'),
	change : function(){
	/** this :: (object)responsiveImage
	 ************************************/
		var $t = this, chkMode = -1;

		//find current Mode
		do { ++chkMode } while(window.innerWidth > $t.breakName[chkMode]);
		chkMode = Math.min(chkMode, $t.breakName.length-1);

		//Change current Mode
		$t.thisWideMode = $t.breakName[chkMode];

		if($t.oldWideMode != $t.thisWideMode){
			$t.imgs = $('img.responsive');

			$t.imgs.each(function(){
				var thisImgSrc = this.src;
				this.src = thisImgSrc.replace( thisImgSrc.substring(thisImgSrc.lastIndexOf('_'), thisImgSrc.lastIndexOf('.')+1), '_' + $t.thisWideMode + '.' );
				//this.src = thisImgSrc.replace( /((_\.)|(_+\d+\.))/i, '_' + $t.thisWideMode + '.');
				//RegExp :: ((_\.)|(_+\d+\.))+(jpeg|jpg|png|gif|bmp)
			});
			$t.oldWideMode = $t.thisWideMode;

			$(window).on('load',function(){ featureScroll() });
		}

	},
	init : function(){
	/** this :: (object)responsiveImage
	 ************************************/
		var $t = this;

		$t.change();

		$(window).on('resize',function(){
			//Throttle
			clearTimeout($t.intervalChk);
			$t.intervalChk = setTimeout(function(){
				$t.change();
			},200);
		});
	}
}

/*feature fnc*/
var featureScroll = (function(chk){
	var that = {
		web : function() {
			var $replaceBox = $("#replaceBox"),
			featureIndex = $('.feature-index'),
			feature = $('[id^=featureIdx0]').add($('[id^=featureIdx0]').last().next()),
			featureL = feature.length-1,
			featureClone = null,
			featuresArr = [],
			features_ = '',
			featuresCnt = 0,
			resizeChk = null,
			btnsH = 140,
			featureBtnsT = document.querySelector('.responsive .featureBtns') ? $('.featureBtns').addClass('featureAct').closest('.responsive').offset().top + 50 : 50,
			featureBtnsClone = $('.featureBtns').clone().addClass('clone').appendTo($('.featureBtns').parent()),
			fnc = {
				scroll : function(){
					var sclTop = $(window).scrollTop();

					//featureBtns
					if(sclTop > featureBtnsT && sclTop < featuresArr[featureL] ){
						featureBtnsClone.addClass('move');
						featureIndex.addClass('move');
						$replaceBox.removeClass("default")
					}else{
						featureBtnsClone.removeClass('move');
						featureIndex.removeClass('move');
						$replaceBox.addClass("default")
					}



					if(sclTop > featuresArr[0] && sclTop < featuresArr[featureL]){
						//find current index
						featuresCnt = 0;
						do { featuresCnt++ }
						while(sclTop>featuresArr[featuresCnt])
						var controlO = featureClone.eq(featuresCnt-1).addClass('on');
						var percent = ((sclTop - featuresArr[featuresCnt-1]) / (featuresArr[featuresCnt] - featuresArr[featuresCnt-1])) * 100;
						controlO.siblings().removeClass('on').find('span').stop().css({"margin-left" : 100 + "%"});
						controlO.find('span').stop().css({"margin-left": (-100 + percent) + "%"});
					}else if(sclTop < featuresArr[0]){
						var controlO = featureClone.eq(featuresCnt-1).addClass('on');
						$(".featureClone li").removeClass("on").find('span').stop().css({"margin-left" : 100 + "%"});
					}

				},
				reposTop : function(n){
					featuresArr = [];
					btnsH = $('.featureBtns.clone').height() + $('.featureClone').height() - (n || 0);
					feature.each(function(){
						var thisObj = $(this);

						featuresArr.push(thisObj.offset().top-btnsH);
					});
				},
				init : function(){
					$replaceBox.addClass("default")
					$('> ul li', $('.feature')).each(function(i){
						features_ = features_ + "<li><a href='#'>" + $(this).html() + "</a><span /></li>";
					});

					featureIndex.html("<section class='responsive full featureClone'><section><ul>" + features_ + "</ul></section></section>");
					featureClone = featureIndex.find('li');

					this.reposTop();
					fnc.scroll();

					$(window).on({
						"scroll" : this.scroll,
						"resize" : function(){
							clearTimeout(this.resizeChk);
							this.resizeChk = setTimeout(function(){fnc.reposTop(50)},100);
						}
					});

					//require(['jqueryEasing'],function(){
						featureIndex.on({ "click" : function(e){
								$("html, body").stop().animate({scrollTop: featuresArr[$(this).parent().index()]+1 + "px"}, 800);
								e.preventDefault();

								//$("html, body").stop().animate({scrollTop: featuresArr[$(this).index()]+1 + "px"},1300, "easeInOutQuart");
							}
						},'li > a');
						
						/* content flexible */
						$('.btn_collapse_more > a, .uspCollpase .close > button, .btnFlexHeight').on('click', function(e){
							setTimeout(function(){
								fnc.reposTop(50);
							}, 500);
							e.preventDefault();
						});
					//});
				},

				loadFeature: function(){
					var hash = location.hash;
					var itemID = 0;
					if(hash){
						featureIndex.siblings('div').each(function(){
							if($(this).attr('id') == hash.split('#')[1]){
								if(itemID == 0){
									itemID = setTimeout(function(){
										$("html, body").stop().animate({scrollTop: featuresArr[parseInt(hash.split('#featureIdx0')[1]) - 1] + 1 + 'px'}, 400);
									}, 400);
								}
							}
						});
					}
				}
			}

			fnc.init();
			fnc.loadFeature();
		},
		mobile : function() {
			var tit = $('.featureTitle'), fBtns = $('.featureBtns').addClass('featureAct').parents('.responsive'), cont = $('[id^=featureIdx0]');

			if(!tit.length) {
				//Create title
				$('> ul li', $('.feature')).each(function(idx){
					$(document.createElement('div')).addClass('featureTitle').html(this.innerHTML).append(document.createElement('span')).prependTo(cont.eq(idx))
				});
				tit = $('.featureTitle');
			}
			require(['fixto'],function(){
				//Sticky tabmenu
				var featureBtnsWrap = document.getElementById('featureBtnsWrap')

				if(featureBtnsWrap) {
					if(typeof featureBtnsWrap != "undefined") {
						featureBtnsWrap.fixto = fixto.fixTo(featureBtnsWrap,document.getElementById('content'),{zIndex:10});
						$(featureBtnsWrap).on({'click':function(){
							var t = $('#replaceBox').offset().top - $(this).height() - 50;
							scrollTo(0,t);
							return false;
						}},'a');
					}
				}

				//Sticky title
				tit.each(function(){
					if(!this.fixto)
						this.fixto = fixto.fixTo(this, this.parentNode, {zIndex:9,mind:featureBtnsWrap});
				})
			});

			if(cont.length) {
				$(window).on({
					"scroll" : function() {
						var sT = window.scrollY, idx = 0, percent = 0;
						
						if( sT > cont.first().offset().top && sT < cont.last().offset().top + cont.last().height() ) {
							while( sT >= cont.eq(idx).offset().top ) {
								//Set title offsetTop
								if(++idx >= tit.length)
									break;
							}

							with (Math) { //inherit Math Object
								idx = min( idx-1, tit.size()-1 );
								percent = (sT - cont.eq(idx).offset().top)/cont.eq(idx).height() * 100;
								percent = Number(min(max(percent,0),100).toFixed(2)); // (0 < percent < 100)
							}

							tit.eq(idx).children('span').css('marginLeft', (-100+percent)+'%');
							tit.eq(idx).siblings().children('span').css('marginLeft', '-100%');
						}
					}
				});
			}
		}
	}
    return chk?that.mobile : that.web;
})(setting.mobile);


//tab
var tabWrap = {
	tabInit: function(){
		this.wheight = 0;
		this.itemWrap = null;
	},
	tabload: function(){
		if(setting.mobile){
			this.itemWrap = $('.tab-wrap');
			this.wheight = $('.tab-wrap .slideF li.on img.responsive').outerHeight() - 82;

			this.itemWrap.find('.slideC').css({
				'margin-top': this.wheight
			});
		}
	},
	tabEventListner: function(){
		var objThis = this;

		$('.slideC.dottNum').each(function(){
			$(this).on('click', 'li button', function(e){
				var index = $(this).closest('li').index();

				$('.slideC button').removeClass('on');
				$('.slideC button').eq(index).addClass('on');
			});
		});

		$('.slideC > button').each(function(){
			$(this).on('click', function(e){
				var index = $(this).index();

				$('.slideC.dottNum li').removeClass('on');
				$('.slideC.dottNum li').eq(index).addClass('on');
			});
		});
	}
}

$(window).on('load resize',function(){
	tabWrap.tabload();
	tabWrap.tabEventListner();
});

$(window).on('load',function(){
	require(['kakao'],function(){ if(typeof fnCommonKakaoInit == 'function') { fnCommonKakaoInit(); } });
});

//REVIEW
require(['scriptUi'],function(){ init_usp.feature(); });
require(['twentytwenty'],function(){
	var stopJSunfold = $('body');
	if (stopJSunfold.hasClass('open-market')) {
		return false;
	}

	if($('.unit').hasClass('visual_diff')){
		$("#twentytwenty-container[data-orientation!='vertical']").twentytwenty();
		var autoBeforeAfter = function() {
			var flag = true;
			$(window).scroll(function () {

				if($('.unit.visual_diff').length){
					var height = $(document).scrollTop();
					var wHeight = $(window).innerHeight() / 2;
					var tPoint = $('.visual_diff .twentytwenty-container').offset().top - wHeight;
					var bPoint = $('.visual_diff .twentytwenty-container').parents('.responsive').parent().next().offset().top - wHeight;
					var beforeImg = $('.visual_diff .twentytwenty-before');
					var imgWidth = beforeImg.innerWidth();
					var imgHeight = beforeImg.innerHeight();
					var handlePit = $('.visual_diff .twentytwenty-handle').css('left');
					var handlePitNumb =  parseInt(handlePit);
//console.log(bPoint);
					if(height >= tPoint && bPoint >= height){
						if(handlePitNumb <= imgWidth && flag){
							$('.visual_diff .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, ' + imgWidth + 'px, ' + imgHeight + 'px, 0px)'});
							$('.visual_diff .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': imgWidth});
							setTimeout(function(){
								$('.visual_diff .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, 0px, ' + imgHeight + 'px, 0px)'});
								$('.visual_diff .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': 0});
							}, 900);
							setTimeout(function(){
								$('.visual_diff .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, ' + (imgWidth / 2) + 'px, ' + imgHeight + 'px, 0px)'});
								$('.visual_diff .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': imgWidth / 2});
							}, 1800);
							setTimeout(function(){
								$('.visual_diff .twentytwenty-before').removeClass('tg_timer_img');
								$('.visual_diff .twentytwenty-handle').removeClass('tg_timer_hand');

							}, 2500);

							flag = false;
						}
					}
				}
			});
		};
		autoBeforeAfter();
	}

		if($('.usp_tv').hasClass('tv1')){
		$("#twentytwenty-container[data-orientation!='vertical']").twentytwenty();

		var tvBeforeAfter = function() {

			var flag = true;

			$(window).scroll(function () {
				if($('.usp_tv.tv1').length){
					var height = $(document).scrollTop();
					var wHeight = $(window).innerHeight() / 2;
					var tPoint = $('.tv1 .twentytwenty-container').offset().top - wHeight;
					var bPoint = $('.tv1 .twentytwenty-container').parents('.visual_wrap').next().offset().top - wHeight;
					var beforeImg = $('.tv1 .twentytwenty-before');
					var imgWidth = beforeImg.innerWidth();
					var imgHeight = beforeImg.innerHeight();
					var handlePit = $('.tv1 .twentytwenty-handle').css('left');
					var handlePitNumb =  parseInt(handlePit);
//console.log(bPoint);
					if(height >= tPoint && bPoint >= height){
						if(handlePitNumb <= imgWidth && flag){
							$('.tv1 .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, ' + imgWidth + 'px, ' + imgHeight + 'px, 0px)'});
							$('.tv1 .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': imgWidth});
							setTimeout(function(){
								$('.tv1 .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, 0px, ' + imgHeight + 'px, 0px)'});
								$('.tv1 .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': 0});
							}, 900);
							setTimeout(function(){
								$('.tv1 .twentytwenty-before').stop().addClass('tg_timer_img').css({'clip': 'rect(0px, ' + (imgWidth / 2) + 'px, ' + imgHeight + 'px, 0px)'});
								$('.tv1 .twentytwenty-handle').stop().addClass('tg_timer_hand').css({'left': imgWidth / 2});
							}, 1800);
							setTimeout(function(){
								$('.tv1 .twentytwenty-before').removeClass('tg_timer_img');
								$('.tv1 .twentytwenty-handle').removeClass('tg_timer_hand');

							}, 2500);

							flag = false;
						}
					}
				}
			});


		};

	tvBeforeAfter();
	}
});
/* // 2017-05-25 */
/* b2c_0417 modify : 20170320 start */
var b2c_0417_usp = function() {

	if ($("html").hasClass("mobile")) {
		setTimeout(function(){
			var listText = $('.feature-index.b2c_0417 li:first-child').text();
			var textList = $('.mobile .feature-index.b2c_0417 ul');
			$('.select_text').text(listText);

			$('.b2c_0417 .select_text').on("click", function() {
				if(textList.hasClass('select_on')){
					//textList.stop().slideUp();
					//textList.removeClass('select_on');
				}else{
					textList.stop().slideDown();
					textList.addClass('select_on');
				}
			});

			$('.mobile .feature-index.b2c_0417 ul li > button').on("click", function() {
				var selectText = $(this).parent().text();
				$('.select_text').text(selectText);
				textList.stop().slideUp();
				textList.removeClass('select_on');
			});

			var contPos_arr = [];
			function setContPos() {
				var list = $('.feature-index.b2c_0417 li');

				list.each(function(i) {
					var cont = $('#featureIdx0' + (i + 1));
					var contTop = cont.offset().top;
					contPos_arr[i] = contTop;
				});
			}

			function wScroll() {
				var list = $('.feature-index.b2c_0417 li');
				var st = $(this).scrollTop();
				var title = $(".feature-index.b2c_0417 .select_text");
				var textDiv = $(".feature-index.b2c_0417 .select_text").outerHeight();

				var winHeight = $(window).scrollTop();
				var featureTitle = $('.feature-index.b2c_0417');
				var featureTitleHeight = $('.feature-index.b2c_0417').outerHeight();
				var featureBtnsNext = $('.usp #featureBtnsWrap').next();
				var featureBtnspit = $('.usp #featureBtnsWrap').offset().top;
				var featureBtns = $('.usp #featureBtnsWrap');
				var featureBtnsNextPit = $('.usp #featureBtnsWrap').next().offset().top;

				list.each(function(i) {
					if (st >= contPos_arr[i] - (textDiv*3)) {
						title.text($(this).text());
					}
				});

				if(featureBtnsNextPit <= winHeight){
					featureTitle.addClass('move_tit');
					featureBtnsNext.css({'padding-top': featureTitleHeight});

				}else{
					featureTitle.removeClass('move_tit');
					featureBtnsNext.css({'padding-top': '0'});
				}

				if(featureBtnspit <= winHeight){
					featureBtns.addClass('move_tit');
				}else{
					featureBtns.removeClass('move_tit');
				}
				return false;
			}


			$(window).resize(function() {
				setContPos();
			}).resize();

			if($('#content').hasClass('usp')){
				$(window).on("scroll", wScroll);
			};

			$(".feature-index.b2c_0417 li").each(function() {
				$(this).on("click", function() {
					$(window).off();
					var idx = $(this).index() + 1;
					var cont = $("#featureIdx0" + idx);
					var fixedHeight = $(".featureAct li").outerHeight();
					var fixedListHeight = $(".b2c_0417 .select_text").outerHeight();
					var top = cont.offset().top - fixedListHeight * 2 + 65;
					var speed = 1000;
					var listText = $(this).text();

					$("html, body").stop().animate({"scrollTop": top}, speed, function() {
						$(window).on("scroll", wScroll);

						return false;
					});
					$('.feature-index').animate({'top':0});
				});
				
				/* contents flexble */
				$('.btn_collapse_more > a, .uspCollpase .close > button, .sliderNav .swiper-slide, .btnFlexHeight').on('click', function(e){
					setTimeout(function(){
						setContPos();
					}, 500);
					e.preventDefault();
				});
			});
		}, 500);
	}
	if($('html').hasClass('mobile')){
		var swiper = new Swiper('.swiper_usp_2017.typeC .swiper-container', {
			pagination: '.swiper-pagination_typeC',
			paginationClickable: true,
			effect: 'slide',
			spaceBetween: 0,
			slideToClickedSlide: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false
		});

		var typeZswiper = new Swiper('.swiper_usp_2017.typeZ .swiper-container', {
			pagination: '.swiper-pagination_typeZ',
			paginationClickable: true,
			effect: 'slide',
			spaceBetween: 0,
			slideToClickedSlide: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false
		});

		var typeBswiper = new Swiper('.swiper_usp_2017.typeA .swiper-container', {
			pagination: '.swiper-pagination_typeA',
			paginationClickable: true,
			effect: 'slide',
			spaceBetween: 0,
			slideToClickedSlide: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false
		});

		var typeBswiper = new Swiper('.swiper_usp_2017.typeB .swiper-container', {
			pagination: '.swiper-pagination_typeB',
			paginationClickable: true,
			effect: 'slide',
			spaceBetween: 0,
			slideToClickedSlide: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false
		});
	}else{


		var	swiper = new Swiper('.swiper_usp_2017.typeC .swiper-container', {
			pagination: '.swiper-pagination_typeC',
			paginationClickable: true,
			nextButton: '.swiper-button-next_typeC',
			prevButton: '.swiper-button-prev_typeC',
			spaceBetween: 0,
			loop: true,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			autoplay: 3000,
			autoplayDisableOnInteraction: false
			//mousewheelControl: true,
			//mousewheelReleaseOnEdges: true

		});
		var	typeBswiper = new Swiper('.swiper_usp_2017.typeZ .swiper-container', {
			pagination: '.swiper-pagination_typeZ',
			paginationClickable: true,
			nextButton: '.swiper-button-next_typeZ',
			prevButton: '.swiper-button-prev_typeZ',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			mousewheelControl: true,
			mousewheelReleaseOnEdges: true
		});
		var	typeBswiper = new Swiper('.swiper_usp_2017.typeA .swiper-container', {
			pagination: '.swiper-pagination_typeA',
			paginationClickable: true,
			nextButton: '.swiper-button-next_typeA',
			prevButton: '.swiper-button-prev_typeA',
			spaceBetween: 0,
			loop: true,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			autoplay: 3000,
			autoplayDisableOnInteraction: false
			//mousewheelControl: true,
			//mousewheelReleaseOnEdges: true

		});
		var	typeBswiper = new Swiper('.swiper_usp_2017.typeB .swiper-container', {
			pagination: '.swiper-pagination_typeB',
			paginationClickable: true,
			nextButton: '.swiper-button-next_typeB',
			prevButton: '.swiper-button-prev_typeB',
			spaceBetween: 0,
			loop: true,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			autoplay: 3000,
			autoplayDisableOnInteraction: false
			//mousewheelControl: true,
			//mousewheelReleaseOnEdges: true

		});
	}
	if($('html').hasClass('mobile')){
		var featureBtnsSwipe = (function () {
			var idx;
			$('#featureBtnsWrap li').each(function(i){
				if ($(this).hasClass("on")) {
					idx = i;
				}
			});
			var swiper_subTab = new Swiper('.swiper-container-featureBtn', {
				slidesPerView: 'auto',
				initialSlide : idx,
				centeredSlides: false,
				paginationClickable: true,
				grabCursor: true,
				loop : false,
			});
		})();
	}
	var imgSlide = (function(){
		var swiper = new Swiper('.img_slide_wrap', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			continuous: true,
			simulateTouch: false,
		});
	})();
	var galleryTop;
	var galleryThumbs;
	var idx = 0;

	var magicGalleryTop;
	var magicGalleryThumbs;
	var idxMagic = 0;

	if($('html').hasClass('mobile')){

		var addInfo = $('#usp_add_info.add_info_fridge');
		var infoSlider = $('#usp_add_info.add_info_fridge .swiper-container');
		if(infoSlider.hasClass('swiper-container')){
			infoSlider.removeClass();
		}


		var swiper = new Swiper('.vertical_slider_wrap .swiper-container', {
			nextButton: '.swiper-button-next_vertical',
			prevButton: '.swiper-button-prev_vertical',
			spaceBetween: 0,
			effect: 'fade',
			slideToClickedSlide: false,
			mousewheelControl: true,
			mousewheelReleaseOnEdges: true
		});

		var swiper = new Swiper('.horizontal_slider_wrap .swiper-container', {
			nextButton: '.swiper-button-next_horizontal',
			prevButton: '.swiper-button-prev_horizontal',
			spaceBetween: 0,
			effect: 'fade',
			slideToClickedSlide: false,
			mousewheelControl: true,
			mousewheelReleaseOnEdges: true
		});

		var	swiper = new Swiper('.mobile .swiper-container.typeD', {
			pagination: '.swiper-pagination_info_airD',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airD',
			prevButton: '.swiper-button-prev_airD',
			spaceBetween: 0,
			effect: 'slide',
			loop: true,
			slideToClickedSlide: false,
		});

		var	swiper = new Swiper('.mobile .swiper-container.typeE', {
			pagination: '.swiper-pagination_info_airE',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airE',
			prevButton: '.swiper-button-prev_airE',
			spaceBetween: 0,
			effect: 'slide',
			loop: true,
			slideToClickedSlide: false,
		});

		var	swiper = new Swiper('.mobile .swiper-container.typeF', {
			pagination: '.swiper-pagination_info_airF',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airF',
			prevButton: '.swiper-button-prev_airF',
			spaceBetween: 0,
			effect: 'slide',
			loop: true,
			slideToClickedSlide: false,
		});

		var	swiper = new Swiper('.mobile .swiper-container.typeG', {
			pagination: '.swiper-pagination_info_airG',
			paginationClickable: true,
			spaceBetween: 0,
			effect: 'slide',
			loop: true,
			slideToClickedSlide: false,
		});
		if($('.detail_fridge_wrap').children().hasClass('detail_slider')){
			// console.log('mobile');
			function swiperInit( index ) {
				// console.log('mobile');
				galleryTop = new Swiper('.gallery-top', {
					pagination: '.swiper-pagination_fridge',
					paginationClickable: true,
					paginationBulletRender: function (swiper, index, className) {
						return '<span class="' + className + ' '+("ssilde" + index)+'">' + (index + 1) + '</span>';
					},
					spaceBetween: 0,
					initialSlide : index,
					effect: 'slide',
					slideToClickedSlide: true,
					onSlideChangeEnd : function(swiper) {
						idx = swiper.activeIndex;
					}
				});

				galleryThumbs = new Swiper('.gallery-thumbs', {
					nextButton: '.swiper-button-next_gallery',
					prevButton: '.swiper-button-prev_gallery',
					spaceBetween: 0,
					centeredSlides: true,
					slidesPerView: 1,
					touchRatio: 0.2,
					initialSlide : index,
					slideToClickedSlide: true,
					effect: 'slide'
				});

				galleryTop.params.control = galleryThumbs;
				galleryThumbs.params.control = galleryTop;

			}

			function swiperDestroy() {
				if (galleryTop.destroy != undefined) {
				galleryTop.destroy()
				}

				$('.gallery-top').find('*').removeAttr('style');

				if (galleryThumbs.destroy != undefined) {
				galleryThumbs.destroy();
			}

				$('.gallery-thumbs').find('*').removeAttr('style');
			}

			$(window).resize(function() {

				if (galleryTop != undefined)
				{
					swiperDestroy();
				}

				swiperInit( idx );

			}).resize();
		}
	}else{

		var addInfo = $('#usp_add_info.add_info_air');
		var infoSlider = $('#usp_add_info.add_info_air .swiper-container.typeG');
		if(infoSlider.hasClass('swiper-container')){
			infoSlider.removeClass();
		}

		var imgHeight = $('.detail_fridge_wrap .img_wrap').outerHeight();
		var wWidth = $(window).width();


		setTimeout(function(){

			$('.web .detail_fridge_wrap .swiper-pagination_fridge').css({'height' : imgHeight});

			$(window).scroll(function(){
				wWidth = $(window).width();
				imgWidth = $('.detail_fridge_wrap .img_wrap').outerHeight();
				$('.web .detail_fridge_wrap .swiper-pagination_fridge').css({'height' : imgWidth, 'visibility' : 'visible'});

			});
			$(window).resize(function(){
				wWidth = $(window).width();
				imgWidth = $('.detail_fridge_wrap .img_wrap').outerHeight();
				$('.web .detail_fridge_wrap .swiper-pagination_fridge').css({'height' : imgWidth, 'visibility' : 'visible'});

			}).resize();
		}, 1500);

		var	swiper = new Swiper('.web #usp_add_info.add_info_fridge .swiper-container', {
			pagination: '.swiper-pagination_info',
			paginationClickable: true,
			nextButton: '.swiper-button-next_fridge',
			prevButton: '.swiper-button-prev_fridge',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			loop: true,
			slideToClickedSlide: false,
		});

		var	swiper = new Swiper('.web .swiper-container.typeD', {
			pagination: '.swiper-pagination_info_airD',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airD',
			prevButton: '.swiper-button-prev_airD',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			loop: true,
			slideToClickedSlide: false,

		});

		var	swiper = new Swiper('.web .swiper-container.typeE', {
			pagination: '.swiper-pagination_info_airE',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airE',
			prevButton: '.swiper-button-prev_airE',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			loop: true,
			slideToClickedSlide: false,

		});

		var	swiper = new Swiper('.web .swiper-container.typeF', {
			pagination: '.swiper-pagination_info_airF',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airF',
			prevButton: '.swiper-button-prev_airF',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			loop: true,
			slideToClickedSlide: false,

		});

		var	swiper = new Swiper('.web .usp_aircleaner .swiper-container.typeG', {
			pagination: '.swiper-pagination_info_airG',
			paginationClickable: true,
			nextButton: '.swiper-button-next_airG',
			prevButton: '.swiper-button-prev_airG',
			spaceBetween: 0,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			loop: true,
			slideToClickedSlide: false,

		});

		var	swiper = new Swiper('.vertical_slider_wrap .swiper-container', {
			nextButton: '.swiper-button-next_vertical',
			prevButton: '.swiper-button-prev_vertical',
			spaceBetween: 0,
			effect: 'fade',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			mousewheelControl: true,
			mousewheelReleaseOnEdges: true

		});

		var	swiper = new Swiper('.horizontal_slider_wrap .swiper-container', {
			nextButton: '.swiper-button-next_horizontal',
			prevButton: '.swiper-button-prev_horizontal',
			spaceBetween: 0,
			effect: 'fade',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			mousewheelControl: true,
			mousewheelReleaseOnEdges: true

		});

		galleryTop = new Swiper('.gallery-top', {
			pagination: '.swiper-pagination_fridge',
			paginationClickable: true,
			paginationBulletRender: function (swiper, index, className) {
				return '<span class="' + className + ' '+("ssilde" + index)+'">'+ 0 + (index + 1) + '</span>';
			},
			nextButton: '.swiper-button-next_gallery',
			prevButton: '.swiper-button-prev_gallery',
			spaceBetween: 0,
			loop: true,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: false,
			mousewheelControl: false,
			onSlideChangeEnd : function(swiper) {
				idx = swiper.activeIndex;
			},

		});

		galleryThumbs = new Swiper('.gallery-thumbs', {
			pagination: '.swiper-pagination_fridge',
			paginationClickable: true,
			paginationBulletRender: function (swiper, index, className) {
				return '<span class="' + className + ' '+("ssilde" + index)+'">'+ 0 + (index + 1) + '</span>';
			},
			spaceBetween: 0,
			centeredSlides: false,
			slidesPerView: 1,
			touchRatio: 0.2,
			loop: true,
			effect: 'slide',
			continuous: true,
			simulateTouch: false,
			slideToClickedSlide: true,
			mousewheelControl: true,
			slideToClickedSlide: true

		});

		galleryTop.params.control = galleryThumbs;
		galleryThumbs.params.control = galleryTop;
		//console.log('pc');
	}

	/* magic slider */
	var magicGalleryTop = new Swiper('.magic-top', {
		pagination: '.swiper-pagination_magic',
		paginationClickable: true,
		nextButton: '.swiper-button-next_magic',
		prevButton: '.swiper-button-prev_magic',
		spaceBetween: 0,
		effect: 'slide',
		continuous: true,
		simulateTouch: false,
		loop: true,
		slideToClickedSlide: true,

	});

	/* 세탁기 유투브 동영상리스트 */
		var slidesPerColumn;
		var slidesPerView;
		( setting.mobile ) ? slidesPerView = 2 : slidesPerView  = 4;
		( setting.mobile ) ?  slidesPerColumn = 2 : slidesPerColumn   = 1;

		var swiper = new Swiper('.thumb_wrap', {
			pagination: '.swiper-pagination',
			slidesPerView: slidesPerView ,
			spaceBetween: 10,
			slidesPerGroup:2,
			slidesPerColumn: slidesPerColumn,
			paginationClickable: true,
		});

		$(".thumb_wrap .swiper-slide a").on("click",function(e){
			e.preventDefault();
			var id = $(this).attr('id');
			$('.movie_wrap iframe').attr('src','https://www.youtube.com/embed/'+ id +'?rel=0&amp;enablejsapi=1'); 	
		});
	/* //세탁기 유투브 동영상리스트 */

	var magicGalleryThumbs = new Swiper('.magic-thumbs', {
		spaceBetween: 0,
		centeredSlides: true,
		slidesPerView: 1,
		slideToClickedSlide: true,
		loop: true,
		continuous: true,
		simulateTouch: false,
		effect: 'slide'
	});

	magicGalleryTop.params.control = magicGalleryThumbs;
	magicGalleryThumbs.params.control = magicGalleryTop;
};
/* b2c_0417 modify : 20170320 end */


var UI = {
	init : function(){
		UI.btnRotate(); //btn rotate
		UI.view360Box(); //view360
		UI.modelList(); //2018-08-17 모바일 UI 개선 추가
		UI.videoAnmation(); //video
		UI.lazyVideo(); //lazy video
		UI.collapsibleEvent(); //collapsible
		UI.videoUspPlay(); //video play btn
		UI.bestmall(); //베스트샵몰 scroll 오류로 인한 대체
		UI.bestmallLink(); //베스트샵몰 웹, 모바일 링크주소 바꾸기
		UI.parallax();//
	},

	btnRotate : function(){
		$(document).on({
			'click' : function(){
				var $this = $(this);
				if($this.is('.rotate_on')){
					$this.removeClass('rotate_on').next().slideUp();
				}else{
					$this.addClass('rotate_on').next().slideDown();
				}
			}
		}, '.btn_rotate')
		var btn_open = $('.btn_rotate');
		btn_open.on('click', function(){
			//$(this).toggleClass("rotate_on");
			//$(this).parent().parent().parent().find('.more_cont').slideToggle();
			$('.more_cont_wrap .more_cont').slideToggle();
			$('.top_cont .more_cont').slideToggle();
		});
	},

	view360Box : function(){
		$('.modal360 ').each(function(index){
			var frame = $(this).find('iframe')
			if(!setting.mobile){
				frame.width(833);
				frame.height(833);
			}
			else{
				frame.width(320);
				frame.height(350);
			}
		});
	},

	modelList : function(){
		if($(".list_model").size() >= 1){
			var focusModel = $(".list_model .on").offset().left;

			$(".nav_model .inner").scrollLeft(focusModel);
				// console.log(focusModel)
				// console.log(wrapScroll)
		}
	},

	videoAnmation : function(){
		$('.videoBox').each(function() {
			var video = $(this).find('video');
			var objThis = $(this);
			var h = $(this).height();
			var flag;
			var playH;

			if(!setting.mobile){
				flag = 0;
				playH = window.innerHeight;
			}else{
				(video.length > 1) ? flag = 1 : flag = 0;
				playH = window.innerHeight;
				//모바일에 버튼이 없는경우
				if(objThis.hasClass('uspVideo')){
					video.closest('.responsive').on('click', function() {
						video[flag].play();
					});
				}else{
					$(this).append('<button class="btn"></button>');
					video.parent().on('click', '.btn', function() {
						video[flag].play();
						$(this).hide(0);
					});
				}
			}

			function urlLoad(){
				if(objThis.hasClass('uspVideo') && video.data("src")){
					var src = video.data("src");
					var srcLength = src.length;
					var srcFirst = src.substring(0, srcLength-4);
					var srcLast = src.substring(srcLength, srcLength-4);

					if(!setting.mobile){
						var srcMaster = (srcFirst + srcLast);
						var posterMaster = (srcFirst + '.jpg');
					}else{
						if(objThis.hasClass("onW")) return;
						var srcMaster = (srcFirst + '_m' + srcLast);
						var posterMaster = (srcFirst + '_m' + '.jpg');
					}

					video.attr("poster", src.replace(src, posterMaster));
					video.prop("src", src.replace(src, srcMaster));
				}
			}
			urlLoad();

			function playArea(){
				var offh = objThis.offset().top;
				var wt = $(this).scrollTop();
				if ((offh - playH) <= wt && (offh + h) >= wt) {
					var playPromise = video[flag].play();
					objThis.find('.btn').hide(0);
				} else {
					objThis.find('.btn').show(0);
				}
			}

			$(window).on('scroll load', function() {
				playArea();
			});
		});
	},

	lazyVideo : function(){
		require(['lazyload'], function() {
			if($('.lazyVideo').size() >= 1){
				var $target = $('.lazyVideo.onW');
				(setting.mobile) ? ($target = $('.lazyVideo.onM')) : ($target = $('.lazyVideo.onW'));
				$target.Lazy({
					customLoaderName: function(el) {
						var vidPoster = el.find('video').data('poster');
						var vid = el.find('video data-src').attr('src');
						el.find('video').attr('poster', vidPoster);
						el.find('video').html('<source src='+vid+' type="video/mp4"></source>');
					}
				});
			}
		});
	},

	collapsibleEvent : function(){
		//swiper contents
		$('.sliderPage').each(function(index, el) {
			var sliderPage = $(this);
			var sliderNav;
			var sliderBody;
			var top = $('.sliderNav', this);
			var body = $('.sliderBody', this);
			var height = [];
			var uspSlider;
			var idx = 0;
			var sliderAdaptiveHeightAuto;
			var stickyHeight = $('.featureBtns').height() + $('.b2c_0417').height();

			//더 알아보기 추가
			if(setting.mobile){
				if(top.find('.swiper-slide').length >= 2){
					body.parents('.sliderPage').append('<div class="swipeTip"><img src="slide_tip.png" alt="페이지를 좌우로 넘겨보세요." /></div>');
				}

				if(sliderPage.hasClass('foldBody')){
					if(body.find('.contentBody').length == 0){
						body.find('.btn_collapse_more').remove();
					}
					body.find('.contentBody').after('<p class="btn_collapse_more"><a href="#">더 알아보기 <em>+</em></a></p>'); //컨텐츠만 열릴경우 알아보기(헤더고정)
					body.find('.contentBody').append('<div class="close"><button type="button"><img src="btn_more_close.png" alt="닫기"></button></div>'); //기본 닫기
				}else{
					if(body.find('.contentBody').length == 0){
						body.find('.btn_collapse_more').remove();
					}
					body.find('.contentBox').before('<p class="btn_collapse_more"><a href="#" class="moreImg"><img src="btn_more.png" alt="더 알아보기 버튼"></a></p>'); //기본(TV) 알아보기
					body.find('.contentBox').append('<div class="close"><button type="button"><img src="btn_more_close.png" alt="닫기"></button></div>'); //기본 닫기
				}
			}else{
				body.find('.contentBody').append('<div class="close"><button type="button"><img src="btn_more_close_web.png" alt="닫기"></button></div>'); //기본 닫기
				body.find('.uspCollpase').each(function(){
					if($(this).find('.contentBody').length > 0){
						$(this).find('.contentHead .subLayout .text').append('<p class="btn_collapse_more"><a href="#">더 알아보기 <em>+</em></a></p>'); //기본 알아보기
					}
				});
			}
			
			if(setting.mobile){
				//perv, next 활성화
				var controlsBtn = function(idx){
					(idx <= 0) ? top.find('.swiper-button-prev').addClass('swiper-button-disabled') : top.find('.swiper-button-prev').removeClass('swiper-button-disabled');
					(idx >= (sliderNav.wrapper.find('.swiper-slide').length-1)) ? top.find('.swiper-button-next').addClass('swiper-button-disabled') : top.find('.swiper-button-next').removeClass('swiper-button-disabled');
				}

				//Nav Body 컨트롤
				var slideNavActive = function(swiper, idx){
					var slide = sliderNav.wrapper.find('.swiper-slide');
					sliderBody.slideTo(idx);
					controlsBtn(idx);
					slide.removeClass('swiper-slide-active');
					slide.eq(idx).addClass('swiper-slide-active');
				}
				//펼침되는 컨텐츠
				var collpaseOpenContent = function($item){
					var index = $item.closest('.uspCollpase').index();

					$item.closest('.sliderBody').find('.btn_collapse_more').stop().fadeOut(200);
					if($item.closest('.sliderPage').hasClass('foldBody')){
						$item.closest('.sliderBody').find('.contentBody').stop().slideDown(300, function(){
							$item.closest('.swiper-wrapper').height(height[index]);
						});
					}else{
						$item.closest('.sliderBody').find('.contentBox').stop().slideDown(300, function(){
							$item.closest('.swiper-wrapper').height(height[index]);
						});
					}
				}
				//펼침닫는 컨텐츠
				var collpaseCloseContent = function($item){
					if($item.closest('.sliderPage').hasClass('foldBody')){
						$item.closest('.sliderBody').find('.contentBody').css({'display': 'none'});
						$item.closest('.sliderPage.foldBody').find('.sliderNav .swiper-slide').removeClass('swiper-slide-active');
					}else{
						$item.closest('.sliderBody').find('.contentBox').css({'display': 'none'});
						$item.closest('.sliderPage').find('.sliderNav .swiper-slide').removeClass('swiper-slide-active');
					}
					$item.closest('.sliderBody').find('.btn_collapse_more').css('display', 'block');
					$item.closest('.sliderBody').find('.btn_collapse_more > a').addClass('active');
					$item.closest('.swiper-wrapper').height($item.closest('.uspCollpase').height());
					sliderBody.params.touchRatio = 0;
				}

				//더 알아보기 버튼 함수
				var moreOpenFn = function(moreMinusBtn){
					var index = moreMinusBtn.closest('.uspCollpase').index();
					top.find('.swiper-slide').eq(index).addClass('swiper-slide-active');
					moreMinusBtn.removeClass('active');
					$( 'html, body' ).stop().animate( { scrollTop : moreMinusBtn.closest('.sliderPage').offset().top - 55 }, 0 );

					sliderAdaptiveHeightAuto(moreMinusBtn);
					(top.find('.swiper-slide').length == 1) ? sliderBody.params.touchRatio = 0 : sliderBody.params.touchRatio = 1;
					collpaseOpenContent(moreMinusBtn);
				}
				//닫기 버튼 함수
				var moreCloseFn = function(moreCloseBtn){
					collpaseCloseContent(moreCloseBtn);
					$( 'html, body' ).stop().animate( { scrollTop : moreCloseBtn.closest('.sliderPage').offset().top - 55 }, 200 );
					(top.find('.swiper-slide').length == 1) ? sliderBody.params.touchRatio = 0 : sliderBody.params.touchRatio = 1;
				}

				var slideTipFn = function($item){
					if(!$item.hasClass('swiper-slide-active')){
						$item.closest('.sliderPage').find('.swipeTip').addClass('on');
					}
					setTimeout(function(){
						$('.swipeTip').stop().fadeOut(800, function(){
							$(this).remove();
						});
					}, 2000);
				}

				setTimeout(function(){
					var ratioBody = 0;
					var activeClass = 'swiper-slide-active';
					var swiperEffect = 'slide';
					//전체와 전체가 아닌 컨텐츠만 폴딩 분리
					(body.hasClass('coverflow')) ? swiperEffect =  'coverflow' : swiperEffect = 'slide';
					if(top.closest('.sliderPage').hasClass('foldBody')){
						ratioBody =  1;
					}else{
						ratioBody = 0;
					}

					//슬라이드 1개, 2개, 3개이상시
					if(top.find('.swiper-slide').length == 1){
						var sliderView =  1;
						ratioBody =  0;
					}else if(top.find('.swiper-slide').length == 2){
						var sliderView =  2;
					}else{
						var sliderView = 3;
					}

					//썸네일 3개이하일 경우
					if(top.find('.swiper-slide').length <= 3) {
						var ratioNav = 0;
					}else{
						var ratioNav = 1;
						if(top.closest('.sliderPage').hasClass('foldBody')){
							top.find('.swiper-slide').eq(0).removeClass('swiper-slide-active');
						}
					}

					sliderNav = new Swiper(top, {
						prevButton:'.swiper-button-prev',
						nextButton:'.swiper-button-next',
						slidesPerView: sliderView,
						spaceBetween: 0,
						effect: 'slide',
						freeMode: false,
						simulateTouch: false,
						autoHeight: false,
						slideToClickedSlide: true,
						loop: false,
						centeredSlides: false,
						touchRatio: ratioNav,
						slideActiveClass: 'first',
						slideDuplicateClass: 'adf',
					});
					sliderBody = new Swiper(body, {
						spaceBetween: 0,
						loop: false,
						slideToClickedSlide: false,
						autoHeight : true,
						effect: swiperEffect,
						centeredSlides: true,
						onSlideChangeStart: function (swiper) {
							var idx = swiper.activeIndex;
							swiper.wrapper.height('auto');
							//slideNavActive(swiper, idx);
							$( 'html, body' ).stop().delay(200).animate( { scrollTop : swiper.wrapper.offset().top - (stickyHeight * 2 - 10) }, 100 );
							sliderNav.slides.eq(idx).trigger('click'); //contents flexble
						},
						onSlideChangeEnd: function (swiper) {
							swiper.wrapper.find('.btn_collapse_more > a').addClass('active');
						},
						touchRatio: ratioBody
					});
					sliderBody.params.control = sliderNav;
					//sliderNav.params.control = sliderBody;
					sliderBody.updateAutoHeight(0);

					//init
					;(function() {
						//처음 높이 배열설정
						body.find('.uspCollpase').each(function(){
							var objThis = $(this);
							var heightArray = objThis.height();
							objThis.find('.btn_collapse_more > a').addClass('active');
							$('.sliderNav .swiper-button-next').removeClass('swiper-button-disabled');

							if(objThis.closest('.sliderPage').hasClass('foldBody')){
								objThis.find('.contentBody').css({'display': 'none', 'visibility': 'visible'});
							}else{
								objThis.closest('.swiper-wrapper').height('auto');
								objThis.find('.contentBox').css({'display': 'none', 'visibility': 'visible'});
							}
							height.push(heightArray);
						});
					}());

					//slide inside slide 방지
					$('.uspCollpase .slideNew').on('touchstart mousedown', function(e){
						e.stopPropagation()
					});

					//높이 auto
					sliderAdaptiveHeightAuto = function($item) {
						setTimeout(function(){
							$item.closest('.swiper-wrapper').height($item.closest('.uspCollpase').height());
						}, 0);
					}
				}, 600);

				//slide in toggle
				setting.mobile && $(".collapse") && $(".collapse").each(function() {
					$(this).on("click", function() {
						sliderAdaptiveHeightAuto($(this));
					});
				});

				setting.mobile && $(".autoHeightSlide") && $(".autoHeightSlide").each(function() {
					var $this = $(this);

					$this.on("touchmove, touchend", function(e) {
						sliderAdaptiveHeightAuto($(this));
					});

				});

				//슬라이드 안내문구 이벤트
				if(top.find('.swiper-slide').length >= 2){
					top.one('click', '.swiper-slide', function(){
						slideTipFn($(this));
					});
					body.one('click', '.btn_collapse_more a.active', function(e){
						slideTipFn($(this));
						e.preventDefault();
					});
				}

				//Nav Controls
				top.on('click', '.swiper-slide', function(e){
					var idx = $(this).index();
					var currentSlide = sliderBody.wrapper.find('.uspCollpase').eq(idx);
					
					sliderBody.wrapper.find('.btn_collapse_more').css({'display': 'none'});
					sliderBody.wrapper.find('.contentBox, .contentBody').css({'display': 'block'});
					slideNavActive($(this), idx);
					sliderBody.params.touchRatio = 1;
					if(currentSlide.find('.slideNew').length > 0){
						currentSlide.find('.btn_collapse_more a.active').trigger('click');
					}
				});
				
				//닫기 버튼
				top.on('click', '.swiper-slide-active', function(e){
					var idx = $(this).index();
					var closeBtn = body.find('.uspCollpase').eq(idx).find('.close button');
					if(closeBtn.length > 0){
						moreCloseFn(closeBtn);
					}
				});

				//열기 버튼
				body.on('click', '.btn_collapse_more a.active', function(e){
					var idx = $(this).index();
					var currentSlide = sliderBody.wrapper.find('.uspCollpase').eq(idx);
					
					sliderBody.wrapper.find('.btn_collapse_more').css({'display': 'none'});
					sliderBody.wrapper.find('.contentBox, .contentBody').css({'display': 'block'});
					
					moreOpenFn($(this));
					e.preventDefault();
				});

				//닫기 버튼
				body.on('click', '.close button', function(e){
					moreCloseFn($(this));
					e.preventDefault();
				});
			}else{
				//열어보기 버튼
				body.on('click', '.btn_collapse_more a', function(e){
					var objThis = $(this);
					var contentBody = objThis.closest('.uspCollpase').find('.contentBody');
					contentBody.stop().slideToggle(300, function(){
						$(this).find('.close').stop().fadeIn(300);
						objThis.toggleClass('active');
					});

					//더알아보기 버튼 텍스트 바꾸기
					($(this).hasClass('active')) ? objThis.find('em').text('+') : objThis.find('em').text('-');
					e.preventDefault();
				});

				//닫기 버튼
				body.find('.close').on('click', function(){
					$(this).parent().stop().slideUp(300);
					$(this).closest('.uspCollpase').find('.btn_collapse_more a').removeClass('active');
					$(this).closest('.uspCollpase').find('.btn_collapse_more a > em').text('+');
					$( 'html, body' ).stop().animate( { scrollTop : $(this).closest('.uspCollpase').offset().top - 50 }, 300 );
				});
			}
		});
	},

	videoUspPlay : function(){
		$.fn.videoEndFn = function() {
			return this.each(function(index) {
				var objThis = $(this);
				objThis.find('video').on("ended", function() {
					objThis.find('.btn-play').fadeIn(1000);
				});
				objThis.find('.btn-play').on('click', function(){
					(setting.mobile) ? objThis.find('video')[1].play() : objThis.find('video')[0].play();
					$(this).css({'display': 'none'});
				});
			});
		};
		$('.videoPlay').videoEndFn();
	},

	bestmall : function(){
		$(".countArea .counter").each(function(){
			var count = $(this).data('count');
			$(this).text(count);
		});
	},

	bestmallLink: function() {
		$(".bestMallLink") && setting.mobile && $(".bestMallLink").each(function(l) {
			var t = $(this),
				e = t.attr("href"),
				n = e.indexOf("BestMall/"),
				i = e.slice(n, -1);
			t.length > 0 && t.attr("href", "https://m.lgbestshopmall.co.kr/lbst/" + i)
		});
	},

	parallax : function(){//element(class="parallax")가 화면에 들어오면 transition 시작( on으로 제어 )
		$(document).ready(function(){
			var scrollChk = true;
	        var idx = 0
	        var len = $('.parallax').length;
	        function isScrolledIntoView($elem) {
	            var docViewTop = $(window).scrollTop(),
	                docViewBottom = docViewTop + $(window).height(),
	                elemTop = $elem.offset().top,
	                elemBottom = elemTop + $elem.height();
	            return ((elemTop + ((elemBottom - elemTop)/2)) >= docViewTop && ((elemTop + ((elemBottom - elemTop)/2)) <= docViewBottom));
	        }
	        var scrollHandler  = function(){
	            if(idx <= len){
	                $('.parallax').each(function(index){
	                    var chk = isScrolledIntoView($(this));
	                    var classChk = $(this).hasClass('on');
	                    if(chk){
	                        if(!(classChk)){
	                           	$(this).addClass('on');
	                            idx++;
	                        }
	                    }else{
	                    	$(this).removeClass('on');
	                        idx--;
	                    }
	                })
	            }//else{$(window).off("scroll", scrollHandler);}
	        }
	        $(window).scroll(scrollHandler);
        })
	},
}


$(function(){
	var stopJSunfold = $('body');
	if (stopJSunfold.hasClass('unfold')) {
		return false;
	}

	responsiveImage.init();
	b2c_0417_usp(); //2017-05-24
	UI.init();
});

/* CDN Image setting */
var CDNImgURL = "https://image5.lge.co.kr"
$(document).ready(function(){
	$(".cdn_img").each(function(){
		var original = $(this).attr("src");
		if(original){
			$(this).attr("src",CDNImgURL + original);	
		}
	})
})
