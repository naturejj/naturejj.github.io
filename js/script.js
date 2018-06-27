jQuery(function($){
  $(window).on('resize',function(){
    vw=$('.video-wrap');
    vw.width($(this).width());
    vw.height($(this).height()); 
    T = $('#header').offset().top;
    vt = $(this).height();
  }).resize();
  
  $(window).on('scroll',function(){
    
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