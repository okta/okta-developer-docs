---
title: Validate Access Tokens
excerpt: How to validate access tokens with Okta.
language: PHP
integration: back-end
icon: code-php
layout: Guides
meta:
  - name: description
    content: This guide on tokens shows you how to verify a token's signature, manage key rotation, and how to use a refresh token to get a new access token.
  - name: robots
    content: noindex, nofollow
---

> **Info**: This topic was archived on February 9 2024 and is no longer updated. PHP is no longer a supported language at Okta.

This guide explains how to verify a token's signature, manage key rotation, and how to use a refresh token to get a new access token.

---

**Learning outcomes**

Validate access tokens.

---

## About access token validation

If you are building a modern app or API, you likely want to know if your end user is authenticated. This is important to give context or to protect APIs from unauthenticated users. You can use Okta to authenticate your end users and issue them signed access and ID tokens, which your application can then use. It is important that your application only uses the access token to grant access, and not the ID token. For more information about this, see the [Access Tokens vs ID Tokens](#access-tokens-vs-id-tokens) section below.

After the signed tokens are issued to the end users, they can be passed to your application for validation. There are two ways to verify a token: locally or remotely with Okta. The token is signed with a JSON Web Key (JWK) using the RS256 algorithm. To validate the signature, Okta provides your application with a public key that can be used.

* If you'd like to jump straight to the local validation steps: [What to Check When Validating an Access Token](#what-to-check-when-validating-an-access-token)
* If you'd like to see how to validate a token directly with Okta: [Validating A Token Remotely With Okta](#validating-a-token-remotely-with-okta)

## Access Tokens vs ID Tokens

As mentioned above, it is important that the resource server (your server-side application) accepts only the access token from a client. This is because access tokens are intended for authorizing access to a resource.

ID Tokens, on the other hand, are intended for authentication. They provide information about the resource owner, to allow you verify that they are who they say they are. Authentication is the concern of the clients. Because of this, when a client makes an authentication request, the ID Token that is returned contains the `client_id` in the ID Token's `aud` claim.

## What to Check When Validating an Access Token

The high-level overview of validating an access token looks like this:

* Retrieve and parse your Okta JSON Web Keys (JWK), which should be checked periodically and cached by your application.
* Decode the access token, which is in JSON Web Token format
* Verify the signature used to sign the access token
* Verify the claims found inside the access token

### Retrieve The JSON Web Keys

The JSON Web Keys (JWK) need to be retrieved from your [Okta authorization server](/docs/guides/customize-authz-server/), though your application should have them cached. See [Best practices](/docs/reference/api/oidc/#best-practices). Specifically, your authorization server's Metadata endpoint contains the `jwks_uri`, which you can use to get the JWK.

> For more information about retrieving this metadata, see [Retrieve Authorization Server Metadata](/docs/reference/api/oidc/#well-knownoauth-authorization-server).

### Decoding and Validating the Access Token

You will have to decode the access token, which is in JWT format.  This involves the following steps:

* Verify the Token Signature
* Verify the Claims

See the instructions for the [Okta JWT Verifier for PHP](https://github.com/okta/okta-jwt-verifier-php).

## Required Packages

The Okta JWT Verifier can be installed through composer.

```bash
composer require okta/jwt-verifier
```

This library requires a JWT library. We currently support firebase/php-jwt. You will have to install this or create your own adaptor.

```bash
composer require firebase/php-jwt
```

You will also need to install a PSR-7 compliant library. We suggest that you use guzzlehttp/psr7 in your project.

```bash
composer require guzzlehttp/psr7
```

## Validate Access Token

For any access token to be valid, the following are asserted:

* Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
* Access token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
* The `aud` claim in the jwt matches any expected `aud` claim set up in the builder.
* The `iss` claim matches the issuer the verifier is constructed with.
* Any custom claim assertions that you add are confirmed

```php
$jwtVerifier = (new \Okta\JwtVerifier\JwtVerifierBuilder())
    ->setAdaptor(new \Okta\JwtVerifier\Adaptors\FirebasePhpJwt)
    ->setAudience('api://default')
    ->setClientId('${clientId}')
    ->setIssuer('https://${yourOktaDomain}/oauth2/default')
    ->build();

$jwt = $jwtVerifier->verify($jwt);
```

## Validating A Token Remotely With Okta

Alternatively, you can also validate an access or refresh Token using the Token Introspection endpoint: [Introspection Request](/docs/reference/api/oidc/#introspect). This endpoint takes your token as a URL query parameter and returns back a simple JSON response with a boolean `active` property.

This incurs a network request which is slower to do verification, but can be used when you want to guarantee that the access token hasn't been revoked.

## See also

* A high-level overview of OpenID Connect can be found [here](/docs/concepts/oauth-openid/#openid-connect).
* The access tokens are in [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) format. They are signed using asymmetrical [JSON Web Keys (JWK)](https://tools.ietf.org/html/rfc7517).
* More information about Okta's access tokens can be found in the [OIDC & OAuth 2.0 API Reference](/docs/reference/api/oidc/#id-token).
