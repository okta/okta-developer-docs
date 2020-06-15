---
title: Test your configuration
---

Do the following to test your CORS configuration:

1. Grant cross-origin access to `https://developer.okta.com`.
2. In the same browser in which you have an active session in your Okta organization, enter your Okta subdomain in the form below and click **Test**. Your Okta user profile appears below the form.

<CorsTest />

### Request examples

The following code samples can be added to your website to test your CORS configuration. Remember to replace the `baseUrl` with the URL for your Okta organization.

#### XMLHttpRequest

```javascript
var baseUrl = 'https://${yourOktaDomain}';
var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {
    xhr.onerror = function() {
      alert('Invalid URL or Cross-Origin Request Blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
    }
    xhr.onload = function() {
        alert(this.responseText);
    };
    xhr.open('GET', baseUrl + '/api/v1/users/me', true);
    xhr.withCredentials = true;
    xhr.send();
} else {
    alert("CORS is not supported for this browser!")
}
```

#### jQuery

```javascript
var baseUrl = 'https://${yourOktaDomain}';
$.ajax({
  url: baseUrl + '/api/v1/users/me',
  type: 'GET',
  xhrFields: { withCredentials: true },
  accept: 'application/json'
}).done(function(data) {
    alert(data);
})
.fail(function(xhr, textStatus, error) {
  var title, message;
  switch (xhr.status) {
    case 403 :
      title = xhr.responseJSON.errorSummary;
      message = 'Please login to your Okta organization before running the test';
      break;
    default :
      title = 'Invalid URL or Cross-Origin Request Blocked';
      message = 'You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in your administrator UI';
      break;
  }
  alert(title + ': ' + message);
});
```

### Response example: error

If you didn't enable CORS, or your CORS configuration is incorrect, an error appears in your browser's developer tool or JavaScript console.

#### Chrome

```
XMLHttpRequest cannot load https://${yourOktaDomain}/api/v1/users/me. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://your-website.com' is therefore not allowed access.
```

#### Safari

```
XMLHttpRequest cannot load https://${yourOktaDomain}/api/v1/users/me. Origin https://${yourOktaDomain} is not allowed by Access-Control-Allow-Origin.
```

#### Firefox

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://${yourOktaDomain}/api/v1/users/me. This can be fixed by moving the resource to the same domain or enabling CORS.
```

#### Internet Explorer

```
SEC7118: XMLHttpRequest for https://${yourOktaDomain}/api/v1/users/me required Cross Origin Resource Sharing (CORS).

SEC7120: Origin https://${yourOktaDomain} not found in Access-Control-Allow-Origin header.

SCRIPT7002: XMLHttpRequest: Network Error 0x80070005, Access is denied.
```

<NextSectionLink>Next steps</NextSectionLink>
