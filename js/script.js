$(document).ready(function(){
	(function(){

		/************************************************************************/
		/* 전역변수, 함수 선언                                                  */
		/************************************************************************/

		var H=[0];
		var startTouch, endTouch;
		var moving = true;
		var ovh = false;

		// 메인 페이지
		var page = {
			// 페이지 시작
			start : function(){
				if($('#home').is(':animated')) return false;
				$('#home').animate({'height':200},600,function(){
					$('.profile_image').css({'transform':'scale(1)'});
					moving = false;
				});
				$('#wrap').removeClass('no_scroll');
				// $('video').get(0).pause();

				$('.title').children().fadeOut(600);
				$('#btnScroll').hide();
				$('header').fadeIn();
				if($(window).width() > 768) $('#control .nav').fadeIn();
			},
			// 페이지 리셋
			reset : function(){

				$('#wrap').clearQueue().animate({scrollTop:0},300,function(){
					$('#home').animate({'height':'100%'},600,function(){
						$('.profile_image').css({'transform':'scale(0)'});
						$('.title').children().fadeIn(600);
						$('#btnScroll').fadeIn(600);
						$('header').delay(500).fadeOut();
						moving = true;
					});
					$('#wrap').addClass('no_scroll');
					$('#control .nav').fadeOut();
					// $('video').get(0).play(); 
				});
			}
		};

		// 서브 페이지(포트폴리오)
		var sub_page = {
			open : function(idx){
				$('#wrap').addClass('no_scroll');
				$('.pf_popup').show().animate({scrollTop:0},0);
				$('#logo').hide();
				$('.sub_load').load('./data/detail_1.html .sub_ctt:nth-child('+(idx+1)+')');

			},
			close : function(){
				$('.pf_popup').hide();
				$('#logo').show();
				$('#wrap').removeClass('no_scroll');
			}
		};

		function move(i){
			$('#wrap').clearQueue().animate({scrollTop:H[i]},500,function(){
				active(i);
			});	
		}

		function active(i){
			$('#control li').removeClass('active').eq(i).addClass('active');
		}

		function now(){
			var X;
			var T = $('#wrap').scrollTop();
			
			H.forEach(function(v,i){
				if(T >= H[i] - 300){
					X=i;
				}else{
					return false;
				}
			});

			return X;
		}

		function setSecHeight(){
			var h = 0; 

			$('section').each(function(i){
				h+=$(this).height();
				H[i+1] = h+200;
				if(i==3){
					H[i+1] -= 200;
				}
			});
		}

		function setPfHref(){ // 포트폴리오 주소를 바꿔주는 함수
			$('.thumb_more').each(function(){

				var pf_href = 
				$(this).parents('.pf').find('.btn_site').attr('href');

				if(navigator.maxTouchPoints == 0) { 					// PC버전일때는
					$(this).attr('href','javascript:;');				// 팝업띄우고
				} else { 												// 모바일일때는
					$(this).attr({'href':pf_href, 'target':'_blank'});	// 새창으로 포트폴리오 이동
				}
			});
		}

		function setMenu(){
			if(navigator.maxTouchPoints == 0) { 			// PC버전일때는
				$('#btnMenu').css('right','35px');		// right 35 (스크롤 넓이 더함)
			} else { 										// 모바일일때는
				$('#btnMenu').css('right','15px');		// right 15
			}
		}

		/************************************************************************/
		/* 페이지 로딩 시 초기세팅                                              */
		/************************************************************************/

		setSecHeight(); // 각 섹션의 top값을 배열에 저장
		setPfHref();
		setMenu();

		/************************************************************************/
		/* 이벤트 처리                                                          */
		/************************************************************************/

		/* 페이지 스크롤 시 */
		$('#wrap').on('mousewheel scroll',function(){

			active(now());

			if(moving){
				event.preventDefault();
				page.start();
			}

			var T = $(this).scrollTop();

			if(T >= H[2] -300){
				$('#portfolio').addClass('on');
			}
			if(T >= H[1] -300){
				$('#skills').addClass('on');
			}

			if(T > 10 && navigator.maxTouchPoints != 0){
				$('#control #toTop').fadeIn();
			} else {
				$('#control #toTop').fadeOut();
			}

		});

		/* 페이지 리사이즈 시 */
		$(window).on('resize',function(){ 
			setSecHeight(); // 각 섹션의 top값을 배열에 다시 저장
			setPfHref();
			setMenu();
			
			$(this).width() <= 768 || moving ? $('#control .nav').hide() : $('#control .nav').show();	
			if($(this).width() > 768){
				$('header #btnMenu').removeClass('active');
				ovh=false;
			}
		}).resize();

		$(window).on('keydown',function(){
			if(event.key == 'F5'){
				if(now()!=0){
				event.preventDefault();
				}
				page.reset();
				location.reload();
			} else if(event.key == "Escape"){
				sub_page.close();
			}
		});

		$('#btnScroll').on('click',function(){
			page.start();
		});	

		$('#logo').on('click',function(){
			page.reset();
		});

		/* 포트폴리오 상세내용 */
		$('.btn_detail').on('click',function(){
			var idx = $(this).parents('li').index();
			if(navigator.maxTouchPoints == 0 || $(window).width() > 768) sub_page.open(idx);

		});

		$('.thumb_more').on('click',function(){
			var idx = $(this).parents('li').index();
			if(navigator.maxTouchPoints == 0 ||  $(window).width() > 768){
				sub_page.open(idx);
			}

		});

		$('.pf_popup').on('click',function(){
			if($(event.target).hasClass('sub_ctt')
				|| $(event.target).parents().hasClass('sub_ctt')){
				// return false;	
				event.stopPropagation();
			} else {
				sub_page.close();
			}
		});

		$('.pf_popup').on('mouseover',function(){
			if($(event.target).hasClass('sub_ctt') 
				|| $(event.target).parents().hasClass('sub_ctt')){
				$(this).css('cursor', 'default');	
			} else {
				$(this).css('cursor', 'zoom-out');
			}
		});

		$('#control li').on('click',function(){
			move($(this).index());
		});

		$('.menu ul li').on('click',function(){
			$('header #btnMenu').removeClass('active');
			$('#wrap').removeClass('no_scroll');
			var idx = $(this).index();
			setTimeout(function(){
				move(idx);
				ovh = false;
			},300);
		});

		$('#control #toTop').on('click',function(){
			move(0);
		});

		$('#btnMenu').on('click',function(){
			if(!ovh){
				$('header #btnMenu').addClass('active');
				$('#wrap').addClass('no_scroll');
				ovh = true;
			} else{
				$('header #btnMenu').removeClass('active');
				$('#wrap').removeClass('no_scroll');
				ovh = false;
			}
		});


		/* 모바일 첫화면 터치 슬라이드 */
		$('#wrap').on('touchstart',function(){
			startTouch = event.targetTouches[0].pageY;
		});

		$('#wrap').on('touchmove',function(){
			endTouch = event.targetTouches[0].pageY-startTouch;
			if(ovh || $(this).hasClass('no_scroll')) {
				event.preventDefault();
				return false;
			}				
		});

		$('#wrap').on('touchend',function(){
			if(endTouch<0){
				page.start();
			}
		});

	})();

});