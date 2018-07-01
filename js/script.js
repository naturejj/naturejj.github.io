jQuery(function($){
  
  /************************************************************************/
  /* 전역변수, 함수 선언                                                    */
  /************************************************************************/

  T = $('#header').offset().top;
  var H=[0];
  
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
  
  function move(i){
    $('html, body').clearQueue().animate({scrollTop:H[i]-300},500);	
  }
  
  function active(i){
    $('.gnb>ul>li').removeClass('active').eq(i).addClass('active');
  }
  
  function now(){
    var X;
    var T = $(window).scrollTop();

    H.forEach(function(v,i){
      if(T >= H[i] - 300){
        X=i;
      }else{
        return false;
      }
    });

    return X;
  }

  /************************************************************************/
  /* 페이지 로딩 시 초기세팅                                                 */
  /************************************************************************/

  setSecHeight();
  
  /************************************************************************/
  /* 이벤트 처리                                                            */
  /************************************************************************/
  
  $(window).on('resize',function(){
    
    setSecHeight();
    
    vw=$('.video-wrap');
    vw.width($(this).width());
    vw.height($(this).height()); 
    vt = vw.height();
  }).resize();
  
  $(window).on('mousewheel scroll',function(){
    
    active(now());
    
    var H = $(this).scrollTop();
    
    if(H>T){
      $('#header').addClass('scroll');
      if(H>vt){
        $('#header').addClass('scroll-bg');
      }else{
        $('#header').removeClass('scroll-bg');
      }
    }else{
      $('#header').removeClass('scroll');
    }
    
  });
  
  $('.gnb>ul>li>a').on('click',function(e){
    e.preventDefault();
    var n = $(this).parents('li').index();
    move(n);
  });
  
});