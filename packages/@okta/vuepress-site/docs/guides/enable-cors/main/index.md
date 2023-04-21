---
title: Enable CORS
excerpt: Enable Cross-Origin Resource Sharing for your app
layout: Guides
---

This guide explains Cross-Origin Resource Sharing (CORS), why it is useful, how it is relevant to your Okta apps, and how to enable and test it.

---

**Learning outcomes**

* Grant cross-origin access to the Okta API from your web apps.
* Test your Okta CORS configuration.

---

## About CORS

[Cross-Origin Resource Sharing (CORS)](https://www.w3.org/TR/cors/) is a mechanism that allows a web page to make an AJAX call using [XMLHttpRequest (XHR)](https://xhr.spec.whatwg.org/) to a domain that is different than the domain where the script was loaded. Such cross-domain requests would otherwise be forbidden by web browsers as indicated by the [same origin security policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). CORS defines a [standardized](http://www.w3.org/TR/cors/) way in which the browser and the server can interact to determine whether or not to allow the cross-origin request.

In Okta, CORS allows JavaScript hosted on your websites to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. Every website origin must be explicitly permitted as a Trusted Origin.

If you are using [OAuth 2.0](/docs/guides/implement-oauth-for-okta/) tokens to make calls to Okta APIs, you don't need to add a Trusted Origin because OAuth for Okta APIs don't rely on cookies. These APIs use bearer tokens instead. See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

> **Caution:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

### API Support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon <span class="api-label api-label-small api-label-cors"><i class="fa fa-cloud-download"></i> CORS</span>.

### Browser Support

Not all browsers support CORS. You can review which browsers support CORS on [caniuse.com/cors](https://caniuse.com/cors)

> **Note:** IE8 and IE9 don't support authenticated requests and can't use the Okta session cookie with CORS.

## Grant cross-origin access to websites

You can enable CORS for websites that need cross-origin requests to the Okta API.

1. Select **Security** and then **API**.
1. Select the **Trusted Origins** tab.
1. Select **Add Origin** and then enter a name for the organization origin.
1. In the **Origin URL** box, specify the base URL of the website that you want to allow cross-origin requests from.
1. Make sure that **CORS** is selected as the **Type**. You can also enable the **Redirect** setting, which allows for redirection to this Trusted Origin after a user signs in or out.
1. Click **Save**.

> **Note:** If you don't enable CORS, or disable it at a later date, the list of websites is retained.

## Test your configuration

Do the following to test your CORS configuration:

1. Grant cross-origin access to `https://developer.okta.com`.
2. In the same browser in which you have an active session in your Okta organization, enter your Okta subdomain in the form below and click **Test**. Your Okta user profile appears below the form.

<CorsTest />

> **Note:** If this test seems to be working incorrectly, make sure that you have all tracking blockers turned off in your browser and reload the page.

### Request examples

The following code samples can be added to your website to test your CORS configuration. Remember to replace the `baseUrl` with the URL for your Okta organization.

#### Fetch

```javascript
(async function () {
    const baseUrl = `https://${yourOktaDomain}`;
    try {
        const response = await fetch(baseUrl + '/api/v1/users/me', {
            credentials: 'include'
        });
        const me = await response.json();
        console.log(me);
    } catch (err) {
        console.error(err);
    }
})();
```

#### XMLHttpRequest

```javascript
var baseUrl = 'https://${yourOktaDomain}';
var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {
    xhr.onerror = function() {
      alert('Invalid URL or cross-origin request blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
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
      title = 'Invalid URL or cross-origin request blocked';
      message = 'You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in your administrator UI';
      break;
  }
  alert(title + ': ' + message);
});
```

### Response example: error

If you didn't enable CORS, or your CORS configuration is incorrect, an error appears in your browser's developer tool or JavaScript console.

#### Chrome

```txt
XMLHttpRequest cannot load https://{yourOktaDomain}/api/v1/users/me.
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'https://your-website.com' is therefore not allowed access.
```

#### Safari

```txt
XMLHttpRequest cannot load https://{yourOktaDomain}/api/v1/users/me.
Origin https://{yourOktaDomain} is not allowed by Access-Control-Allow-Origin.
```

#### Firefox

```txt
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://{yourOktaDomain}/api/v1/users/me.
This can be fixed by moving the resource to the same domain or enabling CORS.
```

#### Internet Explorer

```txt
SEC7118: XMLHttpRequest for https://{yourOktaDomain}/api/v1/users/me required Cross-Origin Resource Sharing (CORS).

SEC7120: Origin https://{yourOktaDomain} not found in Access-Control-Allow-Origin header.

SCRIPT7002: XMLHttpRequest: Network Error 0x80070005, Access is denied.
```

## See also

[HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
