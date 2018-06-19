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
});