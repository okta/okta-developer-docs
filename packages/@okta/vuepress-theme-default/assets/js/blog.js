(function($) {
  
  var $titles = $('.BlogPost-content h1, .BlogPost-content h2, .BlogPost-content h3, .BlogPost-content h4, .BlogPost-content h5, .BlogPost-content h6');

  $titles.each(function() {
    $(this).wrapInner(
      $('<a>').attr('href', '#' + $(this).attr('id'))
    );
  })

  if(history) {
    $('a', $titles).click(function(e) {
      var offset = ($(this).offset().top - 130);

      e.preventDefault();
      history.pushState({}, null, $(this).attr('href'));

      $('html, body').animate({
        scrollTop: offset+'px'
      }, 200);

    });
  }

})(jQuery);