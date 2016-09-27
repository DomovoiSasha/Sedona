$(function(){
  var burger = $('.main-nav__btn-burger');
  var cross = $('.main-nav__btn-cross');
  var mainNav = $('.main-nav');
  var mainItem = $('.menu-item:not(.logo)');
  
  $(burger).click(function(){
    if ($('.menu-item:not(.logo)').is(':visible')){
      $(mainNav).css({'margin-top':'0'});
      $(mainItem).addClass('menu-item--hide');
    } else {
      $(mainNav).css({'margin-top':'68.4vw'});
      $(mainItem).removeClass('menu-item--hide');
    }
  });
  
  $(cross).click(function(){
      $(mainNav).css({'margin-top':'0'});
      $(mainItem).addClass('menu-item--hide');
  });
  
});
