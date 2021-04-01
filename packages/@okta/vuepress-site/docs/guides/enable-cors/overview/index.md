---
title: Overview
---

[Cross-Origin Resource Sharing (CORS)](https://www.w3.org/TR/cors/) is a mechanism that allows a web page to make an AJAX call using [XMLHttpRequest (XHR)](https://xhr.spec.whatwg.org/) to a domain that is different than the domain where the script was loaded. Such cross-domain requests would otherwise be forbidden by web browsers as indicated by the [same origin security policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). CORS defines a [standardized](http://www.w3.org/TR/cors/) way in which the browser and the server can interact to determine whether or not to allow the cross-origin request.

In Okta, CORS allows JavaScript hosted on your websites to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. Every website origin must be explicitly permitted as a Trusted Origin.

If you are using [OAuth 2.0](/docs/guides/implement-oauth-for-okta/overview/) tokens to make calls to Okta APIs, you don't need to add a Trusted Origin because OAuth for Okta APIs don't rely on cookies. These APIs use bearer tokens instead. See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/).

> **Caution:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

### API Support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon <span class="api-label api-label-small api-label-cors"><i class="fa fa-cloud-download"></i> CORS</span>.

### Browser Support

Not all browsers supports CORS. You can review which browsers support CORS on [caniuse.com/cors](https://caniuse.com/cors)


> **Note:** IE8 and IE9 don't support authenticated requests and can't use the Okta session cookie with CORS.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forums](https://devforum.okta.com).

<NextSectionLink/>
