---
title: Enable CORS
excerpt: Enable Cross-Origin Resource Sharing for your app
layout: Guides
---

This guide explains Cross-Origin Resource Sharing (CORS), why it’s useful, and how to enable it in your Admin Console and then test it.

---

#### Learning outcomes

* Grant cross-origin access to the Okta API from your web apps.
* Test your Okta CORS configuration.

#### What you need
An [Okta Developer Edition org](https://developer.okta.com/signup/)

---

## About CORS

[Cross-Origin Resource Sharing (CORS)](https://www.w3.org/TR/cors/) is a mechanism that allows a web page to make an AJAX call using [XMLHttpRequest (XHR)](https://xhr.spec.whatwg.org/).

You can use XHR to call a domain that is different from the domain where the script was loaded. Web browsers typically don't allow cross-domain requests because of the [same origin security policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). However, CORS defines a standardized way for the server and browser to interact. Then CORS determines whether to allow a cross-origin request.

### CORS and Okta

* In Okta, CORS allows JavaScript, which is hosted on your website, to make an XHR to the Okta API with a token. See [OAuth 2.0](/docs/guides/implement-oauth-for-okta/).
* Every website origin must be explicitly permitted through the Admin Console for CORS. See [Grant cross-origin access to websites](#grant-cross-origin-access-to-websites).
* If you’re using [OAuth 2.0](/docs/guides/implement-oauth-for-okta/) tokens to make calls to Okta APIs, you don't need to add a Trusted Origin. OAuth for Okta APIs doesn't rely on cookies but uses bearer tokens instead. See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

> **Caution:** Only grant access to specific origins (websites) that you control and trust to access the Okta API.

### API Support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon <span class="api-label api-label-small api-label-cors"><i class="fa fa-cloud-download"></i>CORS</span>.

### Browser Support

Not all browsers support CORS. You can review which browsers support CORS on [caniuse.com/cors](https://caniuse.com/cors).

> **Note:** IE8 and IE9 don't support authenticated requests and can't use the Okta session cookie with CORS.

## Grant cross-origin access to websites

You can enable CORS for websites that need cross-origin requests to the Okta API.

1. In the Admin Console, select **Security** and then **API**.
1. Select **Trusted Origins**.
1. Click **Add Origin**.
1. Enter a name for the origin.
1. Enter the base URL of the website that you want to allow cross-origin requests from.
1. Select **CORS** as the **Type**. You can also enable the **Redirect** setting, which allows redirection to this Trusted Origin after a user signs in or out.
1. Click **Save**.

> **Note:** If you don't enable CORS, or disable it later, the list of websites is retained.

## Test your configuration

1. Grant cross-origin access to `https://developer.okta.com`.
2. In your Okta org browser, enter your Okta subdomain in the following form and click **Test**. Your Okta user profile appears below the form.

<CorsTest />

> **Note:** If the test doesn't work, ensure that your Okta org session is active and that you've turned off tracking blockers in your browser. Then reload this page.

### Request examples

The following code samples can be added to your website to test your CORS configuration. Remember to replace the `baseUrl` with the URL for your Okta org.

#### Fetch

```javascript
(async function () {
    const baseUrl = `https://{yourOktaDomain}`;
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
var baseUrl = 'https://{yourOktaDomain}';
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

* [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
* [Fixing Common Problems with CORS and JavaScript](https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors)