---
title: Choosing a Type of API Token - Managing API Credentials
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/api-keys/">&larr; Managing API Credentials</a></div>

## Choosing a Type of API Token {#api-keys-choosing-a-type}

Now that we've covered general advice for storing and using API tokens, let's review common options for securing your API. We'll cover the different types of API tokens, touch on the advantages and disadvantages of each, and summarize with suggestions and a recommended approach.

### Secure Your API

First, let's dig into some best practices:

* If your API is intended to be used to support an end user application, secure it using OAuth 2.0 to act as a Resource Server (RS) as defined by the OAuth 2.0 specification.
* If your API is intended to be used as a service by other software, secure your API using an "API token" - a string that is unique for each client.

The first approach, implementing an OAuth 2.0 Resource Server, is intended to be used when an application is acting on behalf of the person using the app. The Instagram and Spotify APIs are great examples where every action of the API needs the user's context to make sense.

The second approach, using an API token, is the best approach for automated software. Stripe, Twilio, and SendGrid are examples of this type of an API. While you certainly can, and eventually should consider, implementing OAuth 2.0 access tokens, doing so may be more overhead than telling your users to just use an API token.

Regardless of approach, the following patterns apply:

* Use the `Authorization: Bearer ` header for authenticating to your API. The single most important reason is that URL parameters are captured in server access logs and caches. Any "secret" included as a parameter is no longer a secret. As a standard defined by RFC 6750, most HTTP clients have built-in methods for using Bearer tokens.
* Further, instead of using a simple unique string, use a JSON Web Token or JWT as the Bearer token. By using JWT and the claims defined by RFC 7519, you can support a wide range of scenarios using just one authentication method. And, since JWT is such a widely adopted standard, most programming languages and frameworks have first-class JWT decoding and validation built in. You get more flexibility and wider compatibility with less work!

Another important thing to keep in mind is that by using a JWT as a Bearer token, you can support both token types that we describe above. A JWT works equally well as an OAuth 2.0 access token or as an "opaque" generic API token. You could start by just offering authenticating with an API token, but later add support for OAuth 2.0 and give your customers the features that OAuth 2.0 easily enables like automatic rotation of access tokens. You and your users get a clear, simple upgrade path for the life of your API.
