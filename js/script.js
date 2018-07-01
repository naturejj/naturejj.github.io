jQuery(function($){
  
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
    $(window).clearQueue().animate({scrollTop:H[i]},500,function(){
      active(i);
    });	
  }
  
  function active(i){
    $('.gnb>ul>li').removeClass('active').eq(i).addClass('active');
  }
  
  function now(el){
    var X;
    var T = el.scrollTop();
    console.log(T);

    H.forEach(function(v,i){
      if(T >= H[i] - 300){
        X=i;
      }else{
        return false;
      }
    });

    return X;
  }
  
  setSecHeight();
  
  $(window).on('resize',function(){
    
    setSecHeight();
    
    vw=$('.video-wrap');
    vw.width($(this).width());
    vw.height($(this).height()); 
    T = $('#header').offset().top;
    vt = $(this).height();
  }).resize();
  
  $(window).on('scroll',function(){
    
    active(now($(this)));
    
    var H = $(this).scrollTop();
    
//    if(H>100) $('video').get(0).pause();
//    else $('video').get(0).play();
   
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
  
  
});