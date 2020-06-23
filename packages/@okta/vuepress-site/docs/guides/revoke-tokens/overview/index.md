---
title: Overview
---

If you would like to disable an access or refresh token, simply send a request to the `/revoke` endpoint for the appropriate Authorization Server.

Pay attention to which Authorization Server that you're making the request to. Your URL might be different than the example. This request is revoking an access token issued by the Org Authorization Server. See [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types) for more information.

```BASH
http --form POST https://${yourOktaDomain}/oauth2/v1/revoke \
  accept:application/json \
  authorization:'Basic ZmEz...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  token=eyJhbG... \
  token_type_hint=access_token
```

> **Note:** Revoking a token that is invalid, expired, or already revoked still returns a `200 OK` to not leak information.

See [Revoke a Token](/docs/reference/api/oidc/#revoke) in the Okta OpenID Connect & OAuth 2.0 reference.

<NextSectionLink/>
