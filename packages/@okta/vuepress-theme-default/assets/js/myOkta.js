(function($) {
  $(function() {
    var iframe = $('<iframe id="myOktaIFrame" src="https://login.okta.com" style="display:none"></iframe>');
    $('body').append(iframe);

    $('#myOktaIFrame').on('load', function() {
      window.getMyOktaAccounts();
    });

    window.addEventListener('message', receiveMessage, false);
    document.addEventListener('visibilitychange', checkSuccess, false);

    window.addEventListener('myOktaAccountFound', function (event) {
      $('.is-signed-in').show();
    }, false);
  });

  /**
   * When the page visibility changes, check if we should retry replacement.
   */
  function checkSuccess() {
    if (typeof document.hidden !== "undefined") {
      if (!document.hidden) {
        if ( $('.okta-preview-domain').first().text() == 'https://{yourOktaDomain}' ) {
          // We haven't replaced yet: try again.
          window.getMyOktaAccounts();
        } else {
          // We've succeeded: don't try again in the future.
          document.removeEventListener('visibilitychange', checkSuccess, false);
        }
      }
    }
  }

  /**
   * Send the iframe our request.
   * Globally available so that other contexts can refresh when they want to.
   */
  window.getMyOktaAccounts = function() {
    $('#myOktaIFrame').get(0).contentWindow.postMessage({messageType: 'get_accounts_json'}, 'https://login.okta.com');
  }

  /**
   * Once we've received a message back, process it and do our replacement.
   */
  function receiveMessage(event) {
    // Verify the event origin is trusted
    if (event.origin !== 'https://login.okta.com' || !event.data) {
      return;
    }

    var accountsExist = event.data.length;
    if (!accountsExist) {
      return;
    }

    var domain = event.data[0].origin;
    var myOktaAccountFound = new CustomEvent('myOktaAccountFound', {
      detail: {
        domain: domain
      }
    });
    window.dispatchEvent(myOktaAccountFound);

    // Replace all occurances of 'https://{yourOktaDomain}' with
    // the last used Okta org
    $('.okta-preview-domain').text(domain);
  }
})(jQuery);
