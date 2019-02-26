$(function() {
  $('#cors-test').delegate(':button', "click", function(e) {
    e.preventDefault();
    var orgUrl = $('#input-orgUrl').val();
    if (orgUrl.indexOf('http://') !== 0 && orgUrl.indexOf('https://') !== 0) {
      orgUrl = 'https://' + orgUrl;
    }

    $.ajax({
      url: orgUrl + '/api/v1/users/me',
      type: 'GET',
      accept: 'application/json',
      xhrFields: { withCredentials: true }
    }).done(function(data) {
      var template = _.template($('#template-profile').html());
      var output = template({ user: data });
      $('#cors-test-result').html(output);
    }).fail(function(xhr, textStatus, error) {
      var title, message;
      switch (xhr.status) {
        case 0 :
        title = 'Cross-Origin Request Blocked';
        message = 'You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in your Okta Admin Dashboard';
        break;
        case 403 :
        title = xhr.responseJSON.errorSummary;
        message = 'Please login to your Okta organization before running the test';
        break;
        default :
        title = xhr.responseJSON ? xhr.responseJSON.errorSummary : xhr.statusText;
        break;
      }
      $('#cors-test-result').html($('<div>', {
        'class': 'alert alert-danger',
        'html': '<strong>' + title + ':</strong> ' + message || ''
      }));
    });
  });
}());
