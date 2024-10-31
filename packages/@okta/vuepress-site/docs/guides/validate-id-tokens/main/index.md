---
title: Validate ID tokens
excerpt: How to validate ID tokens with Okta
layout: Guides
---

This guide explains how to validate ID tokens with Okta.

---

#### Learning outcomes

* Retrieve and parse your Okta JSON Web Keys (JWK).
* Decode the ID token.
* Verify the signature that was used to sign the ID token.
* Verify the claims in the ID token.

---

## About ID token validation

If your client app requires authentication and needs information about the authenticated person, then use the OpenID Connect (OIDC) protocol to get an ID token.

OIDC is an authentication protocol built on top of OAuth 2.0. With OAuth 2.0, a user authenticates with an authorization server and provides you with an access token that authorizes access to some server resources. With OIDC, you also get an ID token, which contains information about a user and their authentication status. Your client can use the token to authenticate and store user information. One OIDC flow can return both access and ID tokens.

## ID tokens vs. access tokens

The ID token is a security token granted by the OpenID provider that contains information about a user. This information tells your client app that the user is authenticated. It can also give you information, like their username or location.

You can pass an ID token to different components of your client. These components can use the ID token to confirm that the user is authenticated and to retrieve information about them.

Access tokens, on the other hand, aren't intended to carry information about the user. They allow access to certain defined server resources. See [Validate access tokens](/docs/guides/validate-access-tokens/).

## What to check when validating an ID token

The following is a high-level overview of validating an ID token:

* Retrieve and parse your JWK, which should be checked periodically and cached by your app.
* Decode the ID token, which is in JWK format.
* Verify the signature used to sign the ID token.
* Verify the claims found inside the ID token.

### Retrieve the JSON Web Key Set

Retrieve the JSON Web Key Set (JWKS) from your [Okta authorization server](/docs/guides/customize-authz-server/). Your app may have it cached. Specifically, your authorization server's Metadata endpoint contains the `jwks_uri`, which you can use to get the JWKS.

> **Note:** See [Retrieve authorization server metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOAuthConfigurationCustomAS).

### Decode the ID token

Decode the ID token, which is in JSON Web Token (JWT) format, to use it. See the [list of libraries](#okta-libraries-to-help-you-verify-id-tokens) that are available to help you do this.

## Verify the token signature

Verify the access or ID token's signature by matching these two keys:

* The key that was used to sign in
* One of the keys that you retrieved from your Okta authorization server's JWK endpoint

Specifically, a `kid` attribute is used to identify each public key, which corresponds with the `kid` claim in the access or ID token header.

If the `kid` claim doesn't match, it's possible that the signing keys have changed. Check the `jwks_uri` value in the authorization server metadata and try retrieving the keys again from Okta.

### Verify the claims

Verify the following:

* The `iss` (issuer) claim matches the identifier of your Okta authorization server.
* The `aud` (audience) claim should match the client ID that you used to request the ID token. This is the client ID for the app that you created in Okta.
* The `iat` (issued at time) claim indicates when this ID token was issued, expressed in Unix time.
* The `exp` (expiry time) claim is when this token expires, expressed in Unix time. Make sure that this time hasn't already passed.
* The `nonce` claim value should match whatever was passed when you requested the ID token.

## Validate a token remotely with Okta

You can also validate an ID token using the [Token Introspection endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS). This endpoint takes your token as a URL query and returns a JSON response with a boolean `active` property. If `active` is `true`, then more information about the token is also returned.

This method incurs a network request that results in slower verification of the token. Use this method when you want to guarantee that the access token hasn't been revoked.

## Okta Libraries to help you verify ID tokens

The Okta JWT verifier is available for the following languages:

* [Golang](https://github.com/okta/okta-jwt-verifier-golang)
* [Java](https://github.com/okta/okta-jwt-verifier-java)
* [Python](https://github.com/okta/okta-jwt-verifier-python)

## See also

* [Overview of OpenID Connect](/docs/concepts/oauth-openid/#openid-connect)
* [JSON Web Token specification](https://tools.ietf.org/html/rfc7519)
* [JSON Web Keys specification](https://tools.ietf.org/html/rfc7517)
* [OIDC & OAuth 2.0 API Reference](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token)
