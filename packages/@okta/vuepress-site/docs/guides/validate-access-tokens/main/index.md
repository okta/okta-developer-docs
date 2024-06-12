---
title: Validate Access Tokens
excerpt: How to validate access tokens with Okta
layout: Guides
meta:
  - name: description
    content: This guide explains why access token validation is important and how to validate the access token.
---

This guide explains why access token validation is important and how to validate and decode the access token.

---

#### Learning outcomes

* Understand token validation.
* Understand what to check when validating tokens.
* Decode access tokens.
* Validate access tokens remotely.

---

## About access token validation

If you're building a modern app or API, you want to know if your end user is authenticated. This is important to give context or to protect APIs from unauthenticated users. You can use Okta to authenticate your end users and issue them signed access and ID tokens. Your app can then use these tokens. It's important that your app uses only the access token to grant access, and not the ID token. See [Access tokens vs ID tokens](#access-tokens-vs-id-tokens).

After signed tokens are issued to end users, they can be passed to your app for validation. There are two ways to verify a token: locally or remotely with Okta. The token is signed with a JSON Web Key (JWK) using the RS256 algorithm. To validate the signature, Okta provides your app with a public key that you can use.

* To jump straight to the local validation steps: [What to check when validating an access token](#what-to-check-when-validating-an-access-token)
* To see how to validate a token directly with Okta: [Validatie a token remotely with Okta](#validate-a-token-remotely-with-okta)

> **Note:** Okta is the only app that should consume or validate access tokens from the org authorization server. Org authoriation servers have the following `issuer` format: `https://{yourOktaOrg}`. Consider these access tokens as opaque strings because their content is subject to change at any time. Therefore, any attempts by your app to validate the tokens may not work in the future.

## Access tokens vs ID tokens

As mentioned earlier, it's important that the resource server (your server-side app) accepts only an access token from a client. Access tokens are intended for authorizing access to a resource.

ID tokens, on the other hand, are intended for authentication. They provide information about the resource owner so that you can verify that they're who they say they are. Authentication is important to clients. Because of this, when a client makes an authentication request, the ID token that's returned contains the `client_id` in the ID token's `aud` claim.

## What to check when validating an access token

The high-level overview of validating an access token looks like this:

* Retrieve your Okta [JSON Web Keys (JWK)](https://datatracker.ietf.org/doc/html/rfc7517), which your app should check periodically and cache.
* Decode the access token, which is in [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) format.
* Verify the signature used to sign the access token.
* Verify the claims found inside the access token.

### Retrieve the JSON Web Keys

<StackSnippet snippet="retrievekeys" />

### Decode and validate the access token

Decode the access token, which is in JWT format. This involves the following steps:

* Verify the token signature.
* Verify the claims.

<StackSnippet snippet="accesstoken" />

## Validate a token remotely with Okta

Alternatively, you can also validate an access or refresh token using the Token Introspection endpoint: [Introspection request](/docs/reference/api/oidc/#introspect). This endpoint takes your token as a URL query parameter and returns a simple JSON response with a boolean `active` property.

This incurs a network request which is slower for performing validation, but you can use it when you want to guarantee that the access token hasn't been revoked.

## See also

* A high-level overview of OpenID Connect can be found [here](/docs/concepts/oauth-openid/#openid-connect).
* The access tokens are in [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) format. They're signed using asymmetrical [JSON Web Keys (JWK)](https://tools.ietf.org/html/rfc7517).
* More information about Okta access tokens can be found in the [OIDC & OAuth 2.0 API Reference](/docs/reference/api/oidc/#id-token).
