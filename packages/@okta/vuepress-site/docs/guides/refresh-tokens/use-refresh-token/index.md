---
title: Use a refresh token
---


To refresh your access token as well as an ID token, you send a token request with a `grant_type` of `refresh_token`. Be sure to include the `openid` scope when you want to refresh the ID token.

```bash
http --form POST https://${yourOktaDomain}/oauth2/default/v1/token \
  accept:application/json \
  authorization:'Basic MG9hYmg3M...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  grant_type=refresh_token \
  redirect_uri=http://localhost:8080 \
  scope=offline_access%20openid \
  refresh_token=MIOf-U1zQbyfa3MUfJHhvnUqIut9ClH0xjlDXGJAyqo
```

If the refresh token is valid, then you get back a new access and the refresh token. Whether that refresh token is the same one sent in the request or is a new refresh token depends on:

* [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation/) enabled for the client
* The configured [refresh token lifetime](/docs/reference/api/authorization-servers/#actions-object) in the access policy. See [Refresh token reuse detection](/docs/guides/refresh-tokens/refresh-token-rotation/#refresh-token-reuse-detection).

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "access_token": "eyJhbGciOiJ[...]K1Sun9bA",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "offline_access%20openid",
    "refresh_token": "MIOf-U1zQbyfa3MUfJHhvnUqIut9ClH0xjlDXGJAyqo",
    "id_token": "eyJraWQiO[...]hMEJQX6WRQ"
}
```

<NextSectionLink>Next steps</NextSectionLink>
