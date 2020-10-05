---
title: Overview
---

Okta utilizes an HTTP session cookie to provide access to your Okta organization and applications across web requests for interactive user-agents such as a browser. This document provides examples for programmatically retrieving and setting a session cookie for different deployment scenarios to provide SSO capabilities for custom web applications built on Okta.

>**Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. For information see [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

Okta sessions are created and managed with the [Session API](/docs/reference/api/sessions/).

## Retrieving a session cookie via OpenID Connect Authorization Endpoint

This scenario is ideal for deployment scenarios where you have implemented both a custom login page and custom landing page for your application. The login page will typically collect the user's credentials via a HTML form submit or POST and the web application will validate the credentials against your Okta organization by calling the [Authentication API](/docs/reference/api/authn/) to obtain a [session token](/docs/reference/api/sessions/#session-token).

Once a session token is obtained, it can be passed into the [OpenID Connect authorize endpoint](/docs/reference/api/oidc/#authorize) in order to get an Okta session cookie. Executing this flow will set a cookie in the end user's browser and then redirect them back to the `redirect_uri` that is passed into the request.

> The session token may only be used **once** to establish a session. If the session expires or the user logs out of Okta after using the token, the user won't be able to reuse the same session token to get a new session cookie.

##### Request Example


```
https://${yourOktaDomain}/oauth2/v1/authorize?client_id={clientId}&response_type=id_token&scope=openid&prompt=none&redirect_uri=https%3A%2F%2Fyour-app.example.com&state=Af0ifjslDkj&nonce=n-0S6_WzA2Mj&sessionToken=0HsohZYpJgMSHwmL9TQy7RRzuY
```

> The `prompt=none` param guarantees that the user will not be prompted for credentials. You will either obtain the requested tokens or an OAuth error response.

> The `sessionToken` param serves as the primary credentials. It represents the authentication that was already performed via the [Authentication API](/docs/reference/api/authn/).

##### Response Example


``` http
HTTP/1.1 302 Moved Temporarily
Set-Cookie: sid=lGj4FPxaG63Wm89TpJnaDF6; Path=/
Location: https://your-app.example.com?id_token=S4sx3uixdsalasd&state=Af0ifjslDkj&nonce=n-0S6_WzA2Mj
```

The response also includes an [ID Token](/docs/reference/api/oidc/#id-token) that describes the authenticated user and can contain additional claims such as user profile attributes or email.

The [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) uses this flow. This flow can also be used by Single Page Applications with the [`okta_post_messsage`](/docs/reference/api/oidc/#parameter-details) response type, which doesn't require a browser redirect.

## Retrieving a session cookie by visiting a session redirect link

> This pattern is supported, but not encouraged. The [OpenID Connect](#retrieving-a-session-cookie-via-openid-connect-authorization-endpoint) flow described above is the preferred pattern for retrieving a session cookie.

This scenario is ideal for deployment scenarios where you have implemented both a custom login page and custom landing page for your application. Your web application will solicit and validate the user credentials against your Okta organization by calling the [Authentication API](/docs/reference/api/authn/) to obtain a [session token](/docs/reference/api/authn/#session-token).

The session token along with the URL for your landing page can then be used to complete the following [URI Template](http://tools.ietf.org/html/rfc6570) `https://${yourOktaDomain}/login/sessionCookieRedirect?token={sessionToken}&redirectUrl={redirectUrl}` that will retrieve a session cookie for a user's browser when visited.

Be aware of the following requirements:

* You must have your redirect URI white-listed as a Trusted Origin (<ApiLifecycle access="ea" />) within Okta. This is required to protect against open redirect attacks.
* The session token may only be used **once** to establish a session. If the session expires or the user logs out of Okta after using the token, they will not be able to reuse the same session token to get a new session cookie.
* When using a GET request to `https://${yourOktaDomain}/login/sessionCookieRedirect`, Internet Explorer is only compatible with redirect URLs that don't grow beyond 255 characters, including request parameters.
    If the `redirectUrl` is only going to Okta and the request parameters are longer, then use a POST request to this API and provide additional request parameters as POST form parameters. For more information about the character limitation, see the [Microsoft documentation](https://support.microsoft.com/en-us/help/208427/maximum-url-length-is-2-083-characters-in-internet-explorer).

##### Response Example


``` http
HTTP/1.1 302 Moved Temporarily
Set-Cookie: my_app_session_cookie_name=my_apps_session_cookie_value; Path=/
Location: https://${yourOktaDomain}/login/sessionCookieRedirect?token=0HsohZYpJgMSHwmL9TQy7RRzuY&redirectUrl=https%3A%2F%2Fwww.example.com%2Fportal%2Fhome
```

The user's browser will set your app's session cookie and follow the redirect to Okta.  Okta will validate the session token and return a 302 status response that sets a session cookie for Okta and redirects the user's browser back to your landing page.  After the page has loaded the user will have an active session with Okta and will be able to SSO into their applications until the session is expired or the user closes the session (logout) or browser application.

##### Request Example


``` http
GET /login/sessionCookieRedirect?token=0HsohZYpJgMSHwmL9TQy7RRzuY&redirectUrl=https%3A%2F%2Fyour-app.example.com HTTP/1.1
Host: your-domain.okta.com
Accept: */*
```

##### Response Example


``` http
HTTP/1.1 302 Moved Temporarily
Set-Cookie: sid=000aC_z7AZKTpSqtHFc0Ak6Vg; Path=/
Location: https://your-app.example.com
```

## Retrieving a session cookie by visiting an application embed link

This scenario is ideal for deployment scenarios where you have a custom login page but immediately want to launch an Okta application after login without returning to a landing page. The login page will typically collect the user's credentials via a HTML form submit or POST and validate the credentials against your Okta organization by calling the [Authentication API](/docs/reference/api/authn/) to obtain a session token.

The session token can then be passed as a query parameter to an Okta application's embed link that will set a session cookie as well as launch the application in a single web request.

> The session token may only be used **once** to establish a session. If the session expires or the user logs out of Okta after using the token, they will not be able to reuse the same session token to get a new session cookie.

### Visit an embed link with the session token

After your login flow is complete you can launch an Okta application for the user with an [embed link](/docs/reference/api/users/#get-assigned-app-links) that contains the the session token as a query parameter `sessionToken`.

##### Response Example


``` http
HTTP/1.1 302 Moved Temporarily
Location: https://your-subdomain/app/google/go1013td3mXAQOJCHEHQ/mail?sessionToken=0HsohZYpJgMSHwmL9TQy7RRzuY
```

When the link is visited, the token in the request will be used to initiate the user's session before processing the application launch request. A session cookie will be set in the browser and the user will have an active session with Okta and will be able to SSO into additional applications until the session is expired or the user closes the session (logout) or browser application.

##### Response Example


``` http
HTTP/1.1 302 Moved Temporarily
Set-Cookie: sid=000aC_z7AZKTpSqtHFc0Ak6Vg; Path=/
Location: https://mail.google.com/a/your-subdomain
```

> The HTTP response will vary depending on the specific Okta application but will always contain a `Set-Cookie` header.

### Initiate a SAML SSO with the session token

After your login flow is complete you can also initiate a SAML SSO into an Okta application for the user with either the `HTTP-Redirect` or `HTTP-POST` binding to the application's SAML SSO URL
that contains the the session token as query parameter `sessionToken`.

##### Request Example


``` http
GET /home/appwizardsaml_1/0oalkgr25YMb5reZp0g4/alnlkriVMi9J5WYmk0g4?RelayState=%2Fcustom%2Fdeep%2Flink&sessionToken=0HsohZYpJgMSHwmL9TQy7RRzuY HTTP/1.1
Host: your-domain.okta.com
Accept: */*
```

When the link is visited, the token in the request will be used to initiate the user's session before processing the SAML SSO request. A session cookie will be set in the browser and the user will have an active session with Okta and will be able to SSO into additional applications until the session is expired or the user closes the session (logout) or browser application.

##### Response Example


``` http
HTTP/1.1 200 OK
Content-Type: text/html;charset=utf-8
Set-Cookie: sid=000aC_z7AZKTpSqtHFc0Ak6Vg; Path=/

<html>
<body>
    <div>
        <form id="appForm" action="https://sp.example.com/auth/saml20" method="POST">
            <input name="SAMLResponse" type="hidden" value="PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c2FtbDJwOlJlc3BvbnNlIHhtbG5zOnNhbWwycD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIiBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9va3RhcHMxLm9rdGEuY29tL2F1dGgvc2FtbDIwL2thcmwiIElEPSJpZDEzODE1MzU1NjY3MTAwODkwMDAxMzkzODMwOTY2IiBJc3N1ZUluc3RhbnQ9IjIwMTMtMTAtMTFUMjM6NTI6NDYuNjk4WiIgVmVyc2lvbj0iMi4wIj48c2FtbDI6SXNzdWVyIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSI+aHR0cDovL3d3dy5va3RhLmNvbS9rYml5TU9JTUhOTEdISk5DQlVSTTwvc2FtbDI6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxkczpTaWduZWRJbmZvPjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPjxkczpSZWZlcmVuY2UgVVJJPSIjaWQxMzgxNTM1NTY2NzEwMDg5MDAwMTM5MzgzMDk2NiI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjwvZHM6VHJhbnNmb3Jtcz48ZHM6RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiLz48ZHM6RGlnZXN0VmFsdWU+enNDNjJuOUI3S1RxN1pZdG5YM3M2dW9jYXRBPTwvZHM6RGlnZXN0VmFsdWU+PC9kczpSZWZlcmVuY2U+PC9kczpTaWduZWRJbmZvPjxkczpTaWduYXR1cmVWYWx1ZT5aZ3YvamFJdkpGSW9EV29GRnUyM0dJVVJLSU9JMUdOd2FmWXhZbmdWY01pRnQ5UTRwOS9MQUhMSXVKYzhjdXh4UmlmYlpza1ZlRWh1TG1xV3JSSFpMRHh2djJ4Wm15eUM4UGlSc2xFSGlzMEhhQTY3bDF3dlBaTURTSWxhV3lJaFFzVkppVE90Nk9GSXpjNkZwZEFZVWU0Y3ptcEEyaW4vK2RmQTl0S1dYbkU9PC9kczpTaWduYXR1cmVWYWx1ZT48ZHM6S2V5SW5mbz48ZHM6WDUwOURhdGE+PGRzOlg1MDlDZXJ0aWZpY2F0ZT5NSUlDblRDQ0FnYWdBd0lCQWdJR0FTbE1OYXdETUEwR0NTcUdTSWIzRFFFQkJRVUFNSUdSTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHCkExVUVDQXdLUTJGc2FXWnZjbTVwWVRFV01CUUdBMVVFQnd3TlUyRnVJRVp5WVc1amFYTmpiekVOTUFzR0ExVUVDZ3dFVDJ0MFlURVUKTUJJR0ExVUVDd3dMVTFOUFVISnZkbWxrWlhJeEVqQVFCZ05WQkFNTUNXSnZiM1J6ZEhKaGNERWNNQm9HQ1NxR1NJYjNEUUVKQVJZTgphVzVtYjBCdmEzUmhMbU52YlRBZUZ3MHhNREEyTVRneE56VTJOVEphRncwME1EQTJNVGd4TnpVM05USmFNSUdSTVFzd0NRWURWUVFHCkV3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFV01CUUdBMVVFQnd3TlUyRnVJRVp5WVc1amFYTmpiekVOTUFzR0ExVUUKQ2d3RVQydDBZVEVVTUJJR0ExVUVDd3dMVTFOUFVISnZkbWxrWlhJeEVqQVFCZ05WQkFNTUNXSnZiM1J6ZEhKaGNERWNNQm9HQ1NxRwpTSWIzRFFFSkFSWU5hVzVtYjBCdmEzUmhMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQWtIUDlpSGNYCnRja0ZVMmliNkpWUTNVUDRaMDFoc1QyWXh1ZUhqa2pxL0Z3N1o3aEtueDMwb0JBeFl6dGxUZitsSVpjVWlRVnc5WUF2NVVKNC9uaEMKSTdiQmM2SVVuYnIzUTZ5NitjbWJ1VlVnaVhodzVsTTR5a2tMQ2dLZ01uVk5hcHRYNGt4RGY0ZGVRbEorS0pLeFdDWjN5TXR5aEZYZQo0bUtvbUwxQzRyc0NBd0VBQVRBTkJna3Foa2lHOXcwQkFRVUZBQU9CZ1FBbVJEODBnMVYzU2lNYjdEdHZwMG1CZWk5elczaEw3Y0RYCnV2ZFlBMXU0Vmhhais1bWppYVJ5QlFDODJLaU1UZ1l4MGExOWZGeUVRWHlwcGU0Nzh3MUNBUFFBbjhIWEFMVHR3WUJpMUgvbHpKRTUKaU5MRE55dWVtTjhaUVV5TTFNeVNYbDhiVmNRSE4wZmpnOWVmWG9kYkw4VzVhLzZwTW9Mc2NaaDJHTUsrVkE9PTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMnA6U3RhdHVzIHhtbG5zOnNhbWwycD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDJwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbDJwOlN0YXR1cz48c2FtbDI6QXNzZXJ0aW9uIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiBJRD0iaWQxMzgxNTM1NTY2NzE0OTg5MDAwMjMxOTQzNDgiIElzc3VlSW5zdGFudD0iMjAxMy0xMC0xMVQyMzo1Mjo0Ni42OThaIiBWZXJzaW9uPSIyLjAiPjxzYW1sMjpJc3N1ZXIgRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6bmFtZWlkLWZvcm1hdDplbnRpdHkiIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj5odHRwOi8vd3d3Lm9rdGEuY29tL2tiaXlNT0lNSE5MR0hKTkNCVVJNPC9zYW1sMjpJc3N1ZXI+PGRzOlNpZ25hdHVyZSB4bWxuczpkcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+PGRzOlNpZ25lZEluZm8+PGRzOkNhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz48ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIi8+PGRzOlJlZmVyZW5jZSBVUkk9IiNpZDEzODE1MzU1NjY3MTQ5ODkwMDAyMzE5NDM0OCI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjwvZHM6VHJhbnNmb3Jtcz48ZHM6RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiLz48ZHM6RGlnZXN0VmFsdWU+LzRvakxrbFE3SDVLVlQvYXhMSk9nVEttQkRRPTwvZHM6RGlnZXN0VmFsdWU+PC9kczpSZWZlcmVuY2U+PC9kczpTaWduZWRJbmZvPjxkczpTaWduYXR1cmVWYWx1ZT5OSGNxQVJGT2FHd2N3bVlyRklMeTlGendnWDZDenVMcDlhQm5UZkxXdFpic0tOWFRvSS92dG9GVjhDMzFEOUlKVlVoOVhNcmtQckN4Q2VZZGczdnlUbmx5dG80SlJ1TlR2elhncFBEcGlDZ2RGaWhHeFJPRk9JVFhoQkdkRFNXbVdkYkNuQWJDZzBWT2xlZHNnQjMxTExudXFJaGIxSGJGVy9ZeFBhUTRmbEU9PC9kczpTaWduYXR1cmVWYWx1ZT48ZHM6S2V5SW5mbz48ZHM6WDUwOURhdGE+PGRzOlg1MDlDZXJ0aWZpY2F0ZT5NSUlDblRDQ0FnYWdBd0lCQWdJR0FTbE1OYXdETUEwR0NTcUdTSWIzRFFFQkJRVUFNSUdSTVFzd0NRWURWUVFHRXdKVlV6RVRNQkVHCkExVUVDQXdLUTJGc2FXWnZjbTVwWVRFV01CUUdBMVVFQnd3TlUyRnVJRVp5WVc1amFYTmpiekVOTUFzR0ExVUVDZ3dFVDJ0MFlURVUKTUJJR0ExVUVDd3dMVTFOUFVISnZkbWxrWlhJeEVqQVFCZ05WQkFNTUNXSnZiM1J6ZEhKaGNERWNNQm9HQ1NxR1NJYjNEUUVKQVJZTgphVzVtYjBCdmEzUmhMbU52YlRBZUZ3MHhNREEyTVRneE56VTJOVEphRncwME1EQTJNVGd4TnpVM05USmFNSUdSTVFzd0NRWURWUVFHCkV3SlZVekVUTUJFR0ExVUVDQXdLUTJGc2FXWnZjbTVwWVRFV01CUUdBMVVFQnd3TlUyRnVJRVp5WVc1amFYTmpiekVOTUFzR0ExVUUKQ2d3RVQydDBZVEVVTUJJR0ExVUVDd3dMVTFOUFVISnZkbWxrWlhJeEVqQVFCZ05WQkFNTUNXSnZiM1J6ZEhKaGNERWNNQm9HQ1NxRwpTSWIzRFFFSkFSWU5hVzVtYjBCdmEzUmhMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQWtIUDlpSGNYCnRja0ZVMmliNkpWUTNVUDRaMDFoc1QyWXh1ZUhqa2pxL0Z3N1o3aEtueDMwb0JBeFl6dGxUZitsSVpjVWlRVnc5WUF2NVVKNC9uaEMKSTdiQmM2SVVuYnIzUTZ5NitjbWJ1VlVnaVhodzVsTTR5a2tMQ2dLZ01uVk5hcHRYNGt4RGY0ZGVRbEorS0pLeFdDWjN5TXR5aEZYZQo0bUtvbUwxQzRyc0NBd0VBQVRBTkJna3Foa2lHOXcwQkFRVUZBQU9CZ1FBbVJEODBnMVYzU2lNYjdEdHZwMG1CZWk5elczaEw3Y0RYCnV2ZFlBMXU0Vmhhais1bWppYVJ5QlFDODJLaU1UZ1l4MGExOWZGeUVRWHlwcGU0Nzh3MUNBUFFBbjhIWEFMVHR3WUJpMUgvbHpKRTUKaU5MRE55dWVtTjhaUVV5TTFNeVNYbDhiVmNRSE4wZmpnOWVmWG9kYkw4VzVhLzZwTW9Mc2NaaDJHTUsrVkE9PTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMjpTdWJqZWN0IHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj48c2FtbDI6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6ZW1haWxBZGRyZXNzIj5mcmVkZmxpbnRzdG9uZUByaW5jb25oaWxsLmNvbTwvc2FtbDI6TmFtZUlEPjxzYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWwyOlN1YmplY3RDb25maXJtYXRpb25EYXRhIE5vdE9uT3JBZnRlcj0iMjAxMy0xMC0xMVQyMzo1Nzo0Ni43MTdaIiBSZWNpcGllbnQ9Imh0dHBzOi8vb2t0YXBzMS5va3RhLmNvbS9hdXRoL3NhbWwyMC9rYXJsIi8+PC9zYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uPjwvc2FtbDI6U3ViamVjdD48c2FtbDI6Q29uZGl0aW9ucyBOb3RCZWZvcmU9IjIwMTMtMTAtMTFUMjM6NDc6NDYuNzE3WiIgTm90T25PckFmdGVyPSIyMDEzLTEwLTExVDIzOjU3OjQ2LjcxN1oiIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj48c2FtbDI6QXVkaWVuY2VSZXN0cmljdGlvbj48c2FtbDI6QXVkaWVuY2U+aHR0cHM6Ly93d3cub2t0YS5jb20vc2FtbDIvc2VydmljZS1wcm92aWRlci9zcGJmZHY5MnFLU0JUR1VZR1VQTzwvc2FtbDI6QXVkaWVuY2U+PC9zYW1sMjpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDI6Q29uZGl0aW9ucz48c2FtbDI6QXV0aG5TdGF0ZW1lbnQgQXV0aG5JbnN0YW50PSIyMDEzLTEwLTExVDIzOjUyOjQ2LjY5OFoiIFNlc3Npb25JbmRleD0iaWQxMzgxNTM1NTY2Njk4LjY4MDQ3Mjc3IiB4bWxuczpzYW1sMj0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+PHNhbWwyOkF1dGhuQ29udGV4dD48c2FtbDI6QXV0aG5Db250ZXh0Q2xhc3NSZWY+dXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmRQcm90ZWN0ZWRUcmFuc3BvcnQ8L3NhbWwyOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDI6QXV0aG5Db250ZXh0Pjwvc2FtbDI6QXV0aG5TdGF0ZW1lbnQ+PC9zYW1sMjpBc3NlcnRpb24+PC9zYW1sMnA6UmVzcG9uc2U+"/>
            <input name="RelayState" type="hidden" value="/some/deep/link"/>
        </form>

        <script type="text/javascript">

          $(function(){
            document.getElementById('appForm').submit();
          });
      </script>
  </div>
</body>
</html>
```

### Initiate a WS-Federation SSO with the session token

You can also use the same [flow as SAML](#initiate-a-saml-sso-with-the-session-token) for template WS-Federation application as well by passing the session token as query parameter `sessionToken`.

##### Request Example


``` http
GET /app/template_wsfed/k9x69oiKYSUWMIYZBKTY/sso/wsfed/passive?wa=wsignin1.0&wtrealm=https%3A%2F%2Fexample.com%2FApp%2F&wctx=rm%3D0%26id%3Dpassive%26ru%3D%2FApp%2FHome%2FAbout&sessionToken=0HsohZYpJgMSHwmL9TQy7RRzuY HTTP/1.1
Host: your-domain.okta.com
Accept: */*
```

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).
