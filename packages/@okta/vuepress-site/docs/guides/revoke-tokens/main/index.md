---
title: Revoke Tokens
excerpt: How to revoke tokens with Okta
layout: Guides
---

> **Note**: This document is written for Classic Engine. If you’re using Identity Engine, see [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/) for relevant guidance. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains how to revoke access or refresh tokens with Okta.

---

#### Learning outcomes

* Revoke tokens.
* Remove user sessions.

---

## About the revoke request

If you would like to disable an access or refresh token, simply send a request to the `/revoke` endpoint for the appropriate authorization server.

This example makes a request to revoke an access token issued by the org authorization server. The URL of the authorization server for your request might be different than this example. See [Authorization servers](/docs/concepts/auth-servers/#available-authorization-server-types) for more information.

```bash
http --form POST https://${yourOktaDomain}/oauth2/v1/revoke \
  accept:application/json \
  authorization:'Basic ZmEz...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  token=eyJhbG... \
  token_type_hint=access_token
```

> **Note:** Revoking a token that is invalid, expired, or already revoked returns a `200 OK` status code to prevent any information leaks.

See [Revoke a token](/docs/reference/api/oidc/#revoke) in the Okta OpenID Connect & OAuth 2.0 API reference.

## Revoke an access token or a refresh token

The token revocation endpoint can revoke either access or refresh tokens. Revoking an access token doesn't revoke the associated refresh token. However, revoking a refresh token does revoke the associated access token.

### Revoke only the access token

Revoking only the access token effectively forces the client to use the refresh token in a request to retrieve a new access token. This could be useful if, for example, you’ve changed a user's data, and you want this information to be reflected in a new access token.

#### Request Example

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/revoke' \
-H "Accept: application/json" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Authorization: Basic MG9hbmF3ZX...WwtOFRCYQ==" \
-d "token=eyJraWQiOiJ....aDvfximOQ" \
-d "token_type_hint=access_token"
```

> **Note:** Since revoking a token that is invalid, expired, or already revoked returns a `200 OK` status code, you should test that the token has been revoked by making, for example, a GET request to the `/users` endpoint.

### Revoke only the refresh token

If you revoke only the refresh token, then the access token is also revoked. This allows you to, for example, force a user to reauthenticate.

#### Request Example

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/revoke' \
-H "Accept: application/json" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Authorization: Basic MG9hbmF3...FRCYQ==" \
-d "token=JSbdNrF...FOtMJw" \
-d "token_type_hint=refresh_token"
```

See [Rule policies](/docs/reference/api/authorization-servers/#rule-properties) for more information on configuring Time to Live (TTL) and other parameters involving access and refresh tokens.

## Remove a user session

Separate from access and refresh tokens, there’s also the Okta session cookie that provides access to your Okta org and apps. For a more complete explanation of Okta user sessions, see the [Sessions API reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/). You can revoke Okta sessions in one of two ways:

* Close a specific session using the Sessions API
* Revoke all sessions for a given user using the Users API

> **Note:** Removing all user sessions can optionally also remove all related access and refresh tokens by including the `oauthTokens` parameter in the request.

See [Close Session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/#tag/Session/operation/revokeSession) in the Sessions API reference for more information on removing a specific session.

See [Clear User Sessions](/docs/reference/api/users/#clear-user-sessions) in the Users API reference for more information on removing all of a user's sessions.
