<<<<<<< HEAD
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
  
  
=======
jQuery(function($){
  $(window).on('resize',function(){
    var vw=$('.video-wrap');
    vw.width($(this).width());
    vw.height($(this).height()); 
    T = $('#header').offset().top;
  }).resize();
  
  $(window).on('scroll',function(){
    var H = $(this).scrollTop();
    if(H>T){
      $('#header').addClass('scroll');
    }else{
      $('#header').removeClass('scroll');
    }
  });
>>>>>>> 55b61bba37b938c606f2216d6ba0282556305a2e
});