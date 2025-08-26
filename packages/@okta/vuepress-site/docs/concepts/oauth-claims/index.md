---
title: OAuth 2.0 and OpenID Connect claims
meta:
  - name: description
    content: A high-level overview of OAuth 2.0 and OpenID Connectclaims.
---

# Learn about OAuth 2.0 and OpenID Connect claims

[OAuth 2.0 and OpenID Connect (OIDC)](/docs/concepts/oauth-openid) claims are key-value pairs of data that contain information, typically information about a user. Okta uses these claims to provide context about the user and their permissions.

This page provides an overview of OAuth 2.0 and OIDC claims, including their types and usage, and how they're used in Okta.

---

## What are claims

At a basic level, a claim is a piece of information asserted about a subject. In the context of OAuth 2.0 and OpenID Connect (OIDC), claims are key-value pairs of data contained within tokens. Claims are commonly packaged into [access](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token) and [ID tokens](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token). Access tokens and ID tokens are formatted as JSON Web Tokens (JWTs).

> **Note:** Access tokens are usually formatted as JWTs, but not always.

### Claims in access tokens

Claims in access tokens pass information about the user and their permissions to the resource server. Claims are contained within a scope, or you can add [custom claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#custom-claims) to an access token. Access tokens can contain scopes and custom claims, while ID tokens can contain claims, but not scopes.

Access and ID tokens contain a [header](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-header), [payload](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-payload), and [signature](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-signature).

Along with other parameters, the payload can contain scopes and custom claims. See the following example of an access token payload.

```json
{
  "ver": 1,
  "jti": "AT.0mP4JKAZX1iACIT4vbEDF7LpvDVjxypPMf0D7uX39RE",
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://api.example.com",
  "sub": "00ujmkLgagxeRrAg20g3",
  "iat": 1467145094,
  "exp": 1467148694,
  "cid": "nmdP1fcyvdVO11AL7ECm",
  "uid": "00ujmkLgagxeRrAg20g3",
  "scp": [
    "openid",
    "email",
  ],
  "auth_time": 1467142021,
}
```

The `scp` (scope) parameter passes two scopes to the resource server: `openid` and `email`. The `email` scope contains the `email` and `email_verified` claims and these claims provide access to the user's email address and its verification status.

See [Access token scopes and claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-scopes-and-claims) for information about configuring scopes and claims in access tokens.

### Claims in ID tokens

Claims in ID tokens pass identifying information about a user to client applications. The identifying information is structured into standard claims that are defined by the OIDC specification. Client applications evaluate this user information and make authorization decisions based on that information.

OAuth 2.0 and OIDC tokens, containing claims, pass information about a user to an authorization server which tells the authorization server who the user is, and what they're allowed to do.

These claims enable precise authorization decisions by allowing downstream services to validate identity and access rights based on the token’s content.

### What's the purpose of claims

Before discussing the different types of claims, it's important to understand how claims fit into the overall OAuth 2.0 and OIDC frameworks.

The following terms are defined based on how they affect the use of claims. For more information about these terms, see the [OAuth 2.0](https://oauth.net/2/) and [OpenID Connect](https://openid.net/connect/) specifications.

- **JWT (JSON Web Token)**: A specific type of token that is encoded as a JSON object and can be verified and trusted because it is digitally signed. See [Access token](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token) for more information about the composite parts of a JWT.
- **Scope**: A scope determines which resources a token can access and what actions it can perform. Scopes can contain multiple claims. For example, the `profile` scope requests access to default user profile claims such as `name`, `family_name`, and `email`, among others.
- **Claim**: A piece of information asserted about a subject (user).

### ID token example

An ID token might include the following claims:

```json
{
  "sub": "user123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

In this example, the `sub`, `email`, and `name` claims provide information about the user. `sub` indicates the ID of the user, and `email` and `name` provide identifying information about the user.

### Access token example

An access token might include the following claims:

```json
{
  "ver": 1,
  "jti": "AT.0mP4JKAZX1iACIT4vbEDF7LpvDVjxypPMf0D7uX39RE",
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://api.example.com",
  "sub": "00ujmkLgagxeRrAg20g3",
  "iat": 1467145094,
  "exp": 1467148694,
  "cid": "nmdP1fcyvdVO11AL7ECm",
  "uid": "00ujmkLgagxeRrAg20g3",
  "scp": [
    "openid",
    "email",
    "flights",
    "custom"
  ],
  "auth_time": 1467142021,
  "custom_claim": "CustomValue"
}
```



### Different uses for claims

OAuth 2.0 and OIDC claims have similar functions. They're both used as key-value pairs to assert information about an subject. However, the contexts that they're used in are different.

OAuth 2.0 claims are usually used with JWTs to convey information about the user or client and to provide authorization details to APIs and resource servers. OAuth 2.0 claims that are used in JWTs aren't part of the [standard OAuth 2.0 spec](https://www.rfc-editor.org/rfc/rfc6749).

While OIDC claims are used to provide verified identity information about a user, such as their name, email, and other user profile details.

## Claim types

Claims can be categorized into three types based on how they're defined and used.

**Standard claims**: These are claims with predefined names and meanings as specified by the OIDC standard. They provide fundamental information like the token's issuer (`iss`), the user's unique ID (`sub`), or when the token expires (`exp`).

**Public claims**: You can create your own claims, but they must be named in a way that avoids naming conflicts with others.

**Private claims**: These are custom claims created for a specific app or service. They can be any name you choose and are not meant to be publicly registered.

## Claims in ID tokens versus access tokens

A single user can have multiple tokens, and the claims within each token serve a different purpose.

**ID token claims:** These claims are all about identity. They provide information about the user, such as their name, email, or a profile picture. An application uses these claims to verify who the user is and to personalize the user's experience.

**Access token claims:** These claims are all about authorization. They grant an application permission to access protected resources, like an API. An API will inspect the claims within an access token to determine if the application has the necessary permissions to perform a requested action.

## Claims versus scopes

It's common to confuse claims and scopes, but they have distinct roles.

A scope is a permission requested by an application. For instance, an application might request the email scope to access a user's email address.

A claim is the actual data that is returned as a result of that request. If the user approves the email scope request, a claim containing the user's email address will be included in the ID token. Think of a scope as a question and a claim as the answer.

## Security and validation

Never trust the claims in a token without first validating them. A malicious actor could tamper with a token to gain unauthorized access. You must always validate a token to ensure:

It was issued by a trusted party (using the iss claim).

It has not expired (using the exp claim).

It was intended for your application (using the aud claim).

Validating these claims is a critical step in securing any application that uses OAuth 2.0.
