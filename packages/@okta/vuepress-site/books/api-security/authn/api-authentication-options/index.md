---
title: API Authentication Options - Authentication
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authn/">&larr; Authentication</a></div>

## API Authentication Options {#authn-api-authentication-options}

The first type of API authentication I'll talk about is HTTP Basic Authentication.

HTTP Basic Authentication is defined by [RFC 7617](https://tools.ietf.org/html/rfc7617). This document was created in September 2015 by the internet standards body known as The Internet Engineering Task Force (IETF). It replaces [RFC 2617](https://tools.ietf.org/html/rfc2617), which was created in 1999 and defined both basic and digest authentication.

Basic authentication is the simplest form of web authentication. It's a stateless protocol that doesn't require cookies, session identifiers, or login pages (like most other forms of web authentication today).

### HTTP Basic Authentication

Basic authentication works as follows:

1. When a client sends a request to the server, the server returns a `401 Unauthorized` response status and provides information on how to authenticate with a <code style="word-break: keep-all">WWW-Authenticate</code> response header.
1. If the client is a browser, a built-in browser dialog will prompt the user for a username and password. A programmer has no control over what this dialog looks like.
1. When a browser sends the user's credentials to the server, the username and password are combined with a colon separator (`username:password`), base64-encoded, then added to the `Authorization` header like so:

```
Authorization: Basic base64(username:password)
```

The server will receive this request, decode the authorization header, split on the colon, and use the credentials to validate the user has access to perform the operation.

When using HTTP Basic Authentication to secure APIs, its recommended the username and password be long, random strings rather than easy-to-remember names. Entropy means a "lack of order and predictability" and is very important for passwords, especially if you're generating them. The more random your password generation process is, the better. One important aspect is that the API username and password must not be the same username and password as the account's username and password. Not only are their security implications of using the same credentials but something as simple as clicking "forgot password" can knock your applications offline.

While basic auth is perfectly fine to use, one of its issues is that your username+password are sent over the network on every request. This increases the likelihood that they could be leaked, logged, or reused in other applications.


Basic authentication has other long term issues as well:

- **Key rotation** - What happens if you have an app running with basic authentication in production and you accidentally publish your API key on GitHub? As an API provider, you need a strategy for supporting multiple keys so your users can rotate them without downtime.
- **Delegation** - If you're building an API that needs to run for a third party (like a Google API for grabbing someone's friends), you don't want to use Basic because it would require a username/password to be given to your app from a user. If this is the account username, there is no delegation or scoping of permissions.
- **Browsers** - If your API needs to be consumed from an insecure environment (JavaScript front end, mobile app, etc.), you can't just embed an API key in your app, otherwise attackers would grab it and do bad things.

Several authentication schemes use the HTTP authentication framework. Schemes can differ in security strength and their availability in client or server software. All schemes use an `Authorization` header followed by scheme name and a space character. Common [scheme names](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes) include:

* Basic
* Digest
* Bearer (for OAuth 2.0)
* HOBA (HTTP Origin-Bound Authentication, RFC 7486, draft)
* Mutual (Mutual Authentication Protocol, draft)
* Signature (HTTP Signatures and AWS4-HMAC-SHA256)

Basic authentication is easy to implement for APIs, but it's not often used in web applications because the login form can't be customized and "logging out" requires closing the browser.
