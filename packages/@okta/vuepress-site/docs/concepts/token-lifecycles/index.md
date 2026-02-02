---
title: Understand the token lifecycle
meta:
  - name: description
    content: An overview of OAuth 2.0 tokens, their use, and lifecycles.
---

# Understand the token lifecycle (exchange, refresh, revoke)

OAuth 2.0 is an industry-standard protocol for delegated authorization. It enables a client app to access protected resources on behalf of a user without requiring the user to share their credentials with the client app. Instead, the user grants permission directly to an authorization server, which then issues tokens to the client app. These tokens represent the granted permissions.

Understanding OAuth 2.0 tokens is central to implementing the OAuth 2.0 protocol for authorization. This document provides an overview of tokens, how they're used, and their lifecycles.

Review [OAuth 2.0 and OpenID Connect](https://developer.okta.com/docs/concepts/oauth-openid/) to understand [OAuth 2.0 flows](https://developer.okta.com/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce-flow) and these important terms as they're used in this document:

* [Authorization server](/docs/concepts/auth-servers/): The entity responsible for issuing and managing tokens
* **Client app**: The app that requests and uses tokens on behalf of the user
* **Resource server**: The entity that hosts the protected resources and accepts access tokens
* **Resource owner**: The owner of the data on the resource server
* **Grants**: The authorization given (or granted) to the client by the user
* [Scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints): The allowed access (specific actions on specific data) requested by the client app and granted by the user are encoded into the access token

## Token types

### Access tokens

An access token is the credential that a client app uses to access protected resources on a resource server.

**Purpose**: Access tokens grant specific permissions for a limited duration. They act as a key to unlock particular functionalities or data.

**Characteristics**:

  * **Short-lived**: For security reasons, access tokens typically have a short expiration time (for example, minutes or hours).
  * **Opaque**: While they can be self-contained (like JSON Web Tokens or JWTs), they're treated as opaque strings by the client app. The client doesn't need to parse or understand their internal structure.
  * **Scopes**: Access tokens are often associated with specific scopes that define the granular data access to be granted (for example, `read:email`, `write:profile`).

**Use**: The client app includes the access token in the `Authorization` header of HTTP requests when calling protected API endpoints on the resource server.

> **Note**: An "API token" is a broad term that refers to any credential used to authenticate to an API (including static API keys or bearer tokens). In the context of OAuth 2.0, the access token is the API token used for delegated authorization. Unlike static API keys, OAuth 2.0 access tokens have limited lifespans and are tied to a user's specific consent and the client's permissions, making them more secure for delegated access.
>
> See [Set up Okta for OAuth API access](/docs/guides/set-up-oauth-api/main/) to use access tokens for API authentication.

### Refresh tokens

A refresh token is a credential used to obtain new access tokens when the current access token expires or becomes invalid.

**Purpose**: Refresh tokens allow client apps to maintain continuous access to protected resources without requiring the user to reauthenticate or re-grant consent every time an access token expires.

**Characteristics**:

* **Long-lived**: Refresh tokens generally have a longer lifespan than access tokens, sometimes lasting for days, weeks, or even indefinitely until explicitly revoked.
* **Opaque**: They're treated as opaque strings by the client app. The client doesn't need to parse or understand their internal structure.
* **Confidential**: Because you can use refresh tokens to acquire new access tokens, they're highly sensitive, and the client app must securely store them. They're typically used only by the client app directly with the authorization server and never sent to the resource server.

**Use**: When an access token expires, the client app sends the refresh token to the authorization server's [token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint to request a new access token (and often a new refresh token).

### ID tokens

An ID token is a security token that contains claims about an authentication event and the user's identity. ID tokens are a core component of OpenID Connect (OIDC), an identity layer that extends the OAuth 2.0 framework.

**Purpose**: The primary purpose of an ID token is to verify the user's identity to the client app. It asserts that a user has successfully authenticated with the authorization server.

**Characteristics**:

* **JSON Web Token (JWT) format**: ID tokens are always JWTs, meaning they're self-contained, digitally signed, and can be verified locally.
* **Claims**: ID tokens contain required (standard) and optional claims about the user and the authentication process, such as:
  * `iss` (issuer): Identifies the authorization server that issued the token (REQUIRED)
  * `sub` (subject): The unique identifier for the user (subject) at the issuer (REQUIRED)
  * `aud` (audience): The client app's ID that indicates for whom the ID token is intended (REQUIRED)
  * `exp` (expiration time): The time after which the ID token must not be accepted (REQUIRED)
  * `iat` (issued at time): The time when the ID token was issued (REQUIRED)
  * `auth_time`: The time when the user authentication occurred (OPTIONAL)
  * `nonce`: A value used to mitigate replay attacks (REQUIRED only if requested)
  * `acr`: The authentication context class reference (OPTIONAL)
  * `amr`: The authentication methods references (OPTIONAL)

**Use**: The client app receives the ID token from the authorization server. It then validates the ID token to confirm the user's identity before establishing a session or granting access to app-specific resources. ID tokens aren't typically sent to the resource server. They're consumed by the client app.

### Access tokens vs. ID tokens vs. refresh tokens

The following table is a summary of the distinct purposes of access tokens, ID tokens, and refresh tokens.

| Feature            | Access token | ID token | Refresh token |
|--------------------|--------------|----------|---------------|
| **Primary purpose**| Authorization: Grant access to protected resources | Authentication: Verify user identity            | Obtain new access and ID tokens without re-authentication |
| **Audience**       | Resource server                              | Client app                                       | Authorization server ([token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint)              |
| **Format**         | Opaque string or JWT                         | Always a JWT                                     | Opaque string (usually)                          |
| **Content**        | Permissions (scopes), authorization context | User identity claims, authentication event details | An identifier for a specific grant, often opaque |
| **Validation by**  | Resource server (local or remote)            | Client app (local)                               | Authorization server                               |
| **Sent to**        | Resource server (in `Authorization` header)    | Typically not sent        | Authorization server ([token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint)              |

## Token lifecycle

The lifecycle of an OAuth 2.0 token involves several key stages, ensuring secure and controlled access to resources.

### Issuance

The token lifecycle begins with the authorization flow, where tokens are issued:

1. **Authorization grant**: The user interacts with the authorization server (for example, through a sign-in page and consent page) to grant permission to the client app. Upon successful authorization, the authorization server issues an authorization grant (such as an authorization code) to the client app.
1. **Token exchange**: The client app takes the authorization grant (the authorization code) and securely exchanges it with the authorization server's [token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint. This exchange is typically a server-to-server communication, ensuring the confidentiality of the client's credentials (such as the client secret).
1. **Token Issuance**: In response to this successful exchange, the authorization server issues the requested tokens: an access token, and optionally, a refresh token and/or an ID token to the client app.

### Use

After the token is issued, the client app uses the access token to interact with the resource server, and the ID token to verify user identity:

* The client app includes the access token in the `Authorization` HTTP header (typically as a bearer token, for example: `Authorization: Bearer <access_token>`) for every request to a protected resource.
* The resource server receives the request and extracts the access token. See [Access token validation](#access-token-validation).
* The client app validates the ID token to confirm the user's identity. See [ID token validation](#id-token-validation).

### Validation

Before granting access, the resource server must validate the received access token to ensure that it's legitimate and active. The client app also validates the ID token.

#### Access token validation

You can validate access tokens locally or remotely:

* **Local** (self-contained token validation): If the access token is a self-contained JWT, the resource server can validate it locally without contacting the authorization server. This involves:
  * **Signature verification**: Use the authorization server's public key to verify that the token's signature is valid and hasn’t been tampered with.
  * **Expiration check**: Confirm that the token hasn't expired.
  * **Audience and issuer check**: Verify that the token was issued for this specific resource server (audience) and by the expected authorization server (issuer).

* **Remote** (token introspection): For opaque tokens or for an additional layer of security with JWTs, the resource server sends the token to the authorization server's introspection endpoint.
  * The [introspect](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) endpoint returns information about the token, including whether it's active, its scopes, client ID, and expiration. This method adds network overhead but provides the most up-to-date status, including immediate revocation status.

See [Validate access token](/docs/guides/validate-access-tokens/) for the Okta implementation.

#### ID token validation

The client app validates the ID token locally. This involves:

* **Signature verification**: Use the authorization server's public key to verify the signature.
* **Expiration check**: Confirm that the token hasn’t expired.
* **Issuer check**: Verify that the expected authorization server issued the token.
* **Audience check**: Ensure that the token is intended for this specific client app.
* **Nonce check**: (If applicable) Verify that the nonce value exists. This value helps prevent replay attacks.

See [Validate ID tokens](/docs/guides/validate-id-tokens/main/) for the Okta implementation.

### Exchange

[Token exchange](https://datatracker.ietf.org/doc/html/rfc8693) is used when a service needs to access another service on behalf of an original user. This mechanism is configured for token exchange between highly trusted services and is useful for service-to-service requests, such as in the microservices architecture. It allows a client app or an API service to obtain a new token from an authorization server based on an existing access token while maintaining user context.

The following is the token exchange flow:

1. Obtain an initial access token: A user successfully signs in to an app and obtains an access token.
1. Initial access token use: The app makes a request to an initial API service using the access token that it received from the user sign-in.
1. API service requires downstream access: The initial API service needs to interact with another downstream API service, so it requests the authorization server to [exchange](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS!path=3/grant_type&t=request) the user's access token for a new token.
1. Authorization server validates and issues token: The authorization server validates the initial access token and grants a new access token to the initial API service. The new access token is limited to pre-approved scopes between the initial API service and the downstream API service and preserves the original user's context.
1. Downstream API service access with context: The API service uses this new token to access the downstream service, which can now understand on whose behalf the request is being made.

See [Set up OAuth 2.0 On-Behalf-of-Token-Exchange](/docs/guides/set-up-token-exchange/main/).

### Expiration

Access tokens and ID tokens are short-lived. The following are the results of an expired token:

* During access token validation, the resource server detects that the token's `exp` (expiration) claim indicates it's no longer valid.
* The client app, during ID token validation, detects that the ID token has expired.
* The resource server rejects the request with an HTTP 401 Unauthorized status code, indicating that the access token isn't valid for accessing protected resources.

When an access token expires, the client app can't use it to access protected resources. To maintain continuous access without requiring the user to reauthenticate, the client app relies on the refresh token through the token renewal process. See [Renewal (refresh tokens)](#renewal-refresh-tokens).

### Renewal (refresh tokens)

When an access token expires or is about to expire, the client app can use the refresh token to obtain a new access token (and often a new refresh token and ID token) from the authorization server. The following is the token renewal process:

1. The client app sends the refresh token to the authorization server's token endpoint with a `grant_type` of [`refresh_token`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS!path=3/grant_type&t=request).
1. The authorization server validates the refresh token, checking its validity, expiration, and whether it has been revoked.
1. If the refresh token is valid, the authorization server issues the client a new access token (and potentially a new refresh token and ID token).
1. The client can then resume accessing protected resources using the newly acquired access token and verify the user's identity with the new ID token.

This mechanism significantly improves user experience by minimizing the need for the user to sign in again, as the refresh token acts as a long-lived credential for acquiring short-lived access tokens. Public clients, such as browser-based apps, have a higher risk of compromised long-lived refresh tokens. You can reduce this risk by reducing the [refresh token lifetime](/docs/guides/refresh-tokens/main/#refresh-token-lifetime) and rotating refresh tokens after each use. See [Refresh access tokens and rotate refresh tokens](/docs/guides/refresh-tokens/main/).

### Revocation (invalidating tokens)

Token revocation allows for the immediate invalidation of an access token or a refresh token before its natural expiration. This operation is required for security and lifecycle management.

**Purpose**: To instantly disable a token for use. Common scenarios include:

* The user signs out of the app, requiring all associated tokens to be invalidated.
* The user changes their password, which might trigger the revocation of existing tokens for security.
* A security breach or compromise of a token is detected, needing its immediate invalidation.
* Administrator action to manually revoke a token.

**Mechanism**: The client app or an admin sends a request to the authorization server's [revocation](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/revokeCustomAS) endpoint, explicitly revoking the access or refresh token.

**Effect**: After the token is revoked, it's added to a blocklist or denylist maintained by the authorization server:

* Subsequent remote validation attempts fail for the access token.
* If an access token is invalidated, the client can use the refresh token to obtain a new access token.
* If the refresh token is invalidated, the corresponding access and ID tokens are invalidated as well. This effectively cuts off all future access linked to that refresh token.

See [Revoke tokens](/docs/guides/revoke-tokens/main/).
