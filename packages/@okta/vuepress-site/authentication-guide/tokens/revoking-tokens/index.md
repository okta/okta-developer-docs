---
title: Revoking Tokens
excerpt: How to revoke tokens with Okta.
---

# Revoking Tokens

If for whatever reason you would like to disable an access or refresh token, simply send a request to your `/revoke` endpoint:

```
http --form POST https://{yourOktaDomain}/oauth2/default/v1/revoke \
  accept:application/json \
  authorization:'Basic ZmEz...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  token=eyJhbG... \
  token_type_hint=access_token
```

> Note: Revoking a token that is invalid, expired, or already revoked will still return a `200 OK` so as to not leak information.

For more information, see [Revoke a Token](/docs/api/resources/oidc#revoke) in the Okta OIDC & OAuth 2.0 reference.

## Revoking the Access vs the Refresh Token

The token revocation endpoint can revoke either access or refresh tokens. Revoking an access token does not revoke the associated refresh token, though revoking a refresh token does revoke the associated access token.

#### Revoking only the access token

Revoking only the access token will effectively force the use of the refresh token to retrieve a new access token. This could be useful if, for example, you have changed a user's data and you want this information to be reflected in a new access token.

#### Revoking only the refresh token

If you revoke only the refresh token then the access token will also be revoked. This allows you to, for example, force a user to reauthenticate.

For more information on configuring TTL and other parameters involving access and refresh tokens, you can read about configuing [Okta Access Policies](/authentication-guide/implementing-authentication/set-up-authz-server#create-access-policies).

## Removing a User Session

Separate from access and refresh tokens, there is also the Okta session cookie which provides access to your Okta organization and applications. For a more complete explanation of Okta User sessions, see [the Sessions API documentation](/docs/api/resources/sessions). Okta sessions can be revoked in one of two ways: you can either close a specific session using the Sessions API, or revoke all sessions for a given user using the Users API.

> Note: Removing all user sessions can optionally also remove all related access and refresh tokens as well.

For more information on removing a specific session, see [Close Session](/docs/api/resources/sessions#close-session) in the Sessions API reference. For more on removing all of a user's sessions, see [Clear User Sessions](/docs/api/resources/users#clear-user-sessions) in the Users API reference.
