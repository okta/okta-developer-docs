---
title: Validate Access Tokens
excerpt: How to validate access tokens with Okta.
layout: Guides
meta:
  - name: description
    content: This guide on tokens shows you how to verify a token's signature, manage key rotation, and how to use a refresh token to get a new access token.
---

This guide explains how to verify a token's signature, manage key rotation, and how to use a refresh token to get a new access token.

---

#### Learning outcomes

Validate access tokens.

---

## About access token validation

If you're building a modern app or API, you likely want to know if your end user is authenticated. This is important to give context or to protect APIs from unauthenticated users. You can use Okta to authenticate your end users and issue them signed access and ID tokens, which your application can then use. It's important that your application only uses the access token to grant access, and not the ID token. For more information about this, see the [Access Tokens vs ID Tokens](#access-tokens-vs-id-tokens) section.

After the signed tokens are issued to the end users, they can be passed to your application for validation. There are two ways to verify a token: locally or remotely with Okta. The token is signed with a JSON Web Key (JWK) using the RS256 algorithm. To validate the signature, Okta provides your application with a public key that can be used.

- If you'd like to jump straight to the local validation steps: [What to Check When Validating an Access Token](#what-to-check-when-validating-an-access-token)
- If you'd like to see how to validate a token directly with Okta: [Validating A Token Remotely With Okta](#validating-a-token-remotely-with-okta)
- If you want to see specifically how to accomplish this in your language of choice: [Okta Libraries to Help You Verify Access Tokens](#okta-libraries-to-help-you-verify-access-tokens)

> **Note:** Access tokens from the org authorization server, as signified by an issuer `https://${yourOktaOrg}`, shouldn't be consumed or validated by any application other than Okta. Consider these access tokens as opaque strings since their content is subject to change at any time without notice. Therefore, any attempts to validate the tokens may not work in the future.

## Access Tokens vs ID Tokens

As mentioned earlier, it's important that the resource server (your server-side application) accepts only the access token from a client. This is because access tokens are intended for authorizing access to a resource.

ID tokens, on the other hand, are intended for authentication. They provide information about the resource owner so that you can verify that they're who they say they are. Authentication is the concern of the clients. Because of this, when a client makes an authentication request, the ID token that is returned contains the `client_id` in the ID token's `aud` claim.

## What to Check When Validating an Access Token

The high-level overview of validating an access token looks like this:

- Retrieve and parse your Okta JSON Web Keys (JWK), which should be checked periodically and cached by your application.
- Decode the access token, which is in JSON Web Token (JWT) format.
- Verify the signature used to sign the access token.
- Verify the claims found inside the access token.

### Retrieve The JSON Web Keys

The JSON Web Keys (JWK) need to be retrieved from your [Okta authorization server](/docs/guides/customize-authz-server/), though your application should have them cached. See [Best practices](/docs/reference/api/oidc/#best-practices). Specifically, your authorization server's Metadata endpoint contains the `jwks_uri`, which you can use to get the JWK.

> For more information about retrieving this metadata, see [Retrieve Authorization Server Metadata](/docs/reference/api/oidc/#well-knownoauth-authorization-server).

### Decode and Validate the Access Token

You need to decode the access token, which is in JWT format.  This involves the following steps:
- Verify the token signature.
- Verify the claims.

<StackSelector snippet="accesstoken" noSelector/>

## Validate A Token Remotely With Okta

Alternatively, you can also validate an access or refresh token using the Token Introspection endpoint: [Introspection Request](/docs/reference/api/oidc/#introspect). This endpoint takes your token as a URL query parameter and returns back a simple JSON response with a boolean `active` property.

This incurs a network request which is slower to do verification, but can be used when you want to guarantee that the access token hasn't been revoked.

## See also

- A high-level overview of OpenID Connect can be found [here](/docs/concepts/oauth-openid/#openid-connect).
- The access tokens are in [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) format. They're signed using asymmetrical [JSON Web Keys (JWK)](https://tools.ietf.org/html/rfc7517).
- More information about Okta access tokens can be found in the [OIDC & OAuth 2.0 API Reference](/docs/reference/api/oidc/#id-token).
