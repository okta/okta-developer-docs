$(document).ready(function () {
  // Elements
  var $search = $("#event-type-search");
  var $eventTypes = $(".event-type");
  var $eventTypeCount = $("#event-type-count");

  // Enable live search
  $search.keyup(debounce(search, 100));

  // Synchronize url state with search
  var filter = param("q")
  if (filter) {
    $search.val(filter);
    search();
  }

  /**
   * Performs event type filtering based on search state.
   */
  function search() {
    var count = 0;
    var filter = $search.val().trim();
    var regex = new RegExp(filter, "i");

    // Hide or show based on match
    $eventTypes.each(function () {
      var $eventType = $(this);
      if ($eventType.text().search(regex) < 0) {
        $eventType.hide();
      } else {
        $eventType.show();
        count++;
      }
    });

    // Show result count
    $eventTypeCount.html("Found <b>" + count + "</b> matches");

    // Add to URL
    push('q', filter)
  }

  /**
   * Performs standard debounce on supplied func
   * 
   * @param {func} func 
   * @param {number} wait 
   * @param {*} immediate 
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  /**
   * Extracts the specified param from the url.
   * 
   * @param {string} name 
   */
  function param(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    if (results == null){
       return null;
    } else{
       return decodeURI(results[1]) || 0;
    }
  }

  /**
   * Pushes name value pair to current history
   * 
   * @param {string} name
   * @param {string} value
   */
  function push(name, value){
    // Add to URL if supported
    if (history.pushState) {
      history.pushState(null, '', '?' + name + '=' + encodeURI(value));
    }
  }  

});
