---
title: Validating ID Tokens
excerpt: How to validate ID tokens with Okta.
---

# Validating ID Tokens

## Overview

If your client application requires authentication and would like to obtain information about the authenticated person, then it should use the OpenID Connect protocol to get an ID token.

OpenID Connect (OIDC) is an authentication protocol built on top of OAuth 2.0. With OAuth 2.0, a user can authenticate with an authorization server and get you an access token that authorizes access to some server resources. With OIDC, they can also give you a token called an ID token. The ID token contains information about a user and their authentication status. It can be used by your client both for authentication and as a store of information about that user. One OIDC flow can return both access and ID tokens.

We will now cover the terms used in this document, and an explanation of why you should use ID tokens.

- If you'd like to jump straight to the local validation steps: [What to Check When Validating an ID Token](#what-to-check-when-validating-an-id-token)
- If you'd like to see how to validate a token directly with Okta: [Validating A Token Remotely With Okta](#validating-a-token-remotely-with-okta)
- If you want to see specifically how to accomplish this in your language of choice: [Okta Libraries to Help You Verify ID Tokens](#okta-libraries-to-help-you-verify-id-tokens)

A high-level overview of OpenID Connect can be found [here](/authentication-guide/auth-overview/#openid-connect).

The ID tokens are in JSON Web Token (JWT) format, the specification for which can be found here: <https://tools.ietf.org/html/rfc7519>. They are signed using private JSON Web Keys (JWK), the specification for which you can find here: <https://tools.ietf.org/html/rfc7517>.

More information about Okta's ID tokens can be found in the [OIDC & OAuth 2.0 API Reference](/docs/api/resources/oidc#id-token)

## ID Tokens vs Access Tokens

The ID Token is a security token granted by the OpenID Provider that contains information about an End-User. This information tells your client application that the user is authenticated, and can also give you information like their username or locale.

You can pass an ID Token around different components of your client, and these components can use the ID Token to confirm that the user is authenticated and also to retrieve information about them.

Access tokens, on the other hand, are not intended to carry information about the user. They simply allow access to certain defined server resources. More discussion about when to use access tokens can be found in [Validating Access Tokens](validating-access-tokens).

## What to Check When Validating an ID Token

The high-level overview of validating an ID token looks like this:

- Retrieve and parse your Okta JSON Web Keys (JWK), which should be checked periodically and cached by your application.
- Decode the ID token, which is in JSON Web Token format.
- Verify the signature used to sign the ID token
- Verify the claims found inside the ID token

### Retrieve The JSON Web Key Set

The JSON Web Key Set (JWKS) needs to be retrieved from your [Okta Authorization Server](/authentication-guide/implementing-authentication/set-up-authz-server), though your application should have it cached. Specifically, your Authorization Server's Metadata endpoint contains the `jwks_uri`, which you can use to get the JWKS.

> For more information about retrieving this metadata, see [Retrieve Authorization Server Metadata](/docs/api/resources/oidc#well-knownoauth-authorization-server).

### Decode the ID Token

You will have to decode the ID token, which is in JWT format. A list of libraries to help you do this can be found [below](#okta-libraries-to-help-you-verify-id-tokens).

### Verify the Token's Signature

You verify the ID token's signature by matching the key that was used to sign in with one of the keys you retrieved from your Okta Authorization Server's JWK endpoint. Specifically, each public key is identified by a `kid` attribute, which corresponds with the `kid` claim in the ID token header.

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
- The `aud` (audience) claim should match the Client ID that you used to request the ID Token. This will be the Client ID for the Application you created in Okta.
- The `iat` (issued at time) claim indicates when this ID token was issued, expressed in Unix time.
- The `exp` (expiry time) claim is the time at which this token will expire., expressed in Unix time. You should make sure that this time has not already passed.
- The `nonce` claim value should match whatever was passed when you requested the ID token.

## Validating A Token Remotely With Okta

Alternatively, you can also validate an ID Token using the Token Introspection endpoint: [Introspection Request](/docs/api/resources/oidc#introspect). This endpoint takes your token as a URL query and returns back a JSON response with a boolean `active` property. If `active` is `true` then further information about the token is returned as well.

This incurs a network request which is slower to do verification, but can be used when you want to guarantee that the access token hasn't been revoked.

## Okta Libraries to Help You Verify ID Tokens

The Okta JWT Verifier is available for the following languages:

- [Golang](https://github.com/okta/okta-jwt-verifier-golang)
- [Java](https://github.com/okta/okta-jwt-verifier-java)
- [Node.js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
- [PHP](https://github.com/okta/okta-jwt-verifier-php)

Don't see the language you're working in? Get in touch: <developers@okta.com>
