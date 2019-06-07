---
weight: 3
showToc: false
title: Enabling CORS
---

# Enabling Cross-Origin Requests

[Cross-Origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) is a mechanism that allows a web page to make an AJAX call using [XMLHttpRequest (XHR)](http://en.wikipedia.org/wiki/XMLHttpRequest) to a domain that is  different from the one from where the script was loaded.  Such "cross-domain" requests would otherwise be forbidden by web browsers, per the [same origin security policy](http://en.wikipedia.org/wiki/Same_origin_policy). CORS defines a [standardized](http://www.w3.org/TR/cors/) way in which the browser and the server can interact to determine whether or not to allow the cross-origin request

In Okta, CORS allows JavaScript hosted on your websites to make an XHR to the Okta API with the Okta session cookie. Every website origin must be explicitly permitted via the administrator UI as a "Trusted Origin".

> **Caution:** Only grant access to specific origins (websites) that you control and trust to access the Okta API.

## API Support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, please check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon <span class="api-label api-label-small api-label-cors"><i class="fa fa-cloud-download"></i> CORS</span>.

## Browser Support

Not all browsers supports CORS.  The following table describes which browsers support this feature.

<iframe frameborder="0" width="100%" height="460px" src="https://caniuse.com/cors/embed/description&amp;links"></iframe>

> IE8 and IE9 do not support authenticated requests and cannot use the Okta session cookie with CORS.

## Granting Cross-Origin Access to Websites

You can enable CORS for websites that need cross-origin requests to the Okta API on the developer console. Select **API** > **Trusted Origins** to see the screen shown below.

![CORS Settings UI](/img/okta-admin-ui-cors-dev.png "CORS Settings UI" )

Select **Add Origin** to specify the base URL of the website that you want to allow cross-origin requests from, then make sure **CORS** is selected.

> Note: If you do not enable CORS, or disable it at a later date, the list of websites is retained.

![Add CORS Origin](/img/okta-admin-ui-cors-new-dev.png "Add CORS Origin" )

You can also enable the **Redirect** setting, which allows for redirection to this Trusted Origin after signing in or out.

## Testing

Test your CORS configuration:

1. Grant cross-origin access to `https://developer.okta.com` from your org's developer console.
2. Enter your Okta organization in the form below and click **Test**. Your Okta user profile displays below the form.

<CorsTest />

## Request Examples

The following code samples can be added to your website to test your CORS configuration.  Remember to replace the `baseUrl` with the URL for your Okta organization.

### XMLHttpRequest

```javascript
var baseUrl = 'https://{yourOktaDomain}';
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

### jQuery

```javascript
var baseUrl = 'https://{yourOktaDomain}';
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

## Response Example: Error

If you did not enable CORS, or your CORS configuration is incorrect, you
will see an error in your browser's developer tool or JavaScript console:

### Chrome

```
XMLHttpRequest cannot load https://{yourOktaDomain}/api/v1/users/me. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://your-website.com' is therefore not allowed access.
```

### Safari

```
XMLHttpRequest cannot load https://{yourOktaDomain}/api/v1/users/me. Origin https://{yourOktaDomain} is not allowed by Access-Control-Allow-Origin.
```

### Firefox

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://{yourOktaDomain}/api/v1/users/me. This can be fixed by moving the resource to the same domain or enabling CORS.
```

### Internet Explorer

```
SEC7118: XMLHttpRequest for https://{yourOktaDomain}/api/v1/users/me required Cross Origin Resource Sharing (CORS).

SEC7120: Origin https://{yourOktaDomain} not found in Access-Control-Allow-Origin header.

SCRIPT7002: XMLHttpRequest: Network Error 0x80070005, Access is denied.
```

## Additional Resources

- [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

