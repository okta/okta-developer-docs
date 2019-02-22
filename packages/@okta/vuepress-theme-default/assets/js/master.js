/**
 * jQuery version downgraded to 2.x for compatibility with swiftype library ($.ajax.success dependency)
 */

//= require vendor/jquery-2.2.4.min
//= require vendor/jquery.ba-hashchange.min
//= require vendor/jquery.swiftype.autocomplete
//= require vendor/jquery.swiftype.search

function escapeHtml(unsafe) {
  unsafe = (typeof unsafe !== 'undefined') ? unsafe.toString().replace(/["']/g, "") : '';
  return $('<div />').text(unsafe).html();
};

function oktaCustomRenderFunction(document_type, item) {
  var pageUrl = escapeHtml(item['url']);
  var pageTitle = escapeHtml(item['title']);
  var out = '<a href="' + pageUrl + '" class="st-search-result-link"><div class="st-result autocomplete-item"><p class="title">' + pageTitle + '</p></div></a>';
  return out;
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

  $('.Header nav .SearchIcon').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.Header').toggleClass('search-active');

    if ($('.Header').hasClass('search-active')) {
      $('.Header nav #st-search-input-auto').focus();
    }
  });

  $('.PrimaryNav-toggle').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('.Header').toggleClass('is-active');
    $('.PrimaryNav').toggleClass('is-active');
    $('.Page').toggleClass('PrimaryNav-is-active');
  });


  $('#form_search #st-search-input-auto').on('keyup', function(){
      if ($(this).val().length > 0) {
          $(this).parent().addClass('button-active');
      }
      else {
          $(this).parent().removeClass('button-active');
      }
  });

  $('#form_search').on('submit', function(e){
    e.preventDefault();

    if($('#st-search-input-auto').val() != '') {
      window.location.href = searchDomain + '/search/#stq=' + encodeURIComponent($('#st-search-input-auto').val());
    }

    return false;
  });

  $('#form_search').on('click', function(e){
    e.stopPropagation();
  });

  $(window).on('click', function() {
    $('.search-active').removeClass('search-active');
  });

  $(window).on('resize', function(e){
    $('.search-active').removeClass('search-active');
  });

  $(window).on('load', function(){
    // TypeKit fallback to avoid page whiteout
    setTimeout(function(){$('.wf-loading').addClass('wf-active').removeClass('wf-loading');}, 100);
  });

  $(".st-search-input").swiftype({
    renderFunction: oktaCustomRenderFunction,
    engineKey: 'NqMYCYpFoWmsc4NaNY_y',
    perPage: 40
  });

  $('.Sidebar-toggle').on('click', function(e) {
    e.stopPropagation();
    $(this).parent().toggleClass('Sidebar-active');
  });

  $('header, .Sidebar').on('click', function() {
    $('.Sidebar.Sidebar-active').removeClass('Sidebar-active');
  });

})(jQuery);

