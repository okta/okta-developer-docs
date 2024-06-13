---
title: Build a JWT for Client Authentication
excerpt: Learn how to build a self-signed JWT.
layout: Guides
---


This guide explains how to build a self-signed JSON Web Token (JWT) that's used throughout Okta. For example, when you make requests to Okta API endpoints that require [client authentication](/docs/reference/api/oidc/#client-authentication-methods), you can optionally use a JWT for more security.

> **Note**: JWTs allow claims, such as user data, to be represented in a secure manner, helping to ensure trust and security in your app. JWTs are an open standard, and there are various libraries available that allow you to create, verify, and inspect them.

---

#### Learning outcomes

* Build a signed JWT for request authentication to OpenID Connect endpoints.
* Understand which claims are required in your JWT payload.
* Sign the JWT with a shared secret or a private key.

---

## JWT Types

There are two types of self-signed JWT assertions that you can build for use when you make requests to endpoints that require client authentication:

* JWT with a Shared Key (`client_secret_jwt`)
* JWT with a Private Key (`private_key_jwt`)

The difference between building these two types of assertions is the algorithm and key used to sign the JWT.

Which JWT type that you use depends on the client authentication method configured in your OAuth 2.0 client application. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods) for more information on the supported methods and when to use them.

> **Note:** To create a client application and specify either the `client_secret_jwt` or `private_key_jwt` authentication method, see the [Add OAuth 2.0 Client Application](/docs/reference/api/apps/#add-oauth-2-0-client-application) API reference section. To change the client authentication method of an existing app, see the [Update the Client Authentication Method](/docs/reference/api/apps/#update-the-client-authentication-method) API reference section.

> **Tip:** If you don't know which method is configured for your client app, you can quickly check the settings by doing a GET to `https://{yourOktaDomain}/api/v1/apps/{appId}`.

## Gather claims information

When you create a JWT assertion claim for client authentication (`client_secret_jwt` or `private_key_jwt`), gather claims information for the payload section of the JWT. Claims are statements about the entity, which is typically a user and any additional data.

| Claim    | Description                                                  | Type        |
|----------|--------------------------------------------------------------|-------------|
| `aud`      | Required. The full URL of the resource that you're trying to access using the JWT to authenticate. For example: `https://{yourOktaDomain}/oauth2/default/v1/token` | String  |
| `exp`      | Required. The token expiration time in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555594819`. This claim fails the request if the expiration time is more than one hour in the future or if the token is already expired.            | Integer     |
| `iss`      | Required. The issuer of the token. This value must be the same as the `client_id` of the application that you’re accessing.  | String      |
| `sub`      | Required. The subject of the token. This value must be the same as the `client_id` of the application that you’re accessing. | String       |
| `jti`      | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests won't succeed. | String    |
| `iat`      | Optional. When the token was issued in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555591219`. If specified, it must be a time before the request is received. | Integer     |

## Build a JWT with a shared key

If you configured your application to use the `client_secret_jwt` client authentication method, then you want to build a JWT that you sign with the `client_secret` using an HMAC SHA algorithm (HS256, HS384, or HS512).

<StackSelector snippet="createclientsecretjwt" noSelector />

## Build a JWT with a private key

If you configured your client to use the `private_key_jwt` client authentication method, then you want to build a JWT that you sign with your private key using an RSA or ECDSA algorithm (RS256, RS384, RS512, ES256, ES384, ES512).

<StackSelector snippet="createprivatekeyjwt" noSelector />
