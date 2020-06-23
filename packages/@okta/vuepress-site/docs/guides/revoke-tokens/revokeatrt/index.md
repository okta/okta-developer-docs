---
title: Revoke an access token or a refresh token
---

The token revocation endpoint can revoke either access or refresh tokens. Revoking an access token doesn't revoke the associated refresh token, though revoking a refresh token does revoke the associated access token.

### Revoke only the access token

Revoking only the access token effectively forces the use of the refresh token to retrieve a new access token. This could be useful if, for example, you have changed a user's data, and you want this information to be reflected in a new access token.

**Request Example**

```bash
curl --location --request POST 'https://${yourOktadomain}/oauth2/v1/revoke' \
-H "Accept: application/json" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Authorization: Basic MG9hbmF3ZX...WwtOFRCYQ==" \
-d "token=eyJraWQiOiJ....aDvfximOQ" \
-d "token_type_hint=access_token"
```

> **Note:** Since revoking a token that is invalid, expired, or already revoked still returns a `200 OK`, test that the token has been revoked by performing, for example, a GET to the `/users` endpoint.

### Revoke only the refresh token

If you revoke only the refresh token, then the access token is also revoked. This allows you to, for example, force a user to reauthenticate.

**Request Example**

```bash
curl --location --request POST 'https://${yourOktadomain}/oauth2/v1/revoke' \
-H "Accept: application/json" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Authorization: Basic MG9hbmF3...FRCYQ==" \
-d "token=JSbdNrF...FOtMJw" \
-d "token_type_hint=refresh_token"
```

For more information on configuring TTL and other parameters involving access and refresh tokens, see [Okta Access Policies](/docs/guides/customize-authz-server/create-access-policies/).

<NextSectionLink/>
