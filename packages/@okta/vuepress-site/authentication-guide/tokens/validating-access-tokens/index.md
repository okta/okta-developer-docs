---
title: Validating Access Tokens
excerpt: How to validate access tokens with Okta.
---

# Validating Access Tokens

## Overview

If you are building a modern app or API, you likely want to know if your end-user is authenticated. This is important to give context or to protect APIs from unauthenticated users. You can use Okta to authenticate your end-users and issue them signed access and ID tokens, which your application can then use. It is important that your application only uses the access token to grant access, and not the ID token. For more information about this, see the [Access Tokens VS ID Tokens](#access-tokens-vs-id-tokens) section below.

Once the signed tokens are issued to the end-users they can be passed to your application, which must validate them. There are two ways to verify a token: locally, or remotely with Okta. The token has been signed with a JSON Web Key (JWK) using the RS256 algorithm. To validate the signature, Okta provides your application with a public key that can be used.

We will now cover the terms used in this document, and an explanation of why you should use access tokens instead of ID tokens for this use case.

- If you'd like to jump straight to the local validation steps: [What to Check When Validating an Access Token](#what-to-check-when-validating-an-access-token)
- If you'd like to see how to validate a token directly with Okta: [Validating A Token Remotely With Okta](#validating-a-token-remotely-with-okta)
- If you want to see specifically how to accomplish this in your language of choice: [Okta Libraries to Help You Verify Access Tokens](#okta-libraries-to-help-you-verify-access-tokens)

A high-level overview of OAuth 2.0 can be found [here](/authentication-guide/auth-overview/#oauth-20).

The access tokens are in JSON Web Token (JWT) format, the specification for which can be found here: <https://tools.ietf.org/html/rfc7519>. They are signed using private JSON Web Keys (JWK), the specification for which you can find here: <https://tools.ietf.org/html/rfc7517>.

More information about Okta's access tokens can be found in the [OIDC & OAuth 2.0 Reference](/docs/api/resources/oidc#access-token).

## Access Tokens vs ID Tokens

As mentioned above, it is important that the resource server (your server-side application) accept only the access token from a client. This is because access tokens are intended for authorizing access to a resource.

ID Tokens, on the other hand, are intended for authentication. They provide information about the resource owner, to allow you verify that they are who they say they are. Authentication is the concern of the clients. Because of this, when a client makes an authentication request, the ID Token that is returned contains the `client_id` in the ID Token's `aud` claim.

## What to Check When Validating an Access Token

The high-level overview of validating an access token looks like this:

- Retrieve and parse your Okta JSON Web Keys (JWK), which should be checked periodically and cached by your application.
- Decode the access token, which is in JSON Web Token format.
- Verify the signature used to sign the access token
- Verify the claims found inside the access token

### Retrieve The JSON Web Keys

The JSON Web Keys (JWK) need to be retrieved from your [Okta Authorization Server](/authentication-guide/implementing-authentication/set-up-authz-server), though your application should have them cached. Specifically, your Authorization Server's Metadata endpoint contains the `jwks_uri`, which you can use to get the JWK.

> For more information about retrieving this metadata, see [Retrieve Authorization Server Metadata](/docs/api/resources/oidc#well-knownoauth-authorization-server).

### Decode the Access Token

You will have to decode the access token, which is in JWT format. A list of libraries to help you do this can be found [below](#okta-libraries-to-help-you-verify-access-tokens).

### Verify the Token's Signature

You verify the access token's signature by matching the key that was used to sign in with one of the key's you retrieved from your Okta Authorization Server's JWK endpoint. Specifically, each public key is identified by a `kid` attribute, which corresponds with the `kid` claim in the access token header.

If the `kid` claim does not match, it is possible that the signing keys have changed. Check the `jwks_uri` value in the Authorization Server metadata and try retrieving the keys again from Okta.

Please note the following:

- For security purposes, Okta automatically rotates keys used to sign the token.
- The current key rotation schedule is four times a year. This schedule can change without notice.
- In case of an emergency, Okta can rotate keys as needed.
- Okta always publishes keys to the `jwks_uri`.
- To save the network round trip, your app should cache the `jwks_uri` response locally. The [standard HTTP caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) are used and should be respected.
- The administrator can switch the Authorization Server key rotation mode by updating the Authorization Server's `rotationMode` property. For more information see the API Reference: [Authorization Server Credentials Signing Object](/docs/api/resources/authorization-servers#credentials-object).

> Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app might fail if you hardcode public keys in your applications. Be sure to include key rollover in your implementation.

> If your application cannot retrieve keys dynamically, the administrator can disable the automatic key rotation in the administrator UI, [generate a key credential](/docs/api/resources/apps#generate-new-application-key-credential) and [update the application](/docs/api/resources/apps#update-key-credential-for-application) to use it for signing.

### Verify the Claims

You should verify the following:

- The `iss` (issuer) claim matches the identifier of your Okta Authorization Server.
- Verify that the `aud` (audience) claim is the value configured in the Authorization Server.
- The `cid` claim is your Okta application's Client ID.
- The `exp` (expiry time) claim is the time at which this token will expire, expressed in Unix time. You should make sure that this has not already passed.

## Validating A Token Remotely With Okta

Alternatively, you can also validate an access or refresh Token using the Token Introspection endpoint: [Introspection Request](/docs/api/resources/oidc#introspect). This endpoint takes your token as a URL query parameter and returns back a simple JSON response with a boolean `active` property.

This incurs a network request which is slower to do verification, but can be used when you want to guarantee that the access token hasn't been revoked.

## Okta Libraries to Help You Verify Access Tokens

The Okta JWT Verifier is available for the following languages:

- [Golang](https://github.com/okta/okta-jwt-verifier-golang)
- [Java](https://github.com/okta/okta-jwt-verifier-java)
- [Node.js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
- [PHP](https://github.com/okta/okta-jwt-verifier-php)

Don't see the language you're working in? Get in touch: <developers@okta.com>
