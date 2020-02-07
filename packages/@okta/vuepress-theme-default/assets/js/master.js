/**
 * jQuery version downgraded to 2.x for compatibility with swiftype library ($.ajax.success dependency)
 * 01/18/2020 Swiftype is being replaced by Coveo; jQuery can be upgraded if needed
 */

//= require vendor/jquery-2.2.4.min
//= require vendor/jquery.ba-hashchange.min
//= require vendor/jquery.swiftype.autocomplete
//= require vendor/jquery.swiftype.search

function escapeHtml(unsafe) {
  unsafe = (typeof unsafe !== 'undefined') ? unsafe.toString().replace(/["']/g, "") : '';
  return $('<div />').text(unsafe).html();
};

(function($) {

  function highlightHeader() {
    if ($(document).scrollTop() > 0) {
      $('.Page--docs-page').addClass('scrolling');
    }
    else {
      $('.Page--docs-page').removeClass('scrolling');
    }
  };

  var scrollTimeout;
  $(window).scroll(function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(highlightHeader, 100);
  });

  $('.scrollTo, .PrimaryNav > ul.menu a').click(function(e) {
    if(this.hash && $(this.hash).length) {
      e.preventDefault()
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 80
      }, 500);
    }
  });


  $('.PrimaryNav-toggle').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('.Header').toggleClass('is-active');
    $('.PrimaryNav').toggleClass('is-active');
    $('.Page').toggleClass('PrimaryNav-is-active');
  });

  $(window).on('load', function(){
    // TypeKit fallback to avoid page whiteout
    setTimeout(function(){$('.wf-loading').addClass('wf-active').removeClass('wf-loading');}, 100);
  });

  $('.Sidebar-toggle').on('click', function(e) {
    e.stopPropagation();
    $(this).parent().toggleClass('Sidebar-active');
  });

  $('header, .Sidebar').on('click', function() {
    $('.Sidebar.Sidebar-active').removeClass('Sidebar-active');
  });

})(jQuery);

